import React from "react";
import { FaChevronDown } from "react-icons/fa";
import SearchBar from "../UI/SearchBar";
import useUserInfoStore from "../../Zustand/configZustand";
import { Popover } from "antd/lib";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const navigate = useNavigate();
  const content = (
    <div className="flex flex-col gap-2.5 cursor-pointer">
      <p
        className="hover:bg-cyan-300 hover:text-amber-50 p-2"
        onClick={() => {
          const role = userInfo.role;
          if (role === "ADMIN") navigate("/admin-dashboard/update");
          else if (role === "DOCTOR") navigate("/doctor-dashboard/update");
          else if (role === "SUPPORT") navigate("/support-dashboard/update");
          else navigate("/update");
        }}
      >
        Cập nhật thông tin
      </p>
      <p
        className="hover:bg-cyan-300 hover:text-amber-50 p-2"
        onClick={async () => {
          await useUserInfoStore.getState().logout();
          toast.success("Đăng xuất thành công");
          navigate("/");
        }}
      >
        Đăng xuất
      </p>
    </div>
  );

  return (
    <header className="w-full h-20 bg-white shadow-sm flex items-center justify-between px-10 ">
      <div className="w-1/3">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90">
          <img
            src={userInfo.avatar}
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
          />
          <Popover content={content} trigger="click">
            <span className="font-medium text-gray-700">{userInfo.name}</span>
          </Popover>
          <FaChevronDown className="text-gray-500 text-sm mt-0.5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
