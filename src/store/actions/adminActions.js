import logger from "redux-logger";
import {
  getAllcodeService,
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../../services/userService";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
// export const fetGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
export const fetGenderStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllcodeService("gender");
    if (res?.data) {
      dispatch(fetGenderSuccess(res.data));
    } else {
      dispatch(fetGenderFailed(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(fetGenderFailed());
  }
};
export const fetPositionStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllcodeService("position");
    if (res?.data) {
      dispatch(fetPositionSuccess(res.data));
    } else {
      dispatch(fetPositionFailed(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(fetPositionFailed());
  }
};
export const fetRoleStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllcodeService("role");
    if (res?.data) {
      dispatch(fetRoleSuccess(res.data));
    } else {
      dispatch(fetRoleFailed(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(fetRoleFailed());
  }
};
export const fetGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data,
});
export const fetGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetPositionSuccess = (data) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data,
});
export const fetPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetRoleSuccess = (data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data,
});
export const fetRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
export const createUserSuccess = (data) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data,
});
export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
export const createNewUserStart = (data) => async (dispatch, getState) => {
  try {
    const res = await createNewUser(data);
    if (res && res.errCode === 0) {
      toast.success("Create new user success!");
      dispatch(createUserSuccess(res));
      dispatch(getAllUserStart());
    } else {
      toast.error("Create user error!");

      dispatch(createUserFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(createUserFailed());
  }
};
export const getAllUserStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllUsers("ALL");
    if (res && res.errCode === 0) {
      dispatch(getAllUserSuccess(res.user.reverse()));
    } else {
      dispatch(getAllUserFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(createUserFailed());
  }
};
export const getAllUserSuccess = (data) => ({
  type: actionTypes.GET_ALL_USER_SUCCESS,
  data,
});
export const getAllUserFailed = () => ({
  type: actionTypes.GET_ALL_USER_FAILED,
});
export const deleteUserStart = (id) => async (dispatch, getState) => {
  try {
    const res = await deleteUser(id);
    if (res && res.errCode === 0) {
      toast.success("Delete user success!");
      dispatch(deleteUserSuccess(res));
      dispatch(getAllUserStart());
    } else {
      toast.error("Delete user error!");

      dispatch(deleteUserFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(deleteUserFailed());
  }
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
export const editUserStart = (user) => async (dispatch, getState) => {
  try {
    const res = await updateUser(user);
    if (res && res.errCode === 0) {
      toast.success("Edit user success!");
      dispatch(editUserSuccess());
      dispatch(getAllUserStart());
    } else {
      toast.error("Edit user error!");
      dispatch(editUserFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(editUserFailed());
  }
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
