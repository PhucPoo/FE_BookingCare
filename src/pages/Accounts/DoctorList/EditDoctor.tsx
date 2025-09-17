import React, { useEffect } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Doctor } from "./DoctorTable";

const { Option } = Select;

interface EditDoctorProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (doctor: Doctor) => void;
  doctor: Doctor | null;
}

const EditDoctor: React.FC<EditDoctorProps> = ({
  open,
  onCancel,
  onUpdate,
  doctor,
}) => {
  const [form] = Form.useForm();

  // Đổ dữ liệu vào form khi modal mở
  useEffect(() => {
    if (doctor) {
      form.setFieldsValue({
        name: doctor.account?.name,
        email: doctor.account?.email,
        phoneNumber: doctor.account?.phoneNumber,
        cost: doctor.cost,
        degree: doctor.degree,
        status: doctor.status,
      });
    }
  }, [doctor, form]);

  const handleSubmit = (values: any) => {
    if (!doctor) return;

    const updatedDoctor: Doctor = {
      ...doctor,
      cost: Number(values.cost),
      degree: values.degree,
      status: values.status,
      account: {
        ...doctor.account,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
      },
    };

    onUpdate(updatedDoctor);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Chỉnh sửa thông tin bác sĩ
        </div>
      }
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
          label="Tên bác sĩ"
          rules={[{ required: true, message: "Vui lòng nhập tên bác sĩ!" }]}
        >
          <Input
            placeholder="Nhập tên bác sĩ"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            placeholder="Nhập email"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        <Form.Item
          name="cost"
          label="Chi phí khám (VNĐ)"
          rules={[{ required: true, message: "Vui lòng nhập chi phí khám!" }]}
        >
          <Input
            type="number"
            placeholder="Nhập chi phí khám"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        <Form.Item
          name="degree"
          label="Bằng cấp"
          rules={[{ required: true, message: "Vui lòng nhập bằng cấp!" }]}
        >
          <Input
            placeholder="Nhập bằng cấp (VD: MASTER, DOCTOR)"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select
            placeholder="Chọn trạng thái"
            size="large"
            className="rounded-md"
          >
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
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDoctor;
