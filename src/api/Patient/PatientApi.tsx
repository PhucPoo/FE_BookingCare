import type { BookingDoctorModel } from "../../pages/BookingDoctor/BookingDoctorModel";
import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const BookingDoctorApi = async (data: BookingDoctorModel) => {
  const res = await customAxiosInstance.post(`${api}/bookings`, data);
  return res.data;
};
