import React, { useState } from "react";

import Button from "antd/lib/button";
import type { User } from "../../components/UserList/UserTable";

import UserFilterBar from "../../components/UserList/UserFilterBar";
import UserTable from "../../components/UserList/UserTable";
import Adduser from "../../components/UserList/AddUser";
import { Select, Space } from "antd/lib";
import Input from "antd/es/input";



const initialusers: User[] = [
  { id: 2, name: "Nguyễn Văn B", email: "hp234@gmail.com", cccd: 1289389, phone: "0942234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  { id: 1, name: "Nguyễn Văn A", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-20"), update_at: new Date("2025-08-27"), },
  { id: 3, name: "Nguyễn Văn C", email: "hp36@gmail.com", cccd: 1289389, phone: "0939234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  { id: 4, name: "Nguyễn Văn D", email: "hp@gmail.com", cccd: 1289389, phone: "0920234567", create_at: new Date("2025-06-27"), update_at: new Date("2025-08-27"), },
  { id: 5, name: "Nguyễn Văn CD", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  { id: 6, name: "Nguyễn Văn AB", email: "hp@gmail.com", cccd: 1289389, phone: "0910744567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  { id: 7, name: "Nguyễn Văn ABC", email: "hp@gmail.com", cccd: 1289389, phone: "0910784567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
];

const userManagement: React.FC = () => {
  const [users, setusers] = useState<User[]>(initialusers);
  const [filteredusers, setFilteredusers] = useState<User[]>(initialusers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { Option, OptGroup } = Select;


  // Thêm người dùng mới
  const handleAdduser = (newuser: User) => {
    const updatedusers = [...users, newuser];
    setusers(updatedusers);
    setFilteredusers(updatedusers);
    setIsAddModalOpen(false);
  };

  // Cập nhật người dùng
  const handleUpdateuser = (updateduser: User) => {
    const updatedList = users.map((u) =>
      u.id === updateduser.id
        ? { ...u, ...updateduser, update_at: new Date() }
        : u
    );
    setusers(updatedList);
    setFilteredusers(updatedList); // rất quan trọng để table hiển thị đúng
  };
  // Xóa người dùng
  const handleDeleteuser = (id: number) => {
    console.log("Deleted user with id:", id);
    const updatedusers = users.filter((d) => d.id !== id);
    setusers(updatedusers);
    setFilteredusers(updatedusers);

  };
  function handleChange(value: any) {
  console.log(`selected ${value}`);
}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Quản lý người dùng</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <UserFilterBar users={users} onFilter={setFilteredusers} />
        </div>
      </div>

      <div className="mb-4">
        <Select defaultValue="role" style={{ width:200, height:36   }} onChange={handleChange}>
          <OptGroup label="Manager">
            <Option value="doctor">Doctor</Option>
            <Option value="patient">Patient</Option>
            <Option value="support">Support</Option>
          </OptGroup>
         
        </Select>,
         <Select defaultValue="gender" style={{ width:200, height:36   }} onChange={handleChange}>
          <OptGroup label="Manager">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="other">Khác</Option>
          </OptGroup>
         
        </Select>,
        <Space.Compact size="large">
          <Input placeholder="Ngày tạo"
            style={{ margin: 5, padding: 7 }} />

        </Space.Compact>
        <Button
          type="primary"
          size="large"
          onClick={() => setIsAddModalOpen(true)}
          style={{ minWidth: 150 }}
        >
          + Thêm người dùng
        </Button>
      </div>

      <UserTable
        users={filteredusers}
        onUpdateuser={handleUpdateuser}
        onDeleteuser={handleDeleteuser}
      />

      <Adduser
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAdduser}
      />
    </div>
  );
};

export default userManagement;
