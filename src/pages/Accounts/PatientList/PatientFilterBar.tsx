import React, { useState } from 'react';
import type { Patient } from './PatientTable';
import { Button, Input } from 'antd/lib';
import { testSearchPatientApi } from '../../../api/testPatient';

interface PatientFilterKeywords {
  name: string ;
  phone: string  ;
  bhyt: string ;
  cccd: string ;
  address: string ;

}

interface PatientFilterBarProps {
filteredPatients: (patients: Patient[]) => void;
  onFilter: (patients: Patient[], keywords: PatientFilterKeywords) => void;
  pages: number;
  pageSize: number;
  name: string ;
  setName: (name: string) => void;
  phone: string ;
  setPhone: (phone: string) => void;
  bhyt: string ;
  setBHYT: (bhyt: string) => void;
  cccd: string ;
  setCCCD: (cccd: string) => void;
  address: string ;
  setAddress: (address: string) => void;
  
}

const PatientFilterBar: React.FC<PatientFilterBarProps> = ({ 
  filteredPatients,
  onFilter,
  pages,
  pageSize,
  name,
  setName,
  phone,
  setPhone,
  bhyt,
  setBHYT,
  cccd,
  setCCCD,
  address,
  setAddress,
  

}) => {
  
  const handleSearch = async () => {
    const keywords: PatientFilterKeywords = { 
      name, 
      phone, 
      bhyt, 
      cccd, 
      address 
    };

    try {
      const result = await testSearchPatientApi({
        name: name ,
        phoneNumber: phone ,
        address: address ,
        bhyt: bhyt ,
        cccd: cccd ,
      },pages,pageSize);

      const patients: Patient[] = result.data?.result ?? [];
      filteredPatients(patients);
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
        onChange={(e) => setCCCD(e.target.value)}
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
