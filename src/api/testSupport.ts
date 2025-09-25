import type { Support } from "../pages/Accounts/SupportList/SupportTable";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMjNAZ21haWwuY29tIiwiZXhwIjoxNzY3MzY3NjI1LCJpYXQiOjE3NTg3Mjc2MjUsInVzZXIiOnsiaWQiOjE4LCJuYW1lIjoiUCIsImVtYWlsIjoiaG9hbmdwaHVjMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJET0NUT1IifX0.b4FAUa66CDN4TjIvk_3Bjn5fbDolTLvknRm8pO4AswdHOAMjxjTA49pPO_LH21AR_vw1u_jLlfc2pInKtKzheA`,
  },
};
export const testPostSupportApi =async() => {
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/supports`,
    config
  );
  console.log("🚀 ~ testGetSupportsApi ~ response:", response);
  return response.data;
  
};
export const testPutSupportApi =async(data:Support) => {
    const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/supports`,
    data,
    {
      headers: {
        // "Content-Type": "",
        Authorization:
          `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ3BodWMxMjNAZ21haWwuY29tIiwiZXhwIjoxNzY3MzY3NjI1LCJpYXQiOjE3NTg3Mjc2MjUsInVzZXIiOnsiaWQiOjE4LCJuYW1lIjoiUCIsImVtYWlsIjoiaG9hbmdwaHVjMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJET0NUT1IifX0.b4FAUa66CDN4TjIvk_3Bjn5fbDolTLvknRm8pO4AswdHOAMjxjTA49pPO_LH21AR_vw1u_jLlfc2pInKtKzheA`,
      },
    }
  );
  console.log("🚀 ~ testPutSupportsApi ~ response:", response);
  return response.data;
  
};
export const testGetSupportApi =async() => {
    const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/supports`,
    config
  );
  console.log("🚀 ~ testGetSupportsApi ~ response:", response);
  return response.data;
  
};

export const testDeleteSupportApi =async(id:number) => {
    const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/supports/${id}`,
    config
  );
  console.log("🚀 ~ testDeleteSupportsApi ~ response:", response);
  return response.data;
  
};

