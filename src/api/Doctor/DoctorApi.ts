import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY3MTcwNjY3LCJpYXQiOjE3NTg1MzA2NjcsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.E2Q-WcuhK5pl6kVDB-J2k9-T9BXvita3Ln2J98wbcB8CqoVHP26SBovoah3JNIzKwnulYO5w3myHYg4RnCwgYQ`,
  },
};
export const getAllDoctors = async () => {
  const res = await customAxiosInstance.get(`${api}/doctors`, config);
  return res.data;
};
export const getDoctorById = async (id: string) => {
  const res = await customAxiosInstance.get(`${api}/doctors/${id}`, config);
  return res.data;
};
export const getAvailableTimeOfDoctor = async (id: string, date: string) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/doctor/${id}/available-times?appointmentDate=${date}`,
    config
  );
  return res.data;
};
export const getBookingsByDoctorId = async (id: string) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/doctor/${id}`,
    config
  );
  return res.data;
};

export const handleDoctorUpdateBooking = async (id: string, status: string) => {
  const res = await customAxiosInstance.put(
    `${api}/bookings/${+id}/status?status=${status}`,
    config
  );
  return res.data;
};
export const doctorSortBooking = async (
  id: string,
  sortValue: string,
  order: string
) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/doctor/${id}?sort=${sortValue},${order}`,
    config
  );
  return res.data;
};
