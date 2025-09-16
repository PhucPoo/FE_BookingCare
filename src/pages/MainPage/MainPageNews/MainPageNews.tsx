import new1 from "../../../public/img/new1.png";
import new2 from "../../../public/img/new2.png";
import new3 from "../../../public/img/new3.png";
import new4 from "../../../public/img/new4.png";
import new5 from "../../../public/img/new5.png";

import mobile from "../../../public/img/mobile.png";
import qr1 from "../../../public/img/qr1.png";
import qr2 from "../../../public/img/qr2.png";

const MainPageNews = () => {
  return (
    <div>
      <section className="news">
        <h2>TIN TỨC Y TẾ</h2>
        <div className="news-grid">
          {/* <!-- Card lớn --> */}
          <div className="news-card big">
            <img src={new1} alt="" />
            <div className="news-content">
              <h3>
                Giải pháp Hỗ trợ truyền thông & chuyển đổi số Y tế - bookingcare
                Partner+
              </h3>
              <p className="date">08/09/2025, 10:14</p>
              <p>
                bookingcare Partner+ | Hỗ trợ truyền thông & chuyển đổi số Y tế
                là giải pháp giúp các cơ sở y tế có thêm nhiều cơ hội tiếp cận
                khách hàng tiềm năng mới.
              </p>
            </div>
          </div>

          {/* <!-- Card nhỏ --> */}
          <div className="news-card">
            <img src={new2} alt="" />
            <div className="news-content">
              <h3>Dịch vụ hỗ trợ đưa người lớn tuổi đi khám trọn gói từ A-Z</h3>
              <p className="date">08/09/2025, 01:31</p>
            </div>
          </div>

          <div className="news-card">
            <img src={new3} alt="" />
            <div className="news-content">
              <h3>
                Dịch vụ hỗ trợ đi khám bệnh tại TP.HCM: Giúp việc cá nhân
                Care247
              </h3>
              <p className="date">07/09/2025, 10:47</p>
            </div>
          </div>

          <div className="news-card">
            <img src={new4} alt="" />
            <div className="news-content">
              <h3>Bệnh viêm hô hấp ở trẻ em: dấu hiệu và nguyên nhân</h3>
              <p className="date">30/10/2024, 10:30 - Thanh Ngân</p>
            </div>
          </div>

          <div className="news-card">
            <img src={new5} alt="" />
            <div className="news-content">
              <h3>
                Bướu máu ở trẻ sơ sinh: từ nguyên nhân cho đến cách điều trị
              </h3>
              <p className="date">29/10/2024, 04:23 - Uyên Nhi</p>
            </div>
          </div>
        </div>

        <a href="#" className="see-more">
          Xem tất cả »
        </a>
      </section>

      {/* <!-- HÌNH THỨC HỖ TRỢ --> */}
      <section className="support">
        <div className="support-box">
          {/* <!-- Nội dung ở giữa --> */}
          <div className="support-center">
            <div className="icon-phone">
              <img src={mobile} alt="Phone" />
            </div>
            <div className="support-text">
              <h3>CÁC HÌNH THỨC HỖ TRỢ</h3>
              <p className="hotline">1900-2115</p>
            </div>
          </div>

          {/* <!-- QR bên phải --> */}
          <div className="support-right">
            <div className="qr-card">
              <img src={qr1} alt="Zalo" />
              <p>Zalo</p>
            </div>
            <div className="qr-card">
              <img src={qr2} alt="Facebook" />
              <p>Facebook</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageNews;
