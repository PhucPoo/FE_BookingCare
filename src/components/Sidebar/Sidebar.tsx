import React, { useState } from "react";
import {
  FaChartPie,
  FaClipboardList,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SidebarDashboard: React.FC = () => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1f2128] text-gray-300 p-5 shadow-lg z-50">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-white mb-8">Admin</h1>

      {/* Menu */}
      <nav className="flex flex-col gap-2 text-sm">
        {/* Dashboard */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2 rounded transition 
        ${location.pathname === "/"
              ? "bg-[#3a3d46] text-white"
              : "hover:bg-[#3a3d46] hover:text-white"}`}
        >
          <FaChartPie /> Quản lý Admin
        </Link>

        {/* Quản lý người dùng */}
        <div>
          <button
            onClick={toggleUserMenu}
            className="flex items-center justify-between w-full px-3 py-2 rounded 
                   hover:bg-[#3a3d46] hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <FaClipboardList />
              <span>Quản lý Người dùng</span>
            </div>
            {userMenuOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>

          {userMenuOpen && (
            <div className="ml-8 mt-1 flex flex-col gap-1 text-sm">
               <Link
                to="/admin-dashboard/user-list"
                className={`px-2 py-1 rounded transition
              ${location.pathname === "/admin-dashboard/user-list"
                    ? "bg-[#3a3d46] text-white"
                    : "hover:text-white hover:bg-[#3a3d46]"}`}
              >
                Quản lý tài khoản
              </Link>
              <Link
                to="/admin-dashboard/doctor-list"
                className={`px-2 py-1 rounded transition
              ${location.pathname === "/admin-dashboard/doctor-list"
                    ? "bg-[#3a3d46] text-white"
                    : "hover:text-white hover:bg-[#3a3d46]"}`}
              >
                Quản lý bác sĩ
              </Link>
              <Link
                to="/admin-dashboard/assistant-list"
                className={`px-2 py-1 rounded transition
              ${location.pathname === "/admin-dashboard/assistant-list"
                    ? "bg-[#3a3d46] text-white"
                    : "hover:text-white hover:bg-[#3a3d46]"}`}
              >
                Quản lý trợ lý
              </Link>
              <Link
                to="/admin-dashboard/patient-list"
                className={`px-2 py-1 rounded transition
              ${location.pathname === "/admin-dashboard/patient-list"
                    ? "bg-[#3a3d46] text-white"
                    : "hover:text-white hover:bg-[#3a3d46]"}`}
              >
                Quản lý bệnh nhân
              </Link>
            </div>
          )}
        </div>

        {/* Quản lý chuyên khoa */}
        <Link
          to="/admin-dashboard/specialty"
          className={`flex items-center gap-3 px-3 py-2 rounded transition 
        ${location.pathname === "/admin-dashboard/specialty"
              ? "bg-[#3a3d46] text-white"
              : "hover:bg-[#3a3d46] hover:text-white"}`}
        >
          <FaCalendarAlt /> Quản lý chuyên khoa
        </Link>

        {/* Quản lý lịch khám */}
        <Link
          to="/admin-dashboard/booking-manage"
          className={`flex items-center gap-3 px-3 py-2 rounded transition 
        ${location.pathname === "/admin-dashboard/booking-manage"
              ? "bg-[#3a3d46] text-white"
              : "hover:bg-[#3a3d46] hover:text-white"}`}
        >
          <FaUsers /> Quản lý lịch khám
        </Link>

        {/* Quản lý hóa đơn */}
        <Link
          to="/admin-dashboard/bill-manage"
          className={`flex items-center gap-3 px-3 py-2 rounded transition 
        ${location.pathname === "/admin-dashboard/bill-manage"
              ? "bg-[#3a3d46] text-white"
              : "hover:bg-[#3a3d46] hover:text-white"}`}
        >
          <FaCog /> Quản lý hóa đơn
        </Link>

        {/* Quản lý bệnh nhân */}
        <Link
          to="/admin-dashboard/patient_list"
          className={`flex items-center gap-3 px-3 py-2 rounded transition 
        ${location.pathname === "/admin-dashboard/patient_list"
              ? "bg-[#3a3d46] text-white"
              : "hover:bg-[#3a3d46] hover:text-white"}`}
        >
          <FaUsers /> Quản lý bệnh nhân
        </Link>

        {/* Quản lý dịch vụ */}
        <Link
          to="/admin-dashboard/service-list"
          className={`flex items-center gap-3 px-3 py-2 rounded transition 
        ${location.pathname === "/admin-dashboard/service-list"
              ? "bg-[#3a3d46] text-white"
              : "hover:bg-[#3a3d46] hover:text-white"}`}
        >
          <FaCog /> Quản lý dịch vụ
        </Link>
      </nav>
    </div>


  );
};


export default SidebarDashboard;
