import React, { useEffect, useState } from "react";
import Header from "../../components/cobaa";
import styles from "../../styles/styles";
import Loader from "../../components/Loader";
import ProfileSideBar from "../../components/ProfileSidebar";
// import ProfileContent from "../../components/ProfileContent";
import { useSelector } from "react-redux";
import Sidebar from "components/Sidebar";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          {/* <ProfileSideBar active={active} setActive={setActive} /> */}

          {/* <ProfileContent active={active} /> */}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
