import React from "react";
import {
  Box,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { tokens } from "ColorToken";
import Header from "components/Kepala";
const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently asked Questions Page" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is your return policy?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you're not satisfied with your purchase, we accept returns within
            30 days of delivery. To initiate a return, please email us at
            support@RabiPetshop.com with your order number and a brief
            explanation of why you're returning the item.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I track my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can track your order by clicking the tracking link in your
            shipping confirmation email, or by logging into your account on our
            website and viewing the order details.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I contact customer support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can contact our customer support team by emailing us at
            support@RabiPetshop.com or by calling us at (123) 456-789 between
            the hours of 9am and 5pm EST, Monday through Friday.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I change or cancel my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Unfortunately, once an order has been placed, we are not able to
            make changes or cancellations. If you no longer want the items
            you've ordered, you can return them for a refund within 30 days of
            delivery.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Do you offer international shipping?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Currently, we only offer shipping within Indonesia.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What payment methods do you accept?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept visa,mastercard,paypal payment method also we have cash on
            delivery system.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
