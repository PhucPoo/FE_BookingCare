import type { Specialty } from "../pages/Specialty/SpecialtyTable";
import customAxiosInstance from "../utils/configAxios";
import dayjs from "dayjs";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMTYxOTk4QGdtYWlsLmNvbSIsImV4cCI6MTc2NzQ0Nzg0MywiaWF0IjoxNzU4ODA3ODQzLCJ1c2VyIjp7ImlkIjoyOCwibmFtZSI6bnVsbCwiZW1haWwiOiJob2FuZ3BodWMxMTYxOTk4QGdtYWlsLmNvbSIsInJvbGUiOiJDTElFTlQifX0.FrU4ZPgtEgWatW9b4n2AjtQMYQOdKhfX9nLZxzBlZ56BniFIJEqSFt_juLPbBSB_RETS7l35a7_r1TJNPc7-gg`,
  },
};
export const testPostClinicSpecialtyApi = async (payload:any) => {
  const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/clinicSpecialties`,
    payload,
    config
  );
  console.log("🚀 ~ testGetSpecialtysApi ~ response:", response);
  return response.data;

};
export const testPutSpecialtyApi = async (id: number, formData: FormData) => {
  const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/specialties/${id}`,
    formData,
    config
  );
  console.log("🚀 ~ testPutSpecialtysApi ~ response:", response);
  return response.data;

};



export const testGetSpecialtyOFClinicApi = async (id:number) => {
 
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/clinicSpecialties/specialty/${id}`,
       config
    
  );
  console.log("🚀 ~ testGetSpecialtysApi ~ response:", response);
  return response.data;

};
export const testGetClinicOFSpecialtyApi = async (id:number) => {
 
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/clinicSpecialties/clinic/${id}`,
    
       config
    
  );
  console.log("🚀 ~ testGetSpecialtysApi ~ response:", response);
  return response.data;

};


export const testGetSpecialtyApi = async () => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/specialties`,
    config
  );
  console.log("🚀 ~ testGetSpecialtysApi ~ response:", response);
  return response.data;

};

export const testDeleteSpecialtyOfClinicApi = async (clinicId:number,specialtyId:number) => {
  const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/clinicSpecialties/delete`,{
      params:{
        clinicId,
        specialtyId,
        config
      }

    }
    // http://localhost:8080/api/v1/clinicSpecialties/delete?clinicId=1&specialtyId=3
    
   
  );
  console.log("🚀 ~ testDeleteSpecialtysApi ~ response:", response);
  return response.data;

};



