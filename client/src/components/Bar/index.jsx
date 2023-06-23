import React from "react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../themePetShop";
const Footer = () => {
  return (
    <Box
      marginTop="40px"
      padding="10px 0"
      backgroundColor={shades.neutral[100]}
    >
      <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="25px"
        columnGap="clamp(10px , 20px , 30px)"
      >
        <Box width="clamp(20%,30%,40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[300]}
          >
            Smart pet Petshop
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
          <Box mt="20px" minWidth="300px" height="200px">
            <img src="/assets/payment.jpg" alt="banner" />
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>
        <Box width="clamp(20%,25%,30%">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email : wahyubudiman0624@gmail.com
          </Typography>
          <Typography mb="30px">
            Jalan Raya Jatiwaringin, RT.001/RW.002, Jatiwaringin, Bekasi City,
            West Java, Indonesia
          </Typography>
          <Typography mb="30px">(123)456 789</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
