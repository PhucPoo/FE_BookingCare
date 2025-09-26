import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const loginApi = async (data) => {
  const res = await customAxiosInstance.post(`${api}/auth/login`, data);
  return res.data;
};
