import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../Kepala";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";

const ProfileForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);
  return (
    <div className="w-full">
      <Box m="20px">
        <Header title="Profile Form" subtitle="You can edit your profile" />

        <Formik>
          {({ errors, touched, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="fullName"
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={!!touched.fullName && !!errors.fullName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="email"
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={!!touched.email && !!errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  name="phoneNumber"
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={!!touched.phoneNumber && !!errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  className=" w-[100%] 800px:w-[50%]"
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={!!touched.password && !!errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  fullName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  address2: "",
};
export default ProfileForm;
