import React from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Specialty } from "./SpecialtyGrid";
import { UploadOutlined } from "@ant-design/icons";

interface AddSpecialtyProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (specialty: Specialty) => void;
}

const AddSpecialty: React.FC<AddSpecialtyProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const { name,img,description,createdAt } = values;

    const newSpecialty: Specialty = {
      id: Date.now(),
      name,
      img,
      createdAt,
      description,
    };

    onAdd(newSpecialty);
    form.resetFields();
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thêm chuyên khoa mới</div>}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={520}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        className="space-y-4"
      >
        <Form.Item
          name="name"
          label="Tên chuyên khoa"
          rules={[{ required: true, message: "Vui lòng nhập tên chuyên khoa!" }]}
        >
          <Input
            placeholder="Nhập tên chuyên khoa"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input
            placeholder="Mô tả"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>
       

        <Form.Item name="image" label="Ảnh">
          <Input
            placeholder="URL ảnh"
            size="large"
            className="rounded-md px-3 py-2"
          />
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

export default AddSpecialty;
