import "../../public/css/bookingcare.css"

export default function HeroSection() {
  return (
    <>
        <section className="hero">
        <div className="hero-content">
            <h1>Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu</h1>

            <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm"/>
                <button><i className="fa fa-search"></i></button>
            </div>

            <ul className="hero-features">
                <li><i className="fa fa-check-circle"></i> Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
                </li>
                <li><i className="fa fa-check-circle"></i> Đặt khám theo giờ - Đặt càng sớm để có số thứ tự thấp nhất</li>
                <li><i className="fa fa-check-circle"></i> Được hoàn tiền khi hủy khám - Có cơ hội nhận ưu đãi hoàn tiền
                </li>
            </ul>
        </div>
    </section>
    </>
  );
}
