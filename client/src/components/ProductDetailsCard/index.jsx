import React, { useState, useEffect } from "react";
import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  MessageOutlined,
  ShoppingBagOutlined,
  CloseOutlined,
  AddOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { Box, IconButton, Typography } from "@mui/material";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [message, setMessage] = useState("");
  const [shortDescription, setShortDescription] = useState(
    data.description.slice(0, 100)
  );
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    if (showFullDescription) {
      setShortDescription(data.description);
    } else {
      setShortDescription(data.description.slice(0, 100));
    }
  }, [showFullDescription, data.description]);
  const handleMessageSubmit = () => {
    // Logic to handle message submission
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in the cart");
    } else {
      if (data.stock < count) {
        toast.error("It's out of stock");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-99999 mt-13">
      <div
        className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ zIndex: 99999 }}
      >
        <div className="relative">
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-64 object-cover"
          />
          <CloseOutlined
            size="large"
            className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="p-6">
          <h1 className={`${styles.productTitle} text-2xl`}>{data.name}</h1>
          <p className="text-gray-600">
            {shortDescription}
            {data.description.length > 100 && !showFullDescription && (
              <span>
                ...{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleDescription}
                >
                  Read More
                </span>
              </span>
            )}
            {showFullDescription && (
              <span>
                {" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleDescription}
                >
                  Read Less
                </span>
              </span>
            )}
          </p>

          <div className="flex items-center mt-4">
            <h4 className={styles.productDiscountPrice}>
              Rp.{data.discountPrice}
            </h4>
            {data.originalPrice && (
              <h3 className={styles.price}>Rp.{data.originalPrice}</h3>
            )}
          </div>

          <div className="flex items-center mt-4 space-x-2">
            <IconButton
              className="bg-teal-500 text-white rounded-l"
              onClick={decrementCount}
            >
              <RemoveOutlined />
            </IconButton>
            <Typography className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
              {count}
            </Typography>
            <IconButton
              className="bg-teal-500 text-white rounded-r"
              onClick={incrementCount}
            >
              <AddOutlined />
            </IconButton>
            <div>
              {click ? (
                <FavoriteOutlined
                  className="cursor-pointer"
                  onClick={() => removeFromWishlistHandler(data)}
                  color="error"
                  title="Remove from wishlist"
                />
              ) : (
                <FavoriteBorderOutlined
                  className="cursor-pointer"
                  onClick={() => addToWishlistHandler(data)}
                  title="Add to wishlist"
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              className={`${styles.button} w-full rounded-md h-11 flex items-center justify-center text-white`}
              onClick={() => addToCartHandler(data._id)}
            >
              <ShoppingBagOutlined className="mr-1" />
              Add to cart
            </button>
          </div>
          {/*           
          <div className="mt-6">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div> */}

          <div className="mt-4">
            <button
              className={`${styles.button} w-full rounded-md h-11 flex items-center justify-center text-white`}
              onClick={handleMessageSubmit}
            >
              <MessageOutlined className="mr-1" />
              Send Message
            </button>
          </div>

          <div className="mt-4">
            <Link
              to={`/shop/preview/${data.shop._id}`}
              className="flex items-center"
            >
              <img
                src={`${backend_url}${data?.shop?.avatar}`}
                alt=""
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <h3 className={styles.shop_name}>{data.shop.name}</h3>
                <h5 className="pb-3 text-sm">(4.5) Ratings</h5>
              </div>
            </Link>
          </div>

          <div className="mt-5 text-red-500">(50) Sold out</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
