import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [password, setPassword] = React.useState("");

  const requiredLabel = (label: string) => (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

  // Password rules checklist
  const passwordRules = [
    { label: "Mật khẩu phải có ít nhất 8 ký tự", test: (pw: string) => pw.length >= 8 },
    { label: "Mật khẩu phải có ít nhất 1 chữ thường [a-z]", test: (pw: string) => /[a-z]/.test(pw) },
    { label: "Mật khẩu phải có ít nhất 1 chữ hoa [A-Z]", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "Mật khẩu phải có ít nhất 1 số [0-9]", test: (pw: string) => /[0-9]/.test(pw) },
    { label: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*)", test: (pw: string) => /[!@#$%^&*]/.test(pw) },
  ];

  const validatePassword = (value: string) => {
    if (!value) return "Hãy nhập mật khẩu!";
    for (let rule of passwordRules) {
      if (!rule.test(value)) return `Mật khẩu chưa đạt yêu cầu: ${rule.label}`;
    }
    return "";
  };

  // ================== SUBMIT ==================
  const onFinish = async (values: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name: values.name,
          password: values.password,
          email: values.email,
          phoneNumber: values.phoneNumber,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201 || res.data?.statusCode === 201) {
        message.success("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);

      if (error.response && error.response.data) {
        let msgs = error.response.data.message;
        if (!Array.isArray(msgs)) msgs = [msgs];

        const fieldErrors: any[] = [];
        msgs.forEach((msg: string) => {
          if (msg.toLowerCase().includes("mật khẩu")) {
            fieldErrors.push({ name: "password", errors: [msg] });
          } else if (msg.toLowerCase().includes("email")) {
            fieldErrors.push({ name: "email", errors: [msg] });
          } else if (msg.toLowerCase().includes("tên đăng nhập")) {
            fieldErrors.push({ name: "name", errors: [msg] });
          } else if (msg.toLowerCase().includes("số điện thoại")) {
            fieldErrors.push({ name: "phoneNumber", errors: [msg] });
          } else {
            fieldErrors.push({ name: "name", errors: [msg] });
          }
        });

        form.setFields(fieldErrors);
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundImage:
          'linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)), url("/public/bg_login.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "16px",
      }}
    >
      <Row justify="center" align="middle" style={{ width: "100%", margin: 0 }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card
            title="Sign up"
            headStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            style={{
              width: "100%",
              borderRadius: 16,
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <Form
              form={form}
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              {/* Tên đăng nhập */}
              <Form.Item
                label={requiredLabel("Tên đăng nhập")}
                name="name"
                validateFirst={false}
                rules={[
                  { required: true, message: "Hãy nhập tên đăng nhập!" },
                  { min: 4, message: "Tên đăng nhập phải >= 4 ký tự" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" allowClear />
              </Form.Item>

              {/* Mật khẩu */}
              <Form.Item
                label={requiredLabel("Mật khẩu")}
                name="password"
                validateFirst={false}
                rules={[
                  { required: true, message: "Hãy nhập mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const error = validatePassword(value);
                      if (error) return Promise.reject(new Error(error));
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  allowClear
                />
              </Form.Item>

              {/* Password checklist */}
              <div style={{ textAlign: "left", marginTop: -10, marginBottom: 12 }}>
                {passwordRules.map((rule) => {
                  const isValid = rule.test(password);
                  return (
                    <div
                      key={rule.label}
                      style={{
                        color: isValid ? "green" : "gray",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      <span style={{ marginRight: 6 }}>{isValid ? "" : ""}</span>
                      {rule.label}
                    </div>
                  );
                })}
              </div>

              {/* Xác nhận mật khẩu */}
              <Form.Item
                label={requiredLabel("Xác nhận mật khẩu")}
                name="confirmPassword"
                dependencies={["password"]}
                validateFirst={false}
                hasFeedback
                rules={[
                  { required: true, message: "Hãy nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value)
                        return Promise.resolve();
                      return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Xác nhận mật khẩu"
                  allowClear
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label={requiredLabel("Email")}
                name="email"
                validateFirst={false}
                rules={[
                  { required: true, type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" allowClear />
              </Form.Item>

              {/* Số điện thoại */}
              <Form.Item
                label={requiredLabel("Số điện thoại")}
                name="phoneNumber"
                validateFirst={false}
                rules={[
                  { required: true, message: "Hãy nhập số điện thoại!" },
                  {
                    pattern: /^(0|\+84)\d{9}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" allowClear />
              </Form.Item>

              {/* Submit */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: "#46d9f6ff",
                    borderColor: "#46d9f6ff",
                    fontWeight: "bold",
                  }}
                  className="auth-btn"
                >
                  Đăng ký
                </Button>
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                Đã có tài khoản?{" "}
                <Button type="link" style={{ padding: 0 }} onClick={() => navigate("/login")}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <style>
        {`
          .auth-btn {
            transition: all 0.3s ease;
          }
          .auth-btn:hover {
            background-color: #30a4fdff !important;
            border-color: #30a4fdff !important;
          }
          .ant-form-item {
            margin-bottom: 12px !important;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
