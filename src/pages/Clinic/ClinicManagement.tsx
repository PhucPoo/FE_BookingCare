import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { Button } from "antd/lib";
import ClinicTable, { type Clinic } from "./ClinicTable";
import AddClinic from "./AddClinic";
import ClinicFilterBar from "./ClinicFilterBar";
import { testSearchClinicApi } from "../../api/testClinic";
import EditClinic from "./EditClinic";

const ClinicManagement: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Phân trang
  const [pageSize, setPageSize] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);
  const [totalClinic, setTotalClinic] = useState<number>(0);

  // Bộ lọc
  const [name, setName] = useState<string>("");
  const [addressID, setAddressID] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [monthYear, setMonthYear] = useState<Date | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  

  

  const [keywords, setKeywords] = useState({
    name: "",
    phoneNumber: "",
    addressID: null as number | null,
    monthYear: null as Date | null,
  });

  // Gọi API lấy danh sách phòng khám theo filter
  const fetchClinics = async (
    filter?: typeof keywords,
    page: number = pages,
    size: number = pageSize
  ) => {
    const kw = filter ?? { name, phoneNumber, addressID, monthYear };
    try {
      const res = await testSearchClinicApi(
        {
          name: kw.name || undefined,
          addressID: kw.addressID ?? undefined,
          phoneNumber: kw.phoneNumber || undefined,
          monthYear: kw.monthYear ?? undefined,
        },
        page,
        size
      );

      const data = res?.data?.result ?? [];
      setClinics(data);
      setFilteredClinics(data);

      setTotalClinic(res.data.meta?.totals || res.length);
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách phòng khám:", error);
      notification.error({
        message: "Lỗi tải dữ liệu",
        description:
          error.response?.data?.message || "Không thể tải danh sách phòng khám",
      });
    }
  };

  useEffect(() => {
    fetchClinics();
  }, [pages, pageSize]);

  // Thêm clinic mới
  const handleAddClinic = (newClinic: Clinic) => {
    const updated = [...clinics, newClinic];
    setClinics(updated);
    setFilteredClinics(updated);
    setIsAddModalOpen(false);
  };

  // Cập nhật clinic
  const handleUpdateClinic = (updatedClinic: Clinic) => {
    const updated = clinics.map((c) =>
      c.id === updatedClinic.id ? { ...c, ...updatedClinic } : c
    );
    setClinics(updated);
    setFilteredClinics(updated);
    setIsEditModalOpen(false);
    setEditingClinic(null);
    
  };

  // Xóa clinic
  const handleDeleteClinic = (id: number) => {
    const updated = clinics.filter((c) => c.id !== id);
    setClinics(updated);
    setFilteredClinics(updated);
  };

  // Khi bấm tìm kiếm từ FilterBar
  const handleFilter = async (filteredList: Clinic[], kw: typeof keywords) => {
    setName(kw.name);
    setAddressID(kw.addressID);
    setPhoneNumber(kw.phoneNumber);
    setMonthYear(kw.monthYear);
    setKeywords(kw);
    await fetchClinics(kw);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý Phòng khám
      </h1>

      {/* Thanh lọc */}
      <ClinicFilterBar
        filteredClinics={setFilteredClinics}
        onFilter={handleFilter}
        pages={pages}
        pageSize={pageSize}
        name={name}
        setName={setName}
        addressID={addressID}
        setAddressID={setAddressID}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        monthYear={monthYear}
        setMonthYear={setMonthYear}
      />

      <Button
        type="primary"
        size="large"
        className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm mb-4"
        onClick={() => setIsAddModalOpen(true)}
      >
        + Thêm phòng khám
      </Button>

      <ClinicTable
        clinics={filteredClinics}
        onUpdateClinic={handleUpdateClinic}
        onDeleteClinic={handleDeleteClinic}
        pages={pages}
        pageSize={pageSize}
        setpages={setPages}
        setPageSize={setPageSize}
        totalClinics={totalClinic}
      />

      {/* Modal thêm */}
      <AddClinic
        clinics={filteredClinics}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddClinic}
      />

      <EditClinic
        open={isEditModalOpen}
        clinic={editingClinic}
        onCancel={() =>  setIsEditModalOpen(false)}
        onUpdate={handleUpdateClinic}
      />

    </div>
  );
};

export default ClinicManagement;
