import axios from "../axios";
export const getTopDoctor = (limit) => {
  return axios.get(`api/get-top-doctor?limit=${limit}`);
};
export const getAllDoctor = () => {
  return axios.get(`api/get-all-doctors`);
};
export const saveDetailDoctor = (data) => {
  return axios.post(`api/save-detail-doctor`, { data });
};
export const getDoctorById = (id) => {
  return axios.get(`api/get-detail-doctor-by-id?id=${id}`);
};
export const getAllScheduleDoctor = () => {
  return axios.get(`api/get-all-schedule-doctor`);
};
export const saveScheduleDoctor = (data) => {
  return axios.post(`api/save-all-schedule-doctor`, { data });
};
export const getScheduleByDoctorId = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
export const getExtraInforByDoctorId = (doctorId) => {
  return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
export const getProfileByDoctorId = (doctorId) => {
  return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
export const getListPatientForDoctorId = (doctorId, date) => {
  return axios.get(
    `api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`
  );
};
export const postRemedy = (data) => {
  return axios.post(`api/post-remedy`, data);
};
