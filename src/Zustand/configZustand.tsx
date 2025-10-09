import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginApi, logoutApi } from "../api/auth/LoginApi";
import { toast } from "react-toastify";

type UserInfoStoreState = {
  userInfo: {
    name: string;
    email: string;
    role: string;
    id: number;
<<<<<<< HEAD
    patientId?: number;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    cccd?: string;
=======
    actorId: number;
    actorType: string;
>>>>>>> 8f1ba3998f6b471d49b39bd9c7a0b68b5287eeb5
  };
};

type LoginResponse = {
  userLogin: {
    name: string;
    email: string;
    role: string;
    id: number;
    patientId?: number;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    cccd?: string;
  };
  accessToken: string;
};

type UserInfoStoreActions = {
  loginZustand: (formData: {
    userName: string;
    password: string;
  }) => Promise<LoginResponse | undefined>;
  logout: () => void;
  updateUserInfo: (userData: Partial<UserInfoStoreState['userInfo']>) => void;
};

type UserInfoStore = UserInfoStoreState & UserInfoStoreActions;

const useUserInfoStore = create<UserInfoStore>()(
  devtools(
    persist(
      (set) => ({
<<<<<<< HEAD
        userInfo: { 
          name: "", 
          email: "", 
          role: "", 
          id: 0, 
          patientId: 0,
          phoneNumber: "",
          address: "",
          dateOfBirth: "",
          gender: "",
          cccd: ""
=======
        userInfo: {
          name: "",
          email: "",
          role: "",
          id: 0,
          actorId: 0,
          actorType: "CLIENT",
>>>>>>> 8f1ba3998f6b471d49b39bd9c7a0b68b5287eeb5
        },
        loginZustand: async (data) => {
          try {
            console.log('Sending login data:', data);
            const res = await loginApi(data);
            console.log('API Response:', res);
            
            if (res.statusCode !== 200) {
              toast.error(res.message || "Đăng nhập thất bại");
              return undefined;
            }
            set({ userInfo: res.data.userLogin });
            document.cookie = `access_token=${res.data.accessToken}; path=/`;
            return res.data;
          } catch (error: any) {
            console.error('Login API Error:', error);
            toast.error(error.message || "Có lỗi kết nối đến server");
            return undefined;
          }
        },
        updateUserInfo: (userData) => {
          set((state) => ({
            userInfo: {
              ...state.userInfo,
              ...userData
            }
          }));
        },
        logout: async () => {
<<<<<<< HEAD
          set({ 
            userInfo: { 
              name: "", 
              email: "", 
              role: "", 
              id: 0,
              phoneNumber: "",
              address: "",
              dateOfBirth: "",
              gender: "",
              cccd: ""
            } 
=======
          set({
            userInfo: {
              name: "",
              email: "",
              role: "",
              id: 0,
              actorId: 0,
              actorType: "CLIENT",
            },
>>>>>>> 8f1ba3998f6b471d49b39bd9c7a0b68b5287eeb5
          });
          document.cookie = `access_token=; path=/`;
          window.location.href = "/";
          toast.success("Logout successful");
          const res = await logoutApi({});
          if (res.statusCode !== 200) {
            toast.error(res.message || "Logout failed");
            return;
          }
        },
      }),
      {
        name: "userInfo-storage",
      }
    )
  )
);

export default useUserInfoStore;