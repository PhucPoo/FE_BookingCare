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

// const getcreate_atBadge = (create_at: User["create_at"]) => {
//   if (create_at === "active") {
//     return (
//       <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
//         Hoạt động
//       </span>
//     );
//   } else if (create_at === "inactive") {
//     return (
//       <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
//         Nghỉ
//       </span>
//     );
//   }
//   return null;
// };

const Informationuser: React.FC<InformationuserProps> = ({
  open,
  user,
  onClose,
}) => {
  const handleFormatDay = (time) => {
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
            <strong>SĐT:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Ngày tạo:</strong>
            {handleFormatDay(user.createAt)}
          </p>
          <p>
            <strong>Cập nhật:</strong>
            {handleFormatDay(user.updateAt)}
          </p>
          {/* <p>
            <strong>Trạng thái:</strong> {getcreate_atBadge(user.create_at)}
          </p> */}
        </div>
      )}
    </Modal>
  );
};

export default Informationuser;
