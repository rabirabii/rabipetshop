import React, { useState } from "react";
import MyProfile from "../../components/MyProfile";
import Sidebar from "components/Sidebar";
import "./Sidebar.css";
const ProfilePage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="profile">
      <Sidebar isSidebar={isSidebar} />
      <MyProfile />
    </div>
  );
};

export default ProfilePage;
