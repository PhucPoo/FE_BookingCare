import React from "react";
import { Form, Input, Button, Card } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const roleConfig = {
  admin: { title: "Admin", color: "#46d9f6ff", bg: "/bg_admin.jpg" },
  doctor: { title: "Doctor", color: "#46d9f6ff", bg: "/bg_doctor.jpg" },
  support: { title: "Support", color: "#46d9f6ff", bg: "/bg_support.jpg" },
  client: { title: "Client", color: "#46d9f6ff", bg: "/bg_client.jpg" },
};

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: "admin" | "doctor" | "support" | "client" }>();

  if (!role || !roleConfig[role]) return <div>Invalid role</div>;

  const { color, } = roleConfig[role];

  const onFinish = (values: any) => {
    console.log("Forgot password submit:", values);
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
        backgroundImage: `linear-gradient(to top, rgba(255,255,255,0.85), rgba(0,0,0,0)), url("/public/bg_login.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        title={`Quên mật khẩu`}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 16,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          backdropFilter: "blur(8px)",
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

          {/* Nút gửi yêu cầu khôi phục */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: color,
                borderColor: color,
                fontWeight: "bold",
                borderRadius: 8,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#30a4fdff";
                (e.currentTarget as HTMLElement).style.borderColor = "#30a4fdff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = color;
                (e.currentTarget as HTMLElement).style.borderColor = color;
              }}
            >
              Gửi yêu cầu khôi phục
            </Button>
          </Form.Item>

          {/* Quay lại login */}
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
