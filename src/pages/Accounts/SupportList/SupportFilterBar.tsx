import React, { useEffect, useState } from "react";
import type { Support } from "./SupportTable";
import { testGetClinicApi } from "../../../api/testClinic";
import { testSearchSupportApi } from "../../../api/testSupport";
import type { Clinic } from "../../Clinic/ClinicTable";
import { Button, Input, Select } from "antd/lib";

const { Option } = Select;

interface SupportFilterKeywords {
  name?: string;
  phone?: string;
  address?: string | null; // địa chỉ người dùng nhập
  clinicId?: string | null;
}

interface SupportFilterBarProps {
  setFilteredSupports: (supports: Support[]) => void;
  onFilter: (filtered: Support[], keywords: SupportFilterKeywords) => void;
  pages: number;
  pageSize: number;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void; // người dùng nhập địa chỉ
  clinicId: string | null;
  setClinicId: (clinicId: string) => void;
}

const SupportFilterBar: React.FC<SupportFilterBarProps> = ({
  setFilteredSupports,
  onFilter,
  pages,
  pageSize,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress, // người dùng nhập địa chỉ
  clinicId,
  setClinicId,
}) => {
  

  const [clinicList, setClinicList] = useState<Clinic[]>([]);

  // Load danh sách phòng khám
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clinicRes = await testGetClinicApi();
        setClinicList(clinicRes.data.result ?? []);
      } catch (err) {
        console.error("Lỗi load clinic:", err);
      }
    };
    fetchData();
  }, []);

  // Handle Search
  const handleSearch = async () => {
    const keywords: SupportFilterKeywords = {
      name,
      phone,
      address,
      clinicId,
    };

    try {
      const result = await testSearchSupportApi({
        name: name || undefined,
        phoneNumber: phone || undefined,
        address: address || undefined, // gửi địa chỉ người dùng nhập
        clinicId: clinicId ? Number(clinicId) : undefined,
      } , pages, pageSize);

      const supports = result.data?.result ?? [];
      setFilteredSupports(supports);
      onFilter(supports, keywords);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm trợ lý:", error);
      setFilteredSupports([]);
      onFilter([], keywords);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên trợ lý"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />

      <Input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Số điện thoại"
        className="border rounded px-3 py-2 flex-1 min-w-[150px]"
      />

      <Input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Địa chỉ người dùng"
        className="border rounded px-3 py-2 flex-1 min-w-[200px]"
      />

      <Select
        placeholder="Chọn phòng khám"
        style={{ width: 220 }}
        size="large"
        allowClear
        value={clinicId}
        onChange={setClinicId}
      >
        {clinicList.map((c) => (
          <Option key={c.id} value={String(c.id)}>
            {c.name}
          </Option>
        ))}
      </Select>

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

export default SupportFilterBar;
