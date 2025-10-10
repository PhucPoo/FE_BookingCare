import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { toast } from "react-toastify";
import useUserInfoStore from "../../Zustand/configZustand";
import { changePasswordApi } from "../../api/auth/ChangePasswordApi";
type displayModel = {
  passwordDisplay: boolean;
  newPasswordDisplay: boolean;
};
const ChangePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [display, setDisplay] = useState<displayModel>({
    passwordDisplay: false,
    newPasswordDisplay: false,
  });

  const handleSubmit = async () => {
    if (password === newPassword) {
      toast.warning("Mật khẩu cũ và mới trùng nhau");
      return;
    }
    await changePasswordApi({ password, newPassword }, userInfo.id)
      .then((res) => {
        toast.success("Đổi mật khẩu thành công, hãy đăng nhập lại");
        setTimeout(() => {
          useUserInfoStore.getState().logout();
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <MainPageHeader />
      <div>
        <div className=" bg-gray-100 flex items-center justify-center p-10">
          <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đổi mật khẩu
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <input
                  type={display.passwordDisplay ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hiển thị mật khẩu
                </label>
                <input
                  type="checkbox"
                  onChange={() => {
                    setDisplay({
                      ...display,
                      passwordDisplay: !display.passwordDisplay,
                    });
                  }}
                  checked={display.passwordDisplay}
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu mới
                </label>
                <input
                  type={display.newPasswordDisplay ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hiển thị mật khẩu mới
                </label>
                <input
                  type="checkbox"
                  onChange={() => {
                    setDisplay({
                      ...display,
                      newPasswordDisplay: !display.newPasswordDisplay,
                    });
                  }}
                  checked={display.newPasswordDisplay}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
