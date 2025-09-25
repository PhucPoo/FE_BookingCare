import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Specialty } from "./SpecialtyTable";

interface InformationSpecialtyProps {
  open: boolean;
  specialty: Specialty | null;
  onClose: () => void;
}

const InformationSpecialty: React.FC<InformationSpecialtyProps> = ({
  open,
  specialty,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thông tin chi tiết chuyên khoa
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
      {specialty && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {specialty.id}
          </p>
          <p>
            <strong>Tên chuyên khoa:</strong> {specialty.name}
          </p>
          <p>
            <strong>Mô tả:</strong> {specialty.description}
          </p>
          <p>
            <strong>Ảnh:</strong>{" "}
            {specialty.image ? (
              <img
                src={specialty.image}
                alt="Specialty"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              "Chưa có"
            )}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            {specialty.isActive ? "Hoạt động" : "Không hoạt động"}
          </p>
          {specialty.createAt && (
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(specialty.createAt).toLocaleDateString("vi-VN")}
            </p>
          )}
          {specialty.updateAt && (
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {new Date(specialty.updateAt).toLocaleDateString("vi-VN")}
            </p>
          )}
        </div>
      )}
    </Modal>
  );
};

export default InformationSpecialty;
