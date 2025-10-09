import axios from "axios";
import { toast } from "react-toastify";

const customAxiosInstance = axios.create();

//thoi gian cho toi da 1 request la 10p
customAxiosInstance.defaults.timeout = 1000 * 60 * 10;

//withCredentials: cho phep axios tu dong gui cookie trong moi request len BE
customAxiosInstance.defaults.withCredentials = true;

// Thêm một bộ đón chặn request
customAxiosInstance.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const token = document.cookie.split("=")[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      document.cookie = "";
      delete config.headers.Authorization; // tránh gửi Authorization rỗng
    }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
customAxiosInstance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response

    return response;
  },
  function (error) {
    console.log("🚀 ~ error:", error);
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    
    toast.error(error.response.data.message);
    if (error.response?.status === 401) {
      toast.error("Không thể xác thực, vui lòng đăng nhập lại!");
      //401 Unauthorized
      //   axiosReduxStore.dispatch(logoutUserAPI());
      window.location.href = "auth/login";
    }
    if (error.response?.status === 410) {
      // alert("error 410");
      //410 Gone: token da het han, can phai refresh token
    }
    // const originalRequest = error.config;
    return Promise.reject(error);
  }
);

export default customAxiosInstance;
