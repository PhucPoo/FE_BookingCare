import React, { useState } from "react";

import Button from "antd/lib/button";
import type { Patient } from "../../components/PatientList.tsx/PatientTable";
import PatientFilterBar from "../../components/PatientList.tsx/PatientFilterBar";
import PatientTable from "../../components/PatientList.tsx/PatientTable";
import AddPatient from "../../components/PatientList.tsx/AddPatient";



const initialpatients: Patient[] = [
  { id: 2, name: "Bn. Nguyễn Văn B", email: "hp234@gmail.com", cccd: 1289389, phone: "0942234567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 1, name: "Bn. Nguyễn Văn A", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 3, name: "Bn. Nguyễn Văn C", email: "hp36@gmail.com", cccd: 1289389, phone: "0939234567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 4, name: "Bn. Nguyễn Văn D", email: "hp@gmail.com", cccd: 1289389, phone: "0920234567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
  { id: 5, name: "Bn. Nguyễn Văn CD", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
  { id: 6, name: "Bn. Nguyễn Văn AB", email: "hp@gmail.com", cccd: 1289389, phone: "0910744567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 7, name: "Bn. Nguyễn Văn ABC", email: "hp@gmail.com", cccd: 1289389, phone: "0910784567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
];

const patientManagement: React.FC = () => {
  const [patients, setpatients] = useState<Patient[]>(initialpatients);
  const [filteredpatients, setFilteredpatients] = useState<Patient[]>(initialpatients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Thêm bệnh nhân mới
  const handleAddpatient = (newpatient: Patient) => {
    const updatedpatients = [...patients, newpatient];
    setpatients(updatedpatients);
    setFilteredpatients(updatedpatients);
    setIsAddModalOpen(false);
  };

  // Cập nhật bệnh nhân
  const handleUpdatepatient = (updatedpatient: Patient) => {
    const updatedList = patients.map((Bn) =>
      Bn.id === updatedpatient.id
        ? { ...Bn, ...updatedpatient, update_at: new Date() }
        : Bn
    );
    setpatients(updatedList);
    setFilteredpatients(updatedList); // rất quan trọng để table hiển thị đúng
  };
  // Xóa bệnh nhân
  const handleDeletepatient = (id: number) => {
    console.log("Deleted patient with id:", id);
    const updatedpatients = patients.filter((d) => d.id !== id);
    setpatients(updatedpatients);
    setFilteredpatients(updatedpatients); 
    
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Quản lý bệnh nhân</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <PatientFilterBar patients={patients} onFilter={setFilteredpatients} />
        </div>
      </div>

      <div className="mb-4">
        <Button
          type="primary"
          size="large"
          onClick={() => setIsAddModalOpen(true)}
          style={{ minWidth: 150 }}
        >
          + Thêm bệnh nhân
        </Button>
      </div>

      <PatientTable
        patients={filteredpatients}
        onUpdatepatient={handleUpdatepatient}
        onDeletepatient={handleDeletepatient}
      />

      <AddPatient
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddpatient}
      />
    </div>
  );
};

export default patientManagement;
