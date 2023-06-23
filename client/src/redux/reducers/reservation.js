import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const reservationReducer = createReducer(initialState, {
  // Create Reservsation
  createReservationRequest: (state) => {
    state.isLoading = true;
  },
  createReservationSuccess: (state, action) => {
    state.isLoading = false;
    state.reservation = action.payload;
    state.success = true;
  },
  createReservationFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Update Reservation for user
  updateReservationRequest: (state) => {
    state.isLoading = true;
  },
  updateReservationSuccess: (state, action) => {
    state.isLoading = false;
    state.reservation = action.payload;
    state.success = true;
  },
  updateReservationFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get All Reservation for User
  getAllReservationRequest: (state) => {
    state.isLoading = true;
  },
  getAllReservationSuccess: (state, action) => {
    state.isLoading = false;
    state.reservation = action.payload;
    state.success = true;
  },
  getAllReservationFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
});
