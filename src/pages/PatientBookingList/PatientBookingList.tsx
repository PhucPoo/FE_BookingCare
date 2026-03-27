import React, { useEffect, useState } from "react";
import {
  getPatientBookingByPatientId,
  handlePatientUpdateBooking,
} from "../../api/Patient/PatientApi";
import useUserInfoStore from "../../Zustand/configZustand";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Card, Tag, Avatar, Button, Pagination } from "antd/lib";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import {
  formatDate,
  getDegree,
  getStatusColor,
  getStatusText,
} from "../../utils/constant";
import type { PatientBookingModel } from "./PatientBookingModel";
import { toast } from "react-toastify";
import FeedBackDoctor from "./FeedBackDoctor";
import { useNavigate } from "react-router-dom";
type dataToFeedBackModel = {
  doctorId?: number;
  patientId?: number;
  doctorName?: string;
  doctorAvatar?: string;
  bookingId?: string | number;
};
const PatientBookingList = () => {
  const navigate = useNavigate();
  const [PatientBookings, setPatientBookings] = useState<PatientBookingModel[]>(
    []
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBookings, setTotalBookings] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const userInfor = useUserInfoStore((state) => state.userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToFeedBack, setDataToFeedBack] = useState<dataToFeedBackModel>({});

  const handlePatientBookings = async () => {
    if (userInfor.actorId) {
      const res = await getPatientBookingByPatientId(userInfor?.actorId);
      setPatientBookings(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBookings(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };
  const onLog = async (page: number, pageSize: number) => {
    window.scroll(0, 0);
    if (userInfor.actorId) {
      const res = await getPatientBookingByPatientId(
        userInfor?.actorId,
        page,
        pageSize
      );
      setPatientBookings(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBookings(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };
  const handleUpdateBookingStatus = async (id: number, status: string) => {
    await handlePatientUpdateBooking(id, status);
    toast.success("Cập nhật trạng thái lịch khám thành công");
    await handlePatientBookings();
  };
  const handleFeedbackDoctor = (data: dataToFeedBackModel) => {
    setIsModalOpen(true);
    setDataToFeedBack(data);
  };
  useEffect(() => {
    handlePatientBookings();
  }, []);
  return (
    <div>
      <MainPageHeader />
      <div className="container my-3">
        <Breadcrumb location={location.pathname} />
        <p className="text-2xl">
          Danh sách lịch khám đã đặt của khách hàng {userInfor.name}
        </p>
        <div className="flex flex-col gap-6 my-6">
          {PatientBookings &&
            PatientBookings.map((booking) => (
              <Card key={booking.id}>
                {/* Status Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <div className="flex justify-between items-center text-white">
                    <div className="flex items-center space-x-3">
                      <CalendarOutlined className="text-xl" />
                      <div>
                        <h3 className="font-semibold text-lg">
                          Lịch khám #{booking.id}
                        </h3>
                        <p className="text-blue-100 text-sm">
                          {formatDate(booking.appointmentDate)}
                        </p>
                      </div>
                    </div>
                    <Tag
                      color={getStatusColor(booking?.status)}
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {getStatusText(booking.status)}
                    </Tag>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid gap-8">
                    {/* Left Column - Doctor & Clinic Info */}
                    <div className="space-y-6">
                      {/* Doctor Info */}
                      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                        <div className="flex items-start space-x-4 gap-5">
                          <Avatar
                            size={64}
                            src={booking.doctor?.account.avatar}
                            icon={<UserOutlined />}
                            className="flex-shrink-0"
                            onClick={() => {
                              navigate(
                                `/danh-sach/bac-si/${booking?.doctor?.id}`
                              );
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg text-gray-800 mb-1">
                              {getDegree(booking?.doctor?.degree) +
                                " " +
                                booking?.doctor?.account.name}
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600">
                                <MedicineBoxOutlined className="mr-2 text-blue-500" />
                                <span className="text-sm">
                                  {booking?.doctor?.specialtyName}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-2xl font-bold text-blue-600">
                                {booking?.doctor?.cost?.toLocaleString("vi-VN")}{" "}
                                VND
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Appointment Details */}
                    <div className="space-y-6">
                      {/* Time & Date */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                          <ClockCircleOutlined className="mr-2" />
                          Thời gian khám
                        </h4>
                        <div className="flex justify-between space-x-4 md:flex-col lg:flex-row">
                          <div className="bg-white rounded-lg p-3 border border-green-200 w-full">
                            <p className="text-sm text-gray-600">Ngày khám</p>
                            <p className="font-semibold text-gray-800">
                              {formatDate(booking.appointmentDate)}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-green-200 w-full">
                            <p className="text-sm text-gray-600">Giờ khám</p>
                            <p className="font-semibold text-gray-800">
                              {booking?.time?.start} - {booking?.time?.end}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-green-200 w-full">
                            <p className="text-sm text-gray-600">Bệnh viện</p>
                            <p className="font-semibold text-gray-800">
                              {booking?.clinic?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-3">
                        {/* <Button type="primary" className="flex-1">
                          Xem chi tiết
                        </Button> */}
                        {booking.status === "PENDING" && (
                          <Button
                            danger
                            className="flex-1"
                            onClick={() => {
                              if (booking.id) {
                                handleUpdateBookingStatus(
                                  booking.id,
                                  "CANCELLED"
                                );
                              }
                            }}
                          >
                            Hủy lịch
                          </Button>
                        )}
                        {booking.status === "COMPLETED" &&
                          booking.checkFeedback === false && (
                            <Button
                              className="flex-1"
                              onClick={() => {
                                if (booking.doctor?.id && booking.patient?.id) {
                                  handleFeedbackDoctor({
                                    doctorId: booking.doctor?.id,
                                    patientId: booking.patient.id,
                                    doctorName: booking.doctor.account.name,
                                    doctorAvatar: booking.doctor.account.avatar,
                                    bookingId: booking.id,
                                  });
                                }
                              }}
                            >
                              Đánh giá bác sĩ
                            </Button>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {booking.description && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Lý do khám
                      </h4>
                      <p className="text-gray-600 bg-gray-50 rounded-lg p-3 text-sm">
                        {booking.description}
                      </p>
                    </div>
                  )}

                  {/* Footer Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Đặt lịch lúc: {formatDate(booking.createAt)}</span>
                      <span>Mã lịch: #{booking.id}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          <Pagination
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalBookings}
            onChange={onLog}
            pageSizeOptions={["3", "5", "10"]}
            showSizeChanger
            responsive
          />
        </div>
      </div>
      <FeedBackDoctor
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataToFeedBack={dataToFeedBack}
        handlePatientBookings={handlePatientBookings}
      />
    </div>
  );
};

export default PatientBookingList;
