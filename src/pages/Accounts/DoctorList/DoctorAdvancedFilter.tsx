import React from "react";
import { DatePicker, Select } from "antd/lib";


const { Option, OptGroup } = Select;

interface DoctorAdvancedFilterProps {
  onChangeDegree: (value: string | null) => void;
  onChangeCreatedAt: (dateString: string | null) => void;
  onChangeSpecialty: (value: string | null) => void;
  onChangeClinic: (value: string | null) => void;
  onOpenAdd: () => void;
}

const DoctorAdvancedFilter: React.FC<DoctorAdvancedFilterProps> = ({
  onChangeDegree,
  onChangeCreatedAt,
  onChangeSpecialty,
  onChangeClinic,
  onOpenAdd,
}) => {
  return (
   <div className="mb-6">
  <div className="flex flex-wrap justify-start items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
    <Select
      placeholder="Chọn học vị"
      style={{ width: 200, height: 40 }}
      size="large"
      allowClear
      className="rounded-md border-gray-300 focus:border-blue-400"
      onChange={(value) => onChangeDegree(value)}
    >
      <OptGroup label="Học vị">
        <Option value="BACHELOR">Cử nhân</Option>
        <Option value="MASTER">Thạc sĩ</Option>
        <Option value="DOCTOR">Tiến sĩ</Option>
      </OptGroup>
    </Select>

    <DatePicker
      picker="month"
      placeholder="Tháng/Năm tạo"
      style={{ width: 180, height: 40 }}
      size="large"
      className="rounded-md border-gray-300 focus:border-blue-400"
      onChange={(_, dateString) => onChangeCreatedAt(dateString || null)}
    />

    <Select
      placeholder="Chọn chuyên khoa"
      style={{ width: 220, height: 40 }}
      size="large"
      allowClear
      className="rounded-md border-gray-300 focus:border-blue-400"
      onChange={(value) => onChangeSpecialty(value)}
    >
      <OptGroup label="Chuyên khoa">
        <Option value="cardiology">Tim mạch</Option>
        <Option value="neurology">Thần kinh</Option>
        <Option value="dermatology">Da liễu</Option>
        <Option value="pediatrics">Nhi khoa</Option>
      </OptGroup>
    </Select>

    <Select
      placeholder="Chọn phòng khám"
      style={{ width: 220, height: 40 }}
      size="large"
      allowClear
      className="rounded-md border-gray-300 focus:border-blue-400"
      onChange={(value) => onChangeClinic(value)}
    >
      <OptGroup label="Phòng khám">
        <Option value="clinic1">Phòng khám A</Option>
        <Option value="clinic2">Phòng khám B</Option>
        <Option value="clinic3">Phòng khám C</Option>
      </OptGroup>
    </Select>
  </div>
</div>


  );
};

export default DoctorAdvancedFilter;
