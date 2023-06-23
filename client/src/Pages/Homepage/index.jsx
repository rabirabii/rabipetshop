import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "components/Navbar";
import { CssBaseline, ThemeProvider, Divider, Grid } from "@mui/material";
import { theme } from "../../themePetShop";
import Layout from "Pages/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Caraosel from "components/Carousel";
import ProductList from "components/ProductList";
import BestDeals from "components/Bestdeal";
import CardList from "components/CardList";
import Categories from "components/Categories";
import Test from "components/coba";
import Promo from "components/Promo";
import Sponsor from "components/Sponsor";
import Subscribe from "components/Subscribe";
import Bar from "components/Bar";
import Cobaa from "components/cobaa";
import Searchbar from "components/Search";
const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Searchbar />
      <Cobaa />
      <Caraosel />
      <Divider />
      <Categories />
      <CardList />
      <Divider />
      <BestDeals />
      <Promo />
      <ProductList />
      <Sponsor />
      <Subscribe />
      <Bar />
    </ThemeProvider>
  );
};

export default Homepage;
