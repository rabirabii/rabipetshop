import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "styles/styles";
import axios from "axios";
import { loadDoctor, updateDoctorInformation } from "redux/actions/doctor";
import { toast } from "react-toastify";
import Header from "../../Kepala";
import { Formik } from "formik";
import { Box, TextField, useTheme, useMediaQuery, Button } from "@mui/material";
import * as yup from "yup";
import { tokens } from "ColorToken";
import { Update } from "@mui/icons-material";
import "./avatar.css";
const ProfileDoctor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { doctor, error, successMessage } = useSelector(
    (state) => state.doctor
  );
  const [avatar, setAvatar] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [name, setName] = useState(doctor && doctor.name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(doctor && doctor.email);
  const [description, setDescription] = useState(
    doctor && doctor.description ? doctor.description : ""
  );
  const [graduatedFrom, setGraduatedFrom] = useState(
    doctor && doctor.graduatedFrom ? doctor.graduatedFrom : ""
  );
  const [experience, setExperience] = useState(doctor && doctor.experience);
  const [licenseNumber, setLicenseNumber] = useState(
    doctor && doctor.licenseNumber
  );
  const [speciality, setSpeciality] = useState(doctor && doctor.speciality);
  const [startTime, setStartTime] = useState(doctor && doctor.startTime);
  const [endTime, setEndTime] = useState(doctor && doctor.endTime);
  const dispatch = useDispatch();
  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/doctor/update-doctor-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadDoctor());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateDoctorInformation(
        name,
        email,
        password,
        description,
        graduatedFrom,
        experience,
        licenseNumber,
        speciality,
        startTime,
        endTime
      )
    );
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

        <Formik
          initialValues={{
            fullName: name,
            email,
            description,
            graduatedFrom,
            experience,
            speciality,
            licenseNumber,
            startTime,
            endTime,
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <Box
                gap="30px"
                padding="10px"
                margin="10px 5px"
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gridGap="30px"
              >
                <div className="relative grid place-items-center max-h-100px">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : `${backend_url}/${doctor?.avatar}`
                    }
                    alt=""
                    className="avatar-image rounded-full cursor-pointer"
                  />
                  <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImage}
                    />
                    <label htmlFor="image">
                      <AiOutlineCamera />
                    </label>
                  </div>
                </div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Full Name"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  multiline
                  rows={4}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Graduated From"
                  name="graduatedFrom"
                  value={graduatedFrom}
                  onChange={(e) => setGraduatedFrom(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.graduatedFrom && !!errors.graduatedFrom}
                  helperText={touched.graduatedFrom && errors.graduatedFrom}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Experience"
                  name="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.experience && !!errors.experience}
                  helperText={touched.experience && errors.experience}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Speciality"
                  name="speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.speciality && !!errors.speciality}
                  helperText={touched.speciality && errors.speciality}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="License Number"
                  name="licenseNumber"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.licenseNumber && !!errors.licenseNumber}
                  helperText={touched.licenseNumber && errors.licenseNumber}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="Start Time"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.startTime && !!errors.startTime}
                  helperText={touched.startTime && errors.startTime}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="search"
                  label="end Time"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.endTime && !!errors.endTime}
                  helperText={touched.endTime && errors.endTime}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                value="Update"
                style={{ marginTop: "20px" }}
              >
                Update
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};
export default ProfileDoctor;
