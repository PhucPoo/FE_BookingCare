import React from "react";
import { Form, Input, Button, Checkbox, Card, Select, DatePicker } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  cccd: string;
  gender: "male" | "female" | "other";
  phone?: string;
  address?: string;
  dob?: Dayjs;
  agree: boolean;
}

const Signup: React.FC = () => {
  const onFinish = (values: RegisterFormValues) => {
    const dobString = values.dob ? values.dob.format("YYYY-MM-DD") : undefined;
    console.log({ ...values, dob: dobString });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),url("/public/bg_login.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        title="Đăng ký"
        style={{
          backgroundColor:"#faec9cff",
          width: 400,
          borderRadius: 10,
          textAlign: "center",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Form
          name="register_form"
          initialValues={{ agree: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Tên đăng nhập */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          {/* CCCD */}
          <Form.Item
            name="cccd"
            rules={[{ required: true, message: "Vui lòng nhập CCCD!" }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="CCCD" />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          {/* Giới tính */}
          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="phone">
            <Input placeholder="Số điện thoại (không bắt buộc)" />
          </Form.Item>

          <Form.Item name="address">
            <Input placeholder="Địa chỉ (không bắt buộc)" />
          </Form.Item>

          <Form.Item name="dob">
            <DatePicker style={{ width: "100%" }} placeholder="Ngày sinh (không bắt buộc)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
