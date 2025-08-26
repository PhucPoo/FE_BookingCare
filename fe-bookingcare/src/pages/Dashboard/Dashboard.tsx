import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import { Avatar, Drawer } from "antd";
import { FaRegUserCircle } from "react-icons/fa";

import "./Dasboard.css";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AdminHeader showDrawer={showDrawer} />

      <Drawer
        title={
          <div className="drawer_title">
            <Avatar size={"large"} icon={<FaRegUserCircle />} />
            <p>haha</p>
          </div>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <div className="drawer_content">
          <Link to={"statistics"}>
            <div className="drawer_content_box">Thống kê</div>
          </Link>

          <Link to={"service-list"}>
            <div className="drawer_content_box">Danh sách dịch vụ</div>
          </Link>
        </div>
      </Drawer>
      <Outlet />
    </>
  );
};

export default Dashboard;
