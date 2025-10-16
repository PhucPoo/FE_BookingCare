import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginApi, logoutApi } from "../api/auth/LoginApi";
import { toast } from "react-toastify";

type UserInfoStoreState = {
  userInfo: {
    avatar: string;
    cccd: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
    name: string;
    email: string;
    role: string;
    id: number;
    actorId: number;
    actorType: string;
    avatar: string;
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
  updateUserInfo: (userData: Partial<UserInfoStoreState["userInfo"]>) => void;
};

type UserInfoStore = UserInfoStoreState & UserInfoStoreActions;

const useUserInfoStore = create<UserInfoStore>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          cccd: "",
          gender: "",
          dateOfBirth: "",
          address: "",
          phoneNumber: "",
          name: "",
          email: "",
          role: "",
          id: 0,
          actorId: 0,
          actorType: "CLIENT",
          avatar: "",
        },

        loginZustand: async (data) => {
          try {
            const res = await loginApi(data);

            if (res.statusCode !== 200) {
              toast.error(res.message || "Đăng nhập thất bại");
              return undefined;
            }
            set({ userInfo: res.data.userLogin });
            document.cookie = `access_token=${res.data.accessToken}; path=/`;
            return res.data;
          } catch (error: any) {
            console.error("Login API Error:", error);
            toast.error(error.message || "Có lỗi kết nối đến server");
            return undefined;
          }
        },
        updateUserInfo: (userData) => {
          set((state) => ({
            userInfo: {
              ...state.userInfo,
              ...userData,
            },
          }));
        },
        logout: async () => {
          const res = await logoutApi({});
          if (res.error) {
            toast.error(res.message || "Logout failed");
            return;
          }
          set({
            userInfo: {
              cccd: "",
              gender: "",
              dateOfBirth: "",
              address: "",
              phoneNumber: "",
              name: "",
              email: "",
              role: "",
              id: 0,
              actorId: 0,
              actorType: "CLIENT",
              avatar: "",
            },
          });
          document.cookie = `access_token=; path=/`;
          return true;
        },
      }),
      {
        name: "userInfo-storage",
      }
    )
  )
);

export default useUserInfoStore;
