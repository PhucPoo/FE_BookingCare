import React, { useEffect, useState } from "react";

import Button from "antd/lib/button";
import type { User } from "./UserTable";

import UserFilterBar from "./UserFilterBar";
import UserTable from "./UserTable";
import Adduser from "./AddUser";
import { DatePicker, Select, Space } from "antd/lib";
import Input from "antd/es/input";
import { testGetAccountsApi } from "../../../api/testApi";
import api from "../../../api/axios";

// const initialusers: User[] = [
//   { id: 2, name: "Nguyễn Văn B", email: "hp234@gmail.com", cccd: 1289389, phone: "0942234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
//   { id: 1, name: "Nguyễn Văn A", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-20"), update_at: new Date("2025-08-27"), },
//   { id: 3, name: "Nguyễn Văn C", email: "hp36@gmail.com", cccd: 1289389, phone: "0939234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
//   { id: 4, name: "Nguyễn Văn D", email: "hp@gmail.com", cccd: 1289389, phone: "0920234567", create_at: new Date("2025-06-27"), update_at: new Date("2025-08-27"), },
//   { id: 5, name: "Nguyễn Văn CD", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
//   { id: 6, name: "Nguyễn Văn AB", email: "hp@gmail.com", cccd: 1289389, phone: "0910744567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
//   { id: 7, name: "Nguyễn Văn ABC", email: "hp@gmail.com", cccd: 1289389, phone: "0910784567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
// ];


const userManagement: React.FC = () => {
  const [users, setusers] = useState<User[]>([]);
  const [filteredusers, setFilteredusers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { Option, OptGroup } = Select;

  // Thêm người dùng mới
  const handleAdduser = async (user: any) => {
    console.log(user)
    const newUser = await api.post("/v1/accounts", {
      ...user
    });

    console.log(newUser)

    setusers((prevUsers: any) => [...prevUsers, newUser.data.data]);
    // setFilteredusers(updatedusers);
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




  // Xóa người dùng
  const handleDeleteUser = async (id: number) => {
    try {
      console.log("Deleting user id:", id);

      const res = await api.delete(`/v1/accounts/${id}`);

      console.log("✅ Delete success:", res.data);

      setusers((prev: User[]) =>
        prev.filter((u) => u.id !== id)
      );
    } catch (error: any) {
      console.error("❌ Delete user failed:", error.response?.data || error.message);
    }
  };


  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }
  const handleGetAccounts = async () => {
    const result = await testGetAccountsApi();
    setusers(result.data.result);
    setFilteredusers(result.data.result);
  };
  useEffect(() => {
    handleGetAccounts();
  }, []);
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý người dùng
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <UserFilterBar users={users} onFilter={setFilteredusers} />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Select
          defaultValue="role"
          style={{ width: 200 }}
          size="large"
          onChange={handleChange}
        >
          <OptGroup label="Manager">
            <Option value="doctor">Doctor</Option>
            <Option value="patient">Patient</Option>
            <Option value="support">Support</Option>
          </OptGroup>
        </Select>

        <Select
          defaultValue="gender"
          style={{ width: 200 }}
          size="large"
          onChange={handleChange}
        >
          <OptGroup label="Manager">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="other">Khác</Option>
          </OptGroup>
        </Select>

        <Space.Compact size="large">
          <DatePicker
            placeholder="Ngày tạo"
            style={{ width: 180 }}
            size="large"
          />
        </Space.Compact>

        <Button
          type="primary"
          size="large"
          className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
          style={{ minWidth: 180 }}
        >
          + Thêm người dùng
        </Button>
      </div>

      <UserTable
        users={users}
        onUpdateuser={handleUpdateuser}
        onDeleteuser={handleDeleteUser}
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
