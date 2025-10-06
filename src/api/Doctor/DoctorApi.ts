import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getAllDoctors = async () => {
  const res = await customAxiosInstance.get(`${api}/doctors`);
  return res.data;
};
export const getDoctorById = async (id: string) => {
  const res = await customAxiosInstance.get(`${api}/doctors/${id}`);
  return res.data;
};
export const getAvailableTimeOfDoctor = async (id: string, date: string) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/doctor/${id}/available-times?appointmentDate=${date}`
  );
  return res.data;
};
export const getBookingsByDoctorId = async (id: string) => {
  const res = await customAxiosInstance.get(`${api}/bookings/doctor/${id}`);
  return res.data;
};

export const handleDoctorUpdateBooking = async (id: string, status: string) => {
  const data = {};
  const res = await customAxiosInstance.put(
    `${api}/bookings/${id}/status?status=${status}`,
    data
  );
  return res.data;
};
export const doctorSortBooking = async (
  id: string,
  sortValue: string,
  order: string
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/doctor/${id}?sort=${sortValue},${order}`
  );
  return res.data;
};
export const getPatientByDoctorId = async (
  id: number,
  page: string,
  size: string
) => {
  const res = await customAxiosInstance.get(
    `${api}/medicalRecord/doctor/${id}?page=${page},size=${size}`
  );
  return res.data;
};
export const sortPatientByDoctorId = async (
  id: string,
  sortValue: string,
  order: string
) => {
  const res = await customAxiosInstance.get(
    `${api}/medicalRecord/doctor/${id}?sort=${sortValue},${order}`
  );
  return res.data;
};
export const searchDoctor = async (
  searchValue: string,
  searchData: string,
  size: number = 3
) => {
  const res = await customAxiosInstance.get(
    `${api}/doctors/search?${searchValue}=${searchData}&size=${size}`
  );
  return res.data;
};
