import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import "./signup.css";
import { validateSignup } from "../../components/AuthForm/RealtimeSignupCheck";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import Footer from "../../components/Footer/Footer";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleComnfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    let fieldError = "";
    if (name === "email") {
      if (!value) fieldError = "Email không được để trống.";
      else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
        fieldError = "Email không đúng định dạng.";
      setErrors({ ...errors, email: fieldError });
    }

    if (name === "phoneNumber") {
      if (!value) fieldError = "Số điện thoại không được để trống.";
      else if (!/^[0-9]{10,11}$/.test(value))
        fieldError = "Số điện thoại phải có 10-11 số.";
      setErrors({ ...errors, phoneNumber: fieldError });
    }

    if (name === "password") {
      if (!value) fieldError = "Mật khẩu không được để trống.";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
          value
        )
      ) {
        fieldError =
          "Mật khẩu phải từ 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.";
      }
      setErrors({ ...errors, password: fieldError });
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateSignup(formData);
    setErrors(validation);

    if (validation.email || validation.phoneNumber || validation.password) {
      alert("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          ...formData,
          roleId: 2,
        }
      );

      if (response.status === 200) {
        navigate("/auth/verify-otp", {
          state: {
            email: formData.email,
            password: formData.password,
          },
        });
      } else {
        alert("Đăng ký thất bại!");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Lỗi server");
    } finally {
      setLoading(false);
    }
  };
  sessionStorage.setItem("reg_name", formData.name);
  sessionStorage.setItem("reg_phone", formData.phoneNumber);
  sessionStorage.setItem("reg_password", formData.password);
  return (
    <div>
      <MainPageHeader />
      <div className="body">
        <div className="signup-container">
          <div className="signup-card">
            {/* Right section with form */}
            <div className="signup-right">
              <div className="signup-header">
                <h1 className="brand-title">BookingCare</h1>
                <h2 className="form-title">Tạo tài khoản mới</h2>
              </div>

              <form className="signup-form" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      placeholder="Họ và tên"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Địa chỉ email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Số điện thoại"
                      className="form-input"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="error-message">{errors.phoneNumber}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Mật khẩu"
                      className="form-input"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      className="form-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={toggleComnfirmPasswordVisibility}
                      className="password-toggle"
                    >
                      {showConfirmPassword ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeTwoTone />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`signup-button ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng ký"}
                </button>
              </form>

              <div className="login-link">
                Đã có tài khoản?{" "}
                <a href="login" className="login-text">
                  Đăng nhập ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
