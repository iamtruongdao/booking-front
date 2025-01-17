import axios from "../axios";
import * as queryString from "query-string";

const adminService = {
  /**
   * Đăng nhập hệ thống
   * {
   *  "username": "string",
   *  "password": "string"
   * }
   */
  login(loginBody) {
    return axios.post(`/user/login`, loginBody);
  },
};

export default adminService;
