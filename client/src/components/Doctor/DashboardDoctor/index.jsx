import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "styles/styles";
import axios from "axios";
import { loadDoctor, updateDoctorInformation } from "redux/actions/doctor";
import { toast } from "react-toastify";
import Header from "../Header";
import { Formik } from "formik";
import { Box, TextField, useTheme } from "@mui/material";
import * as yup from "yup";
import { tokens } from "ColorToken";
import { Update } from "@mui/icons-material";
const Settings = () => {
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
        speciality
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
                <div className="relative">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : `${backend_url}/${doctor.avatar}`
                    }
                    alt=""
                    className="w-[200px] h-[200px] rounded-full cursor-pointer"
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
                  label="Decsription"
                  onBlur={handleBlur}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={!!touched.description && !!errors.description}
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="Graduated From"
                  onBlur={handleBlur}
                  onChange={(e) => setGraduatedFrom(e.target.value)}
                  value={graduatedFrom}
                  name="graduatedFrom"
                  error={!!touched.graduatedFrom && !!errors.graduatedFrom}
                  helperText={!!touched.graduatedFrom && !!errors.graduatedFrom}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="Experience"
                  onBlur={handleBlur}
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  name="experience"
                  error={!!touched.experience && !!errors.experience}
                  helperText={!!touched.experience && !!errors.experience}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="Speciality"
                  onBlur={handleBlur}
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  name="speciality"
                  error={!!touched.speciality && !!errors.speciality}
                  helperText={!!touched.speciality && !!errors.speciality}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  className="w-full 800px:flex block pb-3"
                  variant="filled"
                  type="text"
                  label="License Number"
                  onBlur={handleBlur}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  value={licenseNumber}
                  name="licenseNumber"
                  error={!!touched.licenseNumber && !!errors.licenseNumber}
                  helperText={!!touched.licenseNumber && !!errors.licenseNumber}
                  sx={{ gridColumn: "span 2" }}
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

export default Settings;
