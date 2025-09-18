import React, { useEffect } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Clinic } from "./ClinicTable";

interface EditClinicProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (clinic: Clinic) => void;
  clinic: Clinic | null;
}

const EditClinic: React.FC<EditClinicProps> = ({ open, onCancel, onUpdate, clinic }) => {
  const [form] = Form.useForm();

  // Đổ dữ liệu vào form khi modal mở
  useEffect(() => {
    if (clinic) {
      form.setFieldsValue({
        name: clinic.name,
        description: clinic.description,
        position: clinic.position,
        phoneNumber: clinic.phoneNumber,
        image: clinic.image || "",
        city: clinic.address?.city,
      });
    }
  }, [clinic, form]);

  const handleSubmit = (values: any) => {
    if (!clinic) return;

    const updatedClinic: Clinic = {
      ...clinic,
      name: values.name,
      description: values.description,
      position: values.position,
      phoneNumber: values.phoneNumber,
      image: values.image || null,
      address: {
        ...clinic.address,
        city: values.city,
      },
      update_at: new Date(),
    };

    onUpdate(updatedClinic);
    form.resetFields();
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Chỉnh sửa phòng khám</div>}
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
          name="name"
          label="Tên phòng khám"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng khám!" }]}
        >
          <Input placeholder="Nhập tên phòng khám" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả" size="large" />
        </Form.Item>

        <Form.Item
          name="position"
          label="Vị trí"
          rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}
        >
          <Input placeholder="Nhập vị trí" size="large" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại" size="large" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Ảnh (URL)"
        >
          <Input placeholder="Nhập link ảnh (tùy chọn)" size="large" />
        </Form.Item>

        <Form.Item
          name="city"
          label="Thành phố"
          rules={[{ required: true, message: "Vui lòng nhập thành phố!" }]}
        >
          <Input placeholder="Nhập thành phố" size="large" />
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

export default EditClinic;
