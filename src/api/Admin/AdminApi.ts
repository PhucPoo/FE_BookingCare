import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const adminGetAllBooking = async (
  page: number = 1,
  size: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings?page=${page}&size=${size}`
  );
  return res.data;
};
export const adminSortBooking = async (
  sortValue: string,
  order: string,
  page: number = 1,
  size: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings?sort=${sortValue},${order}&page=${page}&size=${size}`
  );
  return res.data;
};
export const adminSearchBooking = async (
  query: string,
  page: number = 1,
  size: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/search?${query}&size=${size}&page=${page}`
  );
  return res.data;
};
export const adminGetAllBill = async (page: number = 1, size: number = 3) => {
  const res = await customAxiosInstance.get(
    `${api}/bill?&size=${size}&page=${page}`
  );
  return res.data;
};
export const adminSortBill = async (sortValue: string, order: string) => {
  const res = await customAxiosInstance.get(
    `${api}/bill?sort=${sortValue},${order}`
  );
  return res.data;
};
export const adminSearchBill = async (
  query: string,
  page: number,
  size: number
) => {
  const res = await customAxiosInstance.get(
    `${api}/bill/search?${query}&size=${size}&page=${page}`
  );
  return res.data;
};
export const adminGetStatistic = async (query: string) => {
  const res = await customAxiosInstance.get(`${api}/statistic/price/${query}`);
  return res.data;
};
export const adminSearchClinic = async (
  searchValue: string,
  searchData: string,
  size: number = 3,
  page: number = 1
) => {
  const res = await customAxiosInstance.get(
    `${api}/clinics/search?${searchValue}=${searchData}&size=${size}&page=${page}`
  );
  return res.data;
};
export const adminGetStatisticBooking = async (query: string) => {
  const res = await customAxiosInstance.get(
    `${api}/statistic/bookingSuccess/${query}`
  );
  return res.data;
};
