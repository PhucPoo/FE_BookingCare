import axios from "axios";

const customAxiosInstance = axios.create();

//thoi gian cho toi da 1 request la 10p
customAxiosInstance.defaults.timeout = 1000 * 60 * 10;

//withCredentials: cho phep axios tu dong gui cookie trong moi request len BE
customAxiosInstance.defaults.withCredentials = true;

// Thêm một bộ đón chặn request
customAxiosInstance.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
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
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    if (error.response?.status === 401) {
      // alert("error 401");
      //401 Unauthorized
      //   axiosReduxStore.dispatch(logoutUserAPI());
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
