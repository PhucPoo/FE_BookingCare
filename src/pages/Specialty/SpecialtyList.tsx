import React, { useEffect, useState } from "react";
import { Button } from "antd/lib";
import SpecialtyTable, { type Specialty } from "./SpecialtyTable";
import AddSpecialty from "./AddSpecialty";
import EditSpecialty from "./EditSpecialty";
import { testGetSpecialtyApi, testSearchSpecialtyApi } from "../../api/testSpecialty";
import SpecialtyFilterBar from "./SpecialtyFilterBar";

const SpecialtyList: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<Specialty[]>([]);

  // modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);

  // filter state
  const [name, setName] = useState<string>("");
  const [monthYear, setMonthYear] = useState<Date | null>(null);

  // pagination
  const [pageSize, setPageSize] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);
  const [totalSpecialtys, setTotalSpecialtys] = useState<number>(0);

  const [keywords, setKeywords] = useState({
    name: "",
    monthYear: null as string | null,
  });
  const handleGetSpecialties = async () => {
    try {
      const res = await testSearchSpecialtyApi(
        {
          name:name,
          monthYear: keywords.monthYear ? new Date(keywords.monthYear) : undefined,
        },pages, pageSize);
      const result = res.data.result ?? [];
      setSpecialties(result);
      setFilteredSpecialties(result);
      setTotalSpecialtys(res.data.meta?.totals ?? result.length);
    } catch (error) {
      console.error("Lỗi lấy danh sách chuyên khoa:", error);
    }
  };

  useEffect(() => {
    handleGetSpecialties();
  }, [pages, pageSize]);

  const handleAddSpecialty = (newSpecialty: Specialty) => {
    const updated = [...specialties, newSpecialty];
    setSpecialties(updated);
    setFilteredSpecialties(updated);
    setIsAddModalOpen(false);
  };

  const handleUpdateSpecialty = (updated: Specialty) => {
    const updatedList = specialties.map((s) =>
      s.id === updated.id ? { ...s, ...updated } : s
    );
    setSpecialties(updatedList);
    setFilteredSpecialties(updatedList);
    setIsEditModalOpen(false);
    setEditingSpecialty(null);
  };

  // 🟥 Xóa chuyên khoa
  const handleDeleteSpecialty = (id: number) => {
    const updated = specialties.filter((s) => s.id !== id);
    setSpecialties(updated);
    setFilteredSpecialties(updated);
  };

  // 🟦 Khi FilterBar tìm kiếm xong (API search)
  const handleFilteredSpecialties = (specialties: Specialty[]) => {
    setFilteredSpecialties(specialties);
  };

  const handleFilter = (specialties: Specialty[], keywords: { name: string; monthYear: Date | null }) => {
    console.log("Bộ lọc hiện tại:", keywords);
    setFilteredSpecialties(specialties);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Quản lý Chuyên khoa</h1>

      {/* 🔍 Thanh tìm kiếm */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <SpecialtyFilterBar
          filteredSpecialties={handleFilteredSpecialties}
          onFilter={handleFilter}
          pages={pages}
          pageSize={pageSize}
          name={name}
          setName={setName}
          monthYear={monthYear}
          setMonthYear={setMonthYear}
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

      {/* 🧾 Bảng dữ liệu */}
      <SpecialtyTable
        specialties={filteredSpecialties}
        setSpecialties={setSpecialties}
        onUpdateSpecialty={handleUpdateSpecialty}
        onDeleteSpecialty={handleDeleteSpecialty}
        pages={pages}
        pageSize={pageSize}
        setpages={setPages}
        setPageSize={setPageSize}
        totalSpecialtys={totalSpecialtys}
      />

      <AddSpecialty
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddSpecialty}
      />

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
