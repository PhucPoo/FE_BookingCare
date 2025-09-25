import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Doctor } from "./DoctorTable";
import type { Clinic } from "../../Clinic/ClinicTable";

interface InformationDoctorProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
}

const getStatusBadge = (status?: Doctor["status"]) => {
  switch (status) {
    case "active":
      return (
        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
          Hoạt động
        </span>
      );
    case "inactive":
      return (
        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
          Nghỉ
        </span>
      );
    default:
      return <span className="text-gray-500">Không xác định</span>;
  }
};

const InformationDoctor: React.FC<InformationDoctorProps> = ({
  open,
  doctor,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thông tin chi tiết bác sĩ
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      centered
    >
      {doctor ? (
        <div className="space-y-3 text-sm">
          <p>
            <strong>ID:</strong> {doctor.id}
          </p>
          <p>
            <strong>Tên:</strong> {doctor.account?.name ?? "—"}
          </p>
          <p>
            <strong>Email:</strong> {doctor.account?.email ?? "—"}
          </p>
          <p>
            <strong>CCCD:</strong> {doctor.account?.cccd ?? "—"}
          </p>
           <p>
            <strong>CCCD:</strong> {doctor.account?.address ?? "—"}
          </p>
          <p>
            <strong>SĐT:</strong> {doctor.account?.phoneNumber ?? "—"}
          </p>
          <p>
            <strong>Chi phí khám:</strong>{" "}
            {doctor.cost ? `${doctor.cost.toLocaleString()} VNĐ` : "—"}
          </p>
          <p>
            <strong>Bằng cấp:</strong> {doctor.degree ?? "—"}
          </p>

          {/* Phòng khám chi tiết */}
          <div>
            <strong>Phòng khám:</strong>
            {doctor.clinic ? (
              <div className="ml-4 space-y-1">
                <p>
                  <b>ID:</b> {doctor.clinic.id}
                </p>
                {doctor.clinic.name && (
                  <>
                    <p>
                      <b>Tên:</b> {doctor.clinic.name}
                    </p>
                    <p>
                      <b>Mô tả:</b> {doctor.clinic.description}
                    </p>
                    <p>
                      <b>SĐT:</b> {doctor.clinic.phoneNumber}
                    </p>
                    <p>
                      <b>Địa chỉ:</b> {doctor.clinic.address?.city}
                    </p>
                  </>
                )}
              </div>
            ) : (
              " —"
            )}
          </div>

          {/* Chuyên khoa */}
          
          <div>
            <strong>Chuyên khoa:</strong>
            {doctor.specialtyName ? (
              <span className="ml-2">
                {doctor.specialtyName} - {doctor.specialtyDescription ?? "—"}
              </span>
            ) : "—"}
          </div>

          <p>
            <strong>Ngày tạo:</strong>{" "}
            {doctor.createAt
              ? new Date(doctor.createAt).toLocaleDateString()
              : "—"}
          </p>
          <p>
            <strong>Cập nhật:</strong>{" "}
            {doctor.updateAt
              ? new Date(doctor.updateAt).toLocaleDateString()
              : "—"}
          </p>
          <p>
            <strong>Trạng thái:</strong> {getStatusBadge(doctor.status)}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có dữ liệu bác sĩ</p>
      )}
    </Modal>
  );
};

export default InformationDoctor;
