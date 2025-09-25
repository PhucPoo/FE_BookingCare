import React, { useState, useEffect } from 'react';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, SaveOutlined } from '@ant-design/icons';
import './updateinfo.css';

interface UserProfile {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
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

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('Raw userData from localStorage:', userData);
    
    if (userData) {
      const user: UserProfile = JSON.parse(userData);
      console.log('Parsed user:', user);
      console.log('User dateOfBirth:', user.dateOfBirth);
      
      setFormData(prev => ({
        ...prev,
        id: user.id || 0,
        name: user.name || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || 'OTHER',
        cccd: user.cccd || ''
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Debug log cho dateOfBirth
    if (name === 'dateOfBirth') {
      console.log('DateOfBirth changed:', value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh hợp lệ');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Kích thước ảnh không được vượt quá 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    // Reset file input
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

    return true;
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
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập lại');
        setIsLoading(false);
        return;
      }

      // Create FormData to match API requirements
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
      
      if (formData.dateOfBirth) {
        console.log('Appending dateOfBirth:', formData.dateOfBirth);
        formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      } else {
        console.log('dateOfBirth is empty, not appending');
      }
      
      // Add file if selected
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }
      
      console.log('Current formData before submit:', formData);
      console.log('Sending data:', {
        id: formData.id,
        name: formData.name.trim(),
        phoneNumber: formData.phone.trim(),
        gender: formData.gender,
        address: formData.address.trim(),
        cccd: formData.cccd.trim(),
        dateOfBirth: formData.dateOfBirth,
        hasFile: !!selectedFile
      });
      
      const response = await fetch('http://localhost:8080/api/v1/accounts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data: UpdateResponse = await response.json();
      console.log('Response:', data);

      if (response.ok && data.statusCode === 200) {
        // Update successful
        localStorage.setItem('user', JSON.stringify(data.data));
        setSuccessMessage('Cập nhật thông tin thành công!');
        
        // Update form data with response data
        setFormData({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email || '',
          phone: data.data.phoneNumber || '',
          address: data.data.address || '',
          dateOfBirth: data.data.dateOfBirth || '',
          gender: data.data.gender || 'OTHER',
          cccd: data.data.cccd || ''
        });
        
        // Clear selected file
        setSelectedFile(null);
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
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="brand-title">BOOKING CARE</h1>
          <h2 className="page-title">Cập nhật thông tin cá nhân</h2>
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
              <div className="input-wrapper">
                <span className="input-icon">
                  <UserOutlined />
                </span>
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
            </div>

            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <PhoneOutlined />
                </span>
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
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">CCCD</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="cccd"
                  placeholder="Nhập số CCCD"
                  value={formData.cccd}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Ảnh đại diện</label>
              <div className="input-wrapper">
                <div className="file-upload-container">
                  <input
                    type="file"
                    name="file"
                    id="file-input"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-input" className="file-upload-button">
                    Choose File
                  </label>
                  
                  {selectedFile ? (
                    <div className="file-info-container">
                      <div className="file-info">
                        <small className="file-name">
                          {selectedFile.name}
                        </small>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="remove-file-btn"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <span>Chưa chọn file</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ngày sinh</label>
              <div className="input-wrapper">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="form-input date-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Giới tính</label>
              <div className="input-wrapper">
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
          </div>

          <div className="form-group full-width">
            <label className="form-label">Địa chỉ</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <HomeOutlined />
              </span>
              <textarea
                name="address"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleInputChange}
                className="form-textarea"
                rows={3}
              />
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
  );
};

export default ProfileUpdate;