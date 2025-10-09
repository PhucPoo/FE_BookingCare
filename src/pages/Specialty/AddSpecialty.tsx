import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import { testPostSpecialtyApi } from "../../api/testSpecialty";
import type { Specialty } from "./SpecialtyTable";
import { notification } from "antd";

interface AddSpecialtyProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (specialty: Specialty) => void;
}

const AddSpecialty: React.FC<AddSpecialtyProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description || "");
        if (file) {
          formData.append("file", file);
        }

        // Gọi API
        const res = await testPostSpecialtyApi(formData);
        const specialty = res.data;


        // Cập nhật UI
        onAdd(specialty);

        notification.success({
          message: "Thêm thành công",
          description: `Chuyên khoa ${specialty.name} đã được thêm`,
        });

        form.resetFields();
        setFile(null);
        onCancel();
      } catch (error: any) {
        console.log("Lỗi hiển thị là:", error);

        // notification.error({
        //   message: "Thêm thất bại",
        //   description: error.response?.data?.message || "Có lỗi xảy ra",
        // });
      }
    });
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  return (
    <Modal
      title="Thêm chuyên khoa mới"
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

        <Form.Item label="Ảnh" name="image">
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            fileList={fileList}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {file && <p className="mt-2 text-sm text-gray-500">Ảnh: {file.name}</p>}
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" onClick={handleSubmit}>
            Thêm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddSpecialty;
