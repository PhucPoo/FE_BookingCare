import type {  User } from "../pages/Accounts/UserList/UserTable";
import customAxiosInstance from "../utils/configAxios";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY2MjQ0Mjk2LCJpYXQiOjE3NTc2MDQyOTYsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.4jVMfl3lPq4_40DPHv3s1lQrrx92Khf7D3R4KC0lWNg4wiqSpw1bdkckiGu7kpTAOPc5mOIazKYRUEnI2FPpSQ`,
  },
};

// 🟢 Login test
export const testLoginApi = async () => {
  const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/auth/login`,
    {
      userName: "superAdmin01@gmail.com",
      password: "123456",
    }
  );
  console.log("🚀 ~ TestLoginApi ~ response:", response);
  return response.data;
};
export const testSortAccountsApi = async (page: number, size: number,sort:string,order:string) => {
  const response = await customAxiosInstance.get(
   `http://localhost:8080/api/v1/accounts?page=${page}&size=${size}&sort=${sort},${order}`,
  
    config
  );
  console.log(">>", response.data);
  
  return response.data;
};



// 🟢 Get Accounts (có hỗ trợ sort & page)
export const testGetAccountsApi = async () => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/accounts`,
    {
      ...config,
    }
  );
  return response.data;
};

// 🟢 Create User
export const testPostAccountsApi = async (data: User): Promise<User> => {
  const response = await customAxiosInstance.post(
    `http://localhost:8080/api/v1/accounts`,
    data,
    config
  );
  return response.data.data;
};

// 🟢 Update User
export const testPutAccountsApi = async (data: User) => {
  const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/accounts`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data;",
        Authorization:
          `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY2MjQ0Mjk2LCJpYXQiOjE3NTc2MDQyOTYsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6InN1cGVyQWRtaW4wMUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifX0.4jVMfl3lPq4_40DPHv3s1lQrrx92Khf7D3R4KC0lWNg4wiqSpw1bdkckiGu7kpTAOPc5mOIazKYRUEnI2FPpSQ`,
      },
    }
  );
  console.log("🚀 ~ testPutAccountsApi ~ response:", response);
  return response.data;
};

interface SearchUserParams {
  cccd?: string;
  phoneNumber?: string;
  email?: string;
  roleName?: string;
  gender?: string;
  monthYear?: string;
}

export const testSearchAccountApi = async (params: SearchUserParams,pageSize:number,page:number) => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/accounts/search?page=${pageSize}&size=${page}`,
    {
      params: {
        ...params,
      },
      ...config,
    }
  );
  console.log("🚀 ~ testSearchDoctorsApi ~ response:", response);
  return response.data;

};

// 🟢 Delete User
export const testDeleteAccountsApi = async (id: number) => {
  const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/accounts/${id}`
  );
  console.log("🚀 ~ testDeleteAccountsApi ~ response:", response);
  return response.data;
};
