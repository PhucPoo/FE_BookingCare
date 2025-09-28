import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getBookingByClinicId = async (id: number) => {
  const res = await customAxiosInstance.get(`${api}/bookings/clinic/${id}`);
  return res.data;
};
