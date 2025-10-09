// src/components/Informationuser.tsx

import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { User } from "./UserTable";
import dayjs from "dayjs";
// đảm bảo đường dẫn đúng

interface InformationuserProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}


const DetailUser: React.FC<InformationuserProps> = ({
  open,
  user,
  onClose,
}) => {
  console.log("ABC",user);
  
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
  const handleFormatDayOnly = (time: string | number | Date) => {
    const date = new Date(time);
    const VNTime = date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return VNTime;
  };
  console.log(user);
  
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
            <strong>Giới tính:</strong> {user.gender}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>CCCD:</strong> {user.cccd}
          </p>
          <p>
            <strong>Ngày sinh:</strong>
            {handleFormatDayOnly(user.birth)}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {user.address}
          </p>
          <p>
            <strong>SĐT:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Ảnh:</strong>{" "}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Người dùng"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              "Chưa có"
            )}
          </p>
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

export default DetailUser;
