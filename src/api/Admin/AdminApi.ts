import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY2MzYxOTkxLCJpYXQiOjE3NTc3MjE5OTEsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.SdYVso6tBrPhJ1XJE-EpGtBzhCl-SMLHt31SB4Eq1qghDrlmU71TiST7gHQzeQJxPPsvPLQ7yZhwAu9bhQ8W1g`,
  },
};
export const adminGetAllBooking = async () => {
  const res = await customAxiosInstance.get(`${api}/bookings`, config);
  return res.data;
};
export const adminGetAllBill = async () => {
  const res = await customAxiosInstance.get(`${api}/bill`, config);
  return res.data;
};
