import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorSignUp from "../../../components/Doctor/RegisterDoctor";

const DoctorSignupPage = () => {
  const navigate = useNavigate();
  const { isDoctor, doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (isDoctor === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <DoctorSignUp />
    </div>
  );
};

export default DoctorSignupPage;
