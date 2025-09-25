import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Gọi API backend gửi email OTP
      const res = await axios.post("http://localhost:8080/api/v1/auth/forgot-password", {
        email: values.email,
      });

      // giả sử backend trả về success message
      message.success(res.data?.message || "Email OTP đã được gửi!");

      // redirect tới trang nhập OTP nếu có
      navigate("/forgot-password/otp", { state: { email: values.email } });
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Có lỗi xảy ra!";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundImage: `linear-gradient(to top, rgba(255,255,255,0.85), rgba(0,0,0,0)), url("/bg_login.jpg")`,
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
            <Button type="primary" htmlType="submit" block loading={loading}>
              Gửi yêu cầu khôi phục
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate("/login")}>
              Quay lại đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
