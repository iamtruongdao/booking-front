import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  listUsers: [],
  topDoctors: [],
  listDoctors: [],
  listSchedule: [],
  listDoctorsInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
      };
    case actionTypes.GET_ALL_USER_SUCCESS:
      state = { ...state };
      state.listUsers = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_USER_FAILED:
      state.listUsers = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SUCCESS:
      state.listDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_FAILED:
      state.listDoctors = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALL_SCHEDULE_DOCTOR_SUCCESS:
      state.listSchedule = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_INFOR_FAILED:
      state.listDoctorsInfor = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_INFOR_SUCCESS:
      state.listDoctorsInfor = action.data;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
