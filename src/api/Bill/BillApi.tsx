import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getBillByPatient = async (id: number) => {
  const res = await customAxiosInstance.get(`${api}/bill/patient/${id}`);
  return res.data;
};
