import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { User } from "./UserTable";
import { testPutAccountsApi } from "../../../api/testApi";
import { notification } from "antd";
import { DatePicker, Upload } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

interface EditUserProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (user: User) => void;
  user: User | null;

}

const EditUser: React.FC<EditUserProps> = ({ open, onCancel, onUpdate, user }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);


  // Đổ dữ liệu vào form khi mở modal
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        cccd: user.cccd,
        birth: user.birth ? dayjs(user.birth, "YYYY-MM-DD") : null,
        gender: user.gender,
        address: user.address,
      });
      if (user.avatar) {
        setFileList([
          {
            uid: "-1",
            status: "done",
            url: user.avatar,
          },
        ]);
      }
      setFile(null);
    }
  }, [user, form]);

  // Upload file
  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  // Submit form
  const handleSubmit = async (values: any) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("id", String(user.id)); // ✅ Bổ sung id
    formData.append("name", values.name);
    formData.append("email", values.email || "");
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("cccd", values.cccd);
    formData.append("gender", values.gender);
    formData.append("address", values.address);


    if (values.birth) {
      formData.append("birth", values.birth.format("YYYY-MM-DD"));
    } else {
      formData.append("birth", ""); // hoặc để null tùy backend
    }

    formData.append("createAt", user.createAt);
    formData.append("updateAt", new Date().toISOString());

    if (file) {
      formData.append("file", file);
    }

    try {
      const u = await testPutAccountsApi(formData);

      const updatedUser: User = {
        ...user,
        ...values,

        id: user.id, // ✅ giữ id
        birth: values.birth ? values.birth.format("YYYY-MM-DD") : null,
        avatar: file ? file.name : user.avatar,
        updateAt: new Date().toISOString(),
      };
      console.log("AAAAAAA", updatedUser);


      notification.success({
        message: "Cập nhật thành công",
        description: `Người dùng ${user.name} đã được cập nhật.`,
      });

      onUpdate(u.data);
      form.resetFields();
      onCancel();
    } catch (err: any) {
      notification.error({
        message: "Cập nhật thất bại",
        description: err?.response?.data?.message || "Đã xảy ra lỗi",
      });
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
        <Form.Item name="name" label="Tên người dùng" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên người dùng" size="large" />
        </Form.Item>
        {/* <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Nhập email" size="large" />
        </Form.Item> */}

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true },
            { pattern: /^0\d{9,10}$/, message: "Số điện thoại phải bắt đầu bằng 0 và có 10–11 chữ số" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" size="large" />
        </Form.Item>

        <Form.Item name="cccd" label="Căn cước công dân" rules={[{ required: true }]}>
          <Input placeholder="Nhập CCCD" size="large" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
          <Select placeholder="Chọn giới tính" size="large">
            <Option value="MALE">Nam</Option>
            <Option value="FEMALE">Nữ</Option>
            <Option value="OTHER">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="birth"
          label="Ngày sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            size="large"
          />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
          <Input placeholder="Nhập địa chỉ" size="large" />
        </Form.Item>

        <Form.Item label="Ảnh">
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            showUploadList={{
              showRemoveIcon: false, 
            }}
            fileList={fileList}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {file && <p className="mt-2 text-sm text-gray-500">Ảnh: {file.name}</p>}
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

export default EditUser;
