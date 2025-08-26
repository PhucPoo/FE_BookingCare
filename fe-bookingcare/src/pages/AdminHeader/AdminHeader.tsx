import { IoAppsSharp } from "react-icons/io5";
import "./AdminHeader.css";
type Props = {
  showDrawer: () => void;
};

const AdminHeader = ({ showDrawer }: Props) => {
  return (
    <>
      <div className="header">
        <div className="header_item">
          <IoAppsSharp
            className="header_icon"
            onClick={() => {
              showDrawer();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
