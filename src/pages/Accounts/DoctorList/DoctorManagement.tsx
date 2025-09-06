import React, { useState } from "react";
import DoctorFilterBar from "./DoctorFilterBar";
import DoctorTable, { type Doctor } from "./DoctorTable";
import AddDoctor from "./AddDoctor";
import Button from "antd/lib/button";
import { DatePicker } from "antd/lib";
import Input from "antd/es/input";

const initialDoctors: Doctor[] = [
  {
    id: 2,
    name: "BS. Nguyễn Văn B",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0942234567",
    price: 15000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "active",
  },
  {
    id: 1,
    name: "BS. Nguyễn Văn A",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0901234567",
    price: 20000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "active",
  },
  {
    id: 3,
    name: "BS. Nguyễn Văn C",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0939234567",
    price: 15000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "active",
  },
  {
    id: 4,
    name: "BS. Nguyễn Văn D",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0920234567",
    price: 15000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "inactive",
  },
  {
    id: 5,
    name: "BS. Nguyễn Văn CD",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0901234567",
    price: 15000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "inactive",
  },
  {
    id: 6,
    name: "BS. Nguyễn Văn AB",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0910744567",
    price: 15000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "active",
  },
  {
    id: 7,
    name: "BS. Nguyễn Văn ABC",
    email: "hp@gmail.com",
    cccd: 1289389,
    phone: "0910784567",
    price: 15000,
    create_at: new Date("2025-08-27"),
    update_at: new Date("2025-08-27"),
    status: "inactive",
  },
];

const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [filteredDoctors, setFilteredDoctors] =
    useState<Doctor[]>(initialDoctors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Thêm bác sĩ mới
  const handleAddDoctor = (newDoctor: Doctor) => {
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
    setIsAddModalOpen(false);
  };

  // Cập nhật bác sĩ
  const handleUpdateDoctor = (updatedDoctor: Doctor) => {
    const updatedList = doctors.map((doc) =>
      doc.id === updatedDoctor.id
        ? { ...doc, ...updatedDoctor, update_at: new Date() }
        : doc
    );
    setDoctors(updatedList);
    setFilteredDoctors(updatedList); // rất quan trọng để table hiển thị đúng
  };
  // Xóa bác sĩ
  const handleDeleteDoctor = (id: number) => {
    console.log("Deleted doctor with id:", id);
    const updatedDoctors = doctors.filter((d) => d.id !== id);
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
  };
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700">
        Quản lý Bác sĩ
      </h1>

      {/* Bộ lọc bác sĩ */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <DoctorFilterBar doctors={doctors} onFilter={setFilteredDoctors} />
        </div>
      </div>

      {/* Thanh lọc và nút Thêm bác sĩ trên 1 hàng */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex flex-nowrap gap-2 min-w-[800px]">
          {/* <Form.Item name="Ngày tạo" className="h-2"> */}
          <DatePicker placeholder="Ngày tạo" style={{ width: 160 }} />
          {/* </Form.Item> */}
          <Input placeholder="Giá" style={{ width: 120 }} />
          <Input placeholder="Phòng khám" style={{ width: 160 }} />
          <Input placeholder="Chuyên khoa" style={{ width: 160 }} />
          <Button
            type="primary"
            size="large"
            onClick={() => setIsAddModalOpen(true)}
            style={{ minWidth: 150 }}
          >
            + Thêm bác sĩ
          </Button>
        </div>
      </div>

      {/* Bảng bác sĩ */}
      <DoctorTable
        doctors={filteredDoctors}
        onUpdateDoctor={handleUpdateDoctor}
        onDeleteDoctor={handleDeleteDoctor}
      />

      {/* Modal thêm bác sĩ */}
      <AddDoctor
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddDoctor}
      />
    </div>
  );
};

export default DoctorManagement;
