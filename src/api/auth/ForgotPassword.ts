import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const forgotPassword = async (data) => {
  const res = await customAxiosInstance.get(
    `${api}/auth/forgot-password-send-email?email=${data}`,
    data
  );
  return res.data;
};
export const verifyOtp = async (data) => {
  const res = await customAxiosInstance.post(
    `${api}/auth/forgot-verify-otp`,
    data
  );
  return res.data;
};
