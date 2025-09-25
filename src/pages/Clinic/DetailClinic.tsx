
import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Clinic } from "./ClinicTable"; // đảm bảo đường dẫn đúng

interface InformationClinicProps {
  open: boolean;
  clinic: Clinic | null;
  onClose: () => void;
}

const InformationClinic: React.FC<InformationClinicProps> = ({
  open,
  clinic,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thông tin chi tiết phòng khám
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
      {clinic && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>ID:</strong> {clinic.id}
          </p>
          <p>
            <strong>Tên phòng khám:</strong> {clinic.name}
          </p>
          <p>
            <strong>Mô tả:</strong> {clinic.description}
          </p>
          <p>
            <strong>Vị trí:</strong> {clinic.position}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {clinic.phoneNumber}
          </p>
          {/* <p>
            <strong>Email:</strong> {clinic.email}
          </p> */}
          <p>
            <strong>Ảnh:</strong>{" "}
            {clinic.image ? (
              <img
                src={clinic.image}
                alt="Clinic"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              "Chưa có"
            )}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {clinic.address ? clinic.address.city : "Chưa có"}
          </p>
          {clinic.create_at && (
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(clinic.create_at).toLocaleDateString()}
            </p>
          )}
          {clinic.update_at && (
            <p>
              <strong>Cập nhật:</strong>{" "}
              {new Date(clinic.update_at).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </Modal>
  );
};

export default InformationClinic;
