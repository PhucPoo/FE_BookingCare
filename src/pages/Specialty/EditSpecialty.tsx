import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import type { Specialty } from "./SpecialtyTable";
import { testPutSpecialtyApi } from "../../api/testSpecialty";

interface EditSpecialtyProps {
  open: boolean;
  specialty: Specialty | null;
  onCancel: () => void;
  onUpdate: (update: Specialty) => void;
}

const EditSpecialty: React.FC<EditSpecialtyProps> = ({
  open,
  specialty,
  onCancel,
  onUpdate,

}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (specialty) {
    form.setFieldsValue({
      name: specialty.name,
      description: specialty.description,
    });

    if (specialty.image) {
      setFileList([
        {
          uid: "-1",
          status: "done",
          url: specialty.image, 
        },
      ]);
    } else {
      setFileList([]);
    }

    setFile(null); // file chỉ dùng khi user chọn ảnh mới
  } else {
    form.resetFields();
    setFileList([]);
    setFile(null);
  }
}, [specialty, form]);


  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
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
      const res = await testPutSpecialtyApi(specialty.id, formData); // gọi API backend
      message.success("Cập nhật thành công!");

      const updated = res.data?.data || res.data || {
        ...specialty,
        ...values,
      };
      onUpdate(updated);
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
