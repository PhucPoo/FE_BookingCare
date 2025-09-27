import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const adminGetAllBooking = async () => {
  const res = await customAxiosInstance.get(`${api}/bookings`);
  return res.data;
};
export const adminSortBooking = async (sortValue: string, order: string) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings?sort=${sortValue},${order}`
  );
  return res.data;
};
export const adminGetAllBill = async () => {
  const res = await customAxiosInstance.get(`${api}/bill`);
  return res.data;
};
export const adminSortBill = async (sortValue: string, order: string) => {
  const res = await customAxiosInstance.get(
    `${api}/bill?sort=${sortValue},${order}`
  );
  return res.data;
};
