import React, { useState } from "react";
import {
  FaChartPie,
  FaClipboardList,
  FaCalendarAlt,
  FaUsers,
  FaChevronUp,
  FaChevronDown,
  FaConciergeBell, // đổi icon
} from "react-icons/fa";
import { FaMoneyBill1, FaFaceFlushed } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SidebarDashboard: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1f2128] text-gray-300 p-5 shadow-lg z-50">
      <h1 className="text-2xl font-bold text-white mb-8">Admin</h1>

      <nav className="flex flex-col gap-6">
        <Link to="/" className="flex items-center gap-3 hover:text-indigo-600">
          <FaChartPie /> Dashboard
        </Link>

        {/* Quản lý người dùng */}
        <div>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center justify-between w-full py-2 rounded 
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
              <Link to="/admin-dashboard/user-list" className="hover:text-indigo-500">
                Quản lý tài khoản
              </Link>
              <Link to="/admin-dashboard/doctor-list" className="hover:text-indigo-500">
                Quản lý bác sĩ
              </Link>
              <Link to="/admin-dashboard/assistant-list" className="hover:text-indigo-500">
                Quản lý trợ lý
              </Link>
              <Link to="/admin-dashboard/patient-list" className="hover:text-indigo-500">
                Quản lý bệnh nhân
              </Link>
            </div>
          )}
        </div>

        <Link to="/admin-dashboard/specialty" className="flex items-center gap-3 hover:text-indigo-600">
          <FaCalendarAlt /> Quản lý chuyên khoa
        </Link>
        <Link to="/admin-dashboard/booking-manage" className="flex items-center gap-3 hover:text-indigo-600">
          <FaUsers /> Quản lý lịch khám
        </Link>
        <Link to="/admin-dashboard/bill-manage" className="flex items-center gap-3 hover:text-indigo-600">
          <FaMoneyBill1 /> Quản lý hóa đơn
        </Link>
        <Link to="/admin-dashboard/patient_list" className="flex items-center gap-3 hover:text-indigo-600">
          <FaFaceFlushed /> Quản lý bệnh nhân
        </Link>
        <Link to="/admin-dashboard/service-list" className="flex items-center gap-3 hover:text-indigo-600">
          <FaConciergeBell /> Quản lý dịch vụ
        </Link>
      </nav>
    </div>
  );
};

export default SidebarDashboard;
