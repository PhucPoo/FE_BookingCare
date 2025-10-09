import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, Select, notification, Upload } from "antd/lib";
import type { Clinic } from "./ClinicTable";
import { testPutClinicApi } from "../../api/testClinic";
import { testGetAddressApi } from "../../api/testAddress";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Address {
  id: number;
  city: string;
}

interface EditClinicProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (update: Clinic) => void;
  clinic: Clinic | null;
}

const EditClinic: React.FC<EditClinicProps> = ({ open, onCancel, onUpdate, clinic }) => {
  const [form] = Form.useForm();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await testGetAddressApi();
        setAddresses(res.data.result || []);
      } catch (error) {
        console.error("Lỗi load addresses:", error);
      }
    };
    if (open) fetchAddresses();
  }, [open]);

  useEffect(() => {
    if (clinic) {
      form.setFieldsValue({
        name: clinic.name,
        description: clinic.description,
        position: clinic.position,
        phoneNumber: clinic.phoneNumber,
        addressId: clinic.address?.id,
        image: null,
      });
      setFileList([
        {
          uid: "-1",
          status: "done",
          url: clinic.image,
        },
      ]);
    }
  }, [clinic, form]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!clinic) return;

    console.log("Form values:", values); // kiểm tra form values

    const formData = new FormData();
    formData.append("id", String(clinic.id));
    formData.append("name", values.name || "");
    formData.append("description", values.description || "");
    formData.append("position", values.position || "");
    formData.append("phoneNumber", values.phoneNumber || "");
    formData.append("addressId", String(values.addressId) || "");

    if (file) {
      formData.append("file", file);
    } else {
      // Gửi file rỗng nếu không chọn ảnh mới
      formData.append("file", new Blob([], { type: "application/octet-stream" }));
    }

    try {
      const res = await testPutClinicApi(clinic.id, formData);
      const updatedClinic = res.data.result|| res.data || {
        ...clinic,
        ...values,
      };
      onUpdate(updatedClinic);
      onCancel();

      notification.success({
        message: "Cập nhật thành công",
        description: `Phòng khám ${updatedClinic.name} đã được cập nhật`,
      });

      form.resetFields();
      setFile(null);
    } catch (error: any) {
      notification.error({
        message: "Cập nhật thất bại",
        description: error.response?.data?.message || "Có lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Chỉnh sửa phòng khám</div>}
      open={open}
      onCancel={() => { form.resetFields(); setFile(null); onCancel(); }}
      footer={null}
      centered
      width={520}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit} className="space-y-4">
        <Form.Item name="name" label="Tên phòng khám" rules={[{ required: true, message: "Vui lòng nhập tên phòng khám!" }]}>
          <Input placeholder="Nhập tên phòng khám" size="large" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
          <Input placeholder="Nhập mô tả" size="large" />
        </Form.Item>

        <Form.Item name="position" label="Vị trí" rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}>
          <Input placeholder="Nhập vị trí" size="large" />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
          <Input placeholder="Nhập số điện thoại" size="large" />
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

        <Form.Item name="addressId" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng chọn địa chỉ!" }]}>
          <Select placeholder="Chọn địa chỉ" size="large" allowClear>
            {addresses.map((addr) => (
              <Option key={addr.id} value={addr.id}>
                {addr.city}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={() => { form.resetFields(); setFile(null); onCancel(); }} size="large">
              Hủy
            </Button>
            <Button type="primary" size="large" loading={loading} htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClinic;
