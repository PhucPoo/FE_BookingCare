import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SaveOutlined } from '@ant-design/icons';
import './updateinfo.css';
import useUserInfoStore from '../../Zustand/configZustand';

interface UserProfile {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  birth?: string; // Backend sử dụng "birth" thay vì "dateOfBirth"
  gender?: string;
  cccd?: string;
  roleId?: number;
}

interface FormData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  cccd: string;
}

interface UpdateResponse {
  statusCode: number;
  error: any;
  message: string;
  data: UserProfile;
}

const ProfileUpdate: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore(state => state.userInfo);
  const updateUserInfo = useUserInfoStore(state => state.updateUserInfo);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: 'OTHER',
    cccd: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load user data from Zustand store
  useEffect(() => {
    console.log('User info from Zustand:', userInfo);
    
    if (userInfo && userInfo.id) {
      setFormData(prev => ({
        ...prev,
        id: userInfo.id || 0,
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phoneNumber || '',
        address: userInfo.address || '',
        dateOfBirth: userInfo.dateOfBirth || '',
        gender: userInfo.gender || 'OTHER',
        cccd: userInfo.cccd || ''
      }));
    }
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dateOfBirth') {
      console.log('DateOfBirth changed:', value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh hợp lệ');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Kích thước ảnh không được vượt quá 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    const fileInput = document.querySelector('input[name="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Họ tên không được để trống');
      return false;
    }

    if (formData.phone && !/^(0[0-9]{9})$/.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng 0)');
      return false;
    }

    // Validate dateOfBirth
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      
      if (birthDate > today) {
        setError('Ngày sinh không được lớn hơn ngày hiện tại');
        return false;
      }
    }

    return true;
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const token = getCookie('access_token');
        
      if (!token) {
        setError('Vui lòng đăng nhập lại');
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id.toString());
      formDataToSend.append('name', formData.name.trim());
      
      if (formData.phone.trim()) {
        formDataToSend.append('phoneNumber', formData.phone.trim());
      }
      
      if (formData.gender) {
        formDataToSend.append('gender', formData.gender);
      }
      
      if (formData.address.trim()) {
        formDataToSend.append('address', formData.address.trim());
      }
      
      if (formData.cccd.trim()) {
        formDataToSend.append('cccd', formData.cccd.trim());
      }
      
      // CRITICAL FIX: Backend sử dụng "birth" thay vì "dateOfBirth"
      if (formData.dateOfBirth && formData.dateOfBirth.trim()) {
        console.log('Sending birth field:', formData.dateOfBirth);
        formDataToSend.append('birth', formData.dateOfBirth.trim());
      }
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }
      
      // Debug: Log FormData contents
      console.log('FormData being sent:');
      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      
      const response = await fetch('http://localhost:8080/api/v1/accounts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data: UpdateResponse = await response.json();
      console.log('Full Response:', data);
      console.log('Response birth field:', data.data?.birth);

      if (response.ok && data.statusCode === 200) {
        const updatedUserInfo = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email || '',
          phoneNumber: data.data.phoneNumber || '',
          address: data.data.address || '',
          dateOfBirth: data.data.birth || '', 
          gender: data.data.gender || 'OTHER',
          cccd: data.data.cccd || ''
        };
        if (response.ok && data.statusCode === 200) {
          alert('Cập nhật thông tin thành công!');
          navigate('/');
        }
        
        console.log('Updating Zustand with:', updatedUserInfo);
        updateUserInfo(updatedUserInfo);
        
        setSuccessMessage('Cập nhật thông tin thành công!');
        
        // Update form data với dữ liệu từ response
        setFormData({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email || '',
          phone: data.data.phoneNumber || '',
          address: data.data.address || '',
          dateOfBirth: data.data.birth || '', // Map birth -> dateOfBirth
          gender: data.data.gender || 'OTHER',
          cccd: data.data.cccd || ''
        });
        
        setSelectedFile(null);
        
        // Verify Zustand update after a brief delay
        setTimeout(() => {
          const currentUserInfo = useUserInfoStore.getState().userInfo;
          console.log('Zustand after update:', currentUserInfo);
          console.log('dateOfBirth in Zustand:', currentUserInfo.dateOfBirth);
        }, 100);
      } else {
        setError(data.message || 'Cập nhật thông tin thất bại');
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      console.error('Update profile error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='body'>
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <h1 className="brand-title" style={{textAlign: 'center'}}>BOOKING CARE</h1>
              <h2 className="page-title" style={{textAlign: 'center'}}>Cập nhật thông tin cá nhân</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="profile-form">
              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
              
              <div className="form-row">
                <div className="form-group full-width" style={{ textAlign: 'center' }}>
                  <label className="form-label">ID người dùng</label>
                  <div className="input-wrapper" style={{ maxWidth: '200px', margin: '0 auto' }}>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      readOnly
                      disabled
                      className="form-input readonly"
                      style={{
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                        cursor: 'not-allowed',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    />
                  </div>
                </div>
              </div>

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
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
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

                <div className="form-group">
                  <label className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group avatar-group">
                  <label className="form-label">Ảnh đại diện</label>

                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      id="file-input"
                      name="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file-input" className="file-upload-button">
                      Choose File
                    </label>

                    {selectedFile && (
                      <span className="file-name">{selectedFile.name}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`update-button ${isLoading ? 'loading' : ''}`}
                >
                  <SaveOutlined />
                  {isLoading ? 'ĐANG CẬP NHẬT...' : 'CẬP NHẬT THÔNG TIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default ProfileUpdate;