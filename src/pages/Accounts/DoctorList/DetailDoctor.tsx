// src/components/InformationDoctor.tsx

import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Doctor } from "./DoctorTable";
 // đảm bảo đường dẫn đúng

interface InformationDoctorProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
}

const getStatusBadge = (status: Doctor["status"]) => {
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
  return null;
};

const InformationDoctor: React.FC<InformationDoctorProps> = ({
  open,
  doctor,
  onClose,
}) => {
  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thông tin chi tiết bác sĩ</div>}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      centered
    >
      {doctor && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {doctor.id}
          </p>
          <p>
            <strong>Tên:</strong> {doctor.name}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>CCCD:</strong> {doctor.cccd}
          </p>
          <p>
            <strong>SĐT:</strong> {doctor.phone}
          </p>
          <p>
            <strong>Giá khám:</strong> {doctor.price}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {doctor.create_at.toLocaleDateString()}
          </p>
          <p>
            <strong>Cập nhật:</strong> {doctor.update_at.toLocaleDateString()}
          </p>
          <p>
            <strong>Trạng thái:</strong> {getStatusBadge(doctor.status)}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default InformationDoctor;
