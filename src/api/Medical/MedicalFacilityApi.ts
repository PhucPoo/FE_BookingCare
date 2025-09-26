import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const getAllMedicalFacility = async () => {
  const response = await customAxiosInstance.get(`${api}/clinics`);
  return response.data;
};
export const getMedicalFacilityDetail = async (id: string | undefined) => {
  const response = await customAxiosInstance.get(`${api}/clinics/${id}`);
  return response.data;
};
