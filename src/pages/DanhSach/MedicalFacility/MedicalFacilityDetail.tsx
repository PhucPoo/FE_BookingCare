import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedicalFacilityDetail } from "../../../api/Medical/MedicalFacilityApi";
import fakeBackground from "../../../public/img/backgroundFake.jpg";
import "./MedicalFacility.css";
type MedicalFacilityDetailModel = {
  id?: number;
  address?: { city?: string; id?: number };
  description?: string;
  image?: string;
  name?: string;
  phoneNumber?: string;
  position?: string;
};

const MedicalFacilityDetail = () => {
  const { id } = useParams();
  const [medicalFacilityDetail, setMedicalFacilityDetail] =
    useState<MedicalFacilityDetailModel>({});
  const handleGetMedicalFacilityDetail = async () => {
    const result = await getMedicalFacilityDetail(id);
    console.log("🚀 ~ handleGetMedicalFacilityDetail ~ result:", result);
    if (!result.error) {
      setMedicalFacilityDetail(result.data);
    }
  };
  useEffect(() => {
    handleGetMedicalFacilityDetail();
  }, []);
  return (
    <div>
      <div className="medicalFacilityDetail-background">
        <img src={fakeBackground} />
      </div>
      <div className="container ">
        <div
          className="medicalFacilityDetail-content flex gap-5 items-center  border-2 border-gray-300"
          style={{ borderBottomColor: "transparent" }}
        >
          <img
            src={medicalFacilityDetail?.image}
            className="medicalFacilityDetail-img"
          />
          <div className="medicalFacilityDetail-name ">
            <h1 className="text-2xl font-bold">{medicalFacilityDetail.name}</h1>
            <p>{medicalFacilityDetail.description}</p>
          </div>
        </div>

        <div className="w-full  flex justify-around p-1 border-2 border-gray-400 shadow-xl/20">
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            Giới thiệu
          </p>
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            Bác sĩ
          </p>
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            Địa chỉ
          </p>
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            Thời gian
          </p>
        </div>
      </div>
      <div className="booking_now fixed bottom-0 left-0 right-0 flex items-center justify-center bg-white">
        <div className="container">
          <div className="booking_now-btn text-center font-bold cursor-pointer">
            <p>Đặt khám ngay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacilityDetail;
