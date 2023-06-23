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
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "components/Ratings";
import axios from "axios";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/system";

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
        "The Product stock is " + data.stock + " You can not add more than it "
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
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <img
          src={`${backend_url}/${data?.productImages[select].img}`}
          alt={data?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" gutterBottom>
          {data?.name}
        </Typography>
        <Ratings value={averageRating} text={`${totalReviewsLength} reviews`} />
        <Typography variant="body1" gutterBottom>
          Price: ${data?.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {data?.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Brand: {data?.brand}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Stock: {data?.stock > 0 ? data?.stock : "Out of Stock"}
        </Typography>
        {data?.stock > 0 && (
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={decrementCount}
                startIcon={<Remove />}
              >
                Decrease
              </Button>
            </Grid>
            <Grid item>
              <Typography>{count}</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={incrementCount}
                startIcon={<Add />}
              >
                Increase
              </Button>
            </Grid>
          </Grid>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={data?.stock === 0}
          startIcon={<AiOutlineShoppingCart />}
          onClick={() => addToCartHandler(data?._id)}
          sx={{ mt: 2, mr: 1 }}
        >
          Add to Cart
        </Button>
        <IconButton
          onClick={() =>
            click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)
          }
          sx={{ mt: 2 }}
        >
          {click ? <AiFillHeart /> : <AiOutlineHeart />}
        </IconButton>
        <IconButton
          component={Link}
          to={`/product/${data?._id}/reviews`}
          sx={{ mt: 2 }}
        >
          <AiOutlineMessage />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMessageSubmit}
          startIcon={<AiOutlineMessage />}
          sx={{ mt: 2 }}
        >
          Message Seller
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
