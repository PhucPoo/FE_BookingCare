import React from "react";
import { DatePicker, Select, Space } from "antd/lib";

const { Option, OptGroup } = Select;

interface PatientAdvancedFilterProps {
  onChangeGender: (value: string | null) => void;
  onChangeDate: (dateString: string | null) => void;
  onChangeAddress: (value: string | null) => void;
  onChangeClinic: (value: string | null) => void;
  onOpenAdd: () => void;
}

const PatientAdvancedFilter: React.FC<PatientAdvancedFilterProps> = ({
  onChangeGender,
  onChangeDate,
  onChangeAddress,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      {/* Giới tính */}
      <Select
        placeholder="Chọn giới tính"
        style={{ width: 200 }}
        size="large"
        allowClear
        onChange={(value) => onChangeGender(value)}
      >
        <OptGroup label="Giới tính">
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </OptGroup>
      </Select>

      {/* Ngày tạo */}
      <Space.Compact size="large">
        <DatePicker
          placeholder="Ngày tạo"
          style={{ width: 180 }}
          size="large"
          onChange={(_, dateString) => onChangeDate(dateString as string )}
        />
      </Space.Compact>

      {/* Địa chỉ */}
      <Select
        placeholder="Chọn địa chỉ"
        style={{ width: 220 }}
        size="large"
        allowClear
        onChange={(value) => onChangeAddress(value)}
      >
        <OptGroup label="Địa chỉ">
          <Option value="hanoi">Hà Nội</Option>
          <Option value="danang">Đà Nẵng</Option>
          <Option value="hcm">Hồ Chí Minh</Option>
          {/* có thể map từ API backend nếu có danh sách city */}
        </OptGroup>
      </Select>


      {/* Nút thêm bệnh nhân */}
     
    </div>
  );
};

export default PatientAdvancedFilter;
