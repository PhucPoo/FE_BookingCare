import React, { useEffect, useState } from "react";
import DoctorFilterBar from "./DoctorFilterBar";
import DoctorTable, { type Doctor } from "./DoctorTable";
import { testDeleteDoctorApi, testSearchDoctorApi } from "../../../api/testDoctor";

const DoctorManagement: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(2);
  const [pages, setPages] = useState<number>(1);
  const [totalDoctorList, setTotalDoctorList] = useState<number>(10);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState<string | null>(null);
  const [specialtyId, setSpecialtyId] = useState<string | null>(null);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [monthYear, setMonthYear] = useState<string | null>(null);
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
  const parseCostRange = (range: string) => {
    if (!range) return { min: undefined, max: undefined };
    const [min, max] = range.split("-").map(Number);
    return { min, max };
  };

  const costRange = parseCostRange(cost);
  // Lấy danh sách bác sĩ từ API
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const res = await testSearchDoctorApi({
          name: name ,
          phoneNumber: phone || undefined,
          min: costRange.min,
          max: costRange.max,
          degree: degree || undefined,
          specialtyId: specialtyId ? Number(specialtyId) : undefined,
          clinicId: clinicId ? Number(clinicId) : undefined,
          monthYear: monthYear || undefined,

        }, pageSize,pages);
        setDoctors(res.data.result);
        console.log( setDoctors(res.data.result));
        
        setFilteredDoctors(res.data.result);
        setTotalDoctorList(res.data.meta.totals);

      } catch (error) {
        console.error("Lỗi load danh sách bác sĩ:", error);
      }
    };
    fetchData();
  }, [pages, pageSize]);



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
       const res = await testSearchDoctorApi(
      {
        name: name,
        phoneNumber: phone || undefined,
        min: costRange.min,
        max: costRange.max,
        degree: degree || undefined,
        specialtyId: specialtyId ? Number(specialtyId) : undefined,
        clinicId: clinicId ? Number(clinicId) : undefined,
        monthYear: monthYear || undefined,
      },
      pageSize,
      pages
    );

    setDoctors(res.data.result);
    setFilteredDoctors(res.data.result);
    setTotalDoctorList(res.data.meta.totals);
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
        filteredDoctors={setFilteredDoctors}
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
        }
        }
       
        pages={pages}
        pageSize={pageSize}
        name={name}
        setName={setName}
        cost={cost}
        setCost={setCost}
        phone={phone}
        setPhone={setPhone}
        degree={degree}
        setDegree={setDegree}
        specialtyId={specialtyId}
        setSpecialtyId={setSpecialtyId}
        clinicId={clinicId}
        setClinicId={setClinicId}
        monthYear={monthYear}
        setMonthYear={setMonthYear}
      />

      {/* Bảng bác sĩ */}
      <DoctorTable
        doctors={filteredDoctors}
        onUpdateDoctor={handleUpdateDoctor}
        onDeleteDoctor={handleDeleteDoctor}
        searchName={keywords.name}
        searchPhone={keywords.phone}
        searchCost={keywords.cost}
        totalDoctorList={totalDoctorList}
        pages={pages}
        pageSize={pageSize}
        setpages={setPages}
        setpageSize={setPageSize}


      />
    </div>
  );
};

export default DoctorManagement;
