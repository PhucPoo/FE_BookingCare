import React, { useEffect, useState } from "react";
import type { Doctor } from "./DoctorTable";
import { Button, DatePicker, Input, Select } from "antd/lib";
import { testSearchDoctorApi } from "../../../api/testDoctor";
import { testGetClinicApi } from "../../../api/testClinic";
import { testGetSpecialtyApi } from "../../../api/testSpecialty";
import type { Specialty } from "../../Specialty/SpecialtyTable";
import type { Clinic } from "../../Clinic/ClinicTable";

const { Option } = Select;

interface DoctorFilterKeywords {
  name?: string;
  phone?: string;
  cost?: string;
  degree?: string | null;
  specialtyId?: string | null;
  clinicId?: string | null;
  monthYear?: string | null;

}

interface DoctorFilterBarProps {
  filteredDoctors: (doctors: Doctor[]) => void;
  onFilter: (doctors: Doctor[], keywords: DoctorFilterKeywords) => void;
  pages: number;
  pageSize: number;
  name: string;
  setName: (name: string) => void;
  cost: string;
  setCost: (cost: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  degree: string | null;
  setDegree: (degree: string) => void;
  specialtyId: string | null;
  setSpecialtyId: (specialtyId: string) => void;
  clinicId: string | null;
  setClinicId: (clinicId: string) => void;
  monthYear: string | null;
  setMonthYear: (monthYear: string) => void;


}

const DoctorFilterBar: React.FC<DoctorFilterBarProps> = ({
  filteredDoctors,
  onFilter,
  pages,
  pageSize,
  name,
  setName,
  cost,
  setCost,
  phone,
  setPhone,
  degree,
  setDegree,
  specialtyId,
  setSpecialtyId,
  clinicId,
  setClinicId,
  monthYear,
  setMonthYear,

}) => {
  
 


  // data list
  const [specialtyList, setSpecialtyList] = useState<Specialty[]>([]);
  const [clinicList, setClinicList] = useState<Clinic[]>([]);

  // Hàm parse khoảng giá
  const parseCostRange = (range: string) => {
    if (!range) return { min: undefined, max: undefined };
    const [min, max] = range.split("-").map(Number);
    return { min, max };
  };

  // Load clinic & specialty
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clinicRes, specialtyRes] = await Promise.all([
          testGetClinicApi(),
          testGetSpecialtyApi(),
        ]);
        setClinicList(clinicRes.data.result ?? []);
        setSpecialtyList(specialtyRes.data.result ?? []);
      } catch (err) {
        console.error("Lỗi load specialty/clinic:", err);
      }
    };
    fetchData();
  }, []);

  // Handle Search
  const handleSearch = async () => {
    const costRange = parseCostRange(cost);
    const keywords: DoctorFilterKeywords = {
      name,
      phone,
      cost,
      degree,
      specialtyId,
      clinicId,
      monthYear,
    };


    try {
      const result = await testSearchDoctorApi({
        name: name ,
        phoneNumber: phone || undefined,
        min: costRange.min,
        max: costRange.max,
        degree: degree || undefined,
        specialtyId: specialtyId ? Number(specialtyId) : undefined,
        clinicId: clinicId ? Number(clinicId) : undefined,
        monthYear: monthYear || undefined,
      }
        , pageSize, pages);

      const doctors = result.data?.result;
      filteredDoctors(doctors);
      
      onFilter(doctors, keywords);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm bác sĩ:", error);
      filteredDoctors([]);
      onFilter([], keywords);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <Input
        placeholder="Tên bác sĩ"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        size="large"
      />

      <Select
        value={cost}
        onChange={setCost}
        placeholder="Khoảng giá khám"
        className="w-full"
        size="large"
        allowClear
      >
        <Option value="0-200000">0 - 200.000</Option>
        <Option value="200000-500000">200.000 - 500.000</Option>
        <Option value="500000-1000000">500.000 - 1.000.000</Option>
      </Select>

      <Input
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        size="large"
      />

      <Select
        placeholder="Chọn học vị"
        size="large"
        allowClear
        value={degree}
        className="w-full"
        onChange={setDegree}
      >
        <Option value="BACHELOR">Cử nhân</Option>
        <Option value="MASTER">Thạc sĩ</Option>
        <Option value="DOCTOR">Tiến sĩ</Option>
      </Select>

      <DatePicker
        picker="month"
        placeholder="Tháng/Năm tạo"
        className="w-full"
        size="large"
        onChange={(date) => setMonthYear(date ? date.format("YYYY-MM") : null)}
      />

      <Select
        placeholder="Chọn chuyên khoa"
        className="w-full"
        size="large"
        allowClear
        value={specialtyId}
        onChange={setSpecialtyId}
      >
        {specialtyList.map((s) => (
          <Option key={s.id} value={String(s.id)}>
            {s.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Chọn phòng khám"
        className="w-full"
        size="large"
        allowClear
        value={clinicId}
        onChange={setClinicId}
      >
        {clinicList.map((c) => (
          <Option key={c.id} value={String(c.id)}>
            {c.name}
          </Option>
        ))}
      </Select>

      <Button
        type="primary"
        size="large"
        className="w-full"
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
    </div>

  );
};

export default DoctorFilterBar;
