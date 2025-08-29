// src/components/Informationpatient.tsx

import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Patient } from "./PatientTable";
 // đảm bảo đường dẫn đúng

interface InformationpatientProps {
  open: boolean;
  patient: Patient | null;
  onClose: () => void;
}

const getStatusBadge = (status: Patient["status"]) => {
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

const Informationpatient: React.FC<InformationpatientProps> = ({
  open,
  patient,
  onClose,
}) => {
  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thông tin chi tiết bệnh nhân</div>}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      centered
    >
      {patient && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {patient.id}
          </p>
          <p>
            <strong>Tên:</strong> {patient.name}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>CCCD:</strong> {patient.cccd}
          </p>
          <p>
            <strong>SĐT:</strong> {patient.phone}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {patient.create_at.toLocaleDateString()}
          </p>
          <p>
            <strong>Cập nhật:</strong> {patient.update_at.toLocaleDateString()}
          </p>
          <p>
            <strong>Trạng thái:</strong> {getStatusBadge(patient.status)}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default Informationpatient;
