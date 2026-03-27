import "../../public/css/bookingcare.css"

export default function Partners() {
    return (
        <>
            <section className="partners">
                <h2>ĐƯỢC TIN TƯỞNG HỢP TÁC VÀ ĐỒNG HÀNH</h2>
                <div className="partners-wrapper">
                    <button className="arrow left">&#10094;</button>
                    <div className="partners-list">
                        <div className="partner-card">
                            <img src="../public/img/logo1.png" alt="Bệnh viện Nhi đồng" />
                            <p>Bệnh viện Nhi đồng Thành phố Cần Thơ</p>
                        </div>
                        <div className="partner-card">
                            <img src="../public/img/logo2.png" alt="Bệnh viện Singapore" />
                            <p>Bệnh viện đa khoa Singapore</p>
                        </div>
                        <div className="partner-card">
                            <img src="../public/img/logo3.png" alt="Bệnh viện Quận 1" />
                            <p>Bệnh viện Quận 1 - Cơ sở 2</p>
                        </div>
                        <div className="partner-card">
                            <img src="../public/img/logo4.png" alt="Bệnh viện Lao" />
                            <p>Bệnh viện Lao và Bệnh phổi Cần Thơ</p>
                        </div>
                        <div className="partner-card">
                            <img src="../public/img/logo5.png" alt="Bệnh viện Mắt" />
                            <p>Bệnh viện Mắt - Răng Hàm Mặt Cần Thơ</p>
                        </div>
                    </div>
                    <button className="arrow right">&#10095;</button>
                </div>
                <div className="partners-progress">
                    <div className="progress-bar"></div>
                </div>
            </section>

        </>
    );
}
