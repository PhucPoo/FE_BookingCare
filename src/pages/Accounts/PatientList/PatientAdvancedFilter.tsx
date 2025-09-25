import React from "react";
import { DatePicker, Select, Space, Button } from "antd/lib";

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
  onChangeClinic,
  onOpenAdd,
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
          onChange={(_, dateString) => onChangeDate(dateString || null)}
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
      <Button
        type="primary"
        size="large"
        className="!bg-green-600 hover:!bg-green-700 rounded-lg font-medium shadow-sm"
        onClick={onOpenAdd}
        style={{ minWidth: 180 }}
      >
        + Thêm bệnh nhân
      </Button>
    </div>
  );
};

export default PatientAdvancedFilter;
