import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaClipboardList,
  FaUsers,
  FaMoneyBill,
  FaConciergeBell,
  FaChevronUp,
  FaChevronDown,
  FaCalendar,
} from "react-icons/fa";
import { FaFaceFlushed } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const activeBase = "bg-[#3a3d46] text-indigo-400 font-semibold";
  const normalBase =
    "hover:bg-[#3a3d46] hover:text-indigo-300 text-gray-300";

  const linkClass = (path: string, exact = false) => {
    const isActive = exact
      ? location.pathname === path
      : location.pathname.startsWith(path);

    return `flex items-center gap-3 px-3 py-2 rounded transition ${
      isActive ? activeBase : normalBase
    }`;
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1f2128] text-gray-300 p-5 shadow-lg z-50">
      <h1 className="text-2xl font-bold text-white mb-8">Admin</h1>

      <nav className="flex flex-col gap-6">
        {/* Dashboard: exact match */}
        <Link to="/" className={linkClass("/", true)}>
          <FaChartPie /> Dashboard
        </Link>

        {/* Quản lý người dùng */}
        <div>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
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
            <div className="ml-6 mt-2 flex flex-col gap-2 text-sm text-gray-400">
              <Link to="/admin-dashboard/user-list" className={linkClass("/admin-dashboard/user-list")}>
                Quản lý tài khoản
              </Link>
              <Link to="/admin-dashboard/doctor-list" className={linkClass("/admin-dashboard/doctor-list")}>
                Quản lý bác sĩ
              </Link>
              <Link to="/admin-dashboard/assistant-list" className={linkClass("/admin-dashboard/assistant-list")}>
                Quản lý trợ lý
              </Link>
              <Link to="/admin-dashboard/patient-list" className={linkClass("/admin-dashboard/patient-list")}>
                Quản lý bệnh nhân
              </Link>
            </div>
          )}
        </div>

        <Link to="/admin-dashboard/specialty" className={linkClass("/admin-dashboard/specialty")}>
          <FaCalendar /> Quản lý chuyên khoa
        </Link>

        <Link to="/admin-dashboard/booking-manage" className={linkClass("/admin-dashboard/booking-manage")}>
          <FaUsers /> Quản lý lịch khám
        </Link>

        <Link to="/admin-dashboard/bill-manage" className={linkClass("/admin-dashboard/bill-manage")}>
          <FaMoneyBill /> Quản lý hóa đơn
        </Link>
        
        {/* 
        <Link to="/admin-dashboard/patient_list" className={linkClass("/admin-dashboard/patient_list")}>
          <FaFaceFlushed /> Quản lý bệnh nhân
        </Link> */}

        <Link to="/admin-dashboard/service-list" className={linkClass("/admin-dashboard/service-list")}>
          <FaConciergeBell /> Quản lý dịch vụ
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
