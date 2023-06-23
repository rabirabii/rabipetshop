import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import FAQ from "components/FAQ";
const FaqPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="faq">
      <Sidebar isSidebar={isSidebar} />
      <FAQ />
    </div>
  );
};

export default FaqPage;
