import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard";
import { Box, Typography } from "@mui/material";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <Box width="80%" margin="80px" auto>
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.35%"
      >
        {allProducts && allProducts.length !== 0 && (
          <>
            {allProducts &&
              allProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </>
        )}
      </Box>
    </Box>

    // <div>
    //   <div className={`${styles.section}`}>
    //     <div className={`${styles.heading}`}>
    //       <h1>Featured Products</h1>
    //     </div>
    //     <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
    //       {allProducts && allProducts.length !== 0 && (
    //         <>
    //           {allProducts &&
    //             allProducts.map((i, index) => (
    //               <ProductCard data={i} key={index} />
    //             ))}
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default FeaturedProduct;
