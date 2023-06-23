import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import Tracking from "components/Tracking";
const TrackingPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="tracking">
      <Sidebar isSidebar={isSidebar} />
      <Tracking />
    </div>
  );
};

export default TrackingPage;
