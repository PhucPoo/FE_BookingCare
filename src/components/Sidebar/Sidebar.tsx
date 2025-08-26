import React, {useState} from 'react';
import { FaChartPie, FaClipboardList, FaCalendarAlt, FaUsers, FaCog, FaChevronUp, FaChevronDown } from 'react-icons/fa';



const Sidebar: React.FC = () => {
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
        <a href="admin-dashboard" className="flex items-center gap-3 hover:text-indigo-600">
          <FaChartPie /> Dashboard
        </a>

        {/* Phần sidebar cho quản lý người dùng */}
         <button
          onClick={toggleUserMenu}
          className="flex items-center justify-between w-full text-left gap-3 hover:text-indigo-600"
        >
          <div className="flex items-center gap-3">
            <FaClipboardList /> Quản lý người dùng
          </div>
          {userMenuOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>

         {userMenuOpen && (
          <div className="ml-6 flex flex-col gap-2 text-sd text-gray-600">
            <a href="#doctor" className="hover:text-indigo-500">Quản lý bác sĩ</a>
            <a href="#support" className="hover:text-indigo-500">Quản lý trợ lý</a>
            <a href="#user" className="hover:text-indigo-500">Quản lý bệnh nhân</a>
          </div>
        )}

        <a href="specialty" className="flex items-center gap-3 hover:text-indigo-600">
          <FaCalendarAlt /> Quản lý chuyên khoa
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-indigo-600">
          <FaUsers /> Quản lý lịch khám
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-indigo-600">
          <FaCog /> Quản lý hóa đơn
        </a>
      </nav>
    </div>
  );
}


export default Sidebar;
