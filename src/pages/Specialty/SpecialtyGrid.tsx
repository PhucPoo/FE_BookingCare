// src/components/SpecialtyGrid.tsx

import React from 'react';

export interface Specialty {
  id: number;
  name: string;
  img: string; 
}

const specialties: Specialty[] = [
  { id: 1, name: 'Cơ Xương Khớp', img: '/icons/bone.png' },
  { id: 2, name: 'Thần kinh', img: '/icons/brain.png' },
  { id: 3, name: 'Tiêu hóa', img: '/icons/stomach.png' },
  { id: 4, name: 'Tim mạch', img: '/icons/heart.png' },
  { id: 5, name: 'Tai Mũi Họng', img: '/icons/ear-nose-throat.png' },
  { id: 6, name: 'Cột sống', img: '/icons/spine.png' },
  { id: 7, name: 'Y học Cổ truyền', img: '/icons/traditional-medicine.png' },
  { id: 8, name: 'Châm cứu', img: '/icons/acupuncture.png' },
  { id: 9, name: 'Sản Phụ khoa', img: '/icons/obstetrics.png' },
  { id: 10, name: 'Siêu âm thai', img: '/icons/ultrasound.png' },
  { id: 11, name: 'Nhi khoa', img: '/icons/pediatrics.png' },
  { id: 12, name: 'Da liễu', img: '/icons/dermatology.png' },
  { id: 13, name: 'Bệnh Viêm gan', img: '/icons/liver.png' },
  { id: 14, name: 'Sức khỏe tâm thần', img: '/icons/mental-health.png' },
  { id: 15, name: 'Dị ứng miễn dịch', img: '/icons/immunity.png' },
  { id: 16, name: 'Hô hấp - Phổi', img: '/icons/lung.png' },
];

const SpecialtyGrid: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Quản lý Chuyên Khoa</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {specialties.map((s) => (
          <div
            key={s.id}
            className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
          >
            <img src={s.img} alt={s.name} className="w-14 h-14 mb-3 object-contain" />
            <span className="text-sm font-medium text-gray-800">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyGrid;
