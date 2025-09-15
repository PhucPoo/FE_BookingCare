import React, { useEffect, useState } from "react";

import Button from "antd/lib/button";
import type { User } from "./UserTable";

import UserFilterBar from "./UserFilterBar";
import UserTable from "./UserTable";
import Adduser from "./AddUser";
import { DatePicker, Select, Space } from "antd/lib";
import Input from "antd/es/input";
import { PiCellTowerThin } from "react-icons/pi";
import api from "../../../api/axios";



const initialusers: User[] = [
  // { id: 2, name: "Nguyễn Văn B", email: "hp234@gmail.com", cccd: 1289389, phone: "0942234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  // { id: 1, name: "Nguyễn Văn A", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-20"), update_at: new Date("2025-08-27"), },
  // { id: 3, name: "Nguyễn Văn C", email: "hp36@gmail.com", cccd: 1289389, phone: "0939234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  // { id: 4, name: "Nguyễn Văn D", email: "hp@gmail.com", cccd: 1289389, phone: "0920234567", create_at: new Date("2025-06-27"), update_at: new Date("2025-08-27"), },
  // { id: 5, name: "Nguyễn Văn CD", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  // { id: 6, name: "Nguyễn Văn AB", email: "hp@gmail.com", cccd: 1289389, phone: "0910744567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
  // { id: 7, name: "Nguyễn Văn ABC", email: "hp@gmail.com", cccd: 1289389, phone: "0910784567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), },
];


const userManagement: React.FC = () => {
  const [users, setusers] = useState<User[]>([]);
  const [filteredusers, setFilteredusers] = useState<User[]>(initialusers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { Option, OptGroup } = Select;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/v1/accounts?page=1&size=10&sort=createAt,desc");
        console.log(res.data.data.result);
        setusers(res.data.data.result)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
  const handleUpdateuser = async (updateuser: User) => {
    try {
      const res = await api.put("/v1/accounts", updateuser, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API response:", res.data.data);

      const updatedUser = res.data.data;

      if (!updatedUser || !updatedUser.id) {
        throw new Error("API không trả về user hợp lệ");
      }

      setusers((prev: any[]) =>
        Array.isArray(prev)
          ? prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          : []
      );

      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Update user failed:", error);
    }
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Quản lý người dùng</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <UserFilterBar users={users} onFilter={setFilteredusers} />
        </div>
      </div>

      <div className="mb-4">
        <Select defaultValue="role" style={{ width: 200, height: 36 }} onChange={handleChange}>
          <OptGroup label="Manager">
            <Option value="doctor">Doctor</Option>
            <Option value="patient">Patient</Option>
            <Option value="support">Support</Option>
          </OptGroup>

        </Select>,
        <Select defaultValue="gender" style={{ width: 200, height: 36 }} onChange={handleChange}>
          <OptGroup label="Manager">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="other">Khác</Option>
          </OptGroup>

        </Select>,
        <Space.Compact size="large">
          <DatePicker placeholder="Ngày tạo" style={{ width: 160, marginRight: 5 }} />

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
