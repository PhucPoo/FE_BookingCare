import { useEffect, useState } from "react";
import { getAllSpecialties } from "../../api/Specialties/SpecialtiesApi";
import type { SpecialtiesModel } from "../DanhSach/Specialty/SpeicaltyListModel";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";

const MedicalServices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState<SpecialtiesModel[]>([]);
  const handleGetClinicSpecialties = async () => {
    await getAllSpecialties()
      .then((res) => {
        setSpecialties(res.data.result);
      })
      .catch((err) => {
        console.log("🚀 ~ handleGetClinicSpecialties ~ err:", err);
      });
  };
  useEffect(() => {
    window.scroll(0, 0);
    handleGetClinicSpecialties();
  }, []);
  return (
    <div className="container mt-5">
      <Breadcrumb location={location.pathname} />
      <div className="flex flex-wrap gap-3">
        {specialties &&
          specialties.length > 0 &&
          specialties.map((item: SpecialtiesModel) => {
            return (
              <div
                className="rounded-md cursor-pointer"
                key={item.id}
                onClick={() => {
                  navigate(`/dich-vu-y-te/kham-chuyen-khoa/${item.id}`);
                }}
              >
                <img
                  src={item.image}
                  alt="avatar"
                  style={{ width: "284px", height: "144px" }}
                />
                <p className="font-bold text-lg space-y-2">{item.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MedicalServices;
