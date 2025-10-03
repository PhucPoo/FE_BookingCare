import React from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import type { Support } from "./SupportTable";
import type { Clinic } from "../../Clinic/ClinicTable";

interface InformationSupportProps {
  open: boolean;
  support: Support | null;
  onClose: () => void;
}

// const getStatusBadge = (isActive?: boolean) => {
//   if (isActive === true) {
//     return (
//       <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
//         Hoạt động
//       </span>
//     );
//   } else if (isActive === false) {
//     return (
//       <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
//         Nghỉ
//       </span>
//     );
//   } else {
//     return <span className="text-gray-500">Không xác định</span>;
//   }
// };

const InformationSupport: React.FC<InformationSupportProps> = ({
  open,
  support,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thông tin chi tiết trợ lý
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
      {support ? (
        <div className="space-y-3 text-sm">
          <p>
            <strong>ID:</strong> {support.id}
          </p>
          <p>
            <strong>Tên:</strong> {support.account?.name ?? "—"}
          </p>
          <p>
            <strong>Giới tính:</strong> {support.account?.gender ?? "—"}
          </p>
          <p>
            <strong>Email:</strong> {support.account?.email ?? "—"}
          </p>
          <p>
            <strong>SĐT:</strong> {support.account?.phoneNumber ?? "—"}
          </p>
           


          {/* Phòng khám */}
          <div>
            <strong>Phòng khám:</strong>
            {support.clinic ? (
              <div className="ml-4 space-y-1">
                <p>
                  <b>ID:</b> {support.clinic.id}
                </p>
                {support.clinic.name && (
                  <>
                    <p>
                      <b>Tên:</b> {support.clinic.name}
                    </p>
                    <p>
                      <b>Mô tả:</b> {support.clinic.description ?? "—"}
                    </p>
                    <p>
                      <b>SĐT:</b> {support.clinic.phoneNumber ?? "—"}
                    </p>
                    <p>
                      <b>Địa chỉ:</b> {support.clinic.address?.city ?? "—"}
                    </p>
                  </>
                )}
              </div>
            ) : (
              " —"
            )}
          </div>

           <p>
            <strong>Ngày tạo:</strong>{" "}
            {support.account.createAt
              ? new Date(support.account.createAt).toLocaleDateString()
              : "—"}
          </p>
          <p>
            <strong>Cập nhật:</strong>{" "}
            {support.account.updateAt
              ? new Date(support.account.updateAt).toLocaleDateString()
              : "—"}
          </p>
          {/* <p>
            <strong>Trạng thái:</strong> {getStatusBadge(support.isActive)}
          </p> */}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có dữ liệu trợ lý</p>
      )}
    </Modal>
  );
};

export default InformationSupport;
