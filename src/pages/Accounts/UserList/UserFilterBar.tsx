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
      role?: string | null;
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
  role: string | null;
  setRole: (role: string | null) => void;
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
  role,
  setRole,
  gender,
  setGender,
  monthYear,
  setMonthYear,
  pages,
  pageSize,
}) => {
  // 🚀 Hàm tìm kiếm
  const handleSearch = async () => {
    const keywords = {
      cccd,
      phone,
      email,
      role: role,
      gender,
      monthYear,
    };

    try {
      const result = await testSearchAccountApi(
        {
          phoneNumber: phone || undefined,
          cccd: cccd || undefined,
          email: email || undefined,
          roleName: role || undefined,
          gender: gender || undefined,
          monthYear: monthYear || undefined,

        },
        pages,
        pageSize
      );
      console.log("🔎 Đang tìm kiếm với monthYear =", monthYear);

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
        value={role ?? undefined}
        style={{ width: 200 }}
        size="large"
        allowClear
        onChange={(val) => setRole(val)}
      >
        <OptGroup label="Role">
          <Option value="admin">Admin</Option>
          <Option value="doctor">Doctor</Option>
          <Option value="support">Support</Option>
          <Option value="client">Client</Option>
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
          picker="month"
          placeholder="Ngày tạo"
          style={{ width: 180 }}
          size="large"
          onChange={(date) => setMonthYear(date ? date.format("YYYY-MM") : null)}

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
