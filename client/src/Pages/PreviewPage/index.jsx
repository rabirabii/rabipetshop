import React, { useState } from "react";
import styles from "styles/styles";
import Preview from "components/Preview";
import AdminProfile from "components/AdminProfile";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
import Cobaa from "components/cobaa";
const PreviewPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="">
      <Cobaa />
      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full 800px:flex py-10 justify-between">
          <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
            <Preview isOwner={false} />
          </div>
          <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
            <AdminProfile isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
