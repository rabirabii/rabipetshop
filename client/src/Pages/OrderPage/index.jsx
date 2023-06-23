import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import Orders from "components/Orders";
const OrderPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="order">
      <Sidebar isSidebar={isSidebar} />
      <Orders />
    </div>
  );
};

export default OrderPage;
