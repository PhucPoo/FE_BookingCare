import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getBillByPatient = async (
  id: number,
  page: number = 1,
  pageSize: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/patient/${id}?page=${page}&size=${pageSize}`
  );
  return res.data;
};
export const createBill = async (data) => {
  const res = await customAxiosInstance.post(`${api}/bill`, data);
  return res.data;
};
// export const supportSearchBill = async (query: string, id: string | number) => {
//   const res = await customAxiosInstance.get(
//     `${api}/bill/clinic${id}/search?${query}`
//   );
//   return res.data;
// };
