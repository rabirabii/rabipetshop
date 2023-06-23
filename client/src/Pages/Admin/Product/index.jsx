import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../../components/Admin/Header";
import { useGetProductsQuery } from "state/api";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
const Product = ({
  _id,
  name,
  description,
  discountPrice,
  rating,
  category,
  stock,
  sold_out,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[1000]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Rp.{Number(price).toFixed(3)}
        </typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id : {_id}</Typography>
          <Typography>Suppply Left : {supply}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery();
  const { products, isLoading } = useSelector((state) => state.products);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  console.log("Data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Product" subtitle="See your list of products . " />
      {products || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {products.map(
            ({
              _id,
              name,
              description,
              discountPrice,
              rating,
              category,
              stock,
              sold_out,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                discountPrice={discountPrice}
                rating={rating}
                category={category}
                stock={stock}
                sold_out={sold_out}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading</>
      )}
    </Box>
  );
};

export default Products;
