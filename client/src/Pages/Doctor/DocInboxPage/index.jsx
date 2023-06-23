import React, { useState } from "react";
import SidebarDoctor from "components/Doctor/Sidebar";
import "./Sidebar.css";
import DoktorInbox from "components/Doctor/InboxDok";
const DocInboxPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="DocChat">
      <SidebarDoctor isSidebar={isSidebar} />
      <DoktorInbox />
    </div>
  );
};

export default DocInboxPage;
