import { Divider, Modal } from "antd/lib";
import React, { useEffect, useState } from "react";
import type { DoctorManagePatientModel } from "./DoctorManagePatientModel";
import {
  DoctorGetPatientDetail,
  getDoctorById,
} from "../../../api/Doctor/DoctorApi";
import { getDegree } from "../../../utils/constant";

type accountModel = {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birth?: string;
};
type PatientDetailModel = {
  id?: number | string;
  account?: accountModel;
  bhyt: string;
};
type DoctorDetailModel = {
  id?: number | string;
  account?: accountModel;
  bhyt: string;
  degree: string;
  cost: string;
  description: string;
};
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  medicalRecordSelected: DoctorManagePatientModel | undefined;
};

const DoctorManagePatientDetail = ({
  isModalOpen,
  setIsModalOpen,
  medicalRecordSelected,
}: Props) => {
  const [PatientDetail, setPatientInfo] = useState<PatientDetailModel>({
    bhyt: "",
    id: "",
    account: {},
  });
  const [DoctorDetail, setDoctorInfo] = useState<DoctorDetailModel>({
    bhyt: "",
    id: "",
    account: {},
    cost: "",
    degree: "",
    description: "",
  });
  const handleGetPatientDetail = async () => {
    if (medicalRecordSelected?.patient.id)
      await DoctorGetPatientDetail(medicalRecordSelected?.patient.id)
        .then((res) => {
          setPatientInfo(res.data);
        })
        .catch((err) => {
          console.log("🚀 ~ handleGetPatientDetail ~ err:", err);
        });
  };
  const handleGetDoctorDetail = async () => {
    if (medicalRecordSelected?.doctor.id)
      await getDoctorById(medicalRecordSelected?.doctor.id)
        .then((res) => {
          console.log("🚀 ~ handleGetDoctorDetail ~ res:", res);
          setDoctorInfo(res.data);
        })
        .catch((err) => {
          console.log("🚀 ~ handleGetPatientDetail ~ err:", err);
        });
  };
  useEffect(() => {
    if (medicalRecordSelected && medicalRecordSelected?.patient?.id) {
      handleGetPatientDetail();
    }
    if (medicalRecordSelected && medicalRecordSelected?.doctor?.id) {
      handleGetDoctorDetail();
    }
  }, [medicalRecordSelected?.patient?.id]);
  return (
    <Modal
      title="Thông tin chi tiết"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      width={"1000px"}
    >
      <div>
        <div className="flex flex-col  gap-1"></div>
        <div className="flex items-center gap-5">
          <div>
            <img
              src={DoctorDetail?.account?.avatar}
              style={{ width: "100px", height: "100px" }}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xl font-bold">
                Tên: {DoctorDetail?.account?.name}
              </p>
              <p>Chuyên khoa: {medicalRecordSelected?.specialty.name}</p>
            </div>
            <div>
              <p>Địa chỉ: {DoctorDetail?.account?.address}</p>
              <p>Trình độ: {getDegree(DoctorDetail?.degree)}</p>
            </div>
            <div>
              <p>Số điện thoại: {DoctorDetail?.account?.phoneNumber}</p>
              <p>Email: {DoctorDetail?.account?.email}</p>
            </div>
          </div>
        </div>
        <Divider>Thông tin bệnh nhân</Divider>
        <div>
          <p className="text-xl">Bệnh nhân: {PatientDetail?.account?.name}</p>
          <p>- Địa chỉ: {PatientDetail?.account?.address}</p>
          <p>- Ngày sinh: {PatientDetail?.account?.birth}</p>
          <p>- Email: {PatientDetail?.account?.email}</p>
          <p>- Số điện thoại: {PatientDetail?.account?.phoneNumber}</p>
          <p>- Mã bảo hiểm y tế: {PatientDetail?.bhyt}</p>
        </div>
        <Divider>Thông tin bệnh án</Divider>
        <p>Miêu tả: {medicalRecordSelected?.description}</p>
      </div>
    </Modal>
  );
};

export default DoctorManagePatientDetail;
