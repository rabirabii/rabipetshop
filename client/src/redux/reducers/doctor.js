import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  doctors: [],
  error: null,
};

export const doctorReducer = createReducer(initialState, {
  LoadDoctorRequest: (state) => {
    state.isLoading = true;
  },
  LoadDoctorSuccess: (state, action) => {
    state.isDoctor = true;
    state.isLoading = false;
    state.doctor = action.payload;
  },
  LoadDoctorError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isDoctor = false;
  },

  // Update Doctor Information
  UpdateDoctorInfoRequest: (state) => {
    state.isLoading = true;
  },
  UpdateDoctorInfoSuccess: (state, action) => {
    state.isLoading = false;
    state.doctor = action.payload;
  },
  UpdateDoctorInfoFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all Doctors for Admin
  getAllDoctorsRequest: (state) => {
    state.isLoading = true;
  },
  getAllDoctorsSuccess: (state, action) => {
    state.isLoading = false;
    state.doctors = action.payload;
  },
  getAllDoctorsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Get all Doctor for all users
  getUserAllDoctorsRequest: (state) => {
    state.isLoading = true;
  },
  getUserAllDoctorsSuccess: (state, action) => {
    state.isLoading = false;
    state.doctors = action.payload;
    state.currentPage = action.payload.currentPage;
    state.totalPages = action.payload.totalPages;
  },
  getUserAllDoctorsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  cleanErrors: (state) => {
    state.error = null;
  },
  // RegisterDoctorRequest: (state) => {
  //   state.isLoading = true;
  // },
  // RegisterDoctorSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.doctor = action.payload;
  //   state.error = null;
  // },
  // RegisterDoctorError: (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },
  // LoginDoctorRequest: (state) => {
  //   state.isLoading = true;
  // },
  // LoginDoctorSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.doctor = action.payload;
  //   state.error = null;
  // },
  // LoginDoctorError: (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },
  // LogoutDoctor: (state) => {
  //   state.doctor = null;
  //   state.isLoading = false;
  //   state.error = null;
  // },
});
