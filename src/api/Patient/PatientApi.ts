import customAxiosInstance from "../../utils/configAxios";
import type { BookingDoctorModel } from "../../pages/BookingDoctor/BookingDoctorModel";
import { api } from "../../utils/constant";

export const BookingDoctorApi = async (data: BookingDoctorModel) => {
  const res = await customAxiosInstance.post(`${api}/bookings`, data);
  return res.data;
};
export const getPatientBookingByPatientId = async (
  id: number,
  page: number = 1,
  pageSize: number = 5
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/patient/${id}?page=${page}&size=${pageSize}`
  );
  return res.data;
};
export const handlePatientUpdateBooking = async (
  id: number,
  status: string
) => {
  const data = {};
  const res = await customAxiosInstance.put(
    `${api}/bookings/${id}/status?status=${status}`,
    data
  );
  return res.data;
};
export const searchPatient = async (query: string) => {
  const res = await customAxiosInstance.get(`${api}/patients/search?${query}`);
  return res.data;
};
export const PatientFeedback = async (data) => {
  const res = await customAxiosInstance.post(`${api}/feedbacks`, data);
  return res.data;
};
