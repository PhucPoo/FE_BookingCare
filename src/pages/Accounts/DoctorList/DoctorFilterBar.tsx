import React, { useState } from 'react';
import type { Doctor } from './DoctorTable'; // hoặc import từ doctorTypes.ts nếu tách riêng

interface DoctorFilterBarProps {
  doctors: Doctor[];
  onFilter: (filtered: Doctor[]) => void;
}

const DoctorFilterBar: React.FC<DoctorFilterBarProps> = ({ doctors, onFilter,   }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    const filtered = doctors.filter((doctor) => {
      const matchName = name === '' || doctor.name.toLowerCase().includes(name.toLowerCase());
      const matchPrice = price === '' || doctor.price?.toString().includes(price);
      const matchPhone = phone === '' || doctor.phone.includes(phone);
      const matchStatus = status === '' || doctor.status === status;
      return matchName && matchPrice && matchPhone && matchStatus;
    });

    onFilter(filtered);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên bác sĩ"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Giá tiền"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      >
        <option value="">Trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Nghỉ</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded flex-1 min-w-[150px]"
      >
        Tìm kiếm
      </button>

    </div>


  );
};

export default DoctorFilterBar;
