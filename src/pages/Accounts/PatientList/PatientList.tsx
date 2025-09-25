import React, { useEffect, useState } from "react";
import { Button } from "antd/lib";

import type { Patient } from "./PatientTable";
import PatientTable from "./PatientTable";
import AddPatient from "./AddPatient";
import PatientFilterBar from "./PatientFilterBar";

import { testGetPatientApi, testDeletePatientApi } from "../../../api/testPatient";
import PatientAdvancedFilter from "./PatientAdvancedFilter";

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // state filter
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [addressFilter, setAddressFilter] = useState<string | null>(null);

  // Lấy danh sách bệnh nhân
  const handleGetPatients = async () => {
    try {
      const res = await testGetPatientApi();
      setPatients(res.data.result);
      setFilteredPatients(res.data.result);
    } catch (error) {
      console.error("Lỗi lấy danh sách bệnh nhân:", error);
    }
  };

  useEffect(() => {
    handleGetPatients();
  }, []);

  // Cập nhật bệnh nhân
  const handleUpdatePatient = async (updatedPatient: Patient) => {
    try {
      const res = await testGetPatientApi();
      const updatedData = res.data.result.find(
        (p: Patient) => p.id === updatedPatient.id
      );

      const updatedList = patients.map((p) =>
        p.id === updatedPatient.id ? { ...p, ...updatedData } : p
      );
      setPatients(updatedList);

      const updatedFiltered = filteredPatients.map((p) =>
        p.id === updatedPatient.id ? { ...p, ...updatedData } : p
      );
      setFilteredPatients(updatedFiltered);

      console.log("Cập nhật bệnh nhân thành công:", updatedPatient);
    } catch (error) {
      console.error("Lỗi cập nhật bệnh nhân:", error);
    }
  };

  // Xóa bệnh nhân
  const handleDeletePatient = async (id: number) => {
    try {
      await testDeletePatientApi(id);
      const updatedList = patients.filter((p) => p.id !== id);
      setPatients(updatedList);
      setFilteredPatients(updatedList);
      console.log("Xóa bệnh nhân thành công:", id);
    } catch (err) {
      console.error("Lỗi xóa bệnh nhân:", err);
    }
  };

  // Lọc theo filter
  const handleFilter = () => {
    let data = [...patients];
    if (genderFilter) {
      data = data.filter(
        (p) => p.account?.gender?.toLowerCase() === genderFilter
      );
    }
    if (dateFilter) {
      data = data.filter(
        (p) =>
          new Date(p.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN")
      );
    }
    if (addressFilter) {
      data = data.filter(
        (p) => p.account?.address?.toLowerCase() === addressFilter
      );
    }
    setFilteredPatients(data);
  };

  useEffect(() => {
    handleFilter();
  }, [genderFilter, dateFilter, addressFilter, patients]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý bệnh nhân
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <PatientFilterBar patients={patients} onFilter={setFilteredPatients} />
        </div>
      </div>

      {/* Bộ lọc nâng cao giống Support */}
      <PatientAdvancedFilter
        onChangeGender={setGenderFilter}
        onChangeDate={setDateFilter}
        onChangeAddress={setAddressFilter}
        onOpenAdd={() => setIsAddModalOpen(true)}
      />

      <PatientTable
        patients={filteredPatients}
        setpatient={setPatients}
        onUpdatepatient={handleUpdatePatient}
        onDeletepatient={handleDeletePatient}
      />

      <AddPatient
        patients={patients}
        setpatients={setPatients}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={(newPatient) => setPatients([...patients, newPatient])}
      />
    </div>
  );
};

export default PatientManagement;
