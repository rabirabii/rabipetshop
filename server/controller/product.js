const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const Features = require("../utils/Features");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        // Create the product in Stripe
        const stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
        });

        const stripePrice = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: product.discountPrice * 100,

          currency: "idr",
        });

        product.stripeProductId = stripeProduct.id;
        product.stripePriceId = stripePrice.id;
        product.stripeProductLink = `https://dashboard.stripe.com/products/${stripeProduct.id}`;
        await product.save();

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update products
router.put(
  "/update-products/:id",
  // isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found with id " + productId));
      }

      // Update product Field
      product.name = req.body.name;
      product.description = req.body.description;
      product.category = req.body.category;
      product.tags = req.body.tags;
      product.originalPrice = req.body.originalPrice;
      product.discountPrice = req.body.discountPrice;

      if (req.body.stock !== undefined) {
        // Add or subtract from the existing stock
        if (req.body.stock >= 0) {
          // Adding the value to the existing stock
          product.stock += req.body.stock;
        } else {
          // Subtracting the absolute value from the existing stock
          product.stock -= Math.abs(req.body.stock);
        }

        // Ensure the stock value does not go below zero
        product.stock = Math.max(product.stock, 0);
      }

      // Update the updatedAt field
      product.updatedAt = Date.now();

      // Save the updated product
      const updatedProduct = await product.save();

      res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Updated Images of Product
router.put(
  "/update-avatar-products/:id",
  isSeller,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const existProduct = await Product.findById(productId);
      const existAvatarPath = `uploads/${existProduct.images}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const product = await Product.findByIdAndUpdate(req.params.id, {
        images: fileUrl,
      });
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({});

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Paginated Products !!!
router.get(
  "/getAllProductsPaginated",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      let sort = req.query.sort || "rating";
      let category = req.query.category || "All";

      const categoryOptions = [
        "Cat",
        "Dog",
        "Fish",
        "Small Animals",
        "Bird",
        "Reptile",
      ];

      category === "All"
        ? (category = [...categoryOptions])
        : (category = req.query.category.split(","));
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }

      const products = await Product.find({
        name: { $regex: search, $options: "i" },
      })
        .where("category")
        .in([...category])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

      const total = await Product.countDocuments({
        category: { $in: [...category] },
        name: { $regex: search, $options: "i" },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        categorys: categoryOptions,
        products,
      };

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  })
);

// For Paginations
router.get("/paginatedProducts", async (req, res) => {
  const products = await Product.find({});
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalProduct = products.length;
  results.pageCount = Math.ceil(products.length / limit);

  if (lastIndex < products.length) {
    results.next = {
      page: page + 1,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }
  results.result = products.slice(startIndex, lastIndex);
  res.json(results);
});
// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
