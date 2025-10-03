import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Form, DatePicker } from "antd/lib";
import type { User } from "../UserList/UserTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import { testPostAccountsApi } from "../../../api/testApi";
import { testGetClinicApi } from "../../../api/testClinic";
import { testGetSpecialtyApi } from "../../../api/testSpecialty";
import { testPostDoctorApi } from "../../../api/testDoctor";
import type { Specialty } from "../../Specialty/SpecialtyTable";
import { testPostSupportApi } from "../../../api/testSupport";
import { testPostPatientApi } from "../../../api/testPatient";
import { notification } from 'antd';

const { Option } = Select;

interface AddUserProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (user: any) => void; // user hoặc doctor
  users: User[];
  setusers: (users: User[]) => void;
}

const AddUser: React.FC<AddUserProps> = ({ users, setusers, open, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  
  const [api, contextHolder] = notification.useNotification();

  // Load dropdown cho bác sĩ
  useEffect(() => {
    if (selectedRole === 2) {
      // Bác sĩ cần cả clinic + specialty
      Promise.all([testGetClinicApi(), testGetSpecialtyApi()])
        .then(([clinicRes, specialtyRes]) => {
          setClinics(clinicRes.data.result || []);
          setSpecialties(specialtyRes.data.result || []);
        })
        .catch((err) => console.error("Fetch dropdown failed:", err));
    } else if (selectedRole === 3) {
      // Support chỉ cần clinic
      testGetClinicApi()
        .then((clinicRes) => {
          setClinics(clinicRes.data.result || []);
        })
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

  const handleSubmit = async (values: any) => {
    try {
      // 1️⃣ Tạo account trước
      const accountRes = await testPostAccountsApi(values);
      const account = accountRes.data?.data || accountRes;

      // 2️⃣ Nếu role = Bác sĩ
      if (values.roleId === 2) {
        if (account.role?.name !== "DOCTOR") {
          notification.error({
            message: "Lỗi quyền",
            description: `Account ${account.id} chưa được gán role DOCTOR. Hãy kiểm tra lại backend.`,
          });
          return;
        }

        try {
          const payloaddoc = {
            cost: Number(values.cost),
            degree: values.degree,
            account: { id: account.id },
            clinic: { id: Number(values.clinicId) },
            specialty: { id: Number(values.specialtyId) },
          };
          await testPostDoctorApi(payloaddoc);

          notification.success({
            message: "Thêm Bác sĩ thành công",
            description: `Bác sĩ: ${account.name}`,
          });
        } catch (err: any) {
          notification.error({
            message: "Lỗi thêm Bác sĩ",
            description: getErrorMessage(err),
          });
          return;
        }
      }

      // 3️⃣ Nếu role = Trợ lý
      else if (values.roleId === 3) {
        if (account.role?.name !== "SUPPORT") {
          notification.error({
            message: "Lỗi quyền",
            description: `Account ${account.id} chưa được gán role SUPPORT. Hãy kiểm tra lại backend.`,
          });
          return;
        }

        try {
          const payloadsp = {
            account: { id: account.id },
            clinic: { id: Number(values.clinicId) },
          };
          const res = await testPostSupportApi(payloadsp);

          notification.success({
            message: "Thêm Trợ lý thành công",
            description: `Trợ lý: ${res.account.name}`,
          });

        } catch (err: any) {
          api.open({
            message: "Lỗi thêm Trợ lý",
            description: err?.response?.data?.message || err?.message || "Có lỗi xảy ra",
          });
        }
      }

      // 4️⃣ Nếu role = Bệnh nhân
      else if (values.roleId === 4) {
        if (account.role?.name !== "CLIENT") {
          notification.error({
            message: "Lỗi quyền",
            description: `Account ${account.id} chưa được gán role CLIENT. Hãy kiểm tra lại backend.`,
          });
          return;
        }

        try {
          const payloaduser = {
            accountId: account.id,
            bhyt: values.bhyt,
          };
          await testPostPatientApi(payloaduser);

          notification.success({
            message: "Thêm Bệnh nhân thành công",
            description: `Bệnh nhân: ${account.name}`,
          });
        } catch (err: any) {

          notification.error({
            message: "Lỗi thêm Bệnh nhân",
            description: getErrorMessage(err),
          });


          return;
        }
      }

      // 5️⃣ Các role khác (Admin...)
      else {
        setusers([...users, account]);
        notification.success({
          message: "Thêm User thành công",
          description: `Người dùng: ${account.name}`,
        });
      }

      // ✅ Reset form + đóng modal nếu thành công
      form.resetFields();
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
      <Modal
        title={<div className="text-center text-lg font-semibold">Thêm người dùng mới</div>}
        open={open}
        onCancel={onCancel}
        footer={null}
        centered
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
          {/* Thông tin chung */}
          <Form.Item name="name" label="Tên người dùng" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên" size="large" />
          </Form.Item>
  
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Nhập email" size="large" />
          </Form.Item>
  
          <Form.Item name="phoneNumber" label="Số điện thoại" rules={[
            { required: true },
            {
              pattern: /^0\d{9,10}$/,
              message: "Số điện thoại phải bắt đầu bằng 0 và có 10–11 chữ số",
            },
          ]}>
            <Input placeholder="Nhập số điện thoại" size="large" />
          </Form.Item>
  
          <Form.Item name="cccd" label="CCCD" rules={[{ required: true }]}>
            <Input placeholder="Nhập số CCCD" size="large" />
          </Form.Item>
  
          <Form.Item name="birth" label="Ngày sinh">
            <DatePicker style={{ width: "100%" }} size="large" />
          </Form.Item>
  
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
            <Input placeholder="Nhập địa chỉ" size="large" />
          </Form.Item>
  
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>
  
          <Form.Item name="roleId" label="Vai trò" rules={[{ required: true }]}>
            <Select placeholder="Chọn vai trò" size="large" onChange={(val) => setSelectedRole(val)}>
              <Option value={1}>Admin</Option>
              <Option value={2}>Bác sĩ</Option>
              <Option value={3}>Trợ lý</Option>
              <Option value={4}>Người dùng</Option>
            </Select>
          </Form.Item>
  
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
            <Select placeholder="Chọn giới tính" size="large">
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
              <Option value="OTHER">Khác</Option>
            </Select>
          </Form.Item>
  
          {/* Nếu chọn role = bác sĩ thì hiển thị thêm */}
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
  
            </>
          )}
          {selectedRole === 4 && (
            <>
              <Form.Item name="bhyt" label="Bảo hiểm y tế" rules={[{ required: true }]}>
                <Input placeholder="Nhập mã BHYT (nếu có)" size="large" />
              </Form.Item>
  
            </>
          )}
  
  
          <Form.Item>
            <div className="flex justify-end space-x-3 pt-2">
              <Button onClick={onCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit">
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
