import type { Doctor } from "../pages/Accounts/DoctorList/DoctorTable";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMjNAZ21haWwuY29tIiwiZXhwIjoxNzY3MzY3ODA1LCJpYXQiOjE3NTg3Mjc4MDUsInVzZXIiOnsiaWQiOjE4LCJuYW1lIjoiUCIsImVtYWlsIjoiaG9hbmdwaHVjMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJET0NUT1IifX0.65_6B-srrNWZ0qlVEhluzCWO8wA42kFVaxI0UM8nJqGJ38MpO3Lr9_Ji8mlxmAVKr2BkhiJkdxEzvUOXTiZI1Q`,
  },
};
export const testPostDoctorApi = async (data: any) => {
  const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/doctors`,
    data,
    config
  );
  console.log("🚀 ~ testPostDoctorApi ~ response:", response);
  return response.data;
};
export const testPutDoctorApi = async (data: Doctor) => {
  const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/doctors`,
    data,
    config
  );
  console.log("🚀 ~ testPutDoctorsApi ~ response:", response);
  return response.data;

};
export const testSortDoctorApi = async (page: number, size: number, sort: string, order: string) => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/doctors?page=1&size=10&sort=${sort},${order}`,

    config
  );
  console.log(">>", response.data);

  return response.data;
};

export const testGetDoctorApi = async (pages: number, pageSize: number,) => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/doctors?page=${pages}&size=${pageSize}`,
    config
  );
  console.log("🚀 ~ testGetDoctorsApi ~ response:", response);
  return response.data;

};
interface SearchDoctorParams {
  name: string;
  phoneNumber?: string;
  min?: number;
  max?: number;
  degree?: string;
  specialtyId?: number;
  clinicId?: number;
  monthYear?: string;
}

export const testSearchDoctorApi = async (params: SearchDoctorParams,pageSize:number,page:number) => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/doctors/search?page=${page}&size=${pageSize}`,
    {
      params: {
        name: params.name,
        phoneNumber: params.phoneNumber,
        "cost.min": params.min,
        "cost.max": params.max,
        degree: params.degree,
        specialtyId: params.specialtyId,
        clinicId: params.clinicId,
        monthYear: params.monthYear,
      },
      ...config,
    }
  );
  console.log("🚀 ~ testSearchDoctorsApi ~ response:", response);
  return response.data;

};

export const testDeleteDoctorApi = async (id: number) => {
  const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/doctors/${id}`,
    config
  );
  console.log("🚀 ~ testDeleteDoctorsApi ~ response:", response);
  return response.data;

};




