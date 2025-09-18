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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const roleConfig: Record<
  string,
  { color: string; bg: string }
> = {
  admin: { color: "#46d9f6ff", bg: "/bg_admin.jpg" },
  doctor: { color: "#46d9f6ff", bg: "/bg_doctor.jpg" },
  support: { color: "#46d9f6ff", bg: "/bg_support.jpg" },
  client: { color: "#46d9f6ff", bg: "/bg_client.jpg" },
};

const AuthForm: React.FC = () => {
  const { role = "client", type = "login" } = useParams<{
    role: string;
    type: string;
  }>();

  const { color } = roleConfig[role] || roleConfig["client"];
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      if (type === "login") {
        // gọi API login
        const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
          userName: values.userName, // backend yêu cầu username
          password: values.password,
        });

        if (res.data?.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          alert("Đăng nhập thành công!");
          // Chuyển hướng tuỳ role
          navigate(`/${role}/dashboard`);
        } else {
          alert("Đăng nhập thất bại!");
        }
      } else {
        // gọi API signup
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
          userName: values.userName,
          password: values.password,
          email: values.email,
          cccd: values.cccd,
          phoneNumber: values.phoneNumber,
          address: values.address,
          gender: values.gender,
          birth: values.birth ? values.birth.format("YYYY-MM-DD") : null,

        }, {
          headers: { "Content-Type": "application/json" }
        });


        if (res.data?.statusCode === 201) {
          alert("Đăng ký thành công!");
          navigate(`/${role}/login`);
        } else {
          alert(res.data?.message || "Đăng ký thất bại!");
        }
      }
    } catch (error: any) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
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
                name="userName"
                rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tên đăng nhập / Email"
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
                name="userName"
                rules={[{ required: true, message: "Hãy nhập họ tên!" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Họ và tên"
                  allowClear
                />
              </Form.Item>

              <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Hãy nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
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


              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Hãy nhập email!" }]}
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

              <Form.Item name="phoneNumber">
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

              <Form.Item name="birth">
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
