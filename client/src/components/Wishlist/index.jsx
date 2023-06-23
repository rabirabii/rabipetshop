import React, { useState } from "react";
import { Box, Typography, IconButton, Button, useTheme } from "@mui/material";
import {
  Close,
  FavoriteBorderOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { backend_url } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <Box
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 flex justify-center items-center"
      onClick={() => setOpenWishlist(false)}
    >
      <Box className="w-[80%] max-w-[800px] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <Box className="w-full h-screen flex items-center justify-center">
            <Close
              size={25}
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
            <Typography variant="h6" align="center">
              Wishlist is empty!
            </Typography>
          </Box>
        ) : (
          <>
            <Box padding="30px" overflow="auto">
              <Box mb="15px">
                <Typography variant="h5">
                  <FavoriteBorderOutlined />
                  Wishlist
                </Typography>
                <Typography variant="subtitle1">
                  You have {wishlist && wishlist.length} item
                </Typography>
              </Box>
              {wishlist &&
                wishlist.map((item) => (
                  <CartSingle
                    key={item.id}
                    data={item}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </Box>
            <Button
              variant="text"
              color="inherit"
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                borderRadius: 0,
              }}
              onClick={() => setOpenWishlist(false)}
            >
              Close
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <Box sx={{ borderBottom: "1px solid", borderColor: "divider", p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <Box sx={{ flex: "1 1 40%" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Images of Product:
          </Typography>
          <img
            alt={data.name}
            width="125px"
            height="165px"
            src={`${backend_url}${data?.images[0]}`}
          />
        </Box>
        <Box sx={{ flex: "1 1 60%" }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Name of Product:
            </Typography>
            <Typography variant="subtitle1">{data.name}</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Total Price:
            </Typography>
            <Typography variant="subtitle1">Rp. {totalPrice}</Typography>
          </Box>
          <Button
            onClick={() => addToCartHandler(data)}
            sx={{
              textDecoration: "underline",
              borderRadius: 0,
              minWidth: "100%",
            }}
          >
            Add to Cart
            <ShoppingCartCheckout />
          </Button>
        </Box>
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => removeFromWishlistHandler(data)}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Wishlist;
