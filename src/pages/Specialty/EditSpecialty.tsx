import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Upload } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import type { Specialty } from "./SpecialtyList";

interface EditSpecialtyProps {
  open: boolean;
  specialty: Specialty | null;
  onCancel: () => void;
  onUpdate: (updated: Specialty) => void;
}

const EditSpecialty: React.FC<EditSpecialtyProps> = ({
  open,
  specialty,
  onCancel,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (specialty) {
      form.setFieldsValue({
        name: specialty.name,
        description: specialty.description,
        img: specialty.img,
      });
    } else {
      form.resetFields();
    }
  }, [specialty, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (specialty) {
        const updated: Specialty = {
          ...specialty,
          name: values.name,
          description: values.description,
          img: values.img || specialty.img,
        };
        onUpdate(updated);
      }
    });
  };

  return (
    <Modal
      title="Sửa chuyên khoa"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên chuyên khoa"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên chuyên khoa" }]}
        >
          <Input placeholder="Nhập tên chuyên khoa" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item label="Ảnh" name="img">
          <Upload
            beforeUpload={() => false} // chặn upload tự động
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSpecialty;
