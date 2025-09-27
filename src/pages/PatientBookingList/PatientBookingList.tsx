import React, { useEffect, useState } from "react";
import { getPatientBookingByPatientId } from "../../api/Patient/PatientApi";
import useUserInfoStore from "../../Zustand/configZustand";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";

type Props = {};

const PatientBookingList = () => {
  const [PatientBookings, setPatientBookings] = useState([]);
  const userInfor = useUserInfoStore((state) => state.userInfo);
  const handlePatientBookings = async () => {
    const res = await getPatientBookingByPatientId(userInfor.id);
    console.log("🚀 ~ handlePatientBookings ~ res:", res);
  };
  useEffect(() => {
    handlePatientBookings();
  }, []);
  return (
    <div>
      <MainPageHeader />
    </div>
  );
};

export default PatientBookingList;
