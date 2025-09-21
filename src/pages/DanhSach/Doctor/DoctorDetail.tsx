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
import { FaRegHandPointUp } from "react-icons/fa";
import { Button, Select } from "antd/lib";
import "./Doctor.css";
type DoctorDetailModel = {
  id?: number;
  degree?: string;
  account?: { id?: number; name: string; email: string; address: string };
  image?: string;
  description?: string;
  cost?: number;
  clinic?: {
    id?: number;
    name?: string;
    address?: {
      id?: number;
      city?: string;
    };
  };
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
  const [availableTime, setAvailableTime] = useState<availableTime[]>([]);
  const [openInsurance, setOpenInsurance] = useState<boolean>(false);
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
    <div>
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
            <p className="text-sm">{detailDoctor?.description}</p>
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
              <div className="flex items-center gap-2">
                <RiCalendarScheduleFill /> <p>Lịch Khám</p>
              </div>
              <div className="mt-3 flex gap-3 flex-wrap">
                {availableTime?.length === 0 &&
                  "Hiện bác sĩ không có lịch khám"}
                {availableTime?.length > 1 &&
                  availableTime.map((item) => (
                    <Button>{`${item.start} - ${item.start}`}</Button>
                  ))}
              </div>
              <p className="flex mt-2 text-sm gap-1">
                Chọn <FaRegHandPointUp />
                và đặt (Phí đặt lịch 0đ)
              </p>
            </div>
          </div>
          <div className="w-1/2 p-5 border-l-1">
            <h1 className="uppercase">địa chỉ khám</h1>
            <p className="text-blue-400">{detailDoctor.clinic?.name}</p>
            <p className="border-b-1 pb-2">
              {detailDoctor.clinic?.address?.city}
            </p>
            <div className="py-2 border-b-1 flex items-baseline gap-3">
              <p className="uppercase ">giá khám: {detailDoctor.cost} vnđ</p>
              <p className="text-sm text-blue-400 cursor-pointer">
                Xem chi tiết
              </p>
            </div>
            <div className="pt-2  flex items-baseline gap-3">
              <div className="uppercase ">LOẠI BẢO HIỂM ÁP DỤNG.</div>
              {!openInsurance && (
                <p
                  className="text-sm text-blue-400 cursor-pointer"
                  onClick={() => setOpenInsurance(true)}
                >
                  Xem chi tiết
                </p>
              )}
            </div>
            {openInsurance && (
              <div>
                <div
                  className="border p-1 bg-gray-200"
                  style={{
                    borderBottomColor: "transparent",
                  }}
                >
                  <p>Bảo hiểm Y tế nhà nước</p>
                  <p className="text-xs">
                    Áp dụng cho bệnh nhân đăng ký khám chữa bệnh ban đầu tại
                    bệnh viện hoặc có giấy chuyển viện từ đơn vị khác
                  </p>
                </div>
                <div className="border p-1 bg-gray-200">
                  <p>Bảo hiểm bảo lãnh trực tiếp</p>
                  <p className="text-xs">
                    Đối với các bảo hiểm không bảo lãnh trực tiếp: Bệnh viện hỗ
                    trợ xuất hóa đơn tài chính (hoá đơn đỏ) và hỗ trợ bệnh nhân
                    hoàn thiện hồ sơ
                  </p>
                </div>
                <p
                  className="text-base text-blue-400 cursor-pointer pt-2"
                  onClick={() => setOpenInsurance(false)}
                >
                  Thu gọn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className=" mt-5 border-t-1 border-b-1 py-5"
        style={{ backgroundColor: "#f9f9f9", borderColor: "#cccccc" }}
      >
        <div className="container">{detailDoctor.description}</div>
      </div>
    </div>
  );
};

export default DoctorDetail;
