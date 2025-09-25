import React, { useEffect, useState } from "react";
import DoctorFilterBar from "./DoctorFilterBar";
import DoctorTable, { type Doctor } from "./DoctorTable";
import AddDoctor from "./AddDoctor";
import Button from "antd/lib/button";
import { DatePicker } from "antd/lib";
import Input from "antd/es/input";
import api from "../../../api/axios";
import { testDeleteDoctorApi, testGetDoctorApi } from "../../../api/testDoctor";
import DoctorAdvancedFilter from "./DoctorAdvancedFilter";


const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [DegreeFilter, setDegreeFilter] = useState<string | null>(null);
  const [CreateAtFilter, setCreatedAtFilter] = useState<string | null>(null);
  const [SpecialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
  const [ClinicFilter, setClinicFilter] = useState<string | null>(null);


  // Lấy danh sách bác sĩ từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await testGetDoctorApi();
        setDoctors(res.data.result);
        setFilteredDoctors(res.data.result);
      } catch (error) {
        console.error(error);
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
      setDoctors(prev => {
        const newDoctors = prev.filter(doc => Number(doc.id) !== Number(id));
        console.log("Danh sách bác sĩ sau khi xóa:", newDoctors);
        return newDoctors;
      });
    } catch (err) {
      console.error("Lỗi xóa bác sĩ:", err);
    }
  };
  const handleFilter = () => {
    let data = [...doctors];

    // Lọc theo học vị
    if (DegreeFilter) {
      data = data.filter(
        (s) => s.degree?.toLowerCase() === DegreeFilter.toLowerCase()
      );
    }

    // Lọc theo tháng/năm tạo
    if (CreateAtFilter) {
      const selectedMonth = new Date(CreateAtFilter).getMonth();
      const selectedYear = new Date(CreateAtFilter).getFullYear();

      data = data.filter((s) => {
        const createDate = new Date(s.createAt);
        return (
          createDate.getMonth() === selectedMonth &&
          createDate.getFullYear() === selectedYear
        );
      });
    }

    // Lọc theo chuyên khoa
    if (SpecialtyFilter) {
      data = data.filter(
        (s) => s.specialtyName?.toLowerCase() === SpecialtyFilter.toLowerCase()
      );
    }

    // Lọc theo phòng khám
    if (ClinicFilter) {
      data = data.filter(
        (s) => s.clinic?.name?.toLowerCase() === ClinicFilter.toLowerCase()
      );
    }

    setFilteredDoctors(data);
  };
   useEffect(() => {
      handleFilter();
    }, [DegreeFilter,CreateAtFilter,ClinicFilter,SpecialtyFilter]);



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


      <DoctorAdvancedFilter
        onChangeDegree={setDegreeFilter}
        onChangeCreatedAt={setCreatedAtFilter}
        onChangeSpecialty={setSpecialtyFilter}
        onChangeClinic={setClinicFilter}
        onOpenAdd={() => setIsAddModalOpen(true)}
      ></DoctorAdvancedFilter>

      {/* Bảng bác sĩ */}
      <DoctorTable
        doctors={filteredDoctors}
        setdoctor={setDoctors}
        onUpdateDoctor={handleUpdateDoctor}
        onDeleteDoctor={handleDeleteDoctor}
      />

      {/* Modal thêm bác sĩ */}
      <AddDoctor
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={() => []}
      />

    </div>
  );
};

export default DoctorManagement;
