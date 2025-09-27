import type { Specialty } from "../pages/Specialty/SpecialtyList";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMTYxOTk4QGdtYWlsLmNvbSIsImV4cCI6MTc2NzQ0Nzg0MywiaWF0IjoxNzU4ODA3ODQzLCJ1c2VyIjp7ImlkIjoyOCwibmFtZSI6bnVsbCwiZW1haWwiOiJob2FuZ3BodWMxMTYxOTk4QGdtYWlsLmNvbSIsInJvbGUiOiJDTElFTlQifX0.FrU4ZPgtEgWatW9b4n2AjtQMYQOdKhfX9nLZxzBlZ56BniFIJEqSFt_juLPbBSB_RETS7l35a7_r1TJNPc7-gg`,
    "Content-Type": 'multipart/form-data' 
  },
};
export const testPostSpecialtyApi =async(data:Specialty) => {
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/specialties`,
    data,
    config
  );
  console.log("🚀 ~ testGetSpecialtysApi ~ response:", response);
  return response.data;
  
};
export const testPutSpecialtyApi =async() => {
    const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/specialties/{id}`,
    config
  );
  console.log("🚀 ~ testPutSpecialtysApi ~ response:", response);
  return response.data;
  
};
export const testGetSpecialtyApi =async() => {
    const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/specialties`,
    config
  );
  console.log("🚀 ~ testGetSpecialtysApi ~ response:", response);
  return response.data;
  
};

export const testDeleteSpecialtyApi =async() => {
    const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/specialties/{id}`,
    config
  );
  console.log("🚀 ~ testDeleteSpecialtysApi ~ response:", response);
  return response.data;
  
};

