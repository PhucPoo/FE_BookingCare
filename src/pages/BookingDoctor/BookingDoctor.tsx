import React, { useEffect, useState } from "react";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import { getDoctorById } from "../../api/Doctor/DoctorApi";
import { FaLocationDot } from "react-icons/fa6";
import type { DoctorDetailModel } from "../DanhSach/Doctor/DoctorDetailModel";
import { GrSchedule } from "react-icons/gr";
import { FaHouseMedical } from "react-icons/fa6";
import { getDegree } from "../../utils/constant";
import { Button, Divider } from "antd/lib";
import Footer from "../../components/Footer/Footer";
import { BookingDoctorApi } from "../../api/Patient/PatientApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const BookingDoctor = () => {
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const locationJS = useLocation();
  console.log("🚀 ~ BookingDoctor ~ location:", locationJS);

  const params = new URL(document.location.toString()).searchParams;
  const timeStart = params.get("timeStart");
  const timeEnd = params.get("timeEnd");
  const navigate = useNavigate();
  const [detailDoctor, setDetailDoctor] = useState<DoctorDetailModel>({});
  const [description, setDescription] = useState<string>("");
  const handleGetDetailDoctor = async () => {
    const res = await getDoctorById(id);
    if (!res.error) {
      setDetailDoctor(res.data);
    }
  };
  const handleBookingDoctor = async () => {
    if (!description) {
      toast.error("Điền lí do khám");
    }
    if (
      locationJS.state.data.appointmentDate &&
      description &&
      id &&
      detailDoctor.clinic?.id &&
      locationJS.state.data.timeId
    ) {
      const data = {
        appointmentDate: locationJS.state.data.appointmentDate,
        description,
        doctorId: id,
        patientId: "5",
        clinicId: `${detailDoctor.clinic?.id}`,
        timeId: locationJS.state.data.timeId,
      };
      await BookingDoctorApi(data);
      toast.success("Đặt lịch thành công");
      navigate("/");
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    handleGetDetailDoctor();
  }, []);
  return (
    <div>
      <MainPageHeader />
      <div style={{ backgroundColor: "#f6f6f6" }} className="py-3">
        <div className="container ">
          <div className="flex gap-10 items-center justify-center">
            <img
              src={detailDoctor?.account?.avatar}
              className="doctor_detail-img rounded-full"
              style={{
                border: "2px solid black",
              }}
            />
            <div>
              <p className="text-2xl font-bold">Đặt lịch khám</p>
              <p className="text-xl font-bold text-blue-400">{`${getDegree(
                detailDoctor?.degree
              )} ${detailDoctor?.account?.name}`}</p>
              <p className="text-sm">{detailDoctor?.description}</p>
              <p className="flex items-center gap-2">
                <FaLocationDot /> {detailDoctor?.account?.address}
              </p>
              <div className="flex items-center gap-2">
                <GrSchedule />{" "}
                <p className="text-amber-300">{`${timeStart}-${timeEnd}-${locationJS.state.data.appointmentDate}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaHouseMedical />
                {detailDoctor.clinic?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 ">
        <div className="py-3 flex flex-col items-center">
          <div
            style={{
              width: "200px",
              height: "60px",
              borderRadius: "5px",
              boxShadow: "0 2px 3px 0 rgba(0,0,0,.15)",
              backgroundColor: "#fff",
              border: "1px solid #eee",
            }}
            className="cursor-pointer flex items-center justify-center"
          >
            Giá khám: {detailDoctor.cost} vnđ
          </div>
          <input
            type="text"
            placeholder="Lí do khám..."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full md:w-1/2 my-4 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div
            className="my-4 p-3 w-full md:w-1/2 rounded-sm"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <div className="flex justify-between">
              <div>
                <p>Giá khám </p>
                <p>Phí đặt lịch</p>
              </div>
              <div>
                <p>{detailDoctor.cost}vnđ</p>
                <p>Miễn phí </p>
              </div>
            </div>
            <Divider></Divider>
            <div className="flex justify-between">
              <div>Tổng cộng</div>
              <div className="text-red-500">{detailDoctor.cost}vnđ</div>
            </div>
          </div>

          <div className="flex text-xs" style={{ color: "#666" }}>
            Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm
            thủ tục khám
          </div>

          <div
            className="my-4 p-3 w-full md:w-1/2 rounded-sm"
            style={{ backgroundColor: "#D4EFFC" }}
          >
            <b className="uppercase">Lưu ý</b>
            <p>
              Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh,
              khi điền thông tin anh/chị vui lòng:
            </p>
            <ul style={{ listStyleType: "disc", margin: "10px 0px 10px 25px" }}>
              <li>
                Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ:{" "}
                <b>Trần Văn Phú</b>
              </li>
              <li>
                Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi
                ấn "Xác nhận"
              </li>
            </ul>
          </div>

          <Button
            style={{ width: "50%" }}
            type="primary"
            onClick={() => {
              handleBookingDoctor();
            }}
          >
            Xác nhận đặt khám
          </Button>
          <div className="flex text-sm mt-3" style={{ color: "#666" }}>
            Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với
            <p className="text-cyan-300 mx-0.5 cursor-pointer">
              Điều khoản sử dụng dịch vụ
            </p>
            của chúng tôi.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDoctor;
