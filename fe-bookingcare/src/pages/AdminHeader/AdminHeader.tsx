import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { IoAppsSharp } from "react-icons/io5";
import "./AdminHeader.css";
import { message, Popconfirm, type PopconfirmProps } from "antd";

type Props = {
  setOpen: (e: boolean) => void;
};

const AdminHeader = ({ setOpen }: Props) => {
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
    alert("Cút");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      <div className="header">
        <div className="header_container">
          <div className="header_item-left">
            <p className="header_item-left-logo">Đây là logo</p>
            <p className="header_item-left-icon header_icon">
              <IoAppsSharp
                onClick={() => {
                  setOpen(true);
                }}
              />
            </p>
          </div>
          <div className="header_item-right">
            <div className="header_item-right-content">
              <RxAvatar className="header_icon" />
              Hello Admin
            </div>
            <IoIosNotifications className="header_icon" />
            <Popconfirm
              title="Đăng xuất"
              description="Bạn có muốn đăng xuất không?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              <CiLogout className="header_icon" />
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
