import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicalFacilityDetail } from "../../../api/Medical/MedicalFacilityApi";
import fakeBackground from "../../../public/img/backgroundFake.jpg";
import "./MedicalFacility.css";
import {
  getAvailableTimeOfDoctor,
  searchDoctor,
} from "../../../api/Doctor/DoctorApi";
import type { DoctorSearchModel } from "./DoctorSearchModel";
import { Button, Divider, Pagination, Select } from "antd/lib";
import { getNext7Days } from "../../../utils/constant";
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
  const navigate = useNavigate();
  const [medicalFacilityDetail, setMedicalFacilityDetail] =
    useState<MedicalFacilityDetailModel>({});
  const [listDoctorOfClinic, setListDoctorOfClinic] = useState<
    DoctorSearchModel[]
  >([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalListDoctor, setTotalListDoctor] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [DateSelected, SetDateSelected] = useState<string>("");
  const handleGetMedicalFacilityDetail = async () => {
    const result = await getMedicalFacilityDetail(id);
    if (!result.error) {
      setMedicalFacilityDetail(result.data);
    }
  };
  const handleSearchDoctor = async () => {
    if (id) {
      const result = await searchDoctor("clinicId", id);
      const buildResult = await buildDataListDoctor(result.data.result);
      //check loi: https://chatgpt.com/c/68e241d0-0a38-8321-938e-914e3ebaf4d6
      setListDoctorOfClinic(buildResult);
      setPageSize(result.data.meta.pageSize);
      setTotalListDoctor(result.data.meta.totals);
      setCurrentPage(result.data.meta.page);
    }
  };
  const buildDataListDoctor = async (data: DoctorSearchModel[]) => {
    const newData = await Promise.all(
      data.map(async (item: DoctorSearchModel) => {
        const availableTime = await initialAvailableTime(item.id);
        return { ...item, availableTime };
      })
    );
    return newData;
  };
  const initialAvailableTime = async (doctorId: number) => {
    const res = await getAvailableTimeOfDoctor(
      doctorId.toString(),
      getNext7Days()[0].value
    );
    return res.data;
  };
  const handleGetAvailableOfDoctor = async (doctorId: number, date: string) => {
    const res = await getAvailableTimeOfDoctor(doctorId.toString(), date);
    if (!res.error) {
      const listDoctorOfClinicClone = listDoctorOfClinic;
      const currentItem = listDoctorOfClinicClone.find(
        (item) => item.id === doctorId
      );
      if (currentItem) currentItem.availableTime = res.data;
      setListDoctorOfClinic(listDoctorOfClinicClone);
      SetDateSelected(date);
    }
  };
  const onLog = async (page: number, pageSize: number) => {
    if (id) {
      const result = await searchDoctor("clinicId", id, pageSize, page);
      const buildResult = await buildDataListDoctor(result.data.result);
      setListDoctorOfClinic(buildResult);
      setPageSize(result.data.meta.pageSize);
      setTotalListDoctor(result.data.meta.totals);
      setCurrentPage(result.data.meta.page);
      window.scroll(0, 300);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    handleGetMedicalFacilityDetail();
    handleSearchDoctor();
  }, []);
  return (
    <div>
      <div className="medicalFacilityDetail-background">
        <img src={fakeBackground} />
      </div>
      <div className="container">
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
          </div>
        </div>

        <div className="w-full  flex justify-around p-1 border-2 border-gray-400 shadow-xl/20">
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            <a href="#description"> Giới thiệu</a>
          </p>
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            <a href="#doctor">Bác sĩ</a>
          </p>
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            Địa chỉ
          </p>
          <p className="uppercase cursor-pointer hover:text-yellow-300 hover:font-bold duration-75 hover:underline">
            Thời gian
          </p>
        </div>
      </div>
      <div className="container mt-5">
        <div id="doctor">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Bác sĩ</p>
            <Button>Xem thêm</Button>
          </div>
          <Divider />
          <div className="mt-1">
            {listDoctorOfClinic &&
              listDoctorOfClinic.length > 0 &&
              listDoctorOfClinic.map((doctor) => {
                if (doctor && doctor.isActive) {
                  return (
                    <div
                      className="bg-white w-full shadow-2xl mb-3 doctor-item p-2 flex"
                      key={doctor.id}
                    >
                      {/* content left */}
                      <div className="flex gap-5 content_left w-1/2">
                        <img
                          src={
                            doctor.account.avatar
                              ? doctor?.account?.avatar
                              : "null"
                          }
                          className="doctor-item-img"
                        />

                        <div className="flex gap-2 flex-col">
                          <p className="text-blue-300 font-bold">
                            {doctor.account.name}
                          </p>
                          <p className="text-sm">{doctor.account.address}</p>
                        </div>
                      </div>
                      <Divider
                        type="vertical"
                        size="large"
                        style={{ height: "100px" }}
                      />
                      {/* content right */}
                      <div className="content_right w-1/2">
                        <Select
                          style={{ width: 190 }}
                          defaultValue={getNext7Days()[0].label}
                          options={getNext7Days()}
                          placeholder="Chọn thời gian"
                          onChange={(e) =>
                            handleGetAvailableOfDoctor(doctor.id, e)
                          }
                        />

                        <div className="mt-3 flex gap-3 flex-wrap ">
                          {doctor.availableTime?.length === 0 &&
                            "Hiện bác sĩ hiện không có lịch khám, hãy chọn 1 ngày khác"}
                          {doctor.availableTime &&
                            doctor.availableTime?.length > 1 &&
                            doctor.availableTime.map((item) => {
                              return (
                                <Button
                                  key={item.id}
                                  onClick={() => {
                                    navigate(
                                      `/dat-lich-kham/${doctor.id}?timeStart=${item.start}&timeEnd=${item.end}`,
                                      {
                                        state: {
                                          data: {
                                            appointmentDate: DateSelected
                                              ? DateSelected
                                              : getNext7Days()[0].value,
                                            doctorId: doctor.id,
                                            clinicId: `${doctor.clinic?.id}`,
                                            timeId: item.id,
                                          },
                                        },
                                      }
                                    );
                                  }}
                                >{`${item.start} - ${item.end}`}</Button>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <Pagination
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalListDoctor}
            onChange={onLog}
            pageSizeOptions={["3", "5", "10"]}
            showSizeChanger
            responsive
          />
        </div>
        <div id="description" className="mt-10">
          <p className="text-2xl font-bold text-blue-400">Mô tả</p>
          <p>{medicalFacilityDetail.description}</p>
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
