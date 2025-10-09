import React from "react";
import { Button, Input, DatePicker } from "antd/lib";
import dayjs from "dayjs";
import type { Specialty } from "./SpecialtyTable";
import { testSearchSpecialtyApi } from "../../api/testSpecialty";

interface SpecialtyFilterKeywords {
  name: string;
  monthYear: Date | null;
}

interface SpecialtyFilterBarProps {
  filteredSpecialties: (specialties: Specialty[]) => void;
  onFilter: (specialties: Specialty[], keywords: SpecialtyFilterKeywords) => void;
  pages: number;
  pageSize: number;
  name: string;
  setName: (name: string) => void;
  monthYear: Date | null;
  setMonthYear: (monthYear: Date | null) => void;
}

const SpecialtyFilterBar: React.FC<SpecialtyFilterBarProps> = ({
  filteredSpecialties,
  onFilter,
  pages,
  pageSize,
  name,
  setName,
  monthYear,
  setMonthYear,
}) => {
  const handleSearch = async () => {
    const keywords: SpecialtyFilterKeywords = { name, monthYear };

    try {
      const result = await testSearchSpecialtyApi(
        {
          name: name,
          monthYear: monthYear ?? new Date(),
        },
        pages,
        pageSize
      );
      

      const specialties: Specialty[] = result.data?.result ?? [];
      filteredSpecialties(specialties);
      onFilter(specialties, keywords);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm chuyên khoa:", error);
      onFilter([], keywords);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên chuyên khoa"
        className="border rounded px-3 py-2 flex-1 min-w-[200px]"
        size="large"
      />

      <DatePicker
        picker="month"
        placeholder="Chọn tháng/năm"
        className="border rounded px-3 py-2 flex-1 min-w-[180px]"
        size="large"
        value={monthYear ? dayjs(monthYear) : null}
        onChange={(date) => setMonthYear(date ? date.toDate() : null)}
        format="MM/YYYY"
      />

      <Button
        type="primary"
        size="large"
        className="min-w-[150px]"
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SpecialtyFilterBar;
