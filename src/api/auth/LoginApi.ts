import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const loginApi = async (data) => {
  const res = await customAxiosInstance.post(`${api}/auth/login`, data);
  return res.data;
};
export const logoutApi = async (data) => {
  const res = await customAxiosInstance.post(`${api}/auth/logout`, data);
  return res.data;
};
