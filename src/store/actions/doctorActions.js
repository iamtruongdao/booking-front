import { getAllClinic, getSpecialty } from "../../services";
import {
  getTopDoctor,
  getAllDoctor,
  saveDetailDoctor,
  getAllScheduleDoctor,
} from "../../services/doctorService";
import { getAllcodeService } from "../../services/userService";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export const fetchTopDoctor = (limit) => {
  return async (dispatch, getState) => {
    try {
      let data = await getTopDoctor(limit);

      if (data && data.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(data.data));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let data = await getAllDoctor();

      if (data && data.errCode === 0) {
        dispatch(fetchDoctorSuccess(data.data));
      } else {
        dispatch(fetchDoctorFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  data,
});
export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});
export const fetchDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_DOCTOR_SUCCESS,
  data,
});
export const fetchDoctorFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_FAILED,
});
export const saveDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);

      if (res && res.errCode === 0) {
        toast.success("save doctor success");
        dispatch(saveDoctorSuccess());
      } else {
        toast.error("save doctor error");
        dispatch(saveDoctorFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const saveDoctorSuccess = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
  data,
});
export const saveDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});
export const getAllScheduleDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllScheduleDoctor();

      if (res && res.errCode === 0) {
        dispatch(getAllScheduleDoctorSuccess(res.data));
      } else {
        dispatch(getAllScheduleDoctorFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllScheduleDoctorSuccess = (data) => ({
  type: actionTypes.GET_ALL_SCHEDULE_DOCTOR_SUCCESS,
  data,
});
export const getAllScheduleDoctorFailed = () => ({
  type: actionTypes.GET_ALL_SCHEDULE_DOCTOR_FAILED,
});

export const getAllDoctorInforStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllcodeService("PRICE");
      let resProvince = await getAllcodeService("PROVINCE");
      let resPayment = await getAllcodeService("PAYMENT");
      let resSpecialty = await getSpecialty();
      let resClinic = await getAllClinic();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resProvince: resProvince.data,
          resPayment: resPayment.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(getAllDoctorInforSuccess(data));
      } else {
        dispatch(getAllScheduleDoctorFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllDoctorInforSuccess = (data) => ({
  type: actionTypes.GET_ALL_DOCTOR_INFOR_SUCCESS,
  data,
});
export const getAllDoctorInforFailed = () => ({
  type: actionTypes.GET_ALL_DOCTOR_INFOR_FAILED,
});
