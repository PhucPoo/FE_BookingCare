import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  getAvailableTimeOfDoctor,
  searchDoctor,
} from "../../../api/Doctor/DoctorApi";
import type { DoctorSearchModel } from "../MedicalFacility/DoctorSearchModel";
import { Button, Divider, Pagination, Select } from "antd/lib";
import { getNext7Days } from "../../../utils/constant";
import { getAllSpecialties } from "../../../api/Specialties/SpecialtiesApi";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
type MedicalFacilityDetailModel = {
  id?: number;
  address?: { city?: string; id?: number };
  description?: string;
  image?: string;
  name?: string;
  phoneNumber?: string;
  position?: string;
};

const SpecialtyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [specialtyDetail, setSpecialtyDetail] =
    useState<MedicalFacilityDetailModel>({});
  const [listDoctorOfSpecialty, setListDoctorOfSpecialty] = useState<
    DoctorSearchModel[]
  >([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalListDoctor, setTotalListDoctor] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [DateSelected, SetDateSelected] = useState<string>("");
  const handleGetSpecialty = async () => {
    const result = await getAllSpecialties();
    if (!result.error) {
      let specialtyDetailClone = result.data;

      specialtyDetailClone = result.data.result.find(
        (item: MedicalFacilityDetailModel) => {
          if (id && item?.id) {
            return item.id === +id;
          }
        }
      );

      setSpecialtyDetail(specialtyDetailClone);
      setPageSize(result.data.meta.pageSize);
      setTotalListDoctor(result.data.meta.totals);
      setCurrentPage(result.data.meta.page);
    }
  };
  const handleSearchDoctor = async () => {
    if (id) {
      const result = await searchDoctor("specialtyId", id);
      const buildResult = await buildDataListDoctor(result.data.result);
      //check loi: https://chatgpt.com/c/68e241d0-0a38-8321-938e-914e3ebaf4d6
      setListDoctorOfSpecialty(buildResult);
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
      const listDoctorOfClinicClone = listDoctorOfSpecialty;
      const currentItem = listDoctorOfClinicClone.find(
        (item) => item.id === doctorId
      );
      if (currentItem) currentItem.availableTime = res.data;
      setListDoctorOfSpecialty(listDoctorOfClinicClone);
      SetDateSelected(date);
    }
  };
  const onLog = async (page: number, pageSize: number) => {
    if (id) {
      const result = await searchDoctor("clinicId", id, pageSize, page);
      const buildResult = await buildDataListDoctor(result.data.result);
      setListDoctorOfSpecialty(buildResult);
      setPageSize(result.data.meta.pageSize);
      setTotalListDoctor(result.data.meta.totals);
      setCurrentPage(result.data.meta.page);
      window.scroll(0, 300);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    handleGetSpecialty();
    handleSearchDoctor();
  }, []);
  return (
    <div>
      <div className="container">
        <Breadcrumb location={location.pathname} />
        <p className="text-xl font-bold">{specialtyDetail.name}</p>
        <div id="description" className="mt-10">
          <p className="text-2xl font-bold text-blue-400">Mô tả</p>
          <p>{specialtyDetail.description}</p>
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
            {listDoctorOfSpecialty &&
              listDoctorOfSpecialty.length > 0 &&
              listDoctorOfSpecialty.map((doctor) => {
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

export default SpecialtyDetail;
