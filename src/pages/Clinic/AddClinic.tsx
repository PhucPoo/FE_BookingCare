import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Clinic } from "./ClinicTable";
import api from "../../api/axios";
import { testGetClinicApi } from "../../api/testClinic";

interface AddClinicProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (clinic: Clinic) => void;
}
// interface Address {
//   id: number;
//   city: string;
// }
const AddClinic: React.FC<AddClinicProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  // const [address, setAddress] = useState<Address[]>([]);

  const handleSubmit = (values: any) => {
    const { name, description, position, phoneNumber, city } = values;

    const newClinic: Clinic = {
      id: Date.now(),
      name,
      description,
      position,
      phoneNumber,
      image: null,
      address: {
        id: Date.now(),
        city,
      },
    };

    onAdd(newClinic);
    form.resetFields();
  };
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await testGetClinicApi();
        setAddress(res.data.data.result);
      } catch (error) {
        console.error("Lỗi load addresses:", error);
      }
    };
    if (open) fetchAddresses();
  }, [open]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    const found = address.find((a) => a.id === id);
    form.setFieldsValue({ city: found ? found.city : "" });
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thêm phòng khám mới</div>}
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
          <Input placeholder="Nhập tên phòng khám" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input placeholder="Nhập mô tả" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>

        <Form.Item
          name="position"
          label="Vị trí"
          rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}
        >
          <Input placeholder="Nhập vị trí" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>

        <Form.Item
          name="address.name"
          label="ID địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập ID địa chỉ!" }]}
        >
          <Input
            placeholder="Nhập ID địa chỉ"
            size="large"
            onChange={handleAddressChange}
          />
        </Form.Item>
        <Form.Item
          name="city"
          label="Thành phố"
          rules={[{ required: true, message: "Vui lòng nhập thành phố!" }]}
        >
          <Input placeholder="Nhập thành phố" size="large" className="rounded-md px-3 py-2" />
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
