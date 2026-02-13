import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./login.css";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import useUserInfoStore from "../../Zustand/configZustand";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

interface LoginFormData {
  userName: string; // Changed from 'email' to 'userName'
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

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
      const res = await useUserInfoStore.getState().loginZustand(formData);

      if (res && res.userLogin) {
        toast.success("Đăng nhập thành công");

        if (res.userLogin.role === "CLIENT") {
          navigate("/");
          return;
        }
        navigate(`/${res.userLogin.role.toLowerCase()}-dashboard`);
      }
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
          <div className="login-right">
            <form onSubmit={handleSubmit} className="login-form ">
              <h2 className="form-title">Đăng nhập</h2>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <div className="input-wrapper">
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
                <a href="forgot-password" className="forgot-password">
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
                <a href="signup" className="signup-text">
                  Đăng ký
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;