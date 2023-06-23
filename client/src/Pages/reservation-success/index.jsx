import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import Bar from "components/Bar";
import Cobaa from "components/cobaa";
import Lottie from "react-lottie";
import AnimationData from "../../assets/animations/97240-success.json";

const ReservationSuccessPage = () => {
  return (
    <div>
      <Cobaa />
      <Success />
      <Bar />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Lottie options={defaultOptions} width={300} height={300} />
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Reservation -{" "}
        <strong>Thank you for your Reservation!</strong>
      </Alert>
      <br />
      <br />
    </Box>
  );
};

export default ReservationSuccessPage;
