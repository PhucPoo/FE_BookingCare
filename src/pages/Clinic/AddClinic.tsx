import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Select from "antd/es/select";
import type { Clinic } from "./ClinicTable";
import { notification } from "antd";
import { testGetClinicApi, testPostClinicApi } from "../../api/testClinic";
import { testGetAddressApi } from "../../api/testAddress";

const { Option } = Select;

interface AddClinicProps {
  clinics: Clinic[];
  setclinic: (clinic: Clinic[]) => void;
  open: boolean;
  onCancel: () => void;
  onAdd: (clinic: Clinic) => void;
}

interface Address {
  id: number;
  city: string;
}

const AddClinic: React.FC<AddClinicProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const [addresses, setAddresses] = useState<Address[]>([]);

  const handleSubmit = async (values: any) => {
  const { name, description, position, phoneNumber, addressId } = values;

  const newClinic = {
    name,
    description,
    position,
    phoneNumber,
    image: null,
    address: {
      id: addressId, // 👈 backend cần object
    },
  };

  try {
    const res = await testPostClinicApi(newClinic);
    onAdd(res);
    notification.success({
      message: "Thêm thành công",
      description: `Phòng khám ${res.name} đã được thêm`,
    });
    form.resetFields();
    onCancel();
  } catch (error: any) {
    notification.error({
      message: "Thêm thất bại",
      description: error.response?.data?.message || "Có lỗi xảy ra",
    });
  }
   console.log("Payload gửi lên:", newClinic);
};


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

  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thêm phòng khám mới
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={520}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className="space-y-4"
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
          <Input placeholder="Nhập mô tả" size="large" />
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
          name="addressId"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng chọn địa chỉ!" }]}
        >
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

export default AddClinic;
