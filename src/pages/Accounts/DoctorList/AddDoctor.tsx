import React from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Doctor } from "./DoctorTable";

const { Option } = Select;

interface AddDoctorProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (doctor: Doctor) => void;
}

const AddDoctor: React.FC<AddDoctorProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const { name, email, phoneNumber, cccd, cost, degree, clinicId, specialtyId, status } = values;

    const newDoctor: Doctor = {
      id: Date.now(),
      cost: Number(cost),
      degree,
      account: {
        id: Date.now(), // fake ID cho account, thực tế backend sẽ cấp
        name,
        email,
        phoneNumber,
        cccd,
      },
      clinic: { id: Number(clinicId) },
      specialty: { id: Number(specialtyId) },
      create_at: new Date(),
      update_at: new Date(),
      status,
    };

    onAdd(newDoctor);
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
        {/* Account info */}
        <Form.Item name="name" label="Tên bác sĩ" rules={[{ required: true, message: "Vui lòng nhập tên bác sĩ!" }]}>
          <Input placeholder="Nhập tên bác sĩ" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" size="large" />
        </Form.Item>

        <Form.Item name="cccd" label="CCCD" rules={[{ required: true, message: "Vui lòng nhập CCCD!" }]}>
          <Input placeholder="Nhập số CCCD" size="large" />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
          <Input placeholder="Nhập số điện thoại" size="large" />
        </Form.Item>

        {/* Doctor info */}
        <Form.Item name="cost" label="Giá khám (VNĐ)" rules={[{ required: true, message: "Vui lòng nhập giá khám!" }]}>
          <Input type="number" placeholder="Nhập giá khám" size="large" />
        </Form.Item>

        <Form.Item name="degree" label="Bằng cấp" rules={[{ required: true, message: "Vui lòng chọn bằng cấp!" }]}>
          <Select placeholder="Chọn bằng cấp" size="large">
            <Option value="BACHELOR">Cử nhân</Option>
            <Option value="MASTER">Thạc sĩ</Option>
            <Option value="DOCTOR">Tiến sĩ</Option>
          </Select>
        </Form.Item>

        <Form.Item name="clinicId" label="Clinic ID" rules={[{ required: true, message: "Vui lòng nhập Clinic ID!" }]}>
          <Input type="number" placeholder="Nhập Clinic ID" size="large" />
        </Form.Item>

        <Form.Item name="specialtyId" label="Specialty ID" rules={[{ required: true, message: "Vui lòng nhập Specialty ID!" }]}>
          <Input type="number" placeholder="Nhập Specialty ID" size="large" />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
          <Select placeholder="Chọn trạng thái" size="large">
            <Option value="active">Hoạt động</Option>
            <Option value="inactive">Nghỉ</Option>
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
