const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const sendMail = require("../utils/sendMail");
// create new order
// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      // Kirim email tanda terima pembayaran ke pelanggan
      const emailOptions = {
        email: user.email,
        subject: `Payment Receipt`,
        html: `
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
              <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
              <style>
                body {
                  font-family: 'Raleway', sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  animation: fade-in 1s ease-in-out;
                }
                @keyframes fade-in {
                  0% {
                    opacity: 0;
                  }
                  100% {
                    opacity: 1;
                  }
                }
                .receipt-heading {
                  color: #008080;
                  margin-top: 0;
                  animation: slide-up 0.5s ease-in-out;
                }
                @keyframes slide-up {
                  0% {
                    transform: translateY(20px);
                    opacity: 0;
                  }
                  100% {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
                .item-container {
                  background-color: #f9f9f9;
                  padding: 10px;
                  border-radius: 5px;
                  margin-bottom: 10px;
                  animation: fade-in 1s ease-in-out;
                }
                .item-name {
                  font-weight: bold;
                  color: #333333;
                }
                .item-description {
                  color: #666666;
                }
                .item-price {
                  font-weight: bold;
                  color: #008080;
                }
                .shop-logo {
                  display: block;
                  margin: 20px auto;
                  max-width: 200px;
                  animation: slide-up 0.5s ease-in-out;
                }
                .thank-you-message {
                  color: #008080;
                  font-size: 18px;
                  margin-bottom: 20px;
                  animation: slide-up 0.5s ease-in-out;
                }
              </style>
            </head>
            <body>
              <div class="container">
              <img src="https://drive.google.com/uc?export=view&id=106iBdQ3lBloe39EMJ5HqdQfhGK33f0We" alt="Payment Receipt" width="160" height="160" />
                <h3 class="receipt-heading">Thank you for your payment!</h3>
                <p>Hello, <strong>${user.name}</strong>,</p>
                <p class="thank-you-message">Thank you for choosing our Pet Shop for purchasing pet products. We truly appreciate your support.</p>
                <p>Here is your payment receipt:</p>
                <ul>
                  <li><strong>Order ID:</strong> ${orders
                    .map((order) => order._id)
                    .join(", ")}</li>
                  <li><strong>Shipping Address:</strong> ${
                    shippingAddress.address1
                  }, ${shippingAddress.address2}, ${shippingAddress.country}, ${
          shippingAddress.city
        }, ${shippingAddress.zipCode}</li>
                  <li>
                    <strong>Cart Items:</strong>
                    <ul class="list-unstyled">
                      ${cart
                        .map(
                          (item) => `
                            <li class="item-container">
                              <span class="item-name">Product Name: ${item.name}</span>
                              <br />
                              <span class="item-description">Product Description: ${item.description}</span>
                              <br />
                              <strong>Quantity:</strong> ${item.qty}
                              <br />
                              <strong>Item Price per Quantity:</strong> Rp. ${item.discountPrice}
                            </li>
                          `
                        )
                        .join("")}
                    </ul>
                  </li>
                  <li><strong>Total Price (including 10% tax):</strong> Rp. ${totalPrice}</li>
                  <li><strong>Payment Date:</strong> ${new Date().toLocaleString(
                    "en-US",
                    {
                      timeZone: "Asia/Jakarta",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    }
                  )}</li>
                </ul>
                <p>Thank you again for choosing our Pet Shop. We look forward to serving you and your pet's needs in the future.</p>
              </div>
            </body>
          </html>
        `,
      };

      sendMail(emailOptions);

      res.status(201).json({
        success: true,
        orders,
        emailOptions,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/send-receipt",
  catchAsyncErrors(async (req, res, next) => {
    // Implement logic to send the purchase receipt email here
    const { email, subject, message } = req.body;

    const emailOptions = {
      email,
      subject,
      message,
    };

    await sendMail(emailOptions);

    res.status(200).json({ success: true });
  })
);
// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      if (req.body.status === "Transferred to delivery partner") {
        for (let i = 0; i < order.cart.length; i++) {
          const o = order.cart[i];
          await updateOrder(o._id, o.qty);
        }
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
