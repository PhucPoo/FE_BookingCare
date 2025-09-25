import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { User } from "./UserTable";
import { testPutAccountsApi } from "../../../api/testApi";
import { notification, message } from 'antd';

const { Option } = Select;

interface EdituserProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (user: User) => void;
  user: User | null;
}

const Edituser: React.FC<EdituserProps> = ({ open, onCancel, onUpdate, user }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        cccd: user.cccd,
        address: user.address,
      });
      setSelectedFile(null);
    }
  }, [user, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!user) return;

    const formData = new FormData();
    formData.append('id', user.id)
    formData.append("name", values.name);
    formData.append("email", values.email || "");
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("cccd", values.cccd);
    formData.append("address", values.address);

    formData.append("createAt", user.createAt);
    formData.append("updateAt", new Date().toISOString());

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await testPutAccountsApi(formData);

      const updatedUser: any = {
        ...user,
        id: user.id,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        cccd: values.cccd,
        address: values.address,
        file: selectedFile ? selectedFile.name : user.avatar,
        updateAt: new Date(),

      };
      notification.success({
        message: `Cập nhật thành công`,
        description: "Cập nhật thành công người dùng: " + user.name,
      })

      onUpdate(updatedUser);
      form.resetFields();
    } catch (err: any) {
      console.log(err.response.data.message)
      notification.error({
        message: "Cập nhật thất bại",
        description: err.response.data.message
      })
      console.error("Lỗi cập nhật user:", err);
    }
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Chỉnh sửa thông tin người dùng</div>}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      centered
      width={520}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit} className="space-y-4">
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input placeholder="Nhập tên người dùng" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^0\d{9,10}$/,
              message: "Số điện thoại phải bắt đầu bằng 0 và có 10–11 chữ số",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>
        <Form.Item
          name="cccd"
          label="Căn cước công dân"
          rules={[
            { required: true, message: "Vui lòng nhập Căn cước công dân!" },
            // {
            //   pattern: /^0\d{9,10}$/,
            //   message: "Số điện thoại phải bắt đầu bằng 0 và có 10–11 chữ số",
            // },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            { required: true, message: "Vui lòng nhập Địa chỉ!" },
           
          ]}
        >
          <Input placeholder="Nhập số điện thoại" size="large" className="rounded-md px-3 py-2" />
        </Form.Item>

        <Form.Item name="avatar" label="Ảnh" rules={[{ required: true, message: "Vui lòng tải ảnh!" }]}>
          <input type="file" onChange={handleFileChange} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={onCancel} size="large">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edituser;
