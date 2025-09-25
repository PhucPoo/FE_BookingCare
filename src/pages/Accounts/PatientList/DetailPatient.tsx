// src/components/Informationpatient.tsx
import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Patient } from "./PatientTable";

interface InformationpatientProps {
  open: boolean;
  patient: Patient | null;
  onClose: () => void;
}

const Informationpatient: React.FC<InformationpatientProps> = ({
  open,
  patient,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thông tin chi tiết bệnh nhân
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
      {patient ? (
        <div className="space-y-3 text-sm">
          <p>
            <strong>ID:</strong> {patient.id}
          </p>
          <p>
            <strong>Tên:</strong> {patient.account?.name ?? "—"}
          </p>
          <p>
            <strong>Email:</strong> {patient.account?.email ?? "—"}
          </p>
          <p>
            <strong>SĐT:</strong> {patient.account?.phoneNumber ?? "—"}
          </p>
          <p>
            <strong>BHYT:</strong> {patient.bhyt ?? "—"}
          </p>

          <p>
            <strong>Ngày tạo:</strong>{" "}
            {patient.createAt
              ? new Date(patient.createAt).toLocaleDateString("vi-VN")
              : "—"}
          </p>
          <p>
            <strong>Cập nhật:</strong>{" "}
            {patient.updateAt
              ? new Date(patient.updateAt).toLocaleDateString("vi-VN")
              : "—"}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có dữ liệu bệnh nhân</p>
      )}
    </Modal>
  );
};

export default Informationpatient;
