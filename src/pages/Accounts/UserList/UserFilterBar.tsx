import React, { useState } from 'react';
import type { User } from './UserTable'; // hoặc import từ userTypes.ts nếu tách riêng

interface userFilterBarProps {
  users: User[];
  onFilter: (filtered: User[]) => void;
}

const userFilterBar: React.FC<userFilterBarProps> = ({ users, onFilter,   }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [create_at, setCreate_at] = useState('');

  const handleSearch = () => {
    const filtered = users.filter((user) => {
      const matchName = name === '' || user.name.toLowerCase().includes(name.toLowerCase());
      const matchPrice = email === '' || user.email.toString().includes(email);
      const matchPhone = phone === '' || user.phone.includes(phone);
      const matchCreate_at = create_at === '' || user.create_at .toISOString().slice(0, 10).includes(create_at);
      return matchName && matchPrice && matchPhone && matchCreate_at;
    });

    onFilter(filtered);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên người dùng"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      {/* <select
        value={create_at}
        onChange={(e) => setCreate_at(e.target.value)}
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      >
        <option value="">Trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Nghỉ</option>
      </select> */}
      <input
        type="text"
        value={create_at}
        onChange={(e) => setCreate_at(e.target.value)}
        placeholder="Ngày tạo"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[150px]"
      >
        Tìm kiếm
      </button>

    </div>


  );
};

export default userFilterBar;
