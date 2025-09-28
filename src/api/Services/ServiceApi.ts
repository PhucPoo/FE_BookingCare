import type { createServiceModel } from "../../model/createServiceModel";
import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getAllService = async () => {
  const response = await customAxiosInstance.get(`${api}/services`);
  return response.data;
};
export const createService = async (data: createServiceModel) => {
  const response = await customAxiosInstance.post(`${api}/services`, data);
  return response.data;
};
export const updateService = async (data: createServiceModel) => {
  const response = await customAxiosInstance.put(`${api}/services`, data);
  return response.data;
};
export const deleteService = async (id: number) => {
  const response = await customAxiosInstance.delete(`${api}/services/${id}`);
  return response.data;
};
export const getSortService = async (sortValue: string, order: string) => {
  const response = await customAxiosInstance.get(
    `${api}/services?sort=${sortValue},${order}`
  );
  return response.data;
};
