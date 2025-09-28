import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getAllSpecialties = async () => {
  const res = await customAxiosInstance.get(`${api}/specialties`);
  return res.data;
};
