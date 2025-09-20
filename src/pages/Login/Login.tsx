import React from "react";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        userName: values.userName,
        password: values.password,
      });

      if (res.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        alert("Đăng nhập thành công!");

        const user = res.data.data.user;
        if (user?.role) {
          navigate(`/${user.role}/dashboard`);
        } else {
          navigate("/");
        }
      } else {
        alert("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
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
            title="Login"
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
            <Form name="login" layout="vertical" onFinish={onFinish} size="large">
              <Form.Item
                name="userName"
                rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập / Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Checkbox style={{ float: "left" }}>Remember me</Checkbox>
                <a style={{ float: "right" }} onClick={() => navigate("/forgot-password")}>
                  Forgot password?
                </a>
              </Form.Item>

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
                  Login
                </Button>
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                Chưa có tài khoản?{" "}
                <Button type="link" style={{ padding: 0 }} onClick={() => navigate("/signup")}>
                  Sign up
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
        `}
      </style>
    </div>
  );
};

export default Login;
