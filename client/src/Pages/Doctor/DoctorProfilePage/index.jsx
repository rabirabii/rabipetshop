import React, { useState } from "react";
import DoctorProfile from "components/Doctor/MyProfileDoctor";
import SidebarDoctor from "components/Doctor/Sidebar";
import "./Sidebar.css";
const ProfilePage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="Doctorprofile">
      <SidebarDoctor isSidebar={isSidebar} />
      <DoctorProfile />
    </div>
  );
};

export default ProfilePage;
