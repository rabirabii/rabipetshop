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

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading, currentPage, totalPages } = useSelector(
    (state) => state.products
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts);
    } else {
      const filteredData = allProducts.filter(
        (product) => product.category === categoryData
      );
      setData(filteredData);
    }
  }, [allProducts, categoryData]);

  useEffect(() => {
    dispatch(getAllProducts()); // Fetch initial products
  }, [dispatch]);

  const handlePageChange = (event, page) => {
    dispatch(getAllProducts(page)); // Fetch products for the selected page
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Cobaa />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((product, index) => (
                  <ProductCard data={product} key={index} />
                ))}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products found!
              </h1>
            ) : null}
          </div>
          <div className="flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
          <Bar />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
