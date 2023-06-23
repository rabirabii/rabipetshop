import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import DoctorInboxComponent from "components/DoktorInbox";
const DoctorChatPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="inboxDoctor">
      <Sidebar isSidebar={isSidebar} />
      <DoctorInboxComponent />
    </div>
  );
};

export default DoctorChatPage;
