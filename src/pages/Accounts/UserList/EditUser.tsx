import React, { useEffect } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { User } from "./UserTable";
import { testPutAccountsApi } from "../../../api/testApi";

const { Option } = Select;

interface EdituserProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (user: User) => void;
  user: User | null;
}

const Edituser: React.FC<EdituserProps> = ({
  open,
  onCancel,
  onUpdate,
  user,
}) => {
  const [form] = Form.useForm();

  // Đổ dữ liệu vào form khi modal mở
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        cccd: user.cccd,
        phoneNumber: user.phoneNumber,
        create_at: user.createAt,
      });
    }
  }, [user, form]);

  const handleSubmit = (values: any) => {
    if (!user) return;

    const updateduser: User = {
      ...user,
      name: values.name,
      email: values.email,
      cccd: Number(values.cccd),
      phoneNumber: values.phoneNumber,
      createAt: values.create_at,
      updateAt: new Date(),
    };
    testPutAccountsApi(updateduser);
    onUpdate(updateduser);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Chỉnh sửa thông tin người dùng
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
          label="Tên người dùng"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input
            placeholder="Nhập tên người dùng"
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
          name="cccd"
          label="CCCD"
          rules={[{ required: true, message: "Vui lòng nhập CCCD!" }]}
        >
          <Input
            placeholder="Nhập số CCCD"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item>

        {/* <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Vui lòng nhập password!" }]}
        >
          <Input
            placeholder="Nhập số password"
            size="large"
            className="rounded-md px-3 py-2"
          />
        </Form.Item> */}

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
{/* 
        <Form.Item
          name="stas"
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
        </Form.Item> */}

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

export default Edituser;
