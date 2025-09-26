import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "./login.css";
import { loginApi } from "../../api/auth/LoginApi";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import useUserInfoStore from "../../Zustand/configZustand";
import { toast } from "react-toastify";

interface LoginFormData {
  userName: string; // Changed from 'email' to 'userName'
  password: string;
}

interface LoginResponse {
  statusCode: number;
  error: any;
  message: string;
  data: {
    accessToken: string;
    userLogin: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userName: "", // Changed from 'email' to 'userName'
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error and success when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await useUserInfoStore.getState().loginZustand(formData);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <MainPageHeader />
      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <div className="illustration">
              <img
                src="/bg_1.png"
                alt="Login illustration"
                className="bg-image"
              />
            </div>
          </div>

          <div className="login-right">
            <div className="login-header">
              <h1 className="brand-title">BOOKING CARE</h1>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <h2 className="form-title">Đăng nhập</h2>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">
                    <UserOutlined />
                  </span>
                  <input
                    type="email"
                    name="userName" // Changed from 'email' to 'userName'
                    placeholder="Tên đăng nhập / Email"
                    value={formData.userName} // Changed from formData.email
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">
                    <LockOutlined />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <a href="#" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`login-button ${isLoading ? "loading" : ""}`}
              >
                {isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
              </button>

              <div className="signup-link">
                <span>Bạn chưa có tài khoản? </span>
                <a href="#" className="signup-text">
                  Đăng ký
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
