import banner1 from "../../../public/img/baner1.png";
import banner2 from "../../../public/img/baner2.png";
import banner3 from "../../../public/img/baner3.png";
import "./MainPartnersSwiper.css";
import Slider from "react-slick";
import { MainPertnersSwiperDataList } from "./MainPartnersSwiperData";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
const MainPartnersSwiper = () => {
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
      <div style={{ width: "1290px", margin: "40px auto" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#0d47a1",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          ĐƯỢC TIN TƯỞNG HỢP TÁC VÀ ĐỒNG HÀNH
        </h2>
        <Slider {...settings}>
          {MainPertnersSwiperDataList.map(({ id, image, title }) => (
            <div key={id}>
              <div
                style={{
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: "8px",
                  margin: "5px",
                  border: "2px solid rgba(181,231,237,1)",
                }}
              >
                <img src={image} />
                <p>{title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* <!-- Swiper --> */}
      <div style={{ width: "1290px", margin: "40px auto" }}>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            <img src={banner1} alt="Banner 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner2} alt="Banner 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner3} alt="Banner 3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainPartnersSwiper;
