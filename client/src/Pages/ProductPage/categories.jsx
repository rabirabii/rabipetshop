import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../static/data";
import styles from "../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center ">Categories</h2>

      <div className="flex justify-center mb-4">
        {categoriesData.map((category) => (
          <button
            key={category.id}
            className={`${
              categoriesData === category.title ? "bg-blue-500" : "bg-gray-300"
            } hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded mx-2 focus:outline-none`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default Categories;
