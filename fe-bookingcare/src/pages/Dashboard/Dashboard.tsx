import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import Sidebar2 from "../../components/Sidebar/Sidebar2";

import "./Dasboard.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <AdminHeader setOpen={showDrawer} />
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
          <Sidebar open={open} setOpen={setOpen} />
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px 0",
            width: "100%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
