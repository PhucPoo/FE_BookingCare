import type { User } from "../pages/Accounts/UserList/UserTable";
import customAxiosInstance from "../utils/configAxios";

export const testGetAccountsApi = async () => {
  const response = await customAxiosInstance.get(
    `http://localhost:8080/api/v1/accounts`
  );
  return response.data;
};
export const testPostAccountsApi = async (data: User) => {
  await customAxiosInstance.post(`http://localhost:8080/api/v1/accounts`, data);
};
export const testPutAccountsApi = async (data: User) => {
  const response = await customAxiosInstance.put(
    `http://localhost:8080/api/v1/accounts`,
    data
  );
  return response.data;
};
export const testDeleteAccountsApi = async (id: number) => {
  const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/accounts/${id}`
  );

  return response.data;
};
export const testSortAccountsApi = async () => {
  const response = await customAxiosInstance.delete(
    `http://localhost:8080/api/v1/accounts/search?sort=name,asc&page=1`
  );

  return response.data;
};
