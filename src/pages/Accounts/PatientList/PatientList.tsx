import React, { useEffect, useState } from "react";

import type { Patient } from "./PatientTable";
import PatientTable from "./PatientTable";
import PatientFilterBar from "./PatientFilterBar";

import { testDeletePatientApi, testSearchPatientApi } from "../../../api/testPatient";

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  // state filter
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPatients, setTotalPatients] = useState(10);
  const [pages, setPages] = useState<number>(1);
  const [bhyt, setBHYT] = useState<string>("");
  const [cccd, setCCCD] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  // state search

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSupport, setEditingSupport] = useState<Patient | null>(null);


  const [keywords, setKeywords] = useState({
    name: "",
    phone: "",
    bhyt: "",
    cccd: "",
    address: "",
  });
  // Lấy danh sách bệnh nhân


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await testSearchPatientApi({
          name: name,
          address: address,
          phoneNumber: phone,
          bhyt: bhyt,
          cccd: cccd,
        }, pages, pageSize);
        setPatients(res.data.result);
        setFilteredPatients(res.data.result);
        setTotalPatients(res.data.meta.totals);
      } catch (error) {
        console.error("Lỗi lấy danh sách bệnh nhân:", error);
      }
    };
    fetchData();
  }, [pages, pageSize]);

  // Cập nhật bệnh nhân
  const handleUpdatePatient = async (updatedPatient: Patient) => {
    try {
      const updatedList = patients.map((p) =>
        p.id === updatedPatient.id ? { ...p, ...updatedPatient } : p
      );
      setPatients(updatedList);
      setFilteredPatients(updatedList);
      setIsEditModalOpen(false);
      setEditingSupport(null);

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



  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý bệnh nhân
      </h1>

      <PatientFilterBar
        filteredPatients={setFilteredPatients}
        onFilter={(filtered, kw) => {
          setFilteredPatients(filtered);
          setKeywords({
            name: kw.name ?? "",
            phone: kw.phone ?? "",
            bhyt: kw.bhyt ?? "",
            cccd: kw.cccd ?? "",
            address: kw.address ?? "",
          });
        }
        }
        pages={pages}
        pageSize={pageSize}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        bhyt={bhyt}
        setBHYT={setBHYT}
        cccd={cccd}
        setCCCD={setCCCD}
        address={address}
        setAddress={setAddress}
      />



      <PatientTable
        patients={filteredPatients}
        onUpdatePatient={handleUpdatePatient}
        onDeletePatient={handleDeletePatient}
        searchName={keywords.name}
        searchPhone={keywords.phone}
        searchBHYT={keywords.bhyt}
        searchCccd={keywords.cccd}
        searchAddress={keywords.address}
        totalPatients={totalPatients}
        pages={pages}
        pageSize={pageSize}
        setpages={setPages}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default PatientManagement;
