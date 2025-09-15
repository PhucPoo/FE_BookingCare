import Slider from "react-slick";
import { MainPageDoctorsData } from "./MainPageDoctorsData";

const MainPageDoctor = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div>
      <section className="doctors">
        <h2>BÁC SĨ TƯ VẤN KHÁM BỆNH QUA VIDEO</h2>

        <div style={{ width: "1290px", margin: "40px auto" }}>
          <Slider {...settings}>
            {MainPageDoctorsData.map((item) => {
              return (
                <div className="doctor-card" key={item.id}>
                  <img
                    className="doctor-photo"
                    src={item.image}
                    alt="Bác sĩ 1"
                  />
                  <div className="doctor-rating">
                    <span>
                      Đánh giá: <b>{item.rate}</b> ⭐
                    </span>
                    <span>
                      Lượt khám: <b>{item.booked}</b> 👤
                    </span>
                  </div>
                  <h3>{item.name}</h3>
                  <p style={{ paddingTop: "18px" }}>{item.specialty}</p>
                  <p>{item.cost}</p>
                  <p>{item.title}</p>
                  <button>{item.content}</button>
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
