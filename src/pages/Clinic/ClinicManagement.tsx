import React, { useEffect, useState } from "react";
import Button from "antd/lib/button";
import { DatePicker } from "antd/lib";
import Input from "antd/es/input";

import ClinicTable, { type Clinic } from "./ClinicTable";
import AddClinic from "./AddClinic";
import api from "../../api/axios";


const initialClinics: Clinic[] = [
  // {
  //   id: 1,
  //   name: "Chi nhánh Hà Nội",
  //   description: "Phòng khám trung tâm",
  //   position: "123131313",
  //   phoneNumber: "0983111111",
  //   image: null,
  //   address: {
  //     id: 1,
  //     city: "Hà Nội"
  //   }
  // },
];

const ClinicManagement: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
  const [filteredClinics, setFilteredClinics] =
    useState<Clinic[]>(initialClinics);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/v1/clinics");
        console.log(res.data.data.result);
        setClinics(res.data.data.result);
        setFilteredClinics(res.data.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Thêm clinic mới
  const handleAddClinic = (newClinic: Clinic) => {
    const updatedClinics = [...clinics, newClinic];
    setClinics(updatedClinics);
    setFilteredClinics(updatedClinics);
    setIsAddModalOpen(false);
  };

  // Cập nhật clinic
  const handleUpdateClinic = (updatedClinic: Clinic) => {
    const updatedList = clinics.map((c) =>
      c.id === updatedClinic.id ? { ...c, ...updatedClinic } : c
    );
    setClinics(updatedList);
    setFilteredClinics(updatedList);
  };

  // Xóa clinic
  const handleDeleteClinic = (id: number) => {
    console.log("Deleted clinic with id:", id);
    const updatedClinics = clinics.filter((c) => c.id !== id);
    setClinics(updatedClinics);
    setFilteredClinics(updatedClinics);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700">
        Quản lý Phòng khám
      </h1>

      {/* Thanh lọc và nút Thêm phòng khám */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex flex-nowrap gap-2 min-w-[800px]">
          <DatePicker placeholder="Ngày tạo" style={{ width: 160 }} />
          <Input placeholder="Tên phòng khám" style={{ width: 160 }} />
          <Input placeholder="Thành phố" style={{ width: 160 }} />
          <Button
            type="primary"
            size="large"
            onClick={() => setIsAddModalOpen(true)}
            style={{ minWidth: 150 }}
          >
            + Thêm phòng khám
          </Button>
        </div>
      </div>

      {/* Bảng phòng khám */}
      <ClinicTable
        clinics={filteredClinics}
        onUpdateClinic={handleUpdateClinic}
        onDeleteClinic={handleDeleteClinic}
      />

      {/* Modal thêm phòng khám */}
      <AddClinic
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddClinic}
      />
    </div>
  );
};

export default ClinicManagement;
