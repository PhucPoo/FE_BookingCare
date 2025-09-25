import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../api/Doctor/DoctorApi";
import type { DoctorListModel } from "../../DanhSach/Doctor/DoctorListModel";
import { useNavigate } from "react-router-dom";

const MainPageDoctor = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const navigate = useNavigate();
  const [Doctors, setDoctors] = useState<DoctorListModel[]>([]);
  const handleGetDoctor = async () => {
    const result = await getAllDoctors();
    for (let i = result.data.result.length - 1; i > 0; i--) {
      // Chọn ngẫu nhiên chỉ số j (từ 0 đến i)
      const j = Math.floor(Math.random() * (i + 1));

      // Hoán đổi phần tử tại vị trí i và j
      [result.data.result[i], result.data.result[j]] = [
        result.data.result[j],
        result.data.result[i],
      ];
    }
    setDoctors(result.data.result);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetDoctor();
  }, []);
  return (
    <div>
      <section className="doctors">
        <h2>BÁC SĨ TƯ VẤN KHÁM BỆNH QUA VIDEO</h2>

        <div style={{ width: "1290px", margin: "40px auto" }}>
          <Slider {...settings}>
            {Doctors.map((item) => {
              return (
                <div className="doctor-card" key={item.id}>
                  <img
                    className="doctor-photo"
                    src={item.account?.avatar}
                    alt="Bác sĩ 1"
                  />
                  <div className="doctor-rating">
                    <span>
                      Đánh giá: <b>5</b> ⭐
                    </span>
                    <span>
                      Lượt khám: <b>30</b> 👤
                    </span>
                  </div>
                  <h3>{item.account?.name}</h3>
                  <p style={{ paddingTop: "18px" }}>{item.clinic?.name}</p>
                  {/* <p>{item.cost}</p> */}
                  <p>Địa chỉ nơi khám: {item.clinic?.address?.city}</p>
                  <button
                    onClick={() => {
                      navigate(`danh-sach/bac-si/${item.id}`);
                    }}
                  >
                    Tư vấn ngay
                  </button>
                </div>
              );
            })}
          </Slider>
        </div>

        {/* <!-- Xem tất cả --> */}
        <div className="see-all">
          <a href="#">Xem tất cả »</a>
        </div>
      </section>
    </div>
  );
};

export default MainPageDoctor;
