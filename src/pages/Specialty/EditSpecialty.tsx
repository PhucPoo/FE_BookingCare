import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import type { Specialty } from "./SpecialtyTable";
import { testPutSpecialtyApi } from "../../api/testSpecialty";

interface EditSpecialtyProps {
  open: boolean;
  specialty: Specialty | null;
  onCancel: () => void;
  onSuccess?: () => void; // callback khi cập nhật thành công
}

const EditSpecialty: React.FC<EditSpecialtyProps> = ({
  open,
  specialty,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (specialty) {
      form.setFieldsValue({
        name: specialty.name,
        description: specialty.description,
      });
      setFile(null);
    } else {
      form.resetFields();
      setFile(null);
    }
  }, [specialty, form]);

  const handleUploadChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!specialty) return;
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      if (file) formData.append("file", file);

      setLoading(true);
      await testPutSpecialtyApi(specialty.id, formData); // gọi API backend
      message.success("Cập nhật thành công!");
      onSuccess?.(); // gọi callback nếu có
      onCancel(); // đóng modal
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Sửa chuyên khoa"
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
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

        <Form.Item label="Ảnh" name="image">
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {file && <p className="mt-2 text-sm text-gray-500">Ảnh: {file.name}</p>}
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSpecialty;
