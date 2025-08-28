import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import Sidebar2 from "../../components/Sidebar/Sidebar2";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className="flex"
        style={{
          width: "100%",
        }}
      >
        <div className="dashboard_sidebar">
          <Sidebar2 />
          <Sidebar open={open} setOpen={setOpen} />
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            width: "100%",
          }}
        >
          <AdminHeader setOpen={showDrawer} />
          <div className="py-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
