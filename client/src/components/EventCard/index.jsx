import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "../Countdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-1/2 m-auto">
        <img src={`${backend_url}${data.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-6">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p className="text-gray-700 mb-4">{data.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <h5 className="text-sm text-gray-400 line-through pr-3">
              Rp. {data.originalPrice}
            </h5>
            <h5 className="text-xl font-bold text-gray-800">
              Rp. {data.discountPrice}
            </h5>
          </div>
          <span className="text-sm text-green-500">{data.sold_out} sold</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-600">Stock: </span>
          <span
            className={`${
              data.stock < 1 ? "text-red-600" : "text-green-600"
            } ml-1`}
          >
            {data.stock < 1 ? "Out of stock" : `${data.stock} available`}
          </span>
        </div>
        <CountDown data={data} />
        <div className="mt-4 flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <button className={`${styles.button} text-white`}>
              See Details
            </button>
          </Link>
          <button
            className={`${styles.button} text-white ml-4`}
            onClick={() => addToCartHandler(data)}
            disabled={data.stock < 1}
          >
            {data.stock < 1 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
