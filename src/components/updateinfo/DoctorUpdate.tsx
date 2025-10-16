import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import "./updateinfo.css";
import useUserInfoStore from "../../Zustand/configZustand";
import MainPage from "../../pages/MainPage/MainPage";
import MainPageHeader from "../../pages/MainPage/MainPageHeader/MainPageHeader";
import Footer from "../UI/Footer";
import { Button, Form, Upload } from "antd/lib";
import { toast } from "react-toastify";
import customAxiosInstance from "../../utils/configAxios";

interface UserProfile {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  birth?: string;
  gender?: string;
  cccd?: string;
  roleId?: number;
  avatar?: string;
}

interface FormData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  cccd: string;
  avatar?: string;
}

interface UpdateResponse {
  statusCode: number;
  error: any;
  message: string;
  data: UserProfile;
}

const ProfileUpdate: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore((state) => state.userInfo);
  console.log("User Info in AdminUpdate:", userInfo);
  const updateUserInfo = useUserInfoStore((state) => state.updateUserInfo);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "OTHER",
    cccd: "",
    avatar: "",
  });
  const [fileList, setFileList] = useState<any[]>([]);
  console.log("FileList:", fileList);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load user data from Zustand store
  const hanbdleLoadUserData =async () => {
 if (userInfo && userInfo.id) {
         // Sau khi cập nhật xong → gọi lại GET để lấy data mới nhất
          const refreshedRes = await customAxiosInstance("http://localhost:8080/api/v1/accounts/"+userInfo.id,
          );
          console.log("Refreshed Response:", refreshedRes);
      setFormData(refreshedRes.data.data);
      if (refreshedRes.data.data.avatar) {
        setFileList([
          {
            uid: "-1",
            name: "avatar.png",
            status: "done",
            url: refreshedRes.data.data.avatar,
            thumbUrl: refreshedRes.data.data.avatar,
          },
        ]);
      }
      setFile(null);
    }
  }
  useEffect( () => {
    
   hanbdleLoadUserData()
  }, [userInfo]);


  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      console.log("DateOfBirth changed:", value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Họ tên không được để trống");
      return false;
    }

    if (formData.phoneNumber && !/^(0[0-9]{9})$/.test(formData.phoneNumber)) {
      setError(
        "Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng 0)"
      );
      return false;
    }

    // Validate dateOfBirth
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate > today) {
        setError("Ngày sinh không được lớn hơn ngày hiện tại");
        return false;
      }
    }

    return true;
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const token = getCookie("access_token");
      if (!token) {
        setError("Vui lòng đăng nhập lại");
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id.toString());
      formDataToSend.append("name", formData.name.trim());

      if (formData.phoneNumber.trim()) {
        formDataToSend.append("phoneNumber", formData.phoneNumber.trim());
      }

      if (formData.gender) {
        formDataToSend.append("gender", formData.gender);
      }

      if (formData.address.trim()) {
        formDataToSend.append("address", formData.address.trim());
      }

      if (formData.cccd.trim()) {
        formDataToSend.append("cccd", formData.cccd.trim());
      }
      // CRITICAL FIX: Backend sử dụng "birth" thay vì "dateOfBirth"
      if (formData.dateOfBirth && formData.dateOfBirth.trim()) {
        console.log("Sending birth field:", formData.dateOfBirth);
        formDataToSend.append("birth", formData.dateOfBirth.trim());
      }

      if (file) {
        formDataToSend.append("file", file);
      }

      // Debug: Log FormData contents
      console.log("FormData being sent:");
      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await fetch("http://localhost:8080/api/v1/accounts", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
    
      const data: UpdateResponse = await response.json();
      console.log("Full Response:", data);
    //   console.log("Response birth field:", data.data?.birth);

      if (response.ok && data.statusCode === 200) {
        const updatedUserInfo = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email || "",
          phoneNumber: data.data.phoneNumber || "",
          address: data.data.address || "",
          dateOfBirth: data.data.birth || "",
          gender: data.data.gender || "OTHER",
          cccd: data.data.cccd || "",
          avatar: data.data.avatar || "",
        };
        if (response.ok && data.statusCode === 200) {
          toast.success("Cập nhật thông tin thành công!");
          setFormData(data);
          
          console.log("test");
        }

        console.log("Updating Zustand with:", updatedUserInfo);
        updateUserInfo(updatedUserInfo);

        setSuccessMessage("Cập nhật thông tin thành công!");
        navigate("/doctor-dashboard");

        // Update form data với dữ liệu từ response
        setFormData({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email || "",
          phoneNumber: data.data.phoneNumber || "",
          address: data.data.address || "",
          dateOfBirth: data.data.birth || "", // Map birth -> dateOfBirth
          gender: data.data.gender || "OTHER",
          cccd: data.data.cccd || "",
        });

        setFile(null);

        // Verify Zustand update after a brief delay
        setTimeout(() => {
          const currentUserInfo = useUserInfoStore.getState().userInfo;
          console.log("Zustand after update:", currentUserInfo);
          console.log("dateOfBirth in Zustand:", currentUserInfo.dateOfBirth);
        }, 100);
      } else {
        setError(data.message || "Cập nhật thông tin thất bại");
      }
    } catch (error) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
      console.error("Update profile error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <MainPageHeader /> */}
      <div className="updateinfo-body">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              {/* <h1 className="brand-title" style={{ textAlign: 'center' }}>BOOKING CARE</h1> */}
              <h2 className="brand-title" style={{ textAlign: "center" }}>
                Cập nhật thông tin cá nhân
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Nhập địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    pattern="^(0[0-9]{9})$"
                    title="Số điện thoại phải có 10 chữ số và bắt đầu bằng 0"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Giới tính</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Căn cước công dân</label>
                  <input
                    type="text"
                    name="cccd"
                    placeholder="Nhập số CCCD"
                    value={formData.cccd}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                {/* <div className="form-group">
                  <label className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div> */}
              </div>

              <div className="form-row">
                <div className="form-group avatar-group">
                  {/* <label className="form-label">Ảnh đại diện</label> */}

                  <div className="file-upload-wrapper">
                    <Form.Item label="Ảnh đại diện: ">
                      <Upload
                        style={{width: "300px",}}
                        beforeUpload={() => false}
                        onChange={handleUploadChange}
                        fileList={fileList}
                        maxCount={1}
                        listType="picture"
                        showUploadList={{
                          showRemoveIcon: false,
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                      </Upload>
                      {/* {file && <p className="mt-2 text-sm text-gray-500">Ảnh: {file.name}</p>} */}
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`update-button ${isLoading ? "loading" : ""}`}
                >
                  <SaveOutlined />
                  {isLoading ? "ĐANG CẬP NHẬT..." : "CẬP NHẬT THÔNG TIN"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProfileUpdate;
