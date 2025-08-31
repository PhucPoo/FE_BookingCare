import React from "react";
import "./Sidebar2.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";
const Sidebar2 = () => {
  return (
    <>
      <div className="Sidebar-container">
        <h1 className="text-2xl font-bold text-indigo-900 Sidebar-logo">
          <span className="text-indigo-600">b</span>ooking
        </h1>
        <Link to={"statistics"}>
          <div className="drawer_content_box">Thống kê</div>
        </Link>
        <Link to={"service-list"}>
          <div className="drawer_content_box">Danh sách dịch vụ</div>
        </Link>
        <Link to={"bill-manage"}>
          <div className="drawer_content_box">Danh sách hoá đơn</div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar2;
