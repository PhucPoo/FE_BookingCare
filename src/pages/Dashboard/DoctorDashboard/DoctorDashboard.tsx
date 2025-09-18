import { Outlet } from "react-router-dom";
import SidebarDashboard from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";

const DoctorDashboard = () => {
  return (
    <>
      <div className="flex">
        <SidebarDashboard />
        <div className="flex-1 ml-64 min-h-screen bg-gray-50">
          {/* Place your main dashboard content here */}
          <Header />
          <div className="p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
