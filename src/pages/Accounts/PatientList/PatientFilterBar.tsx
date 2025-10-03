import React, { useState } from 'react';
import type { Patient } from './PatientTable';
import { Button, Input } from 'antd/lib';
import { testSearchPatientApi } from '../../../api/testPatient';

interface PatientFilterKeywords {
  name?: string;
  phone?: string;
  bhyt?: string;
  cccd?: string;
  address?: string;
}

interface PatientFilterBarProps {
  onFilter: (filtered: Patient[], keywords: PatientFilterKeywords) => void;
}

const PatientFilterBar: React.FC<PatientFilterBarProps> = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bhyt, setBHYT] = useState('');
  const [cccd, setCccd] = useState('');
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    const keywords: PatientFilterKeywords = { name, phone, bhyt, cccd, address };

    try {
      const result = await testSearchPatientApi({
        name: name || undefined,
        phoneNumber: phone || undefined,
        address: address || undefined,
        bhyt: bhyt || undefined,
        cccd: cccd || undefined,
      });

      const patients: Patient[] = result.data?.result ?? [];
      onFilter(patients, keywords);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm bệnh nhân:", error);
      onFilter([], keywords);
    }
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
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Địa chỉ"
        className="border rounded px-3 py-2 flex-1 min-w-[200px]"
        size="large"
      />
      <Button type="primary" size="large" className="min-w-[150px]" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default PatientFilterBar;
