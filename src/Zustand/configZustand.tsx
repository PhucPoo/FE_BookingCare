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
    actorId: number;
    actorType: string;
  };
};
type UserInfoStoreActions = {
  loginZustand: (formData: {
    userName: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
};
type UserInfoStore = UserInfoStoreState & UserInfoStoreActions;

const useUserInfoStore = create<UserInfoStore>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          name: "",
          email: "",
          role: "",
          id: 0,
          actorId: 0,
          actorType: "CLIENT",
        },
        loginZustand: async (data) => {
          const res = await loginApi(data);
          if (res.statusCode !== 200) {
            toast.error(res.message || "Login failed");
            return;
          }
          set({ userInfo: res.data.userLogin });
          document.cookie = `access_token=${res.data.accessToken}; path=/`;
          return res.data;
        },
        logout: async () => {
          set({
            userInfo: {
              name: "",
              email: "",
              role: "",
              id: 0,
              actorId: 0,
              actorType: "CLIENT",
            },
          });
          document.cookie = `access_token=; path=/`;
          window.location.href = "/"; // Redirect to home page after logout
          toast.success("Logout successful");
          const res = await logoutApi({});
          if (res.statusCode !== 200) {
            toast.error(res.message || "Logout failed");
            return;
          }
        },
      }),
      {
        name: "userInfo-storage", // key trong localStorage
      }
    )
  )
);
export default useUserInfoStore;
