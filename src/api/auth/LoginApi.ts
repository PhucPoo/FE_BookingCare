import customAxiosInstance from "../../utils/configAxios";
import { api } from "../../utils/constant";

export const loginApi = async (data: { userName: string; password: string }) => {
  try {
    console.log('LoginApi - Sending:', data); // Debug
    console.log('LoginApi - URL:', `${api}/auth/login`); // Debug
    
    const res = await customAxiosInstance.post(`${api}/auth/login`, data);
    console.log('LoginApi - Response:', res.data); // Debug
    return res.data;
  } catch (error: any) {
    console.error('LoginApi - Error:', error.response?.data || error.message);
    // Trả về error response thay vì throw
    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
};

export const logoutApi = async (data: Record<string, any>) => {
  try {
    const res = await customAxiosInstance.post(`${api}/auth/logout`, data);
    return res.data;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
};