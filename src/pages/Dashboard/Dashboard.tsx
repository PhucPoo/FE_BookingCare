import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
   
      {/* Nơi các route con được render */}
      <Outlet />
    </div>
  );
};

export default Dashboard;