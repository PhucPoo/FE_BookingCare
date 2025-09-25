import type { Patient } from "../pages/Doctors/PatientTable_Doctor";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMjNAZ21haWwuY29tIiwiZXhwIjoxNzY3MzY3NjI1LCJpYXQiOjE3NTg3Mjc2MjUsInVzZXIiOnsiaWQiOjE4LCJuYW1lIjoiUCIsImVtYWlsIjoiaG9hbmdwaHVjMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJET0NUT1IifX0.b4FAUa66CDN4TjIvk_3Bjn5fbDolTLvknRm8pO4AswdHOAMjxjTA49pPO_LH21AR_vw1u_jLlfc2pInKtKzheA`,
  },
};
export const testPostPatientApi =async(data: any) => {
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/patients`,
    data,
    config
  );
  console.log("🚀 ~ testGetPatientsApi ~ response:", response);
  return response.data;
  
};
export const testPutPatientApi =async(data: Patient) => {
    const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/patients`,
    data,
    config
  );
  console.log("🚀 ~ testPutPatientsApi ~ response:", response);
  return response.data;
  
};
export const testGetPatientApi =async() => {
    const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/patients`,
    config
  );
  console.log("🚀 ~ testGetPatientsApi ~ response:", response);
  return response.data;
  
};
export const testDeletePatientApi =async() => {
    const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/patients/{id}`,
    config
  );
  console.log("🚀 ~ testDeletePatientsApi ~ response:", response);
  return response.data;
  
};

