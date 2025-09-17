// src/components/InformationDoctor.tsx

import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Doctor } from "./DoctorTable"; // đảm bảo đường dẫn đúng

interface InformationDoctorProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
}

const getStatusBadge = (status?: Doctor["status"]) => {
  if (status === "active") {
    return (
      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
        Hoạt động
      </span>
    );
  } else if (status === "inactive") {
    return (
      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
        Nghỉ
      </span>
    );
  }
  return <span className="text-gray-500">Không xác định</span>;
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
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {doctor.id}
          </p>
          <p>
            <strong>Tên:</strong> {doctor.account?.name || "—"}
          </p>
          <p>
            <strong>Email:</strong> {doctor.account?.email || "—"}
          </p>
          <p>
            <strong>CCCD:</strong> {doctor.account?.cccd || "—"}
          </p>
          <p>
            <strong>SĐT:</strong> {doctor.account?.phoneNumber || "—"}
          </p>
          <p>
            <strong>Chi phí khám:</strong> {doctor.cost?.toLocaleString()} VNĐ
          </p>
          <p>
            <strong>Bằng cấp:</strong> {doctor.degree || "—"}
          </p>
          <p>
            <strong>Phòng khám:</strong> {doctor.clinic?.id || "—"}
          </p>
          <p>
            <strong>Chuyên khoa:</strong> {doctor.specialty?.id || "—"}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {doctor.create_at
              ? new Date(doctor.create_at).toLocaleDateString()
              : "—"}
          </p>
          <p>
            <strong>Cập nhật:</strong>{" "}
            {doctor.update_at
              ? new Date(doctor.update_at).toLocaleDateString()
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
