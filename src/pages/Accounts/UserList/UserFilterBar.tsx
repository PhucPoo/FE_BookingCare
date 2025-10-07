import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd/lib";
import type { User } from "./UserTable";
import { testSearchAccountApi } from "../../../api/testApi";

const { Option, OptGroup } = Select;

interface UserFilterBarProps {
  filteredUsers: (users: User[]) => void;
  onFilter: (
    filtered: User[],
    keywords: {
      cccd: string;
      phone: string;
      email: string;
      roleId?: string | null;
      gender?: string | null;
      monthYear?: string | null;
    }
  ) => void;
  cccd: string;
  setCccd: (cccd: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  roleID: string | null;
  setRoleID: (roleID: string | null) => void;
  gender: string | null;
  setGender: (gender: string | null) => void;
  monthYear: string | null;
  setMonthYear: (monthYear: string | null) => void;
  pages: number;
  pageSize: number;
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({
  filteredUsers,
  onFilter,
  cccd,
  setCccd,
  phone,
  setPhone,
  email,
  setEmail,
  roleID,
  setRoleID,
  gender,
  setGender,
  monthYear,
  setMonthYear,
  pages ,
  pageSize ,
}) => {
  // 🚀 Hàm tìm kiếm
  const handleSearch = async () => {
    const keywords = {
      cccd,
      phone,
      email,
      roleId: roleID,
      gender,
      monthYear,
    };

    try {
      const result = await testSearchAccountApi(
        {
          phoneNumber: phone || undefined,
          cccd: cccd || undefined,
          email: email || undefined,
          roleId:
            roleID === "admin"
              ? 1
              : roleID === "doctor"
              ? 2
              : roleID === "patient"
              ? 3
              : roleID === "support"
              ? 4
              : undefined,
          gender: gender || undefined,
          monthYear: monthYear ? new Date(monthYear) : undefined,
        },
        pages,
        pageSize
      );

      const users = result.data?.result || [];
      filteredUsers(users);
      onFilter(users, keywords);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm người dùng:", error);
      filteredUsers([]);
      onFilter([], keywords);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <Input
        placeholder="CCCD"
        value={cccd}
        onChange={(e) => setCccd(e.target.value)}
        className="flex-1 min-w-[150px]"
        size="large"
      />

      <Input
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="flex-1 min-w-[150px]"
        size="large"
      />

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-[150px]"
        size="large"
      />

      <Select
        placeholder="Chọn role"
        value={roleID ?? undefined}
        style={{ width: 200 }}
        size="large"
        allowClear
        onChange={(val) => setRoleID(val)}
      >
        <OptGroup label="Role">
          <Option value="admin">Admin</Option>
          <Option value="doctor">Doctor</Option>
          <Option value="patient">Patient</Option>
          <Option value="support">Support</Option>
        </OptGroup>
      </Select>

      <Select
        placeholder="Giới tính"
        value={gender ?? undefined}
        style={{ width: 160 }}
        size="large"
        allowClear
        onChange={(val) => setGender(val)}
      >
        <OptGroup label="Gender">
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
          onChange={(_, dateString) => setMonthYear(dateString || null)}
        />
      </Space.Compact>

      <Button
        type="primary"
        onClick={handleSearch}
        className="min-w-[150px]"
        size="large"
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default UserFilterBar;
