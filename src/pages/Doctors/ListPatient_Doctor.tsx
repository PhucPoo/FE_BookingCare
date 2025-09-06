import React, { useState } from "react";

import { DatePicker, Select } from "antd/lib";
import Input from "antd/es/input";
import type { Patient } from "../Accounts/PatientList/PatientTable";
import PatientFilterBar from "../Accounts/PatientList/PatientFilterBar";
import PatientTable_Doctor from "./PatientTable_Doctor";



const initialpatients: Patient[] = [
  { id: 1, name: "Bn. Nguyễn Văn B", email: "hp234@gmail.com", cccd: 1289389, phone: "0942234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 2, name: "Bn. Nguyễn Văn A", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 3, name: "Bn. Nguyễn Văn C", email: "hp36@gmail.com", cccd: 1289389, phone: "0939234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 4, name: "Bn. Nguyễn Văn D", email: "hp@gmail.com", cccd: 1289389, phone: "0920234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
  { id: 5, name: "Bn. Nguyễn Văn CD", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
  { id: 6, name: "Bn. Nguyễn Văn AB", email: "hp@gmail.com", cccd: 1289389, phone: "0910744567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 7, name: "Bn. Nguyễn Văn ABC", email: "hp@gmail.com", cccd: 1289389, phone: "0910784567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
];

const patientList_Doctor: React.FC = () => {
  const [patients, setpatients] = useState<Patient[]>(initialpatients);
  const [filteredpatients, setFilteredpatients] = useState<Patient[]>(initialpatients);
  const { Option, OptGroup } = Select;

  


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Quản lý bệnh nhân</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <PatientFilterBar patients={patients} onFilter={setFilteredpatients} />
        </div>
      </div>

      <div className="mb-4">
        {/* Filter Inputs */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-3">
          <DatePicker placeholder="Ngày tạo" style={{ width: 160, }} />
          <Input
            placeholder="Địa chỉ"
            className="w-full sm:w-auto flex-1 min-w-[150px]"
          />
          <Select
            defaultValue="gender"
            className="w-full sm:w-auto min-w-[150px] max-w-[200px] h-[36px]"
          >
            <OptGroup label="Manager">
              <Option value="male">Nam</Option>
              <Option value="female">Nữ</Option>
              <Option value="other">Khác</Option>
            </OptGroup>
          </Select>
        </div>

        {/* Add Button */}
        
      </div>


      <PatientTable_Doctor
              patients={filteredpatients} onUpdatepatient={function (updatedpatient: Patient): void {
                  throw new Error("Function not implemented.");
              } } onDeletepatient={function (id: number): void {
                  throw new Error("Function not implemented.");
              } }        
      />

      
    </div>
  );
};

export default patientList_Doctor;
