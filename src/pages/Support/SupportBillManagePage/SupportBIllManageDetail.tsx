import { Divider, Modal } from "antd/lib";
import React, { useEffect, useState } from "react";
import type { AdminBillManageModel } from "../../Admin/Bill/AdminBillManageModel";
import { formatDate } from "../../../utils/constant";
import { DoctorGetPatientDetail } from "../../../api/Doctor/DoctorApi";

type accountModel = {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birth?: string;
  cccd?: string;
};
type PatientDetailModel = {
  id?: number | string;
  account?: accountModel;
  bhyt: string;
};

type Props = {
  isModalOpen: boolean;
  BillDetail: AdminBillManageModel;
  setIsModalOpen: (value: boolean) => void;
};

const SupportBIllManageDetail = ({
  isModalOpen,
  setIsModalOpen,
  BillDetail,
}: Props) => {
  const [PatientDetail, setPatientInfo] = useState<PatientDetailModel>({
    bhyt: "",
    id: "",
    account: {},
  });

  const handleGetPatientDetail = async () => {
    if (BillDetail?.patient?.id)
      await DoctorGetPatientDetail(BillDetail?.patient.id)
        .then((res) => {
          setPatientInfo(res.data);
        })
        .catch((err) => {
          console.log("🚀 ~ handleGetPatientDetail ~ err:", err);
        });
  };

  useEffect(() => {
    if (BillDetail && BillDetail?.patient?.id) {
      handleGetPatientDetail();
    }
  }, [BillDetail?.patient?.id]);
  return (
    <Modal
      title="Thông tin lịch khám chi tiết"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
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
        <p className="text-xl">Bệnh nhân: {PatientDetail?.account?.name}</p>
        <p>- Địa chỉ: {PatientDetail?.account?.address}</p>
        <p>- Ngày sinh: {PatientDetail?.account?.birth}</p>
        <p>- Email: {PatientDetail?.account?.email}</p>
        <p>- Số điện thoại: {PatientDetail?.account?.phoneNumber}</p>
        <p>- Mã bảo hiểm y tế: {PatientDetail?.bhyt}</p>
        <p>- Mã căn cước: {PatientDetail?.account?.cccd}</p>
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

export default SupportBIllManageDetail;
