import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import ChangePassword from "components/ChangePassword";
const ChangePasswordPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="password">
      <Sidebar isSidebar={isSidebar} />
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
