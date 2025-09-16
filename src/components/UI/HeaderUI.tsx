import "../../public/css/bookingcare.css"

function HeaderUI() {
    return (
        <>
            <header className="header">
                <div className="header-left">
                    <div className="logo">Bookingcare</div>
                </div>

                <div className="header-right">
                    {/* Hàng trên */}
                    <div className="header-top">
                        <div className="social-links">
                            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
                            <a href="#"><i className="fa-brands fa-facebook"></i></a>
                            <a href="#"><i className="fa-brands fa-facebook-messenger"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                        <div className="top-actions">
                            <button className="btn-download">
                                <i className="fa-solid fa-mobile-screen"></i> Tải ứng dụng
                            </button>
                            <button className="btn-account">
                                <i className="fa-solid fa-user"></i> Tài khoản
                            </button>
                            <div className="language">
                                <img src="https://flagcdn.com/w20/vn.png" alt="VN" />
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>

                    {/* Hàng dưới */}
                    <div className="header-bottom">
                        <div className="hotline">
                            <i className="fa-solid fa-headset"></i>
                            <span>Hỗ trợ đặt khám</span>
                            <strong>1900 2115</strong>
                        </div>
                        <nav className="nav-menu">
                            <ul>
                                <li><a href="#">Cơ sở y tế</a></li>
                                <li><a href="#">Dịch vụ y tế</a></li>
                                <li><a href="#">Khám sức khỏe doanh nghiệp</a></li>
                                <li><a href="#">Tin tức</a></li>
                                <li><a href="#">Hướng dẫn</a></li>
                                <li><a href="#">Liên hệ hợp tác</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <div className="marquee">
                <div className="marquee-text">
                    📢 Đặt ngay Trợ Lý Giúp Việc để người thân luôn được chăm sóc khi đi khám bệnh
                </div>
            </div>
        </>

    );
}

export default HeaderUI;
