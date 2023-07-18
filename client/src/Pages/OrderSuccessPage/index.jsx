import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import Bar from "components/Bar";
import Cobaa from "components/cobaa";
import Lottie from "react-lottie";
import AnimationData from "../../assets/animations/97240-success.json";
import { useSelector } from "react-redux";

const OrderSuccessPage = () => {
  return (
    <div>
      <Cobaa />
      <Success />
      <Bar />
    </div>
  );
};

const Success = () => {
  const { user } = useSelector((state) => state.user);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleEmailRedirect = () => {
    if (user && user.email) {
      const gmailURL = `https://mail.google.com/mail/u/0/#inbox`;
      window.open(gmailURL, "_blank");
    }
  };

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Lottie options={defaultOptions} width={300} height={300} />
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order -{" "}
        <strong>Thank you for your Order!</strong>
        {user && (
          <p>
            Please Check your Email{" "}
            <a
              onClick={handleEmailRedirect}
              style={{
                color: "#0078D4",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {user.email}
            </a>
          </p>
        )}
      </Alert>
      <br />
      <br />
    </Box>
  );
};

export default OrderSuccessPage;
