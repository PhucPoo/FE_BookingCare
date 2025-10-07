import type { CreatePatientDto } from "../pages/Accounts/PatientList/PatientTable";
import type { Patient } from "../pages/Doctors/PatientTable_Doctor";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMjNAZ21haWwuY29tIiwiZXhwIjoxNzY3MzY3NjI1LCJpYXQiOjE3NTg3Mjc2MjUsInVzZXIiOnsiaWQiOjE4LCJuYW1lIjoiUCIsImVtYWlsIjoiaG9hbmdwaHVjMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJET0NUT1IifX0.b4FAUa66CDN4TjIvk_3Bjn5fbDolTLvknRm8pO4AswdHOAMjxjTA49pPO_LH21AR_vw1u_jLlfc2pInKtKzheA`,
  },
};
export const testPostPatientApi =async(data: CreatePatientDto)=> {
  
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/patients`,
    data,
    config
  );
  console.log("🚀 ~ testGetPatientsApi ~ response:", response);
  return response.data;
  
};
export const testPutPatientApi =async(id:number,data: Patient) => {
    const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/patients/${id}`,
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

interface SearchPatientParams {
  name: string;
  address: string;
  phoneNumber: string;
  bhyt: string;
  cccd: string;
}


export const testSearchPatientApi = async (params: SearchPatientParams,page:number, pageSize:number) => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/patients/search?size=${pageSize}&page=${page}`,
    //http:localhost:8080/api/v1/patients/search?name=I'm super admin2222&address=Hà Nội&phoneNumber=08&bhyt=090&cccd=124
    {
      params: {
       name: params.name,
       address: params.address,
       phoneNumber: params.phoneNumber,
       bhyt: params.bhyt,
       cccd: params.cccd,
      },
      ...config,
    }
  );
  console.log("🚀 ~ testSearchDoctorsApi ~ response:", response);
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

