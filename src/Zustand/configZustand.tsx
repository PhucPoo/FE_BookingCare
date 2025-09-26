import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginApi } from "../api/auth/LoginApi";

type UserInfoStoreState = {
  userInfo: { name: string; email: string; role: string; id: number };
};
type UserInfoStoreActions = {
  loginZustand: (formData: {
    userName: string;
    password: string;
  }) => Promise<void>;
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
          console.log("🚀 ~ res:", res);
          set({ userInfo: res.data.userLogin });
          document.cookie = `access_token=${res.data.accessToken}; path=/`;
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
