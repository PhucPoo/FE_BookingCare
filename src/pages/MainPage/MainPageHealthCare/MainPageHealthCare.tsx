import Slider from "react-slick";
import { MainPageHealthCareData } from "./MainPagehealthCareData";

const MainPageHealthCare = () => {
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
      <section className="healthcare">
        <h2>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h2>

        {/* <!-- Tabs --> */}
        <div className="tabs">
          <button className="active">Sức khỏe</button>
          <button>Xét nghiệm</button>
          <button>Tiêm chủng</button>
        </div>

        {/* <!-- List --> */}
        <div style={{ width: "1290px", margin: "40px auto" }}>
          <Slider {...settings}>
            {MainPageHealthCareData.map((item) => {
              return (
                <div className="health-card" key={item.id}>
                  <img src={item.image} alt="Khám bệnh dạ dày" />
                  <div className="card-content">
                    <h3>{item.title}</h3>
                    <p className="hospital">{item.content}</p>
                    <p className="price">{item.cost}</p>
                    <button>{item.sentence}</button>
                  </div>
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

export default MainPageHealthCare;
