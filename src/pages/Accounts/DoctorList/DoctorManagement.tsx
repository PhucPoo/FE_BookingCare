import React, { useEffect, useState } from "react";
import DoctorFilterBar from "./DoctorFilterBar";
import DoctorTable, { type Doctor } from "./DoctorTable";
import { testDeleteDoctorApi, testGetDoctorApi } from "../../../api/testDoctor";

const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [keywords, setKeywords] = useState({
    name: "",
    phone: "",
    cost: "",
    degree: null as string | null,
    specialtyId: null as string | null,
    clinicId: null as string | null,
    monthYear: null as string | null,
  });

  // Lấy danh sách bác sĩ từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await testGetDoctorApi();
        setDoctors(res.data.result ?? []);
        setFilteredDoctors(res.data.result ?? []);
      } catch (error) {
        console.error("Lỗi load danh sách bác sĩ:", error);
      }
    };
    fetchData();
  }, []);

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
  const handleDeleteDoctor = async (id: number) => {
    try {
      await testDeleteDoctorApi(id); // gọi API xóa DB
      setDoctors((prev) => {
        const newDoctors = prev.filter((doc) => Number(doc.id) !== Number(id));
        setFilteredDoctors(newDoctors);
        return newDoctors;
      });
    } catch (err) {
      console.error("Lỗi xóa bác sĩ:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700">
        Quản lý Bác sĩ
      </h1>

      {/* Bộ lọc bác sĩ */}
      <DoctorFilterBar
        setFilteredDoctors={setFilteredDoctors}
        onFilter={(filtered, kw) => {
          setFilteredDoctors(filtered);
          setKeywords({
            name: kw.name ?? "",
            phone: kw.phone ?? "",
            cost: kw.cost ?? "",
            degree: kw.degree ?? null,
            specialtyId: kw.specialtyId ?? null,
            clinicId: kw.clinicId ?? null,
            monthYear: kw.monthYear ?? null,
          });
        }}
      />

      {/* Bảng bác sĩ */}
      <DoctorTable
        doctors={filteredDoctors}
        setdoctor={setDoctors}
        onUpdateDoctor={handleUpdateDoctor}
        onDeleteDoctor={handleDeleteDoctor}
        searchName={keywords.name}
        searchPhone={keywords.phone}
        searchCost={keywords.cost}
      />
    </div>
  );
};

export default DoctorManagement;
