import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getBookingByClinicId = async (id: number) => {
  const res = await customAxiosInstance.get(`${api}/bookings/clinic/${id}`);
  return res.data;
};
export const getBillByClinicId = async (
  id: number,
  page: number,
  size: number
) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/clinic/${id}?page=${page}&size=${size}`
  );
  return res.data;
};
export const supportSearchBill = async (
  value: string,
  key: string,
  size: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/search?${key}=${value}&size=${size}`
  );
  return res.data;
};
export const supportSortBill = async (
  id: string,
  sortOrder: string,
  size: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bill?sort=${id},${sortOrder}&size=${size}`
  );
  return res.data;
};
