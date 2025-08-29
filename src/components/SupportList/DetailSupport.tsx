// src/components/Informationsupport.tsx

import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Support } from "./SupportTable";
 // đảm bảo đường dẫn đúng

interface InformationsupportProps {
  open: boolean;
  support: Support | null;
  onClose: () => void;
}

const getStatusBadge = (status: Support["status"]) => {
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

const Informationsupport: React.FC<InformationsupportProps> = ({
  open,
  support,
  onClose,
}) => {
  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thông tin chi tiết trợ lý</div>}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      centered
    >
      {support && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {support.id}
          </p>
          <p>
            <strong>Tên:</strong> {support.name}
          </p>
          <p>
            <strong>Email:</strong> {support.email}
          </p>
          <p>
            <strong>CCCD:</strong> {support.cccd}
          </p>
          <p>
            <strong>SĐT:</strong> {support.phone}
          </p>
          <p>
            <strong>Giá khám:</strong> {support.price}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {support.create_at.toLocaleDateString()}
          </p>
          <p>
            <strong>Cập nhật:</strong> {support.update_at.toLocaleDateString()}
          </p>
          <p>
            <strong>Trạng thái:</strong> {getStatusBadge(support.status)}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default Informationsupport;
