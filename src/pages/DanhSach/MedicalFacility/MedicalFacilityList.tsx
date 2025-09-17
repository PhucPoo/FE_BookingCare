import React, { useEffect, useState } from "react";
import { getAllMedicalFacility } from "../../../api/Medical/MedicalFacilityApi";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd/lib";
const LoadingPage = React.lazy(
  () => import("../../../components/LoadingPage/LoadingPage")
);
import "./MedicalFacility.css";
type MedicalFacilityModel = {
  id?: number;
  address?: { city?: string; id?: number };
  description?: string;
  image?: string;
  name?: string;
  phoneNumber?: string;
  position?: string;
};
const MedicalFacilityList = () => {
  const [medicalFacilities, setMedicalFacilities] = useState<
    MedicalFacilityModel[]
  >([]);
  const handleGetAllMedicalFacility = async () => {
    const res = await getAllMedicalFacility();
    if (!res.error) {
      setMedicalFacilities(res.data.result);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetAllMedicalFacility();
  }, []);
  if (medicalFacilities.length === 0) {
    return (
      <div className="container">
        <LoadingPage></LoadingPage>
      </div>
    );
  }
  return (
    <div className="container">
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },

          {
            title: "Cơ sở y tế dành cho bạn",
          },
        ]}
        className="breadcrumb_margin"
      />
      <p className="text-xl font-bold " style={{ marginTop: "20px" }}>
        Cơ sở y tế dành cho bạn
      </p>
      <div>
        {medicalFacilities &&
          medicalFacilities.length > 0 &&
          medicalFacilities.map((medicalFacility) => (
            <div className="flex gap-5 medicalFacility_item_contain items-center">
              <img
                src={medicalFacility?.image}
                className="medicalFacility_item-img"
              />
              <div className="medicalFacility_item-name text-xl">
                {medicalFacility.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MedicalFacilityList;
