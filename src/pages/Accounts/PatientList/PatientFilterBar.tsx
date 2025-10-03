import React, { useState } from 'react';
import type { Patient } from './PatientTable'; // hoặc import từ patientTypes.ts nếu tách riêng
import { Button, Input } from 'antd/lib';

interface patientFilterBarProps {
  patients: Patient[];
  onFilter: (filtered: Patient[],keywords: { name: string; phone: string; bhyt: string,cccd:string }) => void;
}

const patientFilterBar: React.FC<patientFilterBarProps> = ({ patients, onFilter,   }) => {
  const [name, setName] = useState('');
  const [bhyt, setBHYT] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCccd] = useState('');

  const handleSearch = () => {
    // Nếu không nhập gì thì trả về toàn bộ dữ liệu
    if (!name && !bhyt && !phone && !cccd) {
      onFilter(patients,{ name: "", phone: "", bhyt: "", cccd: "" });
      return;
    }

    const filtered = patients.filter((patient) => {
      const matchName = name === '' || patient.account.name.toLowerCase().includes(name.toLowerCase());
      const matchBHYT = bhyt === '' || patient.bhyt.toString().includes(bhyt);
      const matchPhone = phone === '' || patient.account.phoneNumber.includes(phone);
      const matchCCCD = cccd === '' || patient.account.cccd.includes(cccd);
      return matchName && matchBHYT && matchPhone && matchCCCD;
    });

    onFilter(filtered,{ name, phone, bhyt, cccd });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên bệnh nhân"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
        size="large"
      />
      <Input
        value={bhyt}
        onChange={(e) => setBHYT(e.target.value)}
        placeholder="BHYT"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
        size="large"
      />
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
        size="large"
      />
      <Input
        value={cccd}
        onChange={(e) => setCccd(e.target.value)}
        placeholder="CCCD"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
        size="large"
      />
      <Button type="primary" onClick={handleSearch} className="min-w-[150px]" size="large">
        Tìm kiếm
      </Button>

    </div>


  );
};

export default patientFilterBar;
