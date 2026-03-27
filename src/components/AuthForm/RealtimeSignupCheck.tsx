import React, { useState } from "react";

interface ValidationResult {
  email: string;
  phoneNumber: string;
  password: string;
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^[0-9]{10,11}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function validateSignup(formData: {
  email: string;
  phoneNumber: string;
  password: string;
}): ValidationResult {
  const result: ValidationResult = { email: "", phoneNumber: "", password: "" };

  // Email validation
  if (!formData.email) {
    result.email = "Email không được để trống.";
  } else if (!emailRegex.test(formData.email)) {
    result.email = "Email không đúng định dạng.";
  }

  // Phone validation
  if (!formData.phoneNumber) {
    result.phoneNumber = "Số điện thoại không được để trống.";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    result.phoneNumber = "Số điện thoại phải có 10-11 số.";
  }

  // Password validation
  if (!formData.password) {
    result.password = "Mật khẩu không được để trống.";
  } else if (!passwordRegex.test(formData.password)) {
    result.password =
      "Mật khẩu phải từ 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.";
  }

  return result;
}

export const RealtimeSignupCheck: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationResult>({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [backendError, setBackendError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validateSignup({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSignup(formData);
    setErrors(validation);
    if (validation.email || validation.phoneNumber || validation.password)
      return;
    try {
      // Replace with your backend API call
      // const response = await axios.post("/api/register", formData);
      // if (response.status !== 200) throw new Error(response.data.message);
      setBackendError("");
      alert("Đăng ký thành công!");
    } catch (err: any) {
      setBackendError(err.message || "Lỗi server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Số điện thoại"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <span className="error">{errors.phoneNumber}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Đăng ký</button>
      {backendError && <div className="error">{backendError}</div>}
    </form>
  );
};
