import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Doctor } from "./DoctorTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import type { Specialty } from "../../Specialty/SpecialtyList";
import api from "../../../api/axios";
import { testGetClinicApi } from "../../../api/testClinic";
import { testGetSpecialtyApi } from "../../../api/testSpecialty";
import { testPutDoctorApi } from "../../../api/testDoctor";

const { Option } = Select;

interface EditDoctorProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (doctor: Doctor) => void;
  doctor: Doctor | null;
}

const EditDoctor: React.FC<EditDoctorProps> = ({
  open,
  onCancel,
  onUpdate,
  doctor,
}) => {
  const [form] = Form.useForm();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clinicRes, specialtyRes] = await Promise.all([
          testGetClinicApi(),
          testGetSpecialtyApi(),
        ]);

        setClinics(clinicRes.data.result || []);
        setSpecialties(specialtyRes.data.result || []);
      } catch (err) {
        console.error("Fetch dropdown failed:", err);
      }
    };
    fetchData();
  }, []);

  // Đổ dữ liệu khi mở modal

  if (doctor) {
    form.setFieldsValue({
      cost: doctor.cost,
      degree: doctor.degree,
      clinicId: doctor.clinic?.id,
      specialtyId: doctor.specialty?.id,
    });
  }


  const handleSubmit = async (values: any) => {
    if (!doctor) return;

    const payload = {
      id: doctor.id,
      cost: values.cost,
      degree: values.degree,
      account: { id: doctor.account?.id }, // chỉ cần id
      clinic: { id: values.clinicId },
      specialty: { id: values.specialtyId },
    };

    try {
      const res = await  testPutDoctorApi(payload); // ✅ truyền payload + await
      onUpdate(res.data);                          // ✅ lấy dữ liệu backend trả về
      form.resetFields();
      
    } catch (err: any) {
      console.error("Update doctor failed:", err);
      // Nếu backend trả về lỗi xác thực (400/422), in chi tiết
      if (err.response) {
        console.error("Error response:", err.response.data);
      }
    }
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Chỉnh sửa thông tin bác sĩ</div>}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      centered
      width={520}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
        form={form}
      >
        <Form.Item
          name="cost"
          label="Chi phí khám (VNĐ)"
          rules={[{ required: true, message: "Vui lòng nhập chi phí khám!" }]}
        >
          <Input
            type="number"
            placeholder="Nhập chi phí khám"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        <Form.Item
          name="degree"
          label="Bằng cấp"
          rules={[{ required: true, message: "Vui lòng nhập bằng cấp!" }]}
        >
          <Select placeholder="Chọn bằng cấp" size="large">
            <Option value="BACHELOR">Cử nhân</Option>
            <Option value="MASTER">Thạc sĩ</Option>
            <Option value="DOCTOR">Tiến sĩ</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="clinicId"
          label="Phòng khám"
          rules={[{ required: true, message: "Vui lòng chọn phòng khám!" }]}
        >
          <Select placeholder="Chọn phòng khám" size="large" className="rounded-md">
            {clinics.map((clinic) => (
              <Option key={clinic.id} value={clinic.id}>
                {clinic.id} - {clinic.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="specialtyId"
          label="Chuyên khoa"
          rules={[{ required: true, message: "Vui lòng chọn chuyên khoa!" }]}
        >
          <Select placeholder="Chọn chuyên khoa" size="large" className="rounded-md">
            {specialties.map((sp) => (
              <Option key={sp.id} value={sp.id}>
                {sp.id} - {sp.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={onCancel} size="large">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDoctor;
