import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import UserInbox from "components/UserInbox";
const UserInboxPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="inbox">
      <Sidebar isSidebar={isSidebar} />
      <UserInbox />
    </div>
  );
};

export default UserInboxPage;
