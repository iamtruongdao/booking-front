import axios from "../axios";
export const postSpecialty = (data) => {
  return axios.post(`api/create-new-specialty`, data);
};
export const getSpecialty = () => {
  return axios.get(`api/get-all-specialty`);
};
export const getSpecialtyById = (id, location) => {
  return axios.get(`api/get-specialty-by-id?id=${id}&location=${location}`);
};
