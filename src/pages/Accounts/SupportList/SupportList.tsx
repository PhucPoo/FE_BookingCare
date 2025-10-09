import React, { useEffect, useState } from "react";

import type { Support } from "./SupportTable";
import SupportTable from "./SupportTable";
import SupportFilterBar from "./SupportFilterBar";
// import SupportAdvancedFilter from "./SupportAdvancedFilter"; 

import { testDeleteSupportApi, testSearchSupportApi } from "../../../api/testSupport";

const SupportManagement: React.FC = () => {
  const [supports, setSupports] = useState<Support[]>([]);
  const [filteredSupports, setFilteredSupports] = useState<Support[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(""); // người dùng nhập địa chỉ
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(2);
  const [pages, setPages] = useState<number>(1);
  const [totalDoctorList, setTotalDoctorList] = useState<number>(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSupport, setEditingSupport] = useState<Support | null>(null);


  // state filter
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [clinicFilter, setClinicFilter] = useState<string | null>(null);

  const [keywords, setKeywords] = useState({
    name: "",
    phone: "",
    addressId: null as string | null,
    clinicId: null as string | null,
  });
  // Lấy danh sách trợ lý


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await testSearchSupportApi({
          name: name || undefined,
          phoneNumber: phone || undefined,
          address: address || undefined, // gửi địa chỉ người dùng nhập
          clinicId: clinicId ? Number(clinicId) : undefined,

        }, pages, pageSize);

        setSupports(res.data.result);
        setFilteredSupports(res.data.result);
        setTotalDoctorList(res.data.meta.totals);

      } catch (error) {
        console.error("Lỗi lấy danh sách trợ lý:", error);
      }
    };
    fetchData();
  }, [pages, pageSize]);

  // Cập nhật trợ lý
  const handleUpdateSupport = async (updatedSupport: Support) => {
    try {
      // Gọi lại API để lấy danh sách mới

      const updatedList = supports.map((s) =>
        s.id === updatedSupport.id ? { ...s, ...updatedSupport } : s
      );
      setSupports(updatedList);

      const updatedFiltered = filteredSupports.map((s) =>
        s.id === updatedSupport.id ? { ...s, ...updatedSupport } : s
      );
      setFilteredSupports(updatedFiltered);
      setIsEditModalOpen(false);
      setEditingSupport(null);


      console.log("Cập nhật trợ lý thành công:", updatedSupport);
    } catch (error) {
      console.error("Lỗi cập nhật trợ lý:", error);
    }
  };

  // Xóa trợ lý
  const handleDeleteSupport = async (id: number) => {
    try {
      await testDeleteSupportApi(id);

      const res = await testSearchSupportApi({
        name: name || undefined,
        phoneNumber: phone || undefined,
        address: address || undefined,
        clinicId: clinicId ? Number(clinicId) : undefined,
      }, pages, pageSize);

      setSupports(res.data.result);
      setFilteredSupports(res.data.result);
      setTotalDoctorList(res.data.meta.totals);

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

      <SupportFilterBar
        setFilteredSupports={setFilteredSupports}
        onFilter={(filtered, kw) => {
          setFilteredSupports(filtered);
          setKeywords({
            name: kw.name ?? "",
            phone: kw.phone ?? "",
            addressId: kw.address ?? "",
            clinicId: kw.clinicId ?? null,
          });
        }}
        pages={pages}
        pageSize={pageSize}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        address={address}
        setAddress={setAddress}
        clinicId={clinicId}
        setClinicId={setClinicId}
      />

      <SupportTable
        supports={filteredSupports}
        setsupport={setSupports}
        onUpdateSupport={handleUpdateSupport}
        onDeleteSupport={handleDeleteSupport}
        searchName={keywords.name}
        searchPhone={keywords.phone}
        totalSupportList={totalDoctorList}
        pages={pages}
        pageSize={pageSize}
        setpages={setPages}
        setpageSize={setPageSize}
      />




    </div>
  );
};

export default SupportManagement;
