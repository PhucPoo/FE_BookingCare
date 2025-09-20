import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  DatePicker,
  Select,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name: values.name,
          password: values.password,
          email: values.email,
          phoneNumber: values.phoneNumber,
          cccd: values.cccd,
          address: values.address,
          gender: values.gender,
          birth: values.birth ? values.birth.format("YYYY-MM-DD") : null,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data?.statusCode === 201) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        alert(res.data?.message || "Đăng ký thất bại!");
      }
    } catch (error: any) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const requiredLabel = (label: string) => (
    <span>
      {label} <span style={{ color: "red" }}>*</span>
    </span>
  );

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
            <Form name="signup" layout="vertical" onFinish={onFinish} size="large">
              {/* Tên đăng nhập */}
              <Form.Item
                className="compact-form-item"
                label={requiredLabel("Tên đăng nhập")}
                name="name"
                rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" allowClear />
              </Form.Item>

              {/* Mật khẩu */}
              <Form.Item
                className="compact-form-item"
                label={requiredLabel("Mật khẩu")}
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" allowClear />
              </Form.Item>

              {/* Xác nhận mật khẩu */}
              <Form.Item
                className="compact-form-item"
                label={requiredLabel("Xác nhận mật khẩu")}
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
                <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" allowClear />
              </Form.Item>

              {/* Email */}
              <Form.Item
                className="compact-form-item"
                label={requiredLabel("Email")}
                name="email"
                rules={[{ required: true, type: "email", message: "Hãy nhập email!" }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" allowClear />
              </Form.Item>

              {/* Số điện thoại (optional) */}
              <Form.Item className="compact-form-item" label="Số điện thoại" name="phoneNumber">
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại (không bắt buộc)" allowClear />
              </Form.Item>

              {/* CCCD (optional) */}
              <Form.Item className="compact-form-item" label="CCCD" name="cccd">
                <Input prefix={<IdcardOutlined />} placeholder="Số CCCD" allowClear />
              </Form.Item>

              {/* Địa chỉ (optional) */}
              <Form.Item className="compact-form-item" label="Địa chỉ" name="address">
                <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" allowClear />
              </Form.Item>

              {/* Giới tính */}
              <Form.Item
                className="compact-form-item"
                label={requiredLabel("Giới tính")}
                name="gender"
                rules={[{ required: true, message: "Hãy chọn giới tính!" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>

              {/* Ngày sinh (optional) */}
              <Form.Item className="compact-form-item" label="Ngày sinh" name="birth">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" placeholder="Ngày sinh" />
              </Form.Item>

              {/* Nút Đăng ký */}
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
                  Sign up
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