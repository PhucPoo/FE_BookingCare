import React, { useEffect, useState } from "react";
import Button from "antd/lib/button";
import { DatePicker, Input } from "antd/lib";

import ClinicTable, { type Clinic, type CreateClinic } from "./ClinicTable";
import AddClinic from "./AddClinic";
import api from "../../api/axios";
import { testGetClinicApi } from "../../api/testClinic";

const ClinicManagement: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<ClinicTable[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // filter state
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Lấy danh sách phòng khám
  const handleGetClinics = async () => {
    try {
      const res = await testGetClinicApi();
      setClinics(res.data.result);
      setFilteredClinics(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách clinic:", error);
    }
  };

  useEffect(() => {
    handleGetClinics();
  }, []);

  // Thêm clinic
  const handleAddClinic = async (newClinic: CreateClinic) => {
    // try {
    //   console.log(newClinic);
      
    //   const res = await api.post("/v1/clinics", newClinic);
    //   const savedClinic = res.data.data;

    //   const updated = [...filteredClinics, savedClinic];
    //   setClinics(updated);
    //   setFilteredClinics(updated);
    //   setIsAddModalOpen(false);
    // } catch (error) {
    //   console.error("Lỗi thêm clinic:", error);
    // }
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
    const updated = clinics.filter((c) => c.id !== id);
    setClinics(updated);
    setFilteredClinics(updated);
  };

  // Filter
  const handleFilter = () => {
    let data = [...clinics];
    if (nameFilter) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (cityFilter) {
      data = data.filter((c) =>
        c.address?.city?.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    if (dateFilter) {
      data = data.filter(
        (c) =>
          new Date(c.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN")
      );
    }
    setFilteredClinics(data);
  };

  useEffect(() => {
    handleFilter();
  }, [nameFilter, cityFilter, dateFilter, clinics]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý Phòng khám
      </h1>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Input
          placeholder="Tên phòng khám"
          style={{ width: 200 }}
          onChange={(e) => setNameFilter(e.target.value || null)}
        />
        <Input
          placeholder="Thành phố"
          style={{ width: 200 }}
          onChange={(e) => setCityFilter(e.target.value || null)}
        />
        <DatePicker
          placeholder="Ngày tạo"
          style={{ width: 180 }}
          onChange={(_, dateString) => setDateFilter(dateString || null)}
        />

        <Button
          type="primary"
          size="large"
          className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
          style={{ minWidth: 180 }}
        >
          + Thêm phòng khám
        </Button>
      </div>

      {/* Bảng clinic */}
      <ClinicTable
        clinics={clinics}
        onUpdateClinic={handleUpdateClinic}
        onDeleteClinic={handleDeleteClinic}
      />

      {/* Modal thêm */}
      <AddClinic
        clinics={filteredClinics}
        setclinics={setFilteredClinics}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddClinic}
      />
    </div>
  );
};

export default ClinicManagement;
