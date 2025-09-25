import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Doctor } from "./DoctorTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import type { User } from "../UserList/UserTable";
import type { Specialty } from "../../Specialty/SpecialtyList";
import { testGetClinicApi } from "../../../api/testClinic";
import { testGetAccountsApi } from "../../../api/testApi";
import { testGetSpecialtyApi } from "../../../api/testSpecialty";
import { testGetDoctorApi, testPostDoctorApi } from "../../../api/testDoctor";


const { Option } = Select;



interface AddDoctorProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (doctor: Doctor) => void;
}

const AddDoctor: React.FC<AddDoctorProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [accounts, setAccounts] = useState<User[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // Lấy dữ liệu dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clinicRes, accountRes, specialtyRes] = await Promise.all([
          testGetClinicApi(),
         testGetAccountsApi(),
          testGetSpecialtyApi(),
        ]);

        setClinics(clinicRes.data.result || []);
        setAccounts(accountRes.data.result || []);
        setSpecialties(specialtyRes.data.result || []);
      } catch (error) {
        console.error("Fetch dropdown data failed:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await testGetDoctorApi();
        setDoctors(res.data.result || []);
      } catch (err) {
        console.error("Fetch doctors failed:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Gửi dữ liệu tạo doctor
  const handleSubmit = async (values: any) => {
    const payload = {
      cost: Number(values.cost),
      degree: values.degree,
      account: { id: Number(values.accountId) },
      clinic: { id: Number(values.clinicId) },
      specialty: { id: Number(values.specialtyId) },
    };

    const res = await testPostDoctorApi(payload);
    const doctor = res.data.data;
    const detailRes = await testGetDoctorApi();
    onAdd(detailRes.data.data);
    form.resetFields();

  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thêm bác sĩ mới</div>}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={520}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        {/* Account chọn từ danh sách */}
        <Form.Item
          name="accountId"
          label="Account"
          rules={[{ required: true, message: "Vui lòng chọn account!" },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();

              // Kiểm tra account đã có doctor chưa
              const accountExists = accounts.some(
                (acc) =>
                  acc.id === value &&
                  doctors.some((doc: any) => doc.account.id === acc.id)
              );

              return accountExists
                ? Promise.reject(new Error("Account này đã có bác sĩ!"))
                : Promise.resolve();
            },
          },

          ]}
        >
          <Select placeholder="Chọn account" size="large">
            {accounts.map((acc) => (
              <Option key={acc.id} value={acc.id}>
                {acc.id} - {acc.name} ({acc.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Clinic */}
        <Form.Item
          name="clinicId"
          label="Clinic"
          rules={[{ required: true, message: "Vui lòng chọn clinic!" }]}
        >
          <Select placeholder="Chọn clinic" size="large">
            {clinics.map((clinic) => (
              <Option key={clinic.id} value={clinic.id}>
                {clinic.id} - {clinic.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Specialty */}
        <Form.Item
          name="specialtyId"
          label="Specialty"
          rules={[{ required: true, message: "Vui lòng chọn specialty!" }]}
        >
          <Select placeholder="Chọn specialty" size="large">
            {specialties.map((sp) => (
              <Option key={sp.id} value={sp.id}>
                {sp.id} - {sp.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Cost */}
        <Form.Item
          name="cost"
          label="Giá khám (VNĐ)"
          rules={[
            { required: true, message: "Vui lòng nhập giá khám!" },
            {
              validator: (_, value) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("Giá khám phải lớn hơn 0")),
            },
          ]}
        >
          <Input type="number" placeholder="Nhập giá khám" size="large" />
        </Form.Item>

        {/* Degree */}
        <Form.Item
          name="degree"
          label="Bằng cấp"
          rules={[{ required: true, message: "Vui lòng chọn bằng cấp!" }]}
        >
          <Select placeholder="Chọn bằng cấp" size="large">
            <Option value="BACHELOR">Cử nhân</Option>
            <Option value="MASTER">Thạc sĩ</Option>
            <Option value="DOCTOR">Tiến sĩ</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={onCancel} size="large">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDoctor;
