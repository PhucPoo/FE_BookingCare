import { useEffect, useState } from "react";
import { getAllSpecialties } from "../../../api/Specialties/SpecialtiesApi";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import "./Specialties.css";
type DoctorsModel = {
  id?: number;
  name?: string;
  image?: string;
};

const SpecialtyList = () => {
  const [specialties, setSpecialties] = useState<DoctorsModel[]>([]);
  const handleGetAllDoctors = async () => {
    const res = await getAllSpecialties();
    if (!res.error) {
      setSpecialties(res.data.result);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetAllDoctors();
  }, []);
  if (specialties.length === 0) {
    return (
      <div className="container">
        <LoadingPage></LoadingPage>
      </div>
    );
  }
  return (
    <div className="container">
      <p className="text-xl font-bold " style={{ marginTop: "20px" }}>
        Chuyên khoa dành cho bạn
      </p>
      <div>
        {specialties &&
          specialties.length > 0 &&
          specialties.map((specialty) => (
            <div className="flex gap-5 items-center specialties_item-contain">
              <img src={specialty?.image} className="specialties_item-img" />
              <div className="specialties_item-name text-xl">
                {` ${specialty?.name}`}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialtyList;
