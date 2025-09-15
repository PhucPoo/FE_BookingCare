import "../../public/css/bookingcare3.css"

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-info">
            <h2 className="logo">Bookingcare</h2>
            <p className="slogan">Đặt khám nhanh</p>
            <p>
              <strong>Địa chỉ:</strong> 236/29/18 Điện Biên Phủ - Phường 17 -
              Quận Bình Thạnh - TPHCM
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href="https://bookingcare.vn">https://bookingcare.vn</a>
            </p>
            <p>
              <strong>Email:</strong> cskh@bookingcare.vn
            </p>
            <p>
              <strong>Điện thoại:</strong> (028) 710 78098
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Dịch vụ Y tế</h4>
              <ul>
                <li>Đặt khám tại cơ sở</li>
                <li>Đặt khám bác sĩ</li>
                <li>Gói khám sức khỏe</li>
                <li>Điều dưỡng tại nhà</li>
                <li>Xét nghiệm tại nhà</li>
              </ul>
            </div>
            <div>
              <h4>Cơ sở y tế</h4>
              <ul>
                <li>Bệnh viện công</li>
                <li>Bệnh viện tư</li>
                <li>Phòng khám</li>
                <li>Phòng mạch</li>
                <li>Xét nghiệm</li>
                <li>Y tế tại nhà</li>
                <li>Tiêm chủng</li>
              </ul>
            </div>
            <div>
              <h4>Hướng dẫn</h4>
              <ul>
                <li>Cài đặt ứng dụng</li>
                <li>Đặt lịch khám</li>
                <li>Tư vấn qua video</li>
                <li>Quy trình hoàn phí</li>
                <li>Câu hỏi thường gặp</li>
                <li>Quy trình đi khám</li>
              </ul>
            </div>
            <div>
              <h4>Về bookingcare</h4>
              <ul>
                <li>Giới thiệu</li>
                <li>Điều khoản dịch vụ</li>
                <li>Chính sách bảo mật</li>
                <li>Quy định sử dụng</li>
              </ul>
            </div>
            <div>
              <h4>Liên hệ hợp tác</h4>
              <ul>
                <li>Cơ sở y tế</li>
                <li>Phòng mạch</li>
                <li>Doanh nghiệp</li>
                <li>Quảng cáo</li>
                <li>Tuyển dụng</li>
              </ul>
            </div>
            <div>
              <h4>Tin tức</h4>
              <ul>
                <li>Tin dịch vụ</li>
                <li>Tin Y tế</li>
                <li>Y học thường thức</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="store-buttons">
            <img src="/img/appstore.png" alt="App Store" />
            <img src="/img/ggplay.png" alt="Google Play" />
          </div>
          <div>© 2020 - Bản quyền thuộc Công Ty Cổ Phần Ứng Dụng PKH</div>
        </div>
      </footer>
    </>
  );
}
