useEffect(() => {
  currentPage.current = 1;
  getPaginatedProducts();
}, []);

// Pagination
function handlePageClick(e) {
  console.log(e);
  currentPage.current = e.selected + 1;
  getPaginatedProducts();
}

// Limit
function changeLimit() {
  currentPage.current = 1;
  getPaginatedProducts();
}

function getPaginatedProducts() {
  fetch(
    `http://localhost:5001/api/petshop/product/paginatedProducts?page=${currentPage.current}&limit=${limit}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "productData");
      setPageCount(data.pageCount);
      setData(data.result);
    });
}

const renderPagination = () => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRight />}
      previousLabel={<ChevronLeft />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      containerClassName="pagination flex justify-center mt-4"
      activeClassName="active"
      forcePage={currentPage.current - 1}
      previousClassName="px-3 py-1 rounded-md text-gray-600 bg-white hover:bg-gray-100"
      nextClassName="px-3 py-1 rounded-md text-gray-600 bg-white hover:bg-gray-100"
      pageClassName="px-3 py-1 rounded-md text-gray-600 bg-white hover:bg-gray-100"
      pageLinkClassName="w-full h-full flex items-center justify-center"
      previousLinkClassName="w-full h-full flex items-center justify-center"
      nextLinkClassName="w-full h-full flex items-center justify-center"
      activeLinkClassName="bg-blue-500 text-white"
    />
  );
};

{
  renderPagination();
}
<div className="flex items-center justify-center mt-4">
  <span className="mr-2">Items per Page:</span>
  <input
    type="number"
    min="1"
    max="20"
    value={limit}
    onChange={(e) => setLimit(e.target.value)}
    className="border rounded px-2 py-1"
  />
  <button
    onClick={changeLimit}
    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
  >
    Set Limit
  </button>
</div>;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Loader from "../../components/Loader";
import Bar from "../../components/Bar";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "redux/actions/product";
import styles from "../../styles/styles";
import Cobaa from "components/cobaa";
import { categoriesData } from "static/data";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Number of products to display per page

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.title}`);
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
            {/* Category filter */}
            <div className="flex justify-center mb-4">
              {categoriesData.map((category) => (
                <button
                  key={category.id}
                  className={`${
                    categoryData === category.title
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  } hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded mx-2 focus:outline-none`}
                  onClick={() => {
                    handleCategoryClick(category);
                    window.location.search = searchParams.toString();
                  }}
                >
                  {category.title}
                </button>
              ))}
            </div>
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
