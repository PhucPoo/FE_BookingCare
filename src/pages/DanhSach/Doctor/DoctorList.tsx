import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../api/Doctor/DoctorApi";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import "./Doctor.css";
type DoctorsModel = {
  id?: number;
  degree?: string;
  account?: { id?: number; name: string };
  image?: string;
};
const DoctorList = () => {
  const [doctors, setDoctors] = useState<DoctorsModel[]>([]);
  const handleGetAllDoctors = async () => {
    const res = await getAllDoctors();
    if (!res.error) {
      setDoctors(res.data.result);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetAllDoctors();
  }, []);

  if (doctors.length === 0) {
    return (
      <div className="container">
        <LoadingPage></LoadingPage>
      </div>
    );
  }
  return (
    <div className="container">
      <p className="text-xl font-bold " style={{ marginTop: "20px" }}>
        Bác sĩ dành cho bạn
      </p>
      <div>
        {doctors &&
          doctors.length > 0 &&
          doctors.map((doctor) => (
            <div className="flex gap-5 items-center doctors_item_contain">
              <img src={doctor?.image} className="doctors_item-img" />
              <div className="doctors_item-name text-xl">
                {`${doctor.degree} ${doctor?.account?.name}`}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
