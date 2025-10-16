import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import useUserInfoStore from "../../../Zustand/configZustand";
import { Button, Popover } from "antd/lib";
import { Divider } from "antd/lib";
import { toast } from "react-toastify";

const MainPageHeader = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const content = (
    <div className="flex flex-col gap-2">
      <Link to="/update">Thông tin cá nhân</Link>
      <Link to="/danh-sach-lich-kham">Danh sách lịch khám</Link>
      <Link to="/danh-sach-hoa-don">Danh sách hoá đơn</Link>
      <Link to="/benh-an">Bệnh án</Link>
      <Link to="/doi-mat-khau">Đổi mật khẩu</Link>
      {userInfo.role === "ADMIN" && (
        <Link to="/admin-dashboard">Dành cho admin</Link>
        
      )}
      {userInfo.role === "DOCTOR" && (
        <Link to="/doctor-dashboard">Dành cho bác sĩ</Link>
      )}
      {userInfo.role === "SUPPORT" && (
        <Link to="/support-dashboard">Dành cho support</Link>
      )}
      <Divider style={{ margin: "5px 0" }}></Divider>
      <Link
        to="/#"
        className="flex items-center gap-3"
        onClick={async () => {
          await useUserInfoStore.getState().logout();
          toast.success("Đăng xuất thành công");
          navigate("/");
        }}
      >
        <IoIosLogOut className="text-xl" />
        Đăng xuất
      </Link>
    </div>
  );
  const contentModal = (
    <div className="flex flex-col gap-2">
      <Link to="/auth/login">Đăng nhập</Link>
      <Link to="/auth/signup">Đăng kí</Link>
    </div>
  );

  return (
    <div>
      <header className="bg-[#eee] text-[#333] shadow-lg">
        {/* Top Section */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div
              className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => {
                navigate("/");
              }}
            >
              Bookingcare
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              {/* Download Button */}
              <Button
                size="middle"
                className="flex items-center gap-2 bg-[#fbc02d] px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Tải ứng dụng
              </Button>

              {/* Account Section */}
              {userInfo.email && userInfo.id ? (
                <div className="relative">
                  <Popover content={content} title="Tài khoản" trigger="click">
                    <Button
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      size="middle"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {userInfo.name}
                    </Button>
                  </Popover>
                </div>
              ) : (
                <Popover content={contentModal}>
                  <Button
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    size="middle"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Tài khoản
                  </Button>
                </Popover>
              )}

              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <img
                  src="https://flagcdn.com/w20/vn.png"
                  alt="VN"
                  className="w-5 h-5"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div
              className="lg:hidden p-2 "
              // onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {userInfo.email && userInfo.id ? (
                <div className="relative">
                  <Popover content={content} title="Tài khoản" trigger="click">
                    <Button
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      size="middle"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {userInfo.name}
                    </Button>
                  </Popover>
                </div>
              ) : (
                <Popover content={contentModal}>
                  <Button
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    size="middle"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Tài khoản
                  </Button>
                </Popover>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-[#67a6dc] ">
          <div className="container mx-auto px-4">
            <nav className="hidden lg:block">
              <ul className="flex items-center justify-between gap-8 py-3 text-[#eee]">
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    Cơ sở y tế
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    Dịch vụ y tế
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    Khám sức khỏe doanh nghiệp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    Hướng dẫn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    Liên hệ hợp tác
                  </a>
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
