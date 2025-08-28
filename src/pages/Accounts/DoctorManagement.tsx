import React, { useState } from 'react';
import DoctorFilterBar from '../../components/DoctorList/DoctorFilterBar';
import DoctorTable, { type Doctor } from '../../components/DoctorList/DoctorTable';



const doctors: Doctor[] = [
  { id: 2, name: 'BS. Nguyễn Văn B',email: 'hp@gmail.com',cccd: 1289389, phone: '0942234567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
  { id: 2, name: 'BS. Nguyễn Văn B',email: 'hp@gmail.com',cccd: 1289389, phone: '0942234567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
  { id: 1, name: 'BS. Nguyễn Văn A',email: 'hp@gmail.com',cccd: 1289389, phone: '0901234567',price:20000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
  { id: 3, name: 'BS. Nguyễn Văn C',email: 'hp@gmail.com',cccd: 1289389, phone: '0939234567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
  { id: 4, name: 'BS. Nguyễn Văn D',email: 'hp@gmail.com',cccd: 1289389, phone: '0920234567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'inactive' },
  { id: 5, name: 'BS. Nguyễn Văn CD',email: 'hp@gmail.com',cccd: 1289389, phone: '0901234567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'inactive' },
  { id: 6, name: 'BS. Nguyễn Văn AB',email: 'hp@gmail.com',cccd: 1289389, phone: '0910744567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
  { id: 7, name: 'BS. Nguyễn Văn ABC',email: 'hp@gmail.com',cccd: 1289389, phone: '0910784567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'inactive' },
  { id: 8, name: 'BS. Nguyễn Văn ABC',email: 'hp@gmail.com',cccd: 1289389, phone: '0910784567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'inactive' },
  { id: 9, name: 'BS. Nguyễn Văn ABC',email: 'hp@gmail.com',cccd: 1289389, phone: '0910784567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'inactive' },
  { id: 10, name: 'BS. Nguyễn Văn ABC',email: 'hp@gmail.com',cccd: 1289389, phone: '0910784567',price:15000,create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'inactive' },
    // Thêm dữ liệu giả khác tại đây nếu cần
];
const DoctorManagement: React.FC = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Quản lý Bác sĩ</h1>
      <DoctorFilterBar doctors={doctors} onFilter={setFilteredDoctors} />
      <DoctorTable doctors={filteredDoctors} />
    </div>
  );
};

export default DoctorManagement;