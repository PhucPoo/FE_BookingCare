import { Divider, Modal } from "antd/lib";
import React from "react";
import { formatDate, getDegree } from "../../../utils/constant";
type accountModel = {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birth?: string;
};
type AdminBookingDetailModel = {
  id?: number;
  appointmentDate?: string;
  description?: string;
  status?: string;
  doctor?: {
    id?: number;
    account?: accountModel;
    degree?: string;
    specialtyName?: string;
  };
  patient?: {
    id?: number;
    account?: accountModel;
    bhyt?: string;
  };
  time?: {
    id?: number;
    start?: string;
    end?: string;
  };
  clinic?: {
    id?: number;
    name?: string;
  };
  createAt?: string;
};
type Props = {
  BookingDetail: AdminBookingDetailModel;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const AdminBookingDetail = ({
  BookingDetail,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  console.log("🚀 ~ AdminBookingDetail ~ BookingDetail:", BookingDetail);
  return (
    <Modal
      title="Thông tin lịch khám chi tiết"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      width={"1000px"}
    >
      <div className="flex items-center gap-5">
        <div>
          <img
            src={BookingDetail.doctor?.account?.avatar}
            style={{ width: "100px", height: "100px" }}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xl font-bold">
              Tên: {BookingDetail.doctor?.account?.name}
            </p>
            <p>Chuyên khoa: {BookingDetail.doctor?.specialtyName}</p>
          </div>
          <div>
            <p>Địa chỉ: {BookingDetail.doctor?.account?.address}</p>
            <p>Trình độ: {getDegree(BookingDetail.doctor?.degree)}</p>
          </div>
          <div>
            <p>Số điện thoại: {BookingDetail.doctor?.account?.phoneNumber}</p>
            <p>Email: {BookingDetail.doctor?.account?.email}</p>
          </div>
        </div>
      </div>

      <Divider>Thông tin đơn khám</Divider>

      <div>
        <p className="text-xl">
          Bệnh nhân: {BookingDetail.patient?.account?.name}
        </p>
        <p>- Địa chỉ: {BookingDetail.patient?.account?.address}</p>
        <p>- Ngày sinh: {BookingDetail.patient?.account?.birth}</p>
        <p>- Email: {BookingDetail.patient?.account?.email}</p>
        <p>- Số điện thoại: {BookingDetail.patient?.account?.phoneNumber}</p>
        <p>- Mã bảo hiểm y tế: {BookingDetail.patient?.bhyt}</p>
      </div>

      <p className="text-xl mt-1">
        Trạng thái đơn khám: {BookingDetail.status}
      </p>
      <p className="text-xl mt-1">
        Thời gian đặt lịch: {formatDate(BookingDetail.createAt)}
      </p>
      <p className="text-xl mt-1">Ngày khám: {BookingDetail.appointmentDate}</p>
      <p className="text-xl mt-1">
        Thời gian khám:{" "}
        {`${BookingDetail.time?.start} - ${BookingDetail.time?.end}`}
      </p>
    </Modal>
  );
};

export default AdminBookingDetail;
