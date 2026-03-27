import React from "react";
import type { AdminBillManageModel } from "./AdminBillManageModel";
import { Divider, Modal } from "antd/lib";
import { formatDate } from "../../../utils/constant";

type Props = {
  BillDetail: AdminBillManageModel;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const BillDetail = ({ BillDetail, isModalOpen, setIsModalOpen }: Props) => {
  return (
    <Modal
      title="Thông tin hoá đơn chi tiết"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      width={"1000px"}
    >
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xl font-bold">
              Người lập đơn: {BillDetail.support?.name}
            </p>
          </div>
        </div>
      </div>

      <Divider>Thông tin đơn khám</Divider>

      <div>
        <p className="text-xl">Bệnh nhân: {BillDetail.patient?.name}</p>
      </div>

      <p className=" mt-1">Trạng thái đơn khám: {BillDetail.status}</p>
      <p className=" mt-1">
        Thời gian đặt lịch: {formatDate(BillDetail.createAt)}
      </p>
      <p className=" mt-1">Tổng giá: {BillDetail.totalBill} vnđ</p>
      <p className=" mt-1">
        Chú thích: {BillDetail.medicalRecord?.description}
      </p>

      <Divider>Danh sách các dịch vụ đã sử dụng</Divider>
      {BillDetail.services &&
        BillDetail.services.map((item, index) => {
          return (
            <div key={item.id}>
              <p>
                {index + 1}.Tên dịch vụ: {item.service && item?.service.name}
                <p>- Giá dịch vụ: {item.serviceCost && item.serviceCost}</p>
              </p>
            </div>
          );
        })}
    </Modal>
  );
};

export default BillDetail;
