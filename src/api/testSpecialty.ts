import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMjNAZ21haWwuY29tIiwiZXhwIjoxNzY3MzY3NjI1LCJpYXQiOjE3NTg3Mjc2MjUsInVzZXIiOnsiaWQiOjE4LCJuYW1lIjoiUCIsImVtYWlsIjoiaG9hbmdwaHVjMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJET0NUT1IifX0.b4FAUa66CDN4TjIvk_3Bjn5fbDolTLvknRm8pO4AswdHOAMjxjTA49pPO_LH21AR_vw1u_jLlfc2pInKtKzheA`,
  },
};
export const testPostSpecialtyApi =async() => {
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/specialties`,
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

