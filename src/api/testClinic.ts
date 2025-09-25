import type { Clinic } from "../pages/Clinic/ClinicTable";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMTYxOTk4QGdtYWlsLmNvbSIsImV4cCI6MTc2NzQ0MjYzNCwiaWF0IjoxNzU4ODAyNjM0LCJ1c2VyIjp7ImlkIjoyOCwibmFtZSI6bnVsbCwiZW1haWwiOiJob2FuZ3BodWMxMTYxOTk4QGdtYWlsLmNvbSIsInJvbGUiOiJDTElFTlQifX0.O5yAkF_ivWSapFdWTJ_taN9H4SLZ1PQKQGJ9jBPy7HuMes9zm9lrdt1oyQd-98wKd9urBACZzzwETyFof8ohoA`,
  },
};
export const testPostClinicApi =async(data:Clinic) => {
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/clinics`,
    data,
    config
  );
  console.log("🚀 ~ testGetAccountsApi ~ response:", response);
  return response.data;
};
export const testGetClinicApi =async() => {
    const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/clinics`,
    config
  );
  console.log("🚀 ~ testGetAccountsApi ~ response:", response);
  return response.data;
};
export const testPutClinicApi =async(id:number,data:Clinic) => {
    const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/clinics/${id}`,
    data,
    config
  );
  console.log("🚀 ~ testPutAccountsApi ~ response:", response);
  return response.data;
};


