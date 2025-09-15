import React, { useState } from "react";
import {
  FaChartPie,
  FaClipboardList,
  FaCalendarAlt,
  FaUsers,
  FaChevronUp,
  FaChevronDown,
  FaServicestack,
} from "react-icons/fa";
import { FaMoneyBill1, FaFaceFlushed } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SidebarDashboard: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };
  return (
    <div className="w-64 h-screen bg-white shadow-md px-6 py-8 fixed left-0 top-0 flex flex-col">
      <h1 className="text-2xl font-bold text-indigo-900 mb-10">
        <span className="text-indigo-600">b</span>ooking
      </h1>

      <nav className="flex flex-col gap-6 text-gray-700">
        <Link
          to={"/"}
          className="flex items-center gap-3 hover:text-indigo-600"
        >
          <FaChartPie /> Dashboard
        </Link>

        {/* Phần sidebar cho quản lý người dùng */}
        <div>
          <button
            onClick={toggleUserMenu}
            className="flex items-center justify-between w-full text-left gap-3 hover:text-indigo-600"
          >
            <div className="flex items-center gap-3">
              <FaClipboardList />
              <Link to="/admin-dashboard/user-list">Quản lý Người dùng</Link>
            </div>
            {userMenuOpen ? (
              <FaChevronUp size={12} />
            ) : (
              <FaChevronDown size={12} />
            )}
            {userMenuOpen ? (
              <FaChevronUp size={12} />
            ) : (
              <FaChevronDown size={12} />
            )}
          </button>

          {userMenuOpen && (
            <div className="ml-6 mt-2 flex flex-col gap-2 text-sm text-gray-600">
              <Link
                to="/admin-dashboard/doctor-list"
                className="hover:text-indigo-500"
              >
                Quản lý bác sĩ
              </Link>
              <Link
                to="/admin-dashboard/assistant-list"
                className="hover:text-indigo-500"
              >
                Quản lý trợ lý
              </Link>
              <Link
                to="/admin-dashboard/patient-list"
                className="hover:text-indigo-500"
              >
                Quản lý bệnh nhân
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin-dashboard/specialty"
          className="flex items-center gap-3 hover:text-indigo-600"
        >
          <FaCalendarAlt /> Quản lý chuyên khoa
        </Link>
        <Link
          to="/admin-dashboard/booking-manage"
          className="flex items-center gap-3 hover:text-indigo-600"
        >
          <FaUsers /> Quản lý lịch khám
        </Link>
        <Link
          to="/admin-dashboard/bill-manage"
          className="flex items-center gap-3 hover:text-indigo-600"
        >
          <FaMoneyBill1 /> Quản lý hóa đơn
        </Link>

        <Link
          to={"/admin-dashboard/patient_list"}
          className="flex items-center gap-3 hover:text-indigo-600"
        >
          <FaFaceFlushed /> Quản lý bệnh nhân
        </Link>
        <Link
          to={"/admin-dashboard/service-list"}
          className="flex items-center gap-3 hover:text-indigo-600"
        >
          <FaServicestack /> Quản lý dịch vụ
        </Link>
      </nav>
    </div>
  );
};

export default SidebarDashboard;
