import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const features = [
  {
    title: "Pet Grooming Services",
    description:
      "Providing Cat & Dog Grooming Services - Pampering and Bathing Your Beloved Pets - Taking Care of Your Beloved Cats & Dogs",
    image: "/assets/grooming.jfif", // Replace with the actual image path
  },
  {
    title: "Pet Clinic",
    description:
      "We are a Veterinary Clinic supported by Professional Medical Staff (Practicing Veterinarians) in diagnosing diseases and also have compassion for your beloved pets.",
    image: "/assets/dog.png", // Replace with the actual image path
  },
];

const CardList = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="80px"
    >
      <Box width="80%">
        <Box display="flex" justifyContent="space-between" gap="20px">
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "360px", // Increase the width of the card
                height: "480px", // Increase the height of the card
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                style={{ height: "240px", objectFit: "contain" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "flex-end",
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Button size="small" sx={{ color: "primary" }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CardList;
