// import { FaCheckCircle } from "react-icons/fa";
import { IoSearchSharp, IoVideocamSharp } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse, FaPills, FaBriefcaseMedical } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
const MainSectionServicePage = () => {
  return (
    <div>
      {/* <!-- Marquee --> */}
      <div className="marquee">
        <marquee>
          📢 Đặt ngay Trợ Lý Giúp Việc để người thân luôn được chăm sóc khi đi
          khám bệnh
        </marquee>
      </div>

      {/* <!-- Hero Section --> */}
      <section className="hero">
        <div className="hero-content">
          <h1>Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu</h1>

          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm" />
            <button>
              <IoSearchSharp />
            </button>
          </div>

          <ul className="hero-features">
            <li>
              {/* <FaCheckCircle className="icon" />  */}
              Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
            </li>
            <li>
              {/* <FaCheckCircle className="icon" /> */}
              Đặt khám theo giờ - Đặt càng sớm để có số thứ tự thấp nhất
            </li>
            <li>
              {/* <FaCheckCircle className="icon" />  */}
              Được hoàn tiền khi hủy khám - Có cơ hội nhận ưu đãi hoàn tiền
            </li>
          </ul>
        </div>
      </section>

      {/* <!-- Services --> */}
      <section className="services">
        <div className="service-card">
          <RiCalendarScheduleFill className="service-card-icon" />
          <p>Đặt khám tại cơ sở</p>
        </div>
        <div className="service-card">
          <FaUserDoctor className="service-card-icon" />
          <p>Đặt khám chuyên khoa</p>
        </div>
        <div className="service-card">
          <IoVideocamSharp className="service-card-icon" />
          <p>Gọi video với bác sĩ</p>
        </div>
        <div className="service-card">
          <FaUserNurse className="service-card-icon" />
          <p>Đặt khám theo bác sĩ</p>
        </div>
        <div className="service-card">
          <FaPills className="service-card-icon" />
          <p>
            Mua thuốc tại An Khang <span className="badge discount">-15%</span>
          </p>
        </div>
        <div className="service-card">
          <HiMiniUserGroup className="service-card-icon" />
          <p>
            Giúp việc cá nhân <span className="badge new">Mới</span>
          </p>
        </div>
        <div className="service-card">
          <FaBriefcaseMedical className="service-card-icon" />
          <p>
            Khám doanh nghiệp <span className="badge new">Mới</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default MainSectionServicePage;
