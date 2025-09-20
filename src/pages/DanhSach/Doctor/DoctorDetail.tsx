import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import {
  getAvailableTimeOfDoctor,
  getDoctorById,
} from "../../../api/Doctor/DoctorApi";
import { getDegree, getNext7Days } from "../../../utils/constant";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import { FaLocationDot } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { Select } from "antd/lib";
import "./Doctor.css";
type DoctorDetailModel = {
  id?: number;
  degree?: string;
  account?: { id?: number; name: string; email: string; address: string };
  image?: string;
};
type availableTime = {
  id?: number;
  start?: string;
  end?: string;
};

const DoctorDetail = () => {
  const location = useLocation();
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [detailDoctor, setDetailDoctor] = useState<DoctorDetailModel>({});
  const [availableTime, setAvailableTime] = useState<availableTime>({});
  const handleGetDetailDoctor = async () => {
    const res = await getDoctorById(id);
    if (!res.error) {
      setDetailDoctor(res.data);
    }
  };

  const handleGetAvailableOfDoctor = async (date: string) => {
    const res = await getAvailableTimeOfDoctor(id, date);

    if (!res.error) {
      setAvailableTime(res.data);
    }
  };
  useEffect(() => {
    handleGetDetailDoctor();
  }, []);

  if (!detailDoctor) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <div className="container">
      <Breadcrumb location={location.pathname} />
      <div className="flex gap-5 mt-5 items-center">
        <img
          src={detailDoctor?.image}
          className="doctor_detail-img rounded-full"
          style={{
            border: "2px solid black",
          }}
        />
        <div>
          <p className="text-2xl font-bold">{`${getDegree(
            detailDoctor?.degree
          )} ${detailDoctor?.account?.name}`}</p>
          <p className="text-sm">{detailDoctor?.account?.email}</p>
          <p className="flex items-center gap-2">
            <FaLocationDot /> {detailDoctor?.account?.address}
          </p>
        </div>
      </div>
      <div className="mt-5 flex w-full">
        <div className="w-1/2">
          <Select
            style={{ width: 190 }}
            allowClear
            options={getNext7Days()}
            placeholder="select it"
            onChange={(e) => handleGetAvailableOfDoctor(e)}
          />
          <div className="mt-5">
            <div className="flex items-center">
              <RiCalendarScheduleFill /> <p>Lịch Khám</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Select
            style={{ width: 190 }}
            allowClear
            options={getNext7Days()}
            placeholder="select it"
            onChange={(e) => handleGetAvailableOfDoctor(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
