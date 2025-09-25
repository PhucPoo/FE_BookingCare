import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ForgotPasswordFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 1️⃣ Gửi email OTP
  const handleSendEmail = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("api", {  
        // api
        email: values.email,
      });
      message.success(res.data?.message || `OTP đã gửi tới ${values.email}`);
      setEmail(values.email);
      setStep("otp");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOTP = async (values: any) => {
    const otp = Object.values(values).join("");
    setLoading(true);
    try {
      const res = await axios.post("api", {
        email,
        otp,
      });
      message.success(res.data?.message || "Xác thực OTP thành công!");
      navigate("/reset-password", { state: { email } });
    } catch (error: any) {
      message.error(error.response?.data?.message || "OTP không đúng!");
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Gửi lại OTP
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post("Api", { email });
      message.success(res.data?.message || `OTP mới đã gửi tới ${email}`);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Không gửi được OTP");
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
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, textAlign: "center" }}>
        {step === "email" && (
          <Form layout="vertical" onFinish={handleSendEmail}>
            <h2>Quên mật khẩu</h2>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Gửi OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === "otp" && (
          <Form layout="inline" onFinish={handleVerifyOTP} style={{ justifyContent: "center" }}>
            <h2>Nhập OTP</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <Form.Item name="digit1" rules={[{ required: true }]}>
                <Input maxLength={1} style={{ width: 50, textAlign: "center" }} />
              </Form.Item>
              <Form.Item name="digit2" rules={[{ required: true }]}>
                <Input maxLength={1} style={{ width: 50, textAlign: "center" }} />
              </Form.Item>
              <Form.Item name="digit3" rules={[{ required: true }]}>
                <Input maxLength={1} style={{ width: 50, textAlign: "center" }} />
              </Form.Item>
              <Form.Item name="digit4" rules={[{ required: true }]}>
                <Input maxLength={1} style={{ width: 50, textAlign: "center" }} />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Xác nhận
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="link" onClick={handleResendOTP} disabled={loading}>
                  Gửi lại
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordFlow;

