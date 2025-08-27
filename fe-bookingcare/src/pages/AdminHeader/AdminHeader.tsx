import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import "./AdminHeader.css";
const AdminHeader = () => {
  return (
    <>
      <div className="header">
        <div className="header_container">
          <div className="header_item-left">Đây là logo</div>
          <div className="header_item-right">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RxAvatar className="header_icon" />
              Hello Admin
            </div>
            <IoIosNotifications className="header_icon" />
            <CiLogout className="header_icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
