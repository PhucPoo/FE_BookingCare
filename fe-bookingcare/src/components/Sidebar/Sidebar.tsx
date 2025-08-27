import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import {
  Avatar,
  Drawer,
  message,
  Popconfirm,
  type PopconfirmProps,
} from "antd";
import "./Sidebar.css";
import { CiLogout } from "react-icons/ci";
type Props = {
  open: boolean;
  setOpen: (e: boolean) => void;
};

const Sidebar = ({ open, setOpen }: Props) => {
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
    alert("Cút");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title={
          <div className="drawer_title">
            <Avatar size={"large"} icon={<FaRegUserCircle />} />
            <p>Hello Admin</p>
            <Popconfirm
              title="Đăng xuất"
              description="Bạn có muốn đăng xuất không?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {" "}
              <CiLogout className="header_icon" style={{ color: "black" }} />
            </Popconfirm>
          </div>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <div className="drawer_content">
          <Link to={"statistics"} onClick={() => onClose()}>
            <div className="drawer_content_box">Thống kê</div>
          </Link>

          <Link to={"service-list"} onClick={() => onClose()}>
            <div className="drawer_content_box">Danh sách dịch vụ</div>
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
