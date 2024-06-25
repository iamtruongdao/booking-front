import axios from "../axios";
export const postBookingAppointment = (data) => {
  return axios.post(`api/post-booking-appointment`, data);
};
export const verifyEmail = (data) => {
  return axios.post(`api/verify-email`, data);
};
