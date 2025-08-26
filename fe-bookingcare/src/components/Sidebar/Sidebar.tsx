import React from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { Avatar, Drawer } from "antd";

type Props = {
  open: boolean;
  setOpen: (e: boolean) => void;
};

const Sidebar = ({ open, setOpen }: Props) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
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
    </>
  );
};

export default Sidebar;
