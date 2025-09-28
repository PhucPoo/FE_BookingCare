import { useEffect, useState } from "react";
import { getAllSpecialties } from "../../../api/Specialties/SpecialtiesApi";
import type { SpecialtiesModel } from "../../DanhSach/Specialty/SpeicaltyListModel";
import { Link } from "react-router-dom";

const MainPageSpecialty = () => {
  const [specialties, setSpecialties] = useState<SpecialtiesModel[]>([]);
  const handleGetSpecialties = async () => {
    const result = await getAllSpecialties();
    setSpecialties(result.data.result);
  };
  useEffect(() => {
    handleGetSpecialties();
  }, []);
  return (
    <div>
      <section className="departments">
        <h2>CHUYÊN KHOA</h2>
        <div className="department-list">
          {specialties &&
            specialties.length > 0 &&
            specialties.map((specialty) => {
              return (
                <div className="department" key={specialty.id}>
                  <img src={specialty.image} alt="" />
                  <p>{specialty.name}</p>
                </div>
              );
            })}

          <div
            className="see-all"
            style={{
              gridColumn: "span 8",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Link to="/danh-sach/chuyen-khoa">Xem tất cả »</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageSpecialty;
