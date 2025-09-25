import React, { useState, useEffect } from "react";
import type { Doctor } from "./DoctorTable";

interface DoctorFilterBarProps {
  doctors: Doctor[];
  onFilter: (filtered: Doctor[]) => void;
}

const DoctorFilterBar: React.FC<DoctorFilterBarProps> = ({ doctors, onFilter }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  // Lọc tự động khi input thay đổi
  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchName =
        !name || doctor.account.name.toLowerCase().includes(name.toLowerCase());

      const matchCost =
        !cost || doctor.cost?.toString().includes(cost);

      const matchPhone =
        !phone || doctor.account.phoneNumber.includes(phone);

      // const matchStatus =
      //   !status || doctor.status === status;

      return matchName && matchCost && matchPhone ;
    });

    onFilter(filtered);
  }, [name, cost, phone, status, doctors, onFilter]);

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên bác sĩ"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Giá khám"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />
      {/* <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      >
        <option value="">Trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Nghỉ</option>
      </select> */}
    </div>
  );
};

export default DoctorFilterBar;
