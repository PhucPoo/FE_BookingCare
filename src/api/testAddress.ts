import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY2MjQ0Mjk2LCJpYXQiOjE3NTc2MDQyOTYsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.4jVMfl3lPq4_40DPHv3s1lQrrx92Khf7D3R4KC0lWNg4wiqSpw1bdkckiGu7kpTAOPc5mOIazKYRUEnI2FPpSQ`,
  },
};
export const testPostAddressApi =async() => {
    const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/address`,
    config
  );
  console.log("🚀 ~ testGetAddressApi ~ response:", response);
  return response.data;
};
export const testGetAddressApi =async() => {
    const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/address`,
    config
  );
  console.log("🚀 ~ testGetAddressApi ~ response:", response);
  return response.data;
};

