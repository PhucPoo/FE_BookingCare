import React, { useEffect, useState } from "react";
import Button from "antd/lib/button";
import { DatePicker, Input } from "antd/lib";
import api from "../../api/axios";
import SpecialtyTable, { type Specialty } from "./SpecialtyTable";
import AddSpecialty from "./AddSpecialty";
import EditSpecialty from "./EditSpecialty";
import { testGetSpecialtyApi, testPostSpecialtyApi } from "../../api/testSpecialty";



const SpecialtyList: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<Specialty[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);

  // filter state
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Lấy danh sách specialty
  const handleGetSpecialties = async () => {
    try {
      const res = await testGetSpecialtyApi();
      setSpecialties(res.data.result);
      setFilteredSpecialties(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách specialties:", error);
    }
  };

  useEffect(() => {
    handleGetSpecialties();
  }, []);

  // Thêm
  const handleAddSpecialty = async (newSpecialty: Specialty) => {

    const updated = [...specialties, newSpecialty];
    setSpecialties(updated);
    setFilteredSpecialties(updated);
    setIsAddModalOpen(false);
    // try {
    //   const res = await testPostSpecialtyApi(newSpecialty);
    //   const saved = res.data.data;
    //   const updated = [...specialties, saved];
    //   setSpecialties(updated);
    //   setFilteredSpecialties(updated);
    //   setIsAddModalOpen(false);
    // } catch (error) {
    //   console.error("Lỗi thêm specialty:", error);
    // }
  };

  // Cập nhật
  const handleUpdateSpecialty = (updated: Specialty) => {
    const updatedList = specialties.map((s) =>
      s.id === updated.id ? { ...s, ...updated } : s
    );
    setSpecialties(updatedList);
    setFilteredSpecialties(updatedList);
    setIsEditModalOpen(false);
    setEditingSpecialty(null);
  };

  // Xóa
  const handleDeleteSpecialty = (id: number) => {
    const updated = specialties.filter((s) => s.id !== id);
    setSpecialties(updated);
    setFilteredSpecialties(updated);
  };

  // Filter
  const handleFilter = () => {
    let data = [...specialties];
    if (nameFilter) {
      data = data.filter((s) =>
        s.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (dateFilter) {
      data = data.filter(
        (s) =>
          s.createAt &&
          new Date(s.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN")
      );
    }
    setFilteredSpecialties(data);
  };

  useEffect(() => {
    handleFilter();
  }, [nameFilter, dateFilter, specialties]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Quản lý Chuyên khoa</h1>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Input
          placeholder="Tên chuyên khoa"
          style={{ width: 200 }}
          onChange={(e) => setNameFilter(e.target.value || null)}
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
          + Thêm chuyên khoa
        </Button>
      </div>

      {/* Bảng */}
      <SpecialtyTable
        specialties={filteredSpecialties}
        setSpecialties={setSpecialties}
        onUpdateSpecialty={handleUpdateSpecialty}
        onDeleteSpecialty={handleDeleteSpecialty}
      />

      {/* Modal thêm */}
      <AddSpecialty
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddSpecialty}
      />

      {/* Modal sửa */}
      <EditSpecialty
        open={isEditModalOpen}
        specialty={editingSpecialty}
        onCancel={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateSpecialty}
      />
    </div>
  );
};

export default SpecialtyList;
