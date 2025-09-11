import "../../public/css/hospitals.css"
export default function HealthFacility() {
  return (
    <>
    <section className="hospitals">
        <h2>CƠ SỞ Y TẾ ĐẶT KHÁM ĐƯỢC YÊU THÍCH</h2>

        <div className="hospitals-wrapper">
             {/* <button className="arrow left">&#10094;</button>  */}

            <div className="hospital-list">
                <div className="hospital-card">
                    <img src="../public/img/hospital1.png" alt="Hospital 1"/>
                    <h3>Trung Tâm Nội Soi Tiêu Hoá Doctor Check</h3>
                    <p><span className="location">📍 Quận 10, TP. Hồ Chí Minh</span></p>
                    <div className="rating">
                        ⭐⭐⭐⭐⭐ <span>(5.0)</span>
                    </div>
                    <button>Đặt khám ngay</button>
                </div>

                <div className="hospital-card">
                    <img src="../public/img/hospital2.png" alt="Hospital 2"/>
                    <h3>Bệnh viện Ung bướu Hưng Việt</h3>
                    <p><span className="location">📍 Quận Hai Bà Trưng, Hà Nội</span></p>
                    <div className="rating">
                        ⭐⭐⭐⭐⭐ <span>(5.0)</span>
                    </div>
                    <button>Đặt khám ngay</button>
                </div>

                <div className="hospital-card">
                    <img src="../public/img/hospital3.png" alt="Hospital 3"/>
                    <h3>Phòng khám MedFit - Phòng khám giảm cân</h3>
                    <p><span className="location">📍 Quận 10, TP. Hồ Chí Minh</span></p>
                    <div className="rating">
                        ⭐⭐⭐⭐⭐ <span>(5.0)</span>
                    </div>
                    <button>Đặt khám ngay</button>
                </div>

                <div className="hospital-card">
                    <img src="../public/img/hospital4.png" alt="Hospital 4"/>
                    <h3>Bệnh viện Đại học Y Dược TP.HCM</h3>
                    <p><span className="location">📍 Quận 5, TP. Hồ Chí Minh</span></p>
                    <div className="rating">
                        ⭐⭐⭐⭐☆ <span>(4.7)</span>
                    </div>
                    <button>Đặt khám ngay</button>
                </div>
            </div>
            {/* <button className="arrow right">&#10095;</button> */}
        </div>
         {/* Link xem tất cả  */}
        <div className="see-all">
            <a href="#">Xem tất cả »</a>
        </div>
    </section>
    </>
  );
}
