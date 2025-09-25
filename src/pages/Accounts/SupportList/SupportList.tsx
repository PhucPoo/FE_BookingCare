import React, { useEffect, useState } from "react";
import { Button, DatePicker, Space } from "antd/lib";

import type { Support } from "./SupportTable";
import SupportTable from "./SupportTable";
import AddSupport from "./AddSupport";
import SupportFilterBar from "./SupportFilterBar";
// import SupportAdvancedFilter from "./SupportAdvancedFilter"; 

import { testDeleteSupportApi, testGetSupportApi } from "../../../api/testSupport";
import SupportAdvancedFilter from "./SupportAdvancedFilter";

const SupportManagement: React.FC = () => {
  const [supports, setSupports] = useState<Support[]>([]);
  const [filteredSupports, setFilteredSupports] = useState<Support[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // state filter
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [clinicFilter, setClinicFilter] = useState<string | null>(null);

  // Lấy danh sách trợ lý
  const handleGetSupports = async () => {
    try {
      const res = await testGetSupportApi();

      console.log(">>>", res);
      setSupports(res.data.result);
      setFilteredSupports(res.data.result);

    } catch (error) {
      console.error("Lỗi lấy danh sách trợ lý:", error);
    }
  };

  useEffect(() => {
    handleGetSupports();
  }, []);

  // Cập nhật trợ lý
  const handleUpdateSupport = async (updatedSupport: Support) => {
    try {
      // Gọi lại API để lấy danh sách mới
      const res = await testGetSupportApi();
      const updatedData = res.data.data.result;
      console.log(">>>", updatedData);


      const updatedList = supports.map((s) =>
        s.id === updatedSupport.id ? { ...s, ...updatedData } : s
      );
      setSupports(updatedList);

      const updatedFiltered = filteredSupports.map((s) =>
        s.id === updatedSupport.id ? { ...s, ...updatedData } : s
      );
      setFilteredSupports(updatedFiltered);

      console.log("Cập nhật trợ lý thành công:", updatedSupport);
    } catch (error) {
      console.error("Lỗi cập nhật trợ lý:", error);
    }
  };

  // Xóa trợ lý
  const handleDeleteSupport = async (id: number) => {
    try {
      await testDeleteSupportApi(id);
      const updatedList = supports.filter((s) => s.id !== id);
      setSupports(updatedList);
      setFilteredSupports(updatedList);
      console.log("Xóa trợ lý thành công:", id);
    } catch (err) {
      console.error("Lỗi xóa trợ lý:", err);
    }
  };

  // Lọc theo filter
  const handleFilter = () => {
    let data = [...supports];
    if (genderFilter) {
      data = data.filter(
        (s) => s.account.gender?.toLowerCase() === genderFilter
      );
    }
    if (dateFilter) {
      data = data.filter(
        (s) =>
          new Date(s.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN")
      );
    }
    if (clinicFilter) {
      data = data.filter(
        (s) => s.clinic?.name?.toLowerCase() === clinicFilter
      );
    }
    setFilteredSupports(data);
  };

  useEffect(() => {
    handleFilter();
  }, [genderFilter, dateFilter, clinicFilter, supports]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý trợ lý
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <SupportFilterBar supports={supports} onFilter={setFilteredSupports} />
        </div>
      </div>

      {/* Bộ lọc nâng cao giống User */}
      <SupportAdvancedFilter
        onChangeGender={setGenderFilter}
        onChangeDate={setDateFilter}
        onChangeClinic={setClinicFilter}
        onOpenAdd={() => setIsAddModalOpen(true)}
      />

      <SupportTable
        supports={filteredSupports}
        setsupport={setSupports}
        onUpdateSupport={handleUpdateSupport}
        onDeleteSupport={handleDeleteSupport}
      />

      <AddSupport
        supports={supports}
        setsupport={setSupports}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={(newSupport) => setSupports([...supports, newSupport])}
      />
    </div>
  );
};

export default SupportManagement;
