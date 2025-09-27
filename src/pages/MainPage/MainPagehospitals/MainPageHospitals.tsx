import { useEffect, useState } from "react";
import hospital1 from "../../../public/img/hospital1.png";

import type { MedicalFacilitiesModel } from "../../DanhSach/MedicalFacility/MedicalFacilitiesModel";
import { getAllMedicalFacility } from "../../../api/Medical/MedicalFacilityApi";
import Slider from "react-slick";
import { Link } from "react-router-dom";
const MainPageHospitals = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [medicalFacilities, setMedicalFacilities] = useState<
    MedicalFacilitiesModel[]
  >([]);
  const handleGetAllMedicalFacility = async () => {
    const res = await getAllMedicalFacility();
    if (!res.error) {
      setMedicalFacilities(res.data.result);
    }
  };
  useEffect(() => {
    handleGetAllMedicalFacility();
  }, []);
  return (
    <div>
      <section className="hospitals">
        <h2>CƠ SỞ Y TẾ ĐẶT KHÁM ĐƯỢC YÊU THÍCH</h2>

        <div style={{ width: "1290px", margin: "40px auto" }}>
          <Slider {...settings}>
            {medicalFacilities &&
              medicalFacilities.length > 0 &&
              medicalFacilities.map((medicalFacility) => {
                return (
                  <div className="hospital-card">
                    <img src={hospital1} alt="Hospital 1" />
                    <h3>{medicalFacility.name}</h3>
                    <p>
                      <span className="location">
                        📍 {medicalFacility.address?.city}
                      </span>
                    </p>
                    <div className="rating">
                      ⭐⭐⭐⭐⭐ <span>(5.0)</span>
                    </div>
                    <button>Đặt khám ngay</button>
                  </div>
                );
              })}
          </Slider>
        </div>
        {/* <!-- Link xem tất cả --> */}
        <div className="see-all">
          <Link to="/danh-sach/co-so-y-te">Xem tất cả »</Link>
        </div>
      </section>
    </div>
  );
};

export default MainPageHospitals;
