import axios from "axios";
import { server } from "../../server";

// Load Doctor
export const loadDoctor = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadDoctorRequest",
    });
    const { data } = await axios.get(`${server}/doctor/getDoctor`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadDoctorSuccess",
      payload: data.doctor,
    });
  } catch (error) {
    dispatch({
      type: "LoadDoctorError",
      payload: error.response.data.message,
    });
  }
};

// doctor update Information
export const updateDoctorInformation =
  (
    name,
    email,
    password,
    description,
    graduatedFrom,
    experience,
    licenseNumber,
    speciality
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateDoctorInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/doctor/update-doctor-info`,
        {
          name,
          email,
          password,
          description,
          graduatedFrom,
          experience,
          licenseNumber,
          speciality,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "UpdateDoctorInfoSuccess",
        payload: data.doctor,
      });
    } catch (error) {
      dispatch({
        type: "UpdateDoctorInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// Get all doctors for admin
export const getAllDoctors = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDoctorsRequest",
    });

    const { data } = await axios.get(`${server}/doctor/admin-all-doctors`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllDoctorsSuccess",
      payload: data.doctors,
    });
  } catch (error) {
    dispatch({
      type: "getAllDoctorsFailed",
      payload: error.response.data.message,
    });
  }
};

// Get all doctor
export const getUserAllDoctors =
  (page = 1, limit = 5) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getUserAllDoctorsRequest",
      });

      const { data } = await axios.get(`${server}/doctor/get-all-doctors`, {
        params: { page, limit },
        withCredentials: true,
      });

      dispatch({
        type: "getUserAllDoctorsSuccess",
        payload: data.doctors,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      });
    } catch (error) {
      dispatch({
        type: "getUserAllDoctorsFailed",
        payload: error.response.data.message,
      });
    }
  };
