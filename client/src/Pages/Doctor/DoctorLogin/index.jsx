import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorLogin from "components/Doctor/LoginDoctor";

const DoctorLoginPage = () => {
  const navigate = useNavigate();
  const { isDoctor, isLoading } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (isDoctor === true) {
      navigate(`/doctor-profile`);
    }
  }, [isLoading, isDoctor]);
  return (
    <div>
      <DoctorLogin />
    </div>
  );
};

export default DoctorLoginPage;
