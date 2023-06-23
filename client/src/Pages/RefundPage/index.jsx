import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import Refunds from "components/Refunds";
const RefundPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="refund">
      <Sidebar isSidebar={isSidebar} />
      <Refunds />
    </div>
  );
};

export default RefundPage;
