import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getBookingByClinicId = async (
  id: number | string,
  page: number = 1,
  size: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/clinic/${id}?page=${page}&size=${size}`
  );
  return res.data;
};
export const getBillByClinicId = async (
  id: number | string,
  page: number,
  size: number
) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/clinic/${id}?page=${page}&size=${size}`
  );
  return res.data;
};

export const supportSortBill = async (query: string, id: string | number) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/clinic/${id}?${query}`
  );
  return res.data;
};
export const supportSortBooking = async (
  id: string,
  sortOrder: string,
  size: number = 5,
  page: number = 1
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings?sort=${id},${sortOrder}&size=${size}&page=${page}`
  );
  return res.data;
};
export const supportSearchBooking = async (
  query: string,
  id: string | number
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/clinic/${id}/search?${query}`
  );
  return res.data;
};
export const supportSearchBill = async (query: string, id: string | number) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/clinic/${id}/search?${query}`
  );
  return res.data;
};
export const getClinicBySupportId = async (id: string | number) => {
  const res = await customAxiosInstance.get(`${api}/supports/${id}/clinic`);
  return res.data;
};
export const handleSupportUpdateBooking = async (
  id: string | number,
  status: string
) => {
  const data = {};
  const res = await customAxiosInstance.put(
    `${api}/bookings/${id}/status?status=${status}`,
    data
  );
  return res.data;
};
