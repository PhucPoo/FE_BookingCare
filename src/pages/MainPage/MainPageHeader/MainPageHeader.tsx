import {
  FaTiktok,
  FaFacebook,
  FaFacebookMessenger,
  FaYoutube,
  FaAngleDown,
  FaUser,
} from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
const MainPageHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <div className="header-left">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Bookingcare
          </div>
        </div>

        <div className="header-right">
          {/* <!-- Hàng trên --> */}
          <div className="header-top">
            <div className="flex gap-3">
              <Link to="#">
                <FaTiktok />
              </Link>
              <Link to="#">
                <FaFacebook />
              </Link>
              <Link to="#">
                <FaFacebookMessenger />
              </Link>
              <Link to="#">
                <FaYoutube />
              </Link>
            </div>
            <div className="top-actions">
              <button className="btn-download flex items-center gap-1.5">
                <MdOutlinePhoneAndroid /> Tải ứng dụng
              </button>
              <button className="btn-account flex items-center gap-1.5">
                <FaUser /> Tài khoản
              </button>
              <div className="language">
                <img src="https://flagcdn.com/w20/vn.png" alt="VN" />
                <FaAngleDown />
              </div>
            </div>
          </div>

          {/* <!-- Hàng dưới --> */}
          <div className="header-bottom">
            <div className="hotline">
              <TfiHeadphoneAlt />
              <span>Hỗ trợ đặt khám</span>
              <strong>1900 2115</strong>
            </div>
            <nav className="nav-menu">
              <ul>
                <li>
                  <a href="#">Cơ sở y tế</a>
                </li>
                <li>
                  <a href="#">Dịch vụ y tế</a>
                </li>
                <li>
                  <a href="#">Khám sức khỏe doanh nghiệp</a>
                </li>
                <li>
                  <a href="#">Tin tức</a>
                </li>
                <li>
                  <a href="#">Hướng dẫn</a>
                </li>
                <li>
                  <a href="#">Liên hệ hợp tác</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainPageHeader;
