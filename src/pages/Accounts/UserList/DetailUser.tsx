// src/components/Informationuser.tsx

import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { User } from "./UserTable";
// đảm bảo đường dẫn đúng

interface InformationuserProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}


const Informationuser: React.FC<InformationuserProps> = ({
  open,
  user,
  onClose,
}) => {
  const handleFormatDay = (time: string | number | Date) => {
    const date = new Date(time);
    const VNTime = date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return VNTime;
  };
  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thông tin chi tiết người dùng
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
      {user && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Tên:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>CCCD:</strong> {user.cccd}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {user.address}
          </p>
          <p>
            <strong>SĐT:</strong> {user.phoneNumber}
          </p>
          {user.avatar instanceof File ? (
            <img src={URL.createObjectURL(user.avatar)} alt={user.name} />
          ) : (
            <img src={user.avatar} alt={user.name} />
          )}
          <p>
            <strong>Ngày tạo:</strong>
            {handleFormatDay(user.createAt)}
          </p>
          <p>
            <strong>Cập nhật:</strong>
            {handleFormatDay(user.updateAt)}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default Informationuser;
