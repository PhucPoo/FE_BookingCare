import React, { useState } from 'react';
import type { User } from './UserTable';
import { Button, Input } from 'antd/lib';

interface UserFilterBarProps {
  users: User[];
  onFilter: (filtered: User[]) => void;
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({ users, onFilter }) => {
  const [cccd, setCccd] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    const filtered = users.filter((user) => {
      const matchCccd = cccd === '' || String(user.cccd ?? '').includes(cccd);
      const matchPhone = phoneNumber === '' || user.phoneNumber.includes(phoneNumber);
      const matchEmail = email === '' || user.email.toLowerCase().includes(email.toLowerCase());

      return matchCccd && matchPhone && matchEmail;
    });
    console.log(">>",filtered);
    
    onFilter(filtered);
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

      <Button
        type="primary"
        onClick={handleSearch}
        className="flex-1 min-w-[150px]"
        size="large"
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default UserFilterBar;
