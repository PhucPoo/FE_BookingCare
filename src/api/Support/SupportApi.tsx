import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY3MTcwNjY3LCJpYXQiOjE3NTg1MzA2NjcsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.E2Q-WcuhK5pl6kVDB-J2k9-T9BXvita3Ln2J98wbcB8CqoVHP26SBovoah3JNIzKwnulYO5w3myHYg4RnCwgYQ`,
  },
};
export const getBookingByClinicId = async (id: number) => {
  const res = await customAxiosInstance.get(
    `${api}/bookings/clinic/${id}`,
    config
  );
  return res.data;
};
