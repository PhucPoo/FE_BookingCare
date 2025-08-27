import React from 'react';

const DoctorFilterBar: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-6 gap-4">
      <input type="text" placeholder="Tên bác sĩ" className="border rounded px-3 py-2 col-span-2" />
      <input type="text" placeholder="Chuyên khoa" className="border rounded px-3 py-2 col-span-2" />
      <select className="border rounded px-3 py-2">
        <option value="">Trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Nghỉ</option>
      </select>
      <button className="bg-blue-600 text-white rounded px-4 py-2">Tìm kiếm</button>
    </div>
  );
};

export default DoctorFilterBar;
