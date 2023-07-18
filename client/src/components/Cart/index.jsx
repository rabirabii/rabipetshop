import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Close,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Add,
  Close as CloseIcon,
  Remove,
  ShoppingBag,
} from "@mui/icons-material";
import { removeFromCart, addTocart } from "../../redux/actions/cart";
import styled from "@emotion/styled";
import { backend_url } from "../../server";
import { shades } from "themePetShop";
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const increment = (data) => {
    if (data.stock <= 1) {
      toast.error("Product stock limited!");
    } else {
      const updatedData = { ...data, qty: data.qty + 1 };
      quantityChangeHandler(updatedData);
    }
  };

  const decrement = (data) => {
    if (data.qty === 1) return;
    const updatedData = { ...data, qty: data.qty - 1 };
    quantityChangeHandler(updatedData);
  };

  return (
    <Box
      display={setOpenCart ? "block" : "none"}
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10"
    >
      <Box className="fixed top-0 right-0 h-full w-[60%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <Box
            className="w-full h-screen flex items-center justify-center"
            p={4}
          >
            <IconButton
              className="absolute top-3 right-3"
              onClick={() => setOpenCart(false)}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">Cart Items is empty!</Typography>
          </Box>
        ) : (
          <>
            <Box p={4}>
              <FlexBox mb={2}>
                <ShoppingBag />
                <Typography variant="h5">
                  Shopping Bag <br />
                  You have {cart && cart.length} item
                </Typography>
                <IconButton
                  className="ml-auto"
                  onClick={() => setOpenCart(false)}
                >
                  <CloseIcon />
                </IconButton>
              </FlexBox>
            </Box>
            <Box p={4} flexGrow={1} overflow="auto">
              {cart &&
                cart.map((item, index) => (
                  <CartSingle
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </Box>
            <Box p={4}>
              <FlexBox mb={2}>
                <Typography fontWeight="bold">SUBTOTAL</Typography>
                <Typography fontWeight="bold">(Rp. {totalPrice})</Typography>
              </FlexBox>
              <Button
                sx={{
                  backgroundColor: shades.primary[400],
                  color: shades.secondary[300],
                  textDecoration: "underline",
                  borderRadius: 0,
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                }}
                component={Link}
                to="/checkout"
              >
                CHECKOUT
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

const MAX_DESCRIPTION_LENGTH = 350;

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updatedCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updatedCartData);
    }
  };

  const decrement = (data) => {
    if (value === 1) return;
    setValue(value - 1);
    const updatedCartData = { ...data, qty: value - 1 };
    quantityChangeHandler(updatedCartData);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (
      showFullDescription ||
      data.description.length <= MAX_DESCRIPTION_LENGTH
    ) {
      return (
        <>
          <Typography>{data.description}</Typography>
          {data.description.length > MAX_DESCRIPTION_LENGTH && (
            <Typography
              color={shades.primary[400]}
              onClick={toggleDescription}
              cursor="pointer"
            >
              Read Less
            </Typography>
          )}
        </>
      );
    } else {
      const shortenedDescription = data.description.substring(
        0,
        MAX_DESCRIPTION_LENGTH
      );
      return (
        <>
          <Typography>{shortenedDescription}</Typography>
          <Typography
            color={shades.primary[400]}
            onClick={toggleDescription}
            cursor="pointer"
          >
            Read More
          </Typography>
        </>
      );
    }
  };

  return (
    <Box borderBottom={1} p={2}>
      <FlexBox>
        <Box>
          <Typography>{data.id}</Typography>
        </Box>
        <Box flex="1 1 40%">
          <Typography fontWeight="bold">Images of Product:</Typography>
          <img
            alt={data.name}
            width="125px"
            height="165px"
            src={`${backend_url}${data?.images[0]}`}
          />
        </Box>
        <Box flex="1 1 60%">
          <FlexBox mb={1}>
            <Typography fontWeight="bold">
              Name of Product: <br />
              {data.name}
            </Typography>
            <Typography variant="p" fontWeight="bold">
              Price: <br /> Rp. {data.discountPrice} * {value}
            </Typography>
            <Typography fontWeight="bold">
              Total Price <br />
              Rp. {totalPrice}
            </Typography>
            <IconButton
              className="ml-auto"
              onClick={() => removeFromCartHandler(data)}
            >
              <CloseIcon />
            </IconButton>
          </FlexBox>
          {renderDescription()}
          <FlexBox mt={2}>
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[500]}`}
            >
              <IconButton onClick={() => decrement(data)}>
                <Remove />
              </IconButton>
              <Typography>Quantity: {data.qty}</Typography>
              <IconButton onClick={() => increment(data)}>
                <Add />
              </IconButton>
            </Box>
          </FlexBox>
        </Box>
      </FlexBox>
    </Box>
  );
};

export default Cart;
