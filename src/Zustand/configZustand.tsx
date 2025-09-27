import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginApi } from "../api/auth/LoginApi";
import { toast } from "react-toastify";

type UserInfoStoreState = {
  userInfo: { name: string; email: string; role: string; id: number };
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
        userInfo: { name: "", email: "", role: "", id: 0 },
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
        logout: () =>
          set({ userInfo: { name: "", email: "", role: "", id: 0 } }),
      }),
      {
        name: "userInfo-storage", // key trong localStorage
      }
    )
  )
);
export default useUserInfoStore;
