import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";

import "./Dasboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <AdminHeader showDrawer={showDrawer} />
      <Sidebar open={open} setOpen={setOpen} />
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px 0",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
