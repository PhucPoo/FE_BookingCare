import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Nơi các route con được render */}
      <Outlet />
    </div>
  );
};

export default Dashboard;