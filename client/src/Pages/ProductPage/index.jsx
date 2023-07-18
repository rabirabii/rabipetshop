import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Loader from "../../components/Loader";
import Bar from "../../components/Bar";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "redux/actions/product";
import styles from "../../styles/styles";
import Cobaa from "components/cobaa";
import { categoriesData } from "static/data";
import Categories from "./categories";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Number of products to display per page

  useEffect(() => {
    if (allProducts) {
      if (categoryData === null) {
        setData(allProducts);
      } else {
        const filteredData = allProducts.filter(
          (product) => product.category === categoryData
        );
        setData(filteredData);
      }
    }
  }, [categoryData, allProducts]);

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Cobaa />
          <br />
          <Categories />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {currentProducts.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products found!
              </h1>
            ) : null}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(data.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>

          <Bar />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
