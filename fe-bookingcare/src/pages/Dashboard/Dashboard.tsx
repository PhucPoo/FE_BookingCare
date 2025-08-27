import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";

import "./Dasboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <AdminHeader showDrawer={showDrawer} />
      {/* <Sidebar open={open} setOpen={setOpen} /> */}
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "15%",
          }}
        >
          <Sidebar2 />
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px 0",
            width: "85%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
