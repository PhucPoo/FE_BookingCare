import React from 'react';
import DoctorFilterBar from '../../components/DoctorList/DoctorFilterBar';
import DoctorTable from '../../components/DoctorList/DoctorTable';

const DoctorManagement: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Quản lý Bác sĩ</h1>
      <DoctorFilterBar />
      <DoctorTable />
    </div>
  );
};

export default DoctorManagement;
