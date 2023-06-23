import axios from "axios";
import { server } from "../../server";

export const createReservation = (doctorId, name, time) => async (dispatch) => {
  try {
    dispatch({ type: "createReservationRequest" });

    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { userId } = getState().auth;
    const { data } = await axios.post(
      `${server}/reservation/reservation-doctor`,
      { doctorId, userId, name, time }
      //   config
    );

    dispatch({
      type: "createReservationSuccess",
      payload: data.reservation,
    });
  } catch (error) {
    dispatch({
      type: "createReservationFailed",
      payload: error.response.data.error,
    });
  }
};

export const updateReservation =
  (reservationId, name, time) => async (dispatch) => {
    try {
      dispatch({ type: "updateReservationRequest" });

      const { data } = await axios.put(
        `${server}/reservation/update-reservation/${reservationId}`
      );
      dispatch({
        type: "updateReservationSuccess",
        payload: data.reservation,
      });
    } catch (error) {
      dispatch({
        type: "updateReservationFailed",
        payload: error.response.data.error,
      });
    }
  };

// get All Reservation
export const getAllReservation = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllReservationRequest" });

    const { data } = await axios.get(
      `${server}/reservation/getAllReservation/${userId}`
    );

    dispatch({
      type: "getAllReservationSuccess",
      payload: data.reservation,
    });
  } catch (error) {
    dispatch({
      type: "getAllReservationFailed",
      payload: error.response.data.error,
    });
  }
};
// get All Reservation Doctor
export const getAllReservationDoctor = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllReservationDoctorRequest" });

    const { data } = await axios.get(
      `${server}/reservation/getAllReservation-doctor`
    );

    dispatch({
      type: "getAllReservationDoctorSuccess",
      payload: data.reservation,
    });
  } catch (error) {
    dispatch({
      type: "getAllReservationDoctorFailed",
      payload: error.response.data.error,
    });
  }
};
