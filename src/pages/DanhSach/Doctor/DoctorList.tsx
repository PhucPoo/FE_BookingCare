import React, { useEffect, useState } from "react";
import { getAllDoctors } from "../../../api/Doctor/DoctorApi";
const LoadingPage = React.lazy(
  () => import("../../../components/LoadingPage/LoadingPage")
);
import "./Doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { getDegree } from "../../../utils/constant";
type DoctorsModel = {
  id?: number;
  degree?: string;
  account?: {
    id?: number;
    name: string;
    avatar?: string;
  };
};
const DoctorList = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <Breadcrumb location={location.pathname} />
      <p className="text-xl font-bold " style={{ marginTop: "20px" }}>
        Bác sĩ dành cho bạn
      </p>
      <div>
        {doctors &&
          doctors.length > 0 &&
          doctors.map((doctor) => (
            <div
              className="flex gap-5 items-center doctors_item_contain cursor-pointer"
              onClick={() => navigate(`${doctor.id}`)}
            >
              <img src={doctor?.account?.avatar} className="doctors_item-img" />
              <div className="doctors_item-name text-xl">
                {`${getDegree(doctor.degree)} ${doctor?.account?.name}`}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
