import React, { useState } from "react";
import { Input, Button } from "antd/lib";
import type { User } from "./UserTable";

interface UserFilterBarProps {
  users: User[];
  onFilter: (filtered: User[], keywords: { cccd: string; phone: string; email: string }) => void;
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({ users, onFilter }) => {
  const [cccd, setCccd] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    // Nếu không nhập gì thì trả về toàn bộ dữ liệu
    if (!cccd && !phoneNumber && !email) {
      onFilter(users, { cccd: "", phone: "", email: "" });
      return;
    }

    const filtered = users.filter((user) => {
      const matchCccd = cccd === "" || String(user.cccd ?? "").includes(cccd);
      const matchPhone = phoneNumber === "" || (user.phoneNumber ?? "").includes(phoneNumber);
      const matchEmail = email === "" || (user.email ?? "").toLowerCase().includes(email.toLowerCase());
      return matchCccd && matchPhone && matchEmail;
    });

    onFilter(filtered, { cccd, phone: phoneNumber, email });
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
        value={phoneNumber}
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
      <Button type="primary" onClick={handleSearch} className="min-w-[150px]" size="large">
        Tìm kiếm
      </Button>
    </div>
  );
};

export default UserFilterBar;
