import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { shades } from "../../themePetShop";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import "./CarouselSection.css"; // Import the CSS file for animations

// Import all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../cute", false, /\.(png|jpe?g|svg|webp)$/)
);

const CarouselSection = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBefore sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNext sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box
          key={`carousel-image-${index}`}
          className="carousel-item" // Add a class for animations
        >
          <img
            src={texture}
            alt={`carousel-${index}`}
            className="carousel-image" // Add a class for animations
          />
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgba(0, 0, 0, 0.6)"
            className="carousel-overlay" // Add a class for animations
            style={{
              left: isNonMobile ? "10%" : 0,
              right: isNonMobile ? undefined : "0",
              margin: isNonMobile ? undefined : "0 auto",
              maxWidth: isNonMobile ? undefined : "240px",
            }}
          >
            <Typography color={shades.secondary[200]} variant="subtitle1">
              -- New Items
            </Typography>
            <Typography
              variant="h1"
              sx={{ marginBottom: "10px", letterSpacing: "2px" }}
            >
              Hot Sale
            </Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselSection;
