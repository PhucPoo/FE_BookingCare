import React, { useState } from 'react';

type Specialty = {
  id: number;
  name: string;
  img: string;
  createdAt: string;      // ngày tạo chuyên khoa
  doctorCount: number;    // số lượng bác sĩ
};

const specialties: Specialty[] = [
  { id: 1, name: 'Cơ Xương Khớp', img: '/icons/bone.png', createdAt: '2023-08-01', doctorCount: 10 },
  { id: 2, name: 'Thần kinh', img: '/icons/brain.png', createdAt: '2023-07-15', doctorCount: 8 },
  { id: 3, name: 'Tiêu hóa', img: '/icons/stomach.png', createdAt: '2023-09-01', doctorCount: 12 },
  { id: 4, name: 'Tim mạch', img: '/icons/heart.png', createdAt: '2023-06-20', doctorCount: 15 },
  { id: 5, name: 'Tai Mũi Họng', img: '/icons/ear-nose-throat.png', createdAt: '2023-08-10', doctorCount: 6 },
  { id: 6, name: 'Cột sống', img: '/icons/spine.png', createdAt: '2023-07-05', doctorCount: 9 },
  { id: 7, name: 'Y học Cổ truyền', img: '/icons/traditional-medicine.png', createdAt: '2023-09-01', doctorCount: 5 },
  { id: 8, name: 'Châm cứu', img: '/icons/acupuncture.png', createdAt: '2023-08-21', doctorCount: 7 },
  { id: 9, name: 'Sản Phụ khoa', img: '/icons/obstetrics.png', createdAt: '2023-09-04', doctorCount: 14 },
  { id: 10, name: 'Siêu âm thai', img: '/icons/ultrasound.png', createdAt: '2023-06-30', doctorCount: 11 },
  { id: 11, name: 'Nhi khoa', img: '/icons/pediatrics.png', createdAt: '2023-07-22', doctorCount: 13 },
  { id: 12, name: 'Da liễu', img: '/icons/dermatology.png', createdAt: '2023-08-11', doctorCount: 6 },
  { id: 13, name: 'Bệnh Viêm gan', img: '/icons/liver.png', createdAt: '2023-07-18', doctorCount: 4 },
  { id: 14, name: 'Sức khỏe tâm thần', img: '/icons/mental-health.png', createdAt: '2023-09-02', doctorCount: 3 },
  { id: 15, name: 'Dị ứng miễn dịch', img: '/icons/immunity.png', createdAt: '2023-08-25', doctorCount: 8 },
  { id: 16, name: 'Hô hấp - Phổi', img: '/icons/lung.png', createdAt: '2023-09-01', doctorCount: 9 },
];

const SpecialtyGrid: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [sortOption, setSortOption] = useState('');

  const filteredSpecialties = specialties
    .filter((s) =>
      s.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((s) => {
      if (!filterMonth) return true;
      return s.createdAt.startsWith(filterMonth); // format: YYYY-MM
    })
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOption === 'doctorCount') return b.doctorCount - a.doctorCount;
      return 0;
    });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Quản lý Chuyên Khoa</h1>

      {/* Bộ lọc + tìm kiếm + sắp xếp */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm chuyên khoa..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">📅 Lọc theo tháng</option>
          <option value="2023-06">Tháng 6/2023</option>
          <option value="2023-07">Tháng 7/2023</option>
          <option value="2023-08">Tháng 8/2023</option>
          <option value="2023-09">Tháng 9/2023</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">⬍ Sắp xếp</option>
          <option value="name">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
          <option value="doctorCount">Số lượng bác sĩ (nhiều → ít)</option>
        </select>
      </div>

      {/* Danh sách chuyên khoa */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredSpecialties.length > 0 ? (
          filteredSpecialties.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
            >
              <img src={s.img} alt={s.name} className="w-14 h-14 mb-3 object-contain" />
              <span className="text-sm font-medium text-gray-800">{s.name}</span>
              <span className="text-xs text-gray-500 mt-1">
                👨‍⚕️ {s.doctorCount} bác sĩ
              </span>
              <span className="text-xs text-gray-400">
                📅 {s.createdAt}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 italic">
            Không có chuyên khoa phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtyGrid;
