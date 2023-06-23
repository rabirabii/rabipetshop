import React from "react";
import CheckoutSteps from "../../components/CheckoutSteps";
import Cobaa from "../../components/cobaa";
import Payment from "../../components/Payment";
import Bar from "../../components/Bar";
const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Cobaa />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Bar />
    </div>
  );
};

export default PaymentPage;
