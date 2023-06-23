import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import Address from "components/Address";
import "./Sidebar.css";
const AddressPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="address">
      <Sidebar isSidebar={isSidebar} />
      <Address />
    </div>
  );
};

export default AddressPage;
