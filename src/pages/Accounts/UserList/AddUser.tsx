import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Form, DatePicker, Row, Col, Tabs } from "antd/lib";
import { notification } from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import type { User } from "../UserList/UserTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import type { Specialty } from "../../Specialty/SpecialtyTable";
import {
  testPostAccountsApi,

} from "../../../api/testApi";
import { testGetClinicApi } from "../../../api/testClinic";
import { testGetSpecialtyApi } from "../../../api/testSpecialty";
import { testPostDoctorApi } from "../../../api/testDoctor";
import { testPostSupportApi } from "../../../api/testSupport";
import { testPostPatientApi } from "../../../api/testPatient";
import { testGetClinicOFSpecialtyApi } from "../../../api/testclinicSpecialty";

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
  const [activeTab, setActiveTab] = useState("1");
  const [createdAccount, setCreatedAccount] = useState<any>(null);

  const [selectedClinicId, setSelectedClinicId] = useState<number | null>(null);

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
  // Chỉ gọi khi đã tạo account và chọn clinic
  if (!selectedClinicId || !createdAccount) return;

  testGetClinicOFSpecialtyApi(selectedClinicId).then(data => {
    const listspecialties = data.data.result.specialties.map(value => value);
    setSpecialties(listspecialties);
  });
}, [selectedClinicId, createdAccount]);


  // Load dropdown khi chọn role
  useEffect(() => {
    // Chỉ load dữ liệu sau khi qua bước 1 và có createdAccount
    if (!createdAccount) return;

    if (selectedRole === 2) {
      Promise.all([testGetClinicApi()]).then(([clinicRes]) => {
        setClinics(clinicRes.data.result || []);
        // setSpecialties(specialtyRes.data.result || []);
      });
    } else if (selectedRole === 3) {
      testGetClinicApi().then((clinicRes) => setClinics(clinicRes.data.result || []));
    }
  }, [selectedRole, createdAccount]);

  const getErrorMessage = (err: any, fallback = "Có lỗi xảy ra") =>
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.response?.data?.errors?.[0] ||
    err?.message ||
    fallback;

  // Xử lý bước 1 (tạo account)
  const handleNext = async () => {
    try {
      const values = await formStep1.validateFields(); // chỉ validate khi bấm nút
      const res = await testPostAccountsApi(values);
      const account = res.data?.data || res;
      setCreatedAccount(account);
      setActiveTab("2");
      notification.success({
        message: "Tạo tài khoản thành công",
        description: account.name,
      });
    } catch (err: any) {
      if (err?.errorFields) {
        // lỗi frontend (VD: chưa nhập required)
        notification.warning({
          message: "Vui lòng nhập đủ thông tin",
        });
      } else {
        // lỗi backend (VD: email trùng, lỗi server)
        notification.error({
          message: "Lỗi tạo Account",
          description: getErrorMessage(err),
        });
      }
    }
  };

  // Xử lý bước 2 (theo role)
  const handleSubmit = async () => {
    try {
      const values = await formStep2.validateFields();
      if (!createdAccount) throw new Error("Chưa tạo tài khoản ở bước 1");

      if (selectedRole === 2) {
        await testPostDoctorApi({
          cost: Number(values.cost),
          degree: values.degree,
          account: { id: createdAccount.id },
          clinic: { id: Number(values.clinicId) },
          specialty: { id: Number(values.specialtyId) },
        });
      } else if (selectedRole === 3) {
        await testPostSupportApi({
          account: { id: createdAccount.id },
          clinic: { id: Number(values.clinicId) },
        });
      } else if (selectedRole === 4) {
        await testPostPatientApi({
          accountId: createdAccount.id,
          bhyt: values.bhyt,
        });
      }
      setusers([...users, createdAccount]);

      notification.success({
        message: "Thêm người dùng thành công",
        description: createdAccount.name,
      });


      formStep1.resetFields();
      formStep2.resetFields();
      setCreatedAccount(null);
      setActiveTab("1");
      onCancel();
    } catch (err) {
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
        title="Thêm người dùng"
        open={open}
        onCancel={onCancel}
        footer={null}
        centered
        width={800}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "1",
              label: (
                <>
                  <UserOutlined /> Tài khoản
                </>
              ),
              children: (
                <Form form={formStep1} layout="vertical" validateTrigger={false} >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="Tên người dùng"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nhập tên" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: "email" }]}
                      >
                        <Input placeholder="Nhập email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="cccd" label="CCCD" rules={[{ required: true }]}>
                        <Input placeholder="Nhập CCCD" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="birth" label="Ngày sinh">
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                        <Input placeholder="Nhập địa chỉ" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true }]}
                      >
                        <Input.Password placeholder="Nhập mật khẩu" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
                        <Select placeholder="Chọn giới tính">
                          <Option value="MALE">Nam</Option>
                          <Option value="FEMALE">Nữ</Option>
                          <Option value="OTHER">Khác</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="roleId" label="Vai trò" rules={[{ required: true }]}>
                    <Select placeholder="Chọn vai trò" onChange={(val) => setSelectedRole(val)}>
                      <Option value={1}>Admin</Option>
                      <Option value={2}>Bác sĩ</Option>
                      <Option value={3}>Trợ lý</Option>
                      <Option value={4}>Người dùng</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <div className="flex justify-end space-x-3">
                      <Button onClick={onCancel}>Hủy</Button>
                      <Button type="primary" onClick={handleNext}>
                        Tiếp theo
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: "2",
              label: (
                <>
                  <SolutionOutlined /> Chi tiết vai trò
                </>
              ),
              children: (
                <Form form={formStep2} layout="vertical">
                  {selectedRole === 2 && (
                    <>
                      <Form.Item name="clinicId" label="Phòng khám" rules={[{ required: true }]}>
                        <Select onSelect={(value) => {
                          setSelectedClinicId(value)
                        }} placeholder="Chọn clinic">
                          {clinics.map((c) => (
                            <Option key={c.id} value={c.id}>
                              {c.id} - {c.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="specialtyId" label="Chuyên khoa" rules={[{ required: true }]}>
                        <Select placeholder="Chọn specialty">
                          {specialties.map((s) => (
                            <Option key={s.id} value={s.id}>
                              {s.id} - {s.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="cost" label="Giá khám" rules={[{ required: true }]}>
                        <Input type="number" placeholder="Nhập giá khám" />
                      </Form.Item>
                      <Form.Item name="degree" label="Bằng cấp" rules={[{ required: true }]}>
                        <Select placeholder="Chọn bằng cấp">
                          <Option value="BACHELOR">Cử nhân</Option>
                          <Option value="MASTER">Thạc sĩ</Option>
                          <Option value="DOCTOR">Tiến sĩ</Option>
                        </Select>
                      </Form.Item>
                    </>
                  )}

                  {selectedRole === 3 && (
                    <Form.Item name="clinicId" label="Phòng khám" rules={[{ required: true }]}>
                      <Select placeholder="Chọn clinic">
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
                      <Input placeholder="Nhập mã BHYT" />
                    </Form.Item>
                  )}

                  <Form.Item>
                    <div className="flex justify-end space-x-3">
                      <Button onClick={() => setActiveTab("1")}>Quay lại</Button>
                      <Button type="primary" onClick={handleSubmit}>
                        Thêm
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default AddUser;
