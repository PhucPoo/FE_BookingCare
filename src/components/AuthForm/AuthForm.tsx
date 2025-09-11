import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  DatePicker,
  Select,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  checkLogin,
  registerUser,
  validatePassword,
  validateCCCD,
  validatePhone,
} from "../../utils/AuthHelper/AuthHelper";

interface AuthFormProps {
  role: "admin" | "doctor" | "support" | "client";
  type: "login" | "signup";
}

const roleConfig = {
  admin: { color: "#46d9f6ff", bg: "/bg_admin.jpg" },
  doctor: { color: "#46d9f6ff", bg: "/bg_doctor.jpg" },
  support: { color: "#46d9f6ff", bg: "/bg_support.jpg" },
  client: { color: "#46d9f6ff", bg: "/bg_client.jpg" },
};

const AuthForm: React.FC<AuthFormProps> = ({ role, type }) => {
  const { color } = roleConfig[role];
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    if (type === "login") {
      if (!checkLogin(values.username, values.password)) {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
        return;
      }
      alert(`Đăng nhập thành công!`);
    } else {
      if (!validatePassword(values.password)) {
        alert("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
      }
      if (!validateCCCD(values.cccd)) {
        alert("CCCD phải đúng 12 số!");
        return;
      }
      if (!validatePhone(values.phone)) {
        alert("Số điện thoại phải đúng 10 số!");
        return;
      }
      if (!registerUser(values.username, values.password)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
      }
      alert(`Đăng ký thành công!`);
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
            title={type === "login" ? "Login" : "Sign up"}
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
              name={`${role}_${type}`}
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tên đăng nhập"
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  allowClear
                />
              </Form.Item>

              {type === "signup" && role === "client" && (
                <>
                  <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: "Hãy nhập lại mật khẩu!" }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Xác nhận mật khẩu"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, type: "email", message: "Hãy nhập email!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" allowClear />
                  </Form.Item>

                  <Form.Item
                    name="cccd"
                    rules={[{ required: true, message: "Hãy nhập số CCCD!" }]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="Số căn cước công dân"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item name="phone">
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Số điện thoại (Không bắt buộc)"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item name="address">
                    <Input
                      prefix={<HomeOutlined />}
                      placeholder="Địa chỉ (Không bắt buộc)"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    rules={[{ required: true, message: "Hãy chọn giới tính!" }]}
                  >
                    <Select placeholder="Giới tính">
                      <Select.Option value="male">Nam</Select.Option>
                      <Select.Option value="female">Nữ</Select.Option>
                      <Select.Option value="other">Khác</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="dob">
                    <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              {type === "login" && (
                <Form.Item>
                  <Checkbox style={{ float: "left" }}>Remember me</Checkbox>
                  <a
                    style={{ float: "right" }}
                    onClick={() => navigate(`/${role}/forgot-password`)}
                  >
                    Forgot password?
                  </a>
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: color,
                    borderColor: color,
                    fontWeight: "bold",
                  }}
                  className="auth-btn"
                >
                  {type === "login" ? "Login" : "Sign up"}
                </Button>
              </Form.Item>

            {role === "client" && (
              <Form.Item style={{ textAlign: "center" }}>
                {type === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <Button
                      type="link"
                      style={{ padding: 0 }}
                      onClick={() => navigate(`/${role}/signup`)}
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button
                      type="link"
                      style={{ padding: 0 }}
                      onClick={() => navigate(`/${role}/login`)}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Form.Item>
            )}
            </Form>
          </Card>
        </Col>
      </Row>

      {/* CSS riêng cho hover nút */}
      <style>
        {`
          .auth-btn {
            transition: all 0.3s ease;
          }
          .auth-btn:hover {
            background-color: #30a4fdff !important;
            border-color: #30a4fdff !important;
          }
        `}
      </style>
    </div>
  );
};

export default AuthForm;
