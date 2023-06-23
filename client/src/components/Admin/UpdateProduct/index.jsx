import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "styles/styles";
import axios from "axios";
import { updateProduct } from "redux/actions/product";
import { toast } from "react-toastify";
import Header from "../Header";
import { Formik } from "formik";
import { Box, TextField, useTheme } from "@mui/material";
import * as yup from "yup";
import { tokens } from "ColorToken";
import { categoriesData } from "static/data";
import { useNavigate } from "react-router-dom";
const updateProductComponent = () => {
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState(products && products.name);
  const [description, setDescription] = useState(
    products && products.description ? products.description : ""
  );
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product Updated Successfully");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = async (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const formData = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    await axios.put(`${server}/product/update-avatar-products/:id`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  };

  console.log(images);

  return <div>updateProductComponent</div>;
};

export default updateProductComponent;
