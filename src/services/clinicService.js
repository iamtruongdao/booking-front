import axios from "../axios";
export const postClinic = (data) => {
  return axios.post(`api/create-new-clinic`, data);
};
export const getAllClinic = () => {
  return axios.get(`api/get-all-clinic`);
};
export const getClinicById = (id) => {
  return axios.get(`api/get-clinic-by-id?id=${id}`);
};
