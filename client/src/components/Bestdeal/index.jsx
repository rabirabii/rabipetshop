import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard";
import { Box, Typography } from "@mui/material";
const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <Box width="80%" margin="80px" auto>
      <Typography variant="h3" textAlign="center">
        <b>Best Deal</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.35%"
      >
        {data && data.length !== 0 && (
          <>
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </>
        )}
      </Box>
    </Box>
    // <div>
    //   <div className={`${styles.section}`}>
    //     <div className={`${styles.heading}`}>
    //       <h1>Best Deals</h1>
    //     </div>
    //     <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
    //       {data && data.length !== 0 && (
    //         <>
    //           {data &&
    //             data.map((i, index) => <ProductCard data={i} key={index} />)}
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default BestDeals;
