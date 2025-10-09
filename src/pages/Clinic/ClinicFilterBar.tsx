import React, { useState } from "react";
import { Button, Input, DatePicker, Select } from "antd/lib";
import dayjs from "dayjs";
import type { Clinic } from "./ClinicTable";
import { testSearchClinicApi } from "../../api/testClinic";

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
    addressID: number | null;
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
    const handleSearch = async () => {
        const keywords: ClinicFilterKeywords = {
            name,
            phoneNumber,
            addressID:addressID,
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
                onChange={(value) => setAddressID(value)}
                placeholder="Chọn địa chỉ"
                className="flex-1 min-w-[180px]"
                size="large"
                allowClear
                options={[
                    { label: "Hà Nội", value: 1 },
                    { label: "TP.HCM", value: 2 },
                    { label: "Đà Nẵng", value: 3 },
                ]}
            />

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
