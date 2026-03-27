import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Card, Typography, Modal } from "antd/lib";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export default function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = (location.state || {}) as { email: string };
  const password = sessionStorage.getItem("reg_password");
  const name = sessionStorage.getItem("reg_name");
  const phoneNumber = sessionStorage.getItem("reg_phone");
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleVerify = async (values: { otp: string }) => {
    if (!email) {
      message.error("Không tìm thấy email, vui lòng đăng ký lại!");
      navigate("signup");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/create-verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email, code: values.otp, password, name, phoneNumber }),
        }
      );

      const data = await response.json();
      if (response.ok && data.statusCode === 201) {
        message.success("Xác thực OTP thành công!");
        sessionStorage.removeItem("reg_password");
        sessionStorage.removeItem("reg_name");
        sessionStorage.removeItem("reg_phone");
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        // Modal.success({
        //   title: "Đăng ký thành công!",
        //   content: "Bạn đã xác thực OTP thành công. Ấn OK để quay về trang đăng nhập.",
        //   okText: "OK",
        //   onOk: () => navigate("/login"),
        navigate("/auth/login"); 
        // });
      } else {
        message.error(data.message || "Xác thực OTP thất bại");
      }
    } catch (error) {
      console.error("OTP verify error:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      message.error("Không tìm thấy email để gửi lại OTP");
      return;
    }
    if (otpTimer > 0) {
      message.info(`Vui lòng chờ ${otpTimer}s trước khi gửi lại`);
      return;
    }
setLoading(true);
    let lastData: any = null;
    try {
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phoneNumber,
          roleId: 2
        }),
      }
    );

    const data = await response.json();
    
    if (response.ok || data?.statusCode === 200) {
      message.success("OTP đã được gửi lại tới email của bạn!");
      setOtpTimer(60);
    } else {
      message.error(data.message || "Gửi lại OTP thất bại");
    }
  } catch (error) {
    console.error("Resend OTP error:", error);
    message.error("Có lỗi xảy ra khi gửi lại OTP");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{
        background: "#c3fdf5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420, // ✅ tránh bị ép chiều ngang
          borderRadius: 12,
          textAlign: "center",
          padding: "30px 25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontSize: 36, color: "#1890ff", marginBottom: 15 }}>
          <MailOutlined />
        </div>
        <Typography.Title level={3} className="forgot-title">Xác thực Email</Typography.Title>
        <p style={{ color: "#666", marginBottom: 20 }}>
          Nhập mã OTP đã được gửi tới email: <br />
          <b>{email}</b>
        </p>

        <Form onFinish={handleVerify} layout="vertical">
          <Form.Item
            name="otp"
            label="Mã OTP"
            rules={[{ required: true, message: "Vui lòng nhập OTP!" }]}
          >
            <Input
              placeholder="Nhập OTP"
              prefix={<LockOutlined />}
              style={{ borderRadius: 6 }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ borderRadius: 6 }}
          >
            Xác thực
          </Button>
        </Form>

        <Button
          type="link"
          onClick={handleResend}
          disabled={loading || otpTimer > 0}
          style={{ marginTop: 15 }}
        >
          {otpTimer > 0 ? `Gửi lại sau ${otpTimer}s` : "Gửi lại OTP"}
        </Button>
      </Card>
    </div>
  );
}
