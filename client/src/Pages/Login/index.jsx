import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Redirect, redirect } from "react-router-dom";
import Login from "components/Login";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     navigate("/");
  //   }
  // }, []);

  if (isAuthenticated === true) {
    return navigate("/");
  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
