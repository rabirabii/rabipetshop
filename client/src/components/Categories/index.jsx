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
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
          {brandingData &&
            brandingData.map((item, index) => (
              <div className="flex items-start" key={index}>
                {item.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm">{item.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center ">Categories</h2>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-3 gap-6">
          {categoriesData &&
            categoriesData.map((category) => (
              <div
                className="w-full flex flex-col items-center justify-center cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="h-48 w-full rounded-t-lg overflow-hidden">
                  <img
                    src={category.image_Url}
                    className="h-full w-full object-cover"
                    alt={category.title}
                  />
                </div>
                <div className="py-4 px-6 text-center">
                  <h5 className="text-lg font-bold mb-2">{category.title}</h5>
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
