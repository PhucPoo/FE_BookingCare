import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaClipboardList,
  FaUsers,
  FaConciergeBell,
  FaChevronUp,
  FaChevronDown,
  FaCalendarAlt,
  FaHospital,
} from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import useUserInfoStore from "../../Zustand/configZustand";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const activeBase = "bg-[#3a3d46] text-indigo-400 font-semibold";
  const normalBase = "hover:bg-[#3a3d46] hover:text-indigo-300 text-gray-300";

  const linkClass = (path: string, exact = false, isChild = false) => {
    const isActive = exact
      ? location.pathname === path
      : location.pathname.startsWith(path);

    const size = isChild ? "text-sm pl-10" : "text-base";

    return `flex items-center gap-3 px-3 py-2 rounded transition ${size} ${
      isActive ? activeBase : normalBase
    }`;
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1f2128] text-gray-300 p-5 shadow-lg z-50">
      <h1 className="text-2xl font-bold text-white mb-8">Admin</h1>

      <nav className="flex flex-col gap-2">
        <Link
          to="/admin-dashboard"
          className={linkClass("/admin-dashboard", true)}
        >
          <FaChartPie /> Thống kê
        </Link>

        {/* Quản lý người dùng */}
        <div>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center justify-between w-full px-3 py-2 rounded text-base 
                       hover:bg-[#3a3d46] hover:text-indigo-300 text-gray-300 transition"
          >
            <div className="flex items-center gap-3">
              <FaClipboardList />
              <span>Quản lý Người dùng</span>
            </div>
            {userMenuOpen ? (
              <FaChevronUp size={12} />
            ) : (
              <FaChevronDown size={12} />
            )}
          </button>

          {userMenuOpen && (
            <div className="mt-1 flex flex-col">
              <Link
                to="/admin-dashboard/user-list"
                className={linkClass("/admin-dashboard/user-list", true, true)}
              >
                Quản lý tài khoản
              </Link>
              <Link
                to="/admin-dashboard/doctor-list"
                className={linkClass(
                  "/admin-dashboard/doctor-list",
                  true,
                  true
                )}
              >
                Quản lý bác sĩ
              </Link>
              <Link
                to="/admin-dashboard/assistant-list"
                className={linkClass(
                  "/admin-dashboard/assistant-list",
                  true,
                  true
                )}
              >
                Quản lý trợ lý
              </Link>
              <Link
                to="/admin-dashboard/patient-list"
                className={linkClass(
                  "/admin-dashboard/patient-list",
                  true,
                  true
                )}
              >
                Quản lý bệnh nhân
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin-dashboard/specialty"
          className={linkClass("/admin-dashboard/specialty", true)}
        >
          <FaCalendarAlt /> Quản lý chuyên khoa
        </Link>
        <Link
          to="/admin-dashboard/clinic-page"
          className={linkClass("/admin-dashboard/clinic-page", true)}
        >
          <FaHospital /> Quản lý phòng khám
        </Link>

        <Link
          to="/admin-dashboard/booking-manage"
          className={linkClass("/admin-dashboard/booking-manage", true)}
        >
          <FaUsers /> Quản lý lịch khám
        </Link>

        <Link
          to="/admin-dashboard/bill-manage"
          className={linkClass("/admin-dashboard/bill-manage", true)}
        >
          <FaMoneyBill1 /> Quản lý hóa đơn
        </Link>

        <Link
          to="/admin-dashboard/service-list"
          className={linkClass("/admin-dashboard/service-list", true)}
        >
          <FaConciergeBell /> Quản lý dịch vụ
        </Link>
        {(userInfo.role === "ADMIN" || userInfo.role === "DOCTOR") && (
          <Link
            to="/doctor-dashboard/booking-manage"
            className="flex items-center gap-3 hover:text-indigo-600"
          >
            <FaConciergeBell /> Quản lý lịch khám (của bác sĩ)
          </Link>
        )}
        {(userInfo.role === "ADMIN" || userInfo.role === "DOCTOR") && (
          <Link
            to="/doctor-dashboard/patient-manage"
            className="flex items-center gap-3 hover:text-indigo-600"
          >
            <FaConciergeBell /> Quản lý bệnh nhân (của bác sĩ)
          </Link>
        )}
        {(userInfo.role === "ADMIN" || userInfo.role === "SUPPORT") && (
          <Link
            to="/support-dashboard/booking-support-manage"
            className="flex items-center gap-3 hover:text-indigo-600"
          >
            <FaConciergeBell /> Quản lý lịch khám (của support)
          </Link>
        )}
        {(userInfo.role === "ADMIN" || userInfo.role === "SUPPORT") && (
          <Link
            to="/support-dashboard/bill-support-manage"
            className="flex items-center gap-3 hover:text-indigo-600"
          >
            <FaConciergeBell /> Quản lý hoá đơn (của support)
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
