import React, { useEffect, useState } from "react";

import type { User } from "./UserTable";

import UserFilterBar from "./UserFilterBar";
import UserTable from "./UserTable";
import Adduser from "./AddUser";
import { testGetAccountsApi } from "../../../api/testApi";
import UserAdvancedFilter from "./UserAdvancedFilter";


const userManagement: React.FC = () => {
  const [users, setusers] = useState<User[]>([]);
   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const { Option, OptGroup } = Select;

  // state filter
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Cập nhật người dùng
  const handleUpdateUser = async (updatedUser: User) => {
    try {
      // Giả sử backend trả về user mới
      const res = await testGetAccountsApi();
      const updatedData = res.data.data;

      // Cập nhật users gốc
      const updatedList = users.map(u =>
        u.id === updatedUser.id ? { ...u, ...updatedData } : u
      );
      setusers(updatedList);

      // Cập nhật filteredUsers dựa trên users đã lọc
      const updatedFilteredList = users.map(u =>
        u.id === updatedUser.id ? { ...u, ...updatedData } : u
      );
      setusers(updatedFilteredList);

      console.log("Cập nhật user thành công:", updatedData);
    } catch (error) {
      console.error("Lỗi cập nhật user:", error);
    }
  };
  // Xóa người dùng
  const handleDeleteUser = (id: number) => {
    console.log("Deleted user with id:", id);
    const updatedusers = users.filter((d) => d.id !== id);
    setusers(updatedusers);
    setusers(updatedusers);
  };


  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }
  const handleGetAccounts = async () => {
    const result = await testGetAccountsApi();
    setusers(result.data.result);
    
  };


  useEffect(() => {
    handleGetAccounts();
  }, []);

   const handleFilter = () => {
    let data = [...users];
    if (roleFilter) {
      data = data.filter((u) => u.role.name?.toLowerCase() === roleFilter);
    }
    if (genderFilter) {
      data = data.filter((u) => u.gender?.toLowerCase() === genderFilter);
    }
    if (dateFilter) {
      data = data.filter(
        (u) =>
          new Date(u.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN") 
          
      );
    }
    setFilteredUsers(data);
  };

  useEffect(() => {
    handleFilter();
  }, [roleFilter, genderFilter, dateFilter, users]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý người dùng
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <UserFilterBar users={users} onFilter={setusers} />
        </div>
      </div>

      <UserAdvancedFilter
        onChangeRole={setRoleFilter}
        onChangeGender={setGenderFilter}
        onChangeDate={setDateFilter}
        onOpenAdd={() => setIsAddModalOpen(true)}
      />

      <UserTable
        users={filteredUsers}
        setusers={setusers}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />

      <Adduser
        users={(users)}
        setusers={setusers}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
      />
    </div>

  );
};

export default userManagement;
