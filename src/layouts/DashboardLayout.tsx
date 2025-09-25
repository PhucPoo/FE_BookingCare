import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SidebarDashboard from "../components/Sidebar/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex">
      <SidebarDashboard />
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <Header />
        <div className="p-10">
            <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
