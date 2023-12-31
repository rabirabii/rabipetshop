import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "components/Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    if (count < data.stock) {
      setCount(count + 1);
    } else {
      toast.error(
        "The Product stock is " + data.stock + " You can not add more than it"
      );
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;

      try {
        const res = await axios.post(
          `${server}/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        );
        navigate(`/inbox?${res.data.conversation._id}`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] max-w-800 mx-auto py-5`}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <div className="w-1/2 mx-auto">
                <img
                  src={`${backend_url}${data && data.images[select]}`}
                  alt=""
                  className="w-full h-auto rounded-lg"
                  style={{ imageRendering: "crisp-edges" }}
                />
              </div>
              <div className="flex flex-wrap mt-6 lg:mt-0">
                {data &&
                  data.images.map((image, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer mx-1 border ${
                        select === index ? "border-gray-500" : ""
                      }`}
                    >
                      <img
                        src={`${backend_url}${image}`}
                        alt=""
                        className="h-20 w-20 object-cover rounded-lg"
                        onClick={() => setSelect(index)}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
              <h1 className={`${styles.productTitle} text-4xl font-bold mb-2`}>
                {data.name}
              </h1>
              <p className="text-gray-600 text-xl mb-4">{data.description}</p>
              <div className="flex items-center mb-4">
                <h4
                  className={`${styles.productDiscountPrice} text-l font-semibold text-gray-800 mr-2`}
                >
                  Rp. {data.discountPrice}
                </h4>
                {data.originalPrice && (
                  <h3
                    className={`${styles.price} text-sm text-red-500 line-through`}
                  >
                    Rp. {data.originalPrice}
                  </h3>
                )}
              </div>
              <p className="text-gray-600 mb-4">
                Available Stock: {data.stock}
              </p>
              {data.stock > 0 ? (
                <div className="flex items-center mb-6">
                  <div className="flex">
                    <button
                      className="bg-teal-500 text-white font-bold rounded-l px-3 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-teal-500 text-white font-bold rounded-r px-3 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => removeFromWishlistHandler(data)}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer text-gray-600"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-red-500 font-medium mb-4">Out of Stock</p>
              )}

              {data.stock > 0 ? (
                <button
                  className={`${styles.button} bg-[#6443d1] text-white font-medium mb-6 py-2 px-4 rounded`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  Add to Cart <AiOutlineShoppingCart className="ml-1" />
                </button>
              ) : (
                <button
                  className={`${styles.button} bg-[#6443d1] text-white font-medium mb-6 py-2 px-4 rounded`}
                  disabled
                >
                  Out of Stock <AiOutlineShoppingCart className="ml-1" />
                </button>
              )}

              <div className="flex items-center">
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt=""
                    className="w-12 h-12 rounded-full mr-2"
                  />
                </Link>
                <div>
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                  </Link>
                  <h5 className="text-sm text-gray-600">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
                <div
                  className={`${styles.button} bg-[#6443d1] ml-auto py-2 px-4 rounded`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            The Benefits
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Admin Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.manfaat}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
