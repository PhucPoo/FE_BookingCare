import React, { useEffect, useState } from "react";
import DoctorFilterBar from "./DoctorFilterBar";
import DoctorTable, { type Doctor } from "./DoctorTable";
import AddDoctor from "./AddDoctor";
import Button from "antd/lib/button";
import { DatePicker } from "antd/lib";
import Input from "antd/es/input";
import api from "../../../api/axios";

// Doctor mới theo API backend
// type Doctor định nghĩa trong DoctorTable.tsx:
// export interface Doctor {
//   id: number;
//   cost: number;
//   degree: string;
//   account: { id: number; name: string; email: string; phoneNumber: string };
//   clinic: { id: number; name: string };
//   specialty: { id: number; name: string };
//   createdAt: string;
//   updatedAt: string;
//   status?: string;
// }

const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Lấy danh sách bác sĩ từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/v1/doctors");
        console.log(res.data.data.result);
        setDoctors(res.data.data.result);
        setFilteredDoctors(res.data.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
        ? { ...doc, ...updatedDoctor, updatedAt: new Date().toISOString() }
        : doc
    );
    setDoctors(updatedList);
    setFilteredDoctors(updatedList);
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

      {/* Thanh lọc + nút Thêm bác sĩ */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex flex-nowrap gap-2 min-w-[800px]">
          <DatePicker placeholder="Ngày tạo" style={{ width: 160 }} />
          <Input placeholder="Chi phí" style={{ width: 120 }} />
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
