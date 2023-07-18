import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((item) => item._id === data._id)) {
      setIsWishlist(true);
    } else {
      setIsWishlist(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (item) => {
    setIsWishlist(false);
    dispatch(removeFromWishlist(item));
  };

  const addToWishlistHandler = (item) => {
    setIsWishlist(true);
    dispatch(addToWishlist(item));
  };

  const addToCartHandler = (itemId) => {
    const isItemExists = cart && cart.find((item) => item._id === itemId);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock <= 1) {
        toast.error("Product stock is limited!");
      } else {
        const cartItem = { ...data, qty: 1 };
        dispatch(addTocart(cartItem));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <div className="flex justify-end"></div>
      <Link
        to={`${
          isEvent === true
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
        }`}
      >
        <img
          src={`${backend_url}${data.images && data.images[0]}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link
        to={`${
          isEvent === true
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
        }`}
      >
        <h4 className="pb-3 font-medium text-base truncate">{data.name}</h4>
        <div className="flex items-center mb-2">
          <Ratings rating={data?.ratings} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {data.originalPrice !== 0 && (
              <h5 className={`${styles.productDiscountPrice}`}>
                Rp. {data.discountPrice}
              </h5>
            )}
            <h4 className={`${styles.price}`}>
              Rp. {data.originalPrice ? data.originalPrice : null}
            </h4>
          </div>
          <span className="font-semibold text-[#68d284] text-sm">
            {data?.sold_out} sold
          </span>
        </div>
      </Link>
      <p className="text-gray-600 mb-4">Available Stock: {data.stock}</p>
      {data.stock > 0 ? (
        <div className="flex items-center mt-3">
          {isWishlist ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer text-red-500  absolute right-2 top-14 transition-colors duration-300 hover:text-red-600"
              onClick={() => removeFromWishlistHandler(data)}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer text-gray-500  absolute right-2 top-14 transition-colors duration-300 hover:text-red-600"
              onClick={() => addToWishlistHandler(data)}
              title="Add to wishlist"
            />
          )}
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer text-gray-500 absolute right-2 top-24 transition-colors duration-300 hover:text-[#444]"
            onClick={() => addToCartHandler(data._id)}
            title="Add to cart"
          />
        </div>
      ) : (
        <p className="cursor-pointer text-gray-500"> Out of Stock</p>
      )}

      {isQuickView && (
        <ProductDetailsCard setOpen={setIsQuickView} data={data} />
      )}
    </div>
  );
};

export default ProductCard;
