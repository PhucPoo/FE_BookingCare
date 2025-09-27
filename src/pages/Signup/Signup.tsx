import React, { useState } from "react";
import { Form, Input, Button, message } from "antd/lib";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Password validation state
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPasswordValid({
      length: val.length >= 8,
      uppercase: /[A-Z]/.test(val),
      lowercase: /[a-z]/.test(val),
      number: /[0-9]/.test(val),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(val),
    });
  };

  const onFinish = async (values: any) => {
    // setLoading(true);
    console.log("Email:", values.email);
    console.log("pw:", values.password);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        }
      );
      console.log(res.data);

      if (res.status === 201 || res.data?.statusCode === 201) {
        message.success("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      const msg: string =
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      const formErrors: any[] = [];

      // Phân tích message để gán lỗi từng field
      if (msg.toLowerCase().includes("email")) {
        formErrors.push({ name: "email", errors: [msg] });
      }
      if (
        msg.toLowerCase().includes("số điện thoại") ||
        msg.toLowerCase().includes("phone")
      ) {
        formErrors.push({ name: "phoneNumber", errors: [msg] });
      }

      if (formErrors.length > 0) {
        form.setFields(formErrors);
      } else {
        message.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src="/bg_signup.png" alt="Signup illustration" />
        </div>

        <div className="signup-right">
          <h2 className="signup-title">Đăng ký</h2>

          <Form
            form={form}
            layout="vertical"
            name="signup"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Email không hợp lệ!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="PhoneNumber" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password"
                onChange={handlePasswordChange}
              />
            </Form.Item>

            <div style={{ marginBottom: 16 }}>
              <p style={{ color: passwordValid.length ? "green" : "red" }}>
                • Mật khẩu có ít nhất 8 ký tự
              </p>
              <p style={{ color: passwordValid.uppercase ? "green" : "red" }}>
                • Mật khẩu có ít nhất 1 chữ hoa
              </p>
              <p style={{ color: passwordValid.lowercase ? "green" : "red" }}>
                • Mật khẩu có ít nhất 1 chữ thường
              </p>
              <p style={{ color: passwordValid.number ? "green" : "red" }}>
                • Mật khẩu có ít nhất 1 số
              </p>
              <p style={{ color: passwordValid.special ? "green" : "red" }}>
                • Mật khẩu có ít nhất 1 ký tự đặc biệt
              </p>
            </div>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Hãy xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="signup-btn"
                loading={loading}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          <div className="signup-footer">
            Đã có tài khoản? <a onClick={() => navigate("/login")}>Đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
