import React, { useState } from 'react';
import type { Support } from './SupportTable'; // hoặc import từ supportTypes.ts nếu tách riêng

interface SupportFilterBarProps {
  supports: Support[];
  onFilter: (filtered: Support[]) => void;
}

const supportFilterBar: React.FC<SupportFilterBarProps> = ({ supports, onFilter,   }) => {
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const [status, setStatus] = useState('');

  const handleSearch = () => {
    const filtered = supports.filter((support) => {
      const matchName = name === '' || support.account.name.toLowerCase().includes(name.toLowerCase());
      // const matchPrice = email === '' || support.account.email.toString().includes(email);
      const matchPhone = phone === '' || support.account.phoneNumber.includes(phone);
      return matchName && matchPhone ;
    });

    onFilter(filtered);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên trợ lý"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      {/* <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      /> */}
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      {/* <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      >
        <option value="">Trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Nghỉ</option>
      </select> */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[150px]"
      >
        Tìm kiếm
      </button>

    </div>


  );
};

export default supportFilterBar;
