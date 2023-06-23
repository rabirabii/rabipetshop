import React from "react";
import Cobaa from "components/cobaa";
import CheckoutSteps from "components/CheckoutSteps";
import Checkout from "components/Checkout";
import Bar from "components/Bar";

const CheckoutPage = () => {
  return (
    <div>
      <Cobaa />
      <br />
      <br />
      <CheckoutSteps />
      <Checkout />
      <br />
      <br />
      <Bar />
    </div>
  );
};

export default CheckoutPage;
