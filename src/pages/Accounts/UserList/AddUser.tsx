import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Form from "antd/es/form";
import type { CreateUser, User } from "./UserTable";
import {  testPostAccountsApi } from "../../../api/testApi";
import { notification, message } from 'antd';
import { Button, DatePicker, Space } from "antd/lib";
const { Option } = Select;

interface UserTableProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (user: User) => void;
  users: User[];
  setusers: (users: User[]) => void
}

const AddUser: React.FC<UserTableProps> = ({ users, setusers, open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const { name, email, phoneNumber, password, cccd,birth, address, gender, roleId } = values;

    try {


      // 2️⃣ Nếu không trùng, tạo user mới
      const newUser: CreateUser = {
        name, email, phoneNumber, password, cccd,birth, address, gender, roleId,

      };
      const res = await testPostAccountsApi(newUser);
      setusers([...users, res])
      onAdd(res);
      notification.success({
        message: `Thêm Thành công`,
        description: "Thêm thành công user với name: " + res.name,
      })
      form.resetFields();
      onCancel();
    } catch (err: any) {
      console.log(err.response.data.message)
      notification.error({
        message: "Thêm thất bại",
        description: err.response.data.message
      })
      console.error("Lỗi xoá user:", err);
    }
  };
  const handleChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      // Convert sang string
      const birthday = date.format("YYYY-MM-DD");
      console.log("Birthday:", birthday);

      // Sau đó gửi lên API
      // axios.post("/api/users", { birthday });
    }
  };

  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thêm người dùng mới
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={520}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input placeholder="Nhập tên người dùng" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" size="large" />
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
          <Input placeholder="Nhập số điện thoại" size="large" />
        </Form.Item>
        <Form.Item
          name="cccd"
          label="Căn cước công dân"
          rules={[
            { required: true, message: "Vui lòng nhập Căn cước công dân!" },
            { pattern: /^\d{10,}$/ },
           
          ]}
        >
          <Input placeholder="Nhập số cccd" size="large" />
        </Form.Item>

       <Space.Compact size="large">
          <DatePicker
            placeholder="Ngày sinh"
            style={{ width: 180 }}
            size="large"
            onChange={handleChange}
          />
        </Space.Compact> 

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ!" },
            // {pattern: /^\d{10,}$/},
            // {
            //   min: 6,
            //   max: 20,
            //   pattern:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
            //   message:
            //     "Mật khẩu phải có 6–20 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
            // },
          ]}
        >
          <Input placeholder="Nhập địa chỉ" size="large" />
        </Form.Item>


        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            {
              min: 6,
              max: 20,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
              message:
                "Mật khẩu phải có 6–20 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" size="large" />
        </Form.Item>


        <Form.Item
          name="roleId"
          label="Vai trò"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select placeholder="Chọn vai trò" size="large">
            <Option value={1}>Admin</Option>
            <Option value={2}>Bác sĩ</Option>
            <Option value={3}>Trợ lý</Option>
            <Option value={4}>Người dùng</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select placeholder="Chọn vai trò" size="large">
            <Option value="MALE">Nam</Option>
            <Option value="FEMALE">Nữ</Option>
            <Option value="OTHER">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={onCancel} size="large">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
