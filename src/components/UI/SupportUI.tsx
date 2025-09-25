import "../../public/css/support.css"

export default function SupportUI() {
  return (
    <>
      <section className="support">
        <div className="support-box">
          {/* Nội dung ở giữa */}
          <div className="support-center">
            <div className="icon-phone">
              <img src="/img/mobile.png" alt="Phone" />
            </div>
            <div className="support-text">
              <h3>CÁC HÌNH THỨC HỖ TRỢ</h3>
              <p className="hotline">1900-2115</p>
            </div>
          </div>

          {/* QR bên phải */}
          <div className="support-right">
            <div className="qr-card">
              <img src="/img/qr1.png" alt="Zalo" />
              <p>Zalo</p>
            </div>
            <div className="qr-card">
              <img src="/img/qr2.png" alt="Facebook" />
              <p>Facebook</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
