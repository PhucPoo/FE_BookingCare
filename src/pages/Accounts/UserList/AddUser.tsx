import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Form, DatePicker, Row, Col } from "antd/lib";
import { notification } from "antd";
import type { User } from "../UserList/UserTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import type { Specialty } from "../../Specialty/SpecialtyTable";
import { testPostAccountsApi } from "../../../api/testApi";
import { testGetClinicApi } from "../../../api/testClinic";
import { testGetSpecialtyApi } from "../../../api/testSpecialty";
import { testPostDoctorApi } from "../../../api/testDoctor";
import { testPostSupportApi } from "../../../api/testSupport";
import { testPostPatientApi } from "../../../api/testPatient";

const { Option } = Select;

interface AddUserProps {
  open: boolean;
  onCancel: () => void;
  users: User[];
  setusers: (users: User[]) => void;
}

const AddUser: React.FC<AddUserProps> = ({ users, setusers, open, onCancel }) => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [step, setStep] = useState(1);
  const [createdAccount, setCreatedAccount] = useState<any>(null);

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  // Load dropdown khi chọn role
  useEffect(() => {
    if (selectedRole === 2) {
      Promise.all([testGetClinicApi(), testGetSpecialtyApi()])
        .then(([clinicRes, specialtyRes]) => {
          setClinics(clinicRes.data.result || []);
          setSpecialties(specialtyRes.data.result || []);
        })
        .catch((err) => console.error("Fetch dropdown failed:", err));
    } else if (selectedRole === 3) {
      testGetClinicApi()
        .then((clinicRes) => setClinics(clinicRes.data.result || []))
        .catch((err) => console.error("Fetch clinic failed:", err));
    }
  }, [selectedRole]);

  const getErrorMessage = (err: any, fallback = "Có lỗi xảy ra") => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data?.errors?.[0] ||
      err?.message ||
      fallback
    );
  };

  // modal 1: Tạo account
  const handleNextStep = async () => {
    try {
      const values = await formStep1.validateFields();
      const accountRes = await testPostAccountsApi(values);
      const account = accountRes.data?.data || accountRes;

      setCreatedAccount(account);
      setStep(2);
    } catch (err: any) {
      notification.error({
        message: "Lỗi tạo Account",
        description: getErrorMessage(err),
      });
    }
  };

  // modal2: Thêm theo role
  const handleSubmit = async () => {
    try {
      const values = await formStep2.validateFields();

      if (!createdAccount) {
        notification.error({
          message: "Lỗi",
          description: "Bạn chưa tạo account ở bước 1",
        });
        return;
      }

      if (selectedRole === 2) {
        // Bác sĩ
        await testPostDoctorApi({
          cost: Number(values.cost),
          degree: values.degree,
          account: { id: createdAccount.id },
          clinic: { id: Number(values.clinicId) },
          specialty: { id: Number(values.specialtyId) },
        });

        notification.success({
          message: "Thêm Bác sĩ thành công",
          description: `Bác sĩ: ${createdAccount.name}`,
        });
      } else if (selectedRole === 3) {
        // Trợ lý
        await testPostSupportApi({
          account: { id: createdAccount.id },
          clinic: { id: Number(values.clinicId) },
        });

        notification.success({
          message: "Thêm Trợ lý thành công",
          description: `Trợ lý: ${createdAccount.name}`,
        });
      } else if (selectedRole === 4) {
        // Bệnh nhân
        await testPostPatientApi({
          accountId: createdAccount.id,
          bhyt: values.bhyt,
        });

        notification.success({
          message: "Thêm Bệnh nhân thành công",
          description: `Bệnh nhân: ${createdAccount.name}`,
        });
      } else {
        // Role khác
        setusers([...users, createdAccount]);
        notification.success({
          message: "Thêm User thành công",
          description: `Người dùng: ${createdAccount.name}`,
        });
      }

      // Reset sau khi thêm xong
      formStep1.resetFields();
      formStep2.resetFields();
      setCreatedAccount(null);
      setStep(1);
      setTimeout(() => {
        onCancel();
      }, 500);

      onCancel();
    } catch (err: any) {
      notification.error({
        message: "Lỗi thêm User",
        description: getErrorMessage(err),
      });
    }
  };

  return (
    <>
      {contextHolder}
      {/* Modal bước 1 */}
      <Modal
        title={
          <div style={{  fontWeight: "bold", fontSize: "20px" ,marginBottom: '20px'}}>
            Thêm người dùng
          </div>
        }
        open={open && step === 1}
        onCancel={onCancel}
        footer={null}
        centered
        width={800}
      >
        <Form form={formStep1} layout="vertical" validateTrigger="onSubmit">
          {/* Họ tên + Email */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên người dùng"
                rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              >
                <Input placeholder="Nhập tên" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}
              >
                <Input placeholder="Nhập email" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* SĐT + CCCD */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  { pattern: /^0\d{9,10}$/, message: "Phải bắt đầu bằng 0 và có 10–11 chữ số" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cccd"
                label="CCCD"
                rules={[{ required: true, message: "Vui lòng nhập số CCCD" }]}
              >
                <Input placeholder="Nhập số CCCD" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* Ngày sinh + Địa chỉ */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="birth" label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input placeholder="Nhập địa chỉ" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* Mật khẩu + Giới tính */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính" size="large">
                  <Option value="MALE">Nam</Option>
                  <Option value="FEMALE">Nữ</Option>
                  <Option value="OTHER">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Vai trò (nguyên hàng) */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="roleId"
                label="Vai trò"
                rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
              >
                <Select
                  placeholder="Chọn vai trò"
                  size="large"
                  onChange={(val) => setSelectedRole(val)}
                >
                  <Option value={1}>Admin</Option>
                  <Option value={2}>Bác sĩ</Option>
                  <Option value={3}>Trợ lý</Option>
                  <Option value={4}>Người dùng</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Nút bấm */}
          <Form.Item>
            <div className="flex justify-end space-x-3 pt-2">
              <Button onClick={onCancel}>Hủy</Button>
              <Button type="primary" onClick={handleNextStep}>
                Tiếp theo
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>


      {/* Modal bước 2 */}
      <Modal
        title="Thêm chức năng"
        open={open && step === 2}
        onCancel={onCancel}
        footer={null}
        centered
        width={600}
      >
        <Form form={formStep2} layout="vertical">
          {selectedRole === 2 && (
            <>
              <Form.Item name="clinicId" label="Phòng khám" rules={[{ required: true }]}>
                <Select placeholder="Chọn clinic" size="large">
                  {clinics.map((c) => (
                    <Option key={c.id} value={c.id}>
                      {c.id} - {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="specialtyId" label="Chuyên khoa" rules={[{ required: true }]}>
                <Select placeholder="Chọn specialty" size="large">
                  {specialties.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {s.id} - {s.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="cost" label="Giá khám" rules={[{ required: true }]}>
                <Input type="number" placeholder="Nhập giá khám" size="large" />
              </Form.Item>
              <Form.Item name="degree" label="Bằng cấp" rules={[{ required: true }]}>
                <Select placeholder="Chọn bằng cấp" size="large">
                  <Option value="BACHELOR">Cử nhân</Option>
                  <Option value="MASTER">Thạc sĩ</Option>
                  <Option value="DOCTOR">Tiến sĩ</Option>
                </Select>
              </Form.Item>
            </>
          )}
          {selectedRole === 3 && (
            <Form.Item name="clinicId" label="Phòng khám" rules={[{ required: true }]}>
              <Select placeholder="Chọn clinic" size="large">
                {clinics.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.id} - {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {selectedRole === 4 && (
            <Form.Item name="bhyt" label="Bảo hiểm y tế" rules={[{ required: true }]}>
              <Input placeholder="Nhập mã BHYT (nếu có)" size="large" />
            </Form.Item>
          )}

          <Form.Item>
            <div className="flex justify-end space-x-3 pt-2">
              <Button onClick={() => setStep(1)}>Quay lại</Button>
              <Button type="primary" onClick={handleSubmit}>
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
