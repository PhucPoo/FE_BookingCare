import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Steps, Alert, Typography, Card } from 'antd/lib';
import { MailOutlined, LockOutlined, SafetyOutlined, CheckCircleTwoTone, EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
import './ForgotPasswordForm.css';

const { Title, Text } = Typography;
const { Step } = Steps;

const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

// Gửi OTP về email
const forgotPasswordAPI = async (email: string) => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/auth/forgot-password-send-email?email=${encodeURIComponent(email)}`,
      { method: 'GET' }
    );
    let data: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }
    if (response.ok) {
      return { success: true, message: data.message || 'OTP đã được gửi đến email của bạn' };
    } else {
      return { success: false, message: data.message || 'Có lỗi xảy ra khi gửi email' };
    }
  } catch (error) {
    return { success: false, message: 'Không thể kết nối đến server' };
  }
};

// Xác thực OTP
const verifyOtpAPI = async (email: string, otp: string) => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch(
      'http://localhost:8080/api/v1/auth/forgot-verify-otp',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: otp, email }),
      }
    );
    let data: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }
    if (response.ok) {
      return { success: true, message: data.message || 'OTP xác thực thành công' };
    } else {
      return { success: false, message: data.message || 'OTP không đúng' };
    }
  } catch (error) {
    return { success: false, message: 'Không thể kết nối đến server1' };
  }
};

// Đổi mật khẩu mới
const saveNewPasswordAPI = async (email: string, password: string) => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch(
      'http://localhost:8080/api/v1/auth/forgot-password',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      }
    );
    let data: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }
    if (response.ok) {
      return { success: true, message: data.message || 'Mật khẩu đã được cập nhật thành công' };
    } else {
      return { success: false, message: data.message || 'Có lỗi khi cập nhật mật khẩu' };
    }
  } catch (error) {
    return { success: false, message: 'Không thể kết nối đến server' };
  }
};

  const handleEmailSubmit = async () => {
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }
    const res = await forgotPasswordAPI(email);
    setLoading(false);
    if (res.success) {
      setStep('otp');
      setOtpTimer(60);
    } else {
      setError(res.message);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp) {
      setError('Vui lòng nhập mã OTP');
      return;
    }
    const res = await verifyOtpAPI(email, otp);
    setLoading(false);
    if (res.success) {
      setStep('newPassword');
    } else {
      setError(res.message);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    const res = await saveNewPasswordAPI(email, newPassword);
    setLoading(false);
    if (res.success) {
      setStep('success');
    } else {
      setError(res.message);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;
    await forgotPasswordAPI(email);
    setOtpTimer(60);
    setError('');
    setLoading(false);
  };

  const goBack = () => {
    setError('');
    if (step === 'otp') {
      setStep('email');
      setOtp('');
    } else if (step === 'newPassword') {
      setStep('otp');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setOtpTimer(0);
  };

  return (
    <div className="forgot-bg">
      <Card className="forgot-container" bordered={false}>
        {step !== 'success' && (
          <Steps current={['email', 'otp', 'newPassword'].indexOf(step)} className="forgot-steps" size="small">
            <Step icon={<MailOutlined />} />
            <Step icon={<SafetyOutlined />} />
            <Step icon={<LockOutlined />} />
          </Steps>
        )}

        {step === 'email' && (
          <Form layout="vertical" onFinish={handleEmailSubmit} autoComplete="off">
            <div className="forgot-icon"><MailOutlined /></div>
            <Title level={3} className="forgot-title">Quên mật khẩu?</Title>
            <Text className="forgot-desc">Nhập email để nhận mã xác thực</Text>
            <Form.Item label="Email" className="forgot-label" required>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                disabled={loading}
                size="large"
              />
            </Form.Item>
            {error && <Alert type="error" message={error} showIcon className="forgot-error" />}
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} size="large">
                Gửi mã OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 'otp' && (
          <Form layout="vertical" onFinish={handleOtpSubmit} autoComplete="off">
            <div className="forgot-icon"><SafetyOutlined /></div>
            <Title level={3} className="forgot-title">Xác thực OTP</Title>
            <Text className="forgot-desc">Mã xác thực đã được gửi đến <b>{email}</b></Text>
            <Form.Item label="Mã OTP" className="forgot-label" required>
              <Input
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Nhập mã OTP"
                maxLength={6}
                disabled={loading}
                size="large"
              />
            </Form.Item>
            {error && <Alert type="error" message={error} showIcon className="forgot-error" />}
            <div className="forgot-otp-actions">
              <Button type="link" onClick={handleResendOtp} disabled={otpTimer > 0 || loading}>
                {otpTimer > 0 ? `Gửi lại sau ${otpTimer}s` : 'Gửi lại mã OTP'}
              </Button>
            </div>
            <div className="forgot-btn-group">
              <Button icon={<ArrowLeftOutlined />} onClick={goBack} disabled={loading}>
                Quay lại
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Xác thực
              </Button>
            </div>
          </Form>
        )}

        {step === 'newPassword' && (
          <Form layout="vertical" onFinish={handlePasswordSubmit} autoComplete="off">
            <div className="forgot-icon"><LockOutlined /></div>
            <Title level={3} className="forgot-title">Đặt mật khẩu mới</Title>
            <Text className="forgot-desc">Tạo mật khẩu mới cho tài khoản của bạn</Text>
            <Form.Item label="Mật khẩu mới" className="forgot-label" required>
              <Input.Password
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                size="large"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item label="Xác nhận mật khẩu" className="forgot-label" required>
              <Input.Password
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                size="large"
                disabled={loading}
              />
            </Form.Item>
            {error && <Alert type="error" message={error} showIcon className="forgot-error" />}
            <div className="forgot-btn-group">
              <Button icon={<ArrowLeftOutlined />} onClick={goBack} disabled={loading}>
                Quay lại
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật mật khẩu
              </Button>
            </div>
          </Form>
        )}

        {step === 'success' && (
          <div className="forgot-success">
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />
            <Title level={3} className="forgot-title">Thành công!</Title>
            <Text className="forgot-desc">
              Mật khẩu của bạn đã được cập nhật thành công.<br />
              Bạn có thể đăng nhập với mật khẩu mới.
            </Text>
            <Button type="primary" block style={{ marginTop: 24 }} onClick={resetForm}>
              Quay lại đăng nhập
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;