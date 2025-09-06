import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const { Text } = Typography;

const roleConfig = {
  admin: { title: "Admin", color: "#7fbefc" },
  doctor: { title: "Doctor", color: "#7fbefc" },
  support: { title: "Support", color: "#7fbefc" },
  client: { title: "Client", color: "#7fbefc" },
};

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: "admin" | "doctor" | "support" | "client" }>();

  if (!role || !roleConfig[role]) return <div>Invalid role</div>;

  const { title, color } = roleConfig[role];

  const onFinish = (values: any) => {
    console.log("Forgot password submit:", values);
    // TODO: gọi API gửi email reset mật khẩu ở đây
    alert(`Email khôi phục mật khẩu đã được gửi tới: ${values.email}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "#f5f6fa",
      }}
    >
      <Card
        title={`${title} - Forgot Password`}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 10,
          textAlign: "center",
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Nhập email đã đăng ký!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email đã đăng ký"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: color, borderColor: color }}
            >
              Gửi yêu cầu khôi phục
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate(`/${role}/login`)}>
              Quay lại đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
