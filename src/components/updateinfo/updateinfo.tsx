// UpdateUserForm.tsx
import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useAuth } from "../../context/authcontext";

type UpdateUserFormValues = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  birthday?: string; // yyyy-mm-dd
  cccd?: string;
  specialization?: string;
  license_number?: string;
  shift_time?: string;
};

const UpdateUserForm: React.FC = () => {
  const [form] = Form.useForm<UpdateUserFormValues>();
  const { currentUser, setCurrentUser, token } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    // load profile details (user + role-specific)
    fetch(`/api/users/${currentUser.id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((r) => r.json())
      .then((data: UpdateUserFormValues) => {
        // nếu backend trả birthday là Date, chuyển về yyyy-mm-dd nếu cần
        form.setFieldsValue(data);
      })
      .catch(() => message.error("Không tải được thông tin người dùng"));
  }, [currentUser, form, token]);

  if (!currentUser) return <div>Đang tải...</div>;

  const role = currentUser.role;

  const onFinish = async (values: UpdateUserFormValues) => {
    try {
      // Gọi endpoint role-specific (ví dụ /api/doctors/:id or /api/clients/:id)
      const endpoint = role === "doctor"
        ? `/api/doctors/${currentUser.id}`
        : role === "client"
        ? `/api/clients/${currentUser.id}`
        : role === "support"
        ? `/api/supports/${currentUser.id}`
        : `/api/admins/${currentUser.id}`; // admin

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      message.success("Cập nhật thành công");
      // cập nhật thông tin trong AuthContext (ví dụ tên thay đổi)
      setCurrentUser((prev) => (prev ? { ...prev, ...updated } : prev));
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Số điện thoại" name="phone">
        <Input />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address">
        <Input />
      </Form.Item>

      {/* Client fields */}
      {role === "client" && (
        <>
          <Form.Item label="Ngày sinh" name="birthday">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="CCCD" name="cccd">
            <Input />
          </Form.Item>
        </>
      )}

      {/* Doctor fields */}
      {role === "doctor" && (
        <>
          <Form.Item label="Chuyên khoa" name="specialization">
            <Input />
          </Form.Item>
          <Form.Item label="Số giấy phép" name="license_number">
            <Input />
          </Form.Item>
        </>
      )}

      {/* Support */}
      {role === "support" && (
        <Form.Item label="Ca trực" name="shift_time">
          <Input />
        </Form.Item>
      )}

      <Button type="primary" htmlType="submit">
        Cập nhật
      </Button>
    </Form>
  );
};

export default UpdateUserForm;
