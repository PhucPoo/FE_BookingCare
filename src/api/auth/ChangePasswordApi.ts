import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const changePasswordApi = async (
  data: {
    password: string;
    newPassword: string;
  },
  id: number
) => {
  const res = await customAxiosInstance.put(
    `${api}/auth/reset-password/${id}`,
    data
  );
  return res.data;
};
