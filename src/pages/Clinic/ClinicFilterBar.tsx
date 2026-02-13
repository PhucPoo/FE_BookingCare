import React, { useEffect, useState } from "react";
import { Button, Input, DatePicker, Select } from "antd/lib";
import dayjs from "dayjs";
import type { Clinic } from "./ClinicTable";
import { testSearchClinicApi } from "../../api/testClinic";
import type { Address } from "./AddClinic";
import test from "node:test";
import { testGetAddressApi } from "../../api/testAddress";

const { Option } = Select;

interface ClinicFilterKeywords {
    name: string;
    addressID: number | null;
    phoneNumber: string;
    monthYear: Date | null;
}

interface ClinicFilterBarProps {
    filteredClinics: (clinics: Clinic[]) => void;
    onFilter: (clinics: Clinic[], keywords: ClinicFilterKeywords) => void;
    pages: number;
    pageSize: number;

    name: string;
    setName: (name: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phone: string) => void;
    addressID: number ;
    setAddressID: (addressId: number | null) => void;
    monthYear: Date | null;
    setMonthYear: (monthYear: Date | null) => void;
}

const ClinicFilterBar: React.FC<ClinicFilterBarProps> = ({
    filteredClinics,
    onFilter,
    pages,
    pageSize,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    addressID,
    setAddressID,
    monthYear,
    setMonthYear,
}) => {
    const [addressList, setAddressList] = useState<Address[]>([]);

    const handleSearch = async () => {
        const keywords: ClinicFilterKeywords = {
            name,
            phoneNumber,
            addressID: addressID,
            monthYear,
        };

        try {
            const result = await testSearchClinicApi(
                {
                    name,
                    addressID,
                    phoneNumber,
                    monthYear: monthYear ?? new Date(),
                },
                pages,
                pageSize
            );

            const clinics: Clinic[] = result.data?.result ?? [];
            filteredClinics(clinics);
            
            onFilter(clinics, keywords);

        } catch (error) {
            console.error("Lỗi khi tìm kiếm phòng khám:", error);
            onFilter([], keywords);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const addressList = await Promise.all([testGetAddressApi(),]) 
            console.log("AAAAAAAAAA",addressList[0].data.result);
            
            
            setAddressList(addressList[0].data.result)
          } catch(err){
            console.error("Lỗi load address:", err);
          }
        };
        fetchData();
      }, []);

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-white shadow rounded mb-4 w-full">
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên phòng khám"
                className="border rounded px-3 py-2 flex-1 min-w-[200px]"
                size="large"
            />

            <Select
                value={addressID ?? undefined}
                onChange={setAddressID}
                placeholder="Chọn địa chỉ"
                className="flex-1 min-w-[180px]"
                size="large"
                allowClear

            >
                {addressList.map((c) => (
                    <Option key={c.id} value={String(c.id)}>
                        {c.city}
                    </Option>
                ))}

            </Select>

            <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Số điện thoại"
                className="border rounded px-3 py-2 flex-1 min-w-[180px]"
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

export default ClinicFilterBar;
