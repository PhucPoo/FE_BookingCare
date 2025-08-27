import React, { useState } from 'react';
import type { Doctor } from '../DoctorList/DoctorTable'; // hoặc import từ doctorTypes.ts nếu tách riêng

interface DoctorFilterBarProps {
  doctors: Doctor[];
  onFilter: (filtered: Doctor[]) => void;
}

const DoctorFilterBar: React.FC<DoctorFilterBarProps> = ({ doctors, onFilter }) => {
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
    <div className="grid grid-cols-6 gap-4 p-4 bg-white shadow rounded mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên bác sĩ"
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Giá tiền"
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Nghỉ</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded col-span-1"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default DoctorFilterBar;
