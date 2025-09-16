import ck1 from "../../../public/img/img_specialty/ck1.png";
import ck2 from "../../../public/img/img_specialty/ck2.png";
import ck3 from "../../../public/img/img_specialty/ck3.png";
import ck4 from "../../../public/img/img_specialty/ck4.png";
import ck5 from "../../../public/img/img_specialty/ck5.png";
import ck6 from "../../../public/img/img_specialty/ck6.png";
import ck7 from "../../../public/img/img_specialty/ck7.png";
import ck8 from "../../../public/img/img_specialty/ck8.png";
import ck9 from "../../../public/img/img_specialty/ck9.png";
import ck10 from "../../../public/img/img_specialty/ck10.png";
import ck11 from "../../../public/img/img_specialty/ck11.png";
import ck12 from "../../../public/img/img_specialty/ck12.png";
import ck13 from "../../../public/img/img_specialty/ck13.png";
import ck14 from "../../../public/img/img_specialty/ck14.png";
import ck15 from "../../../public/img/img_specialty/ck15.png";
import ck16 from "../../../public/img/img_specialty/ck16.png";
// import ck1 from "../../../public/img/img_specialty/ck1.png";

const MainPageSpecialty = () => {
  return (
    <div>
      <section className="departments">
        <h2>CHUYÊN KHOA</h2>
        <div className="department-list">
          <div className="department">
            <img src={ck1} alt="" />
            <p>Bác sĩ Gia Đình</p>
          </div>
          <div className="department">
            <img src={ck2} alt="" />
            <p>Tiêu Hóa Gan Mật</p>
          </div>
          <div className="department">
            <img src={ck3} alt="" />
            <p>Nội Tổng Quát</p>
          </div>
          <div className="department">
            <img src={ck4} alt="" />
            <p>Nội Tiết</p>
          </div>
          <div className="department">
            <img src={ck5} alt="" />
            <p>Da liễu</p>
          </div>
          <div className="department">
            <img src={ck6} alt="" />
            <p>Nội Tim Mạch</p>
          </div>
          <div className="department">
            <img src={ck7} alt="" />
            <p>Nội Thần Kinh</p>
          </div>
          <div className="department">
            <img src={ck8} alt="" />
            <p>Nội Cơ Xương Khớp</p>
          </div>
          <div className="department">
            <img src={ck9} alt="" />
            <p>Tai Mũi</p>
          </div>
          <div className="department">
            <img src={ck10} alt="" />
            <p>Mắt</p>
          </div>
          <div className="department">
            <img src={ck11} alt="" />
            <p>Nội Tiêu</p>
          </div>
          <div className="department">
            <img src={ck12} alt="" />
            <p>Nội Truyền</p>
          </div>
          <div className="department">
            <img src={ck13} alt="" />
            <p>Nội Hô Hấp</p>
          </div>
          <div className="department">
            <img src={ck14} alt="" />
            <p>Nội Tiết</p>
          </div>
          <div className="department">
            <img src={ck15} alt="" />
            <p>Ngoại Cơ</p>
          </div>
          <div className="department">
            <img src={ck16} alt="" />
            <p>Sản - Phụ Khoa</p>
          </div>
          <div
            className="see-all"
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <a href="#">Xem tất cả »</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageSpecialty;
