import React from "react";
import "./Sidebar2.css";
import { Link } from "react-router-dom";
const Sidebar2 = () => {
  return (
    <>
      <div className="Sidebar-container">
        <Link to={"statistics"}>
          <div className="drawer_content_box">Thống kê</div>
        </Link>

        <Link to={"service-list"}>
          <div className="drawer_content_box">Danh sách dịch vụ</div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar2;
