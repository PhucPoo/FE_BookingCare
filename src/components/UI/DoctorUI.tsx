import "../../public/css/bookingcare2.css"

export default function DoctorUI() {
  return (
    <>
    <section className="doctors">
        <h2>BÁC SĨ TƯ VẤN KHÁM BỆNH QUA VIDEO</h2>
        <div className="doctor-wrapper">
             {/* Mũi tên  */}
            <button className="arrow left">&#10094;</button>

            <div className="doctor-list">
                <div className="doctor-card">
                    <img className="doctor-photo" src="../public//img/doctor1.png" alt="Bác sĩ 1"/>
                    <div className="doctor-rating">
                        <span>Đánh giá: <b>4</b> ⭐</span>
                        <span>Lượt khám: <b>30</b> 👤</span>
                    </div>
                    <h3>BS CKI. Vũ Thị Hà</h3>
                    <p className="pt-4.5">👁 Mắt</p>
                    <p>💰 150.000đ</p>
                    <p>🏥 Bác sĩ Chuyên Khoa</p>
                    <button>Tư vấn ngay</button>
                </div>

                <div className="doctor-card">
                    <img className="doctor-photo" src="../public//img/doctor2.png" alt="Bác sĩ 2"/>
                    <div className="doctor-rating">
                        <span>Đánh giá: <b>4</b> ⭐</span>
                        <span>Lượt khám: <b>40</b> 👤</span>
                    </div>
                    <h3>Ths BS. Lê Hoàng Thiên</h3>
                    <p className="pt-4.5">🫀 Nội tổng quát</p>
                    <p>💰 149.000đ</p>
                    <p>🏥 Bác sĩ Chuyên Khoa</p>
                    <button>Tư vấn ngay</button>
                </div>

                <div className="doctor-card">
                    <img className="doctor-photo" src="../public//img/doctor3.png" alt="Bác sĩ 3"/>
                    <div className="doctor-rating">
                        <span>Đánh giá: <b>4.4</b> ⭐</span>
                        <span>Lượt khám: <b>75</b> 👤</span>
                    </div>
                    <h3>BS CKI. Đỗ Đăng Khoa</h3>
                    <p className="padding-top: 18px;">❤️‍🩹 Tim mạch can thiệp</p>
                    <p>💰 200.000đ</p>
                    <p>🏥 Bác sĩ Chuyên Khoa</p>
                    <button>Tư vấn ngay</button>
                </div>

                <div className="doctor-card">
                    <img className="doctor-photo" src="../public//img/doctor4.png" alt="Bác sĩ 4"/>
                    <div className="doctor-rating">
                        <span>Đánh giá: <b>4.9</b> ⭐</span>
                        <span>Lượt khám: <b>143</b> 👤</span>
                    </div>
                    <h3>BS CKI. Nguyễn Phúc Thiện</h3>
                    <p>🫀 Nội tim mạch</p>
                    <p>💰 0đ - 300.000đ</p>
                    <p>🏥 Bác sĩ Chuyên Khoa</p>
                    <button>Tư vấn ngay</button>
                </div>
            </div>

             {/* Mũi tên  */}
            <button className="arrow right">&#10095;</button>
        </div>

         {/* Xem tất cả  */}
        <div className="see-all">
            <a href="#">Xem tất cả »</a>
        </div>
    </section>

    </>
  );
}
