import type { createServiceModel } from "../../model/createServiceModel";
import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY2MzYxOTkxLCJpYXQiOjE3NTc3MjE5OTEsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.SdYVso6tBrPhJ1XJE-EpGtBzhCl-SMLHt31SB4Eq1qghDrlmU71TiST7gHQzeQJxPPsvPLQ7yZhwAu9bhQ8W1g`,
  },
};

export const getAllService = async () => {
  const response = await customAxiosInstance.get(`${api}/services`, config);
  return response.data;
};
export const createService = async (data: createServiceModel) => {
  const response = await customAxiosInstance.post(
    `${api}/services`,
    data,
    config
  );
  return response.data;
};
export const updateService = async (data: createServiceModel) => {
  const response = await customAxiosInstance.put(
    `${api}/services`,
    data,
    config
  );
  return response.data;
};
export const deleteService = async (id: number) => {
  const response = await customAxiosInstance.delete(
    `${api}/services/${id}`,
    config
  );
  return response.data;
};
