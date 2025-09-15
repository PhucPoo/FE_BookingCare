import "../../public/css/bookingcare2.css"

export default function HealthCare() {
  return (
    <>
      <section className="healthcare">
        <h2>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h2>

        {/* Tabs */}
        <div className="tabs">
          <button className="active">Sức khỏe</button>
          <button>Xét nghiệm</button>
          <button>Tiêm chủng</button>
        </div>

        <div className="healthcare-wrapper">
          <button className="arrow left">&#10094;</button>

          {/* List */}
          <div className="healthcare-list">
            <div className="health-card">
              <img src="../public/img/service1.png" alt="Khám bệnh dạ dày" />
              <div className="card-content">
                <h3>Đặt khám Bệnh Dạ dày - Đại tràng</h3>
                <p className="hospital">
                  🏥 Trung Tâm Nội Soi Tiêu Hoá Doctor Check
                </p>
                <p className="price">200.000đ</p>
                <button>Đặt khám ngay</button>
              </div>
            </div>

            <div className="health-card">
              <img src="../public/img/service2.png" alt="Khám gan mật" />
              <div className="card-content">
                <h3>Đặt khám Bệnh Tiêu Hoá - Gan Mật</h3>
                <p className="hospital">
                  🏥 Trung Tâm Nội Soi Tiêu Hoá Doctor Check
                </p>
                <p className="price">200.000đ</p>
                <button>Đặt khám ngay</button>
              </div>
            </div>

            <div className="health-card">
              <img src="../public/img/service3.png" alt="Khám mắt" />
              <div className="card-content">
                <h3>Gói khám mắt tổng quát</h3>
                <p
                  className="hospital"
                  style={{ paddingTop: "18px" }}
                >
                  🏥 Trung Tâm Mắt Quốc Tế Phương Đông
                </p>
                <p className="price">300.000đ</p>
                <button>Đặt khám ngay</button>
              </div>
            </div>

            <div className="health-card">
              <img src="../public/img/service4.png" alt="Khám tiểu đường" />
              <div className="card-content">
                <h3>Gói khám tiểu đường</h3>
                <p
                  className="hospital"
                  style={{ paddingTop: "18px" }}
                >
                  🏥 Phòng Khám Đa khoa Quốc Tế Golden Healthcare
                </p>
                <p className="price">720.000đ</p>
                <button>Đặt khám ngay</button>
              </div>
            </div>
          </div>

          {/* Mũi tên */}
          <button className="arrow right">&#10095;</button>
        </div>

        {/* Xem tất cả */}
        <div className="see-all">
          <a href="#">Xem tất cả »</a>
        </div>
      </section>
    </>
  );
}
