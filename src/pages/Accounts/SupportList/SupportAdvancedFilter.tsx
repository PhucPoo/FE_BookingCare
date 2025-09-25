import React from "react";
import { DatePicker, Select, Space, Button } from "antd/lib";

const { Option, OptGroup } = Select;

interface SupportAdvancedFilterProps {
  onChangeGender: (value: string | null) => void;
  onChangeDate: (dateString: string | null) => void;
  onChangeAddress: (value: string | null) => void;
  onChangeClinic: (value: string | null) => void;
  onOpenAdd: () => void;
}

const SupportAdvancedFilter: React.FC<SupportAdvancedFilterProps> = ({
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
          {/* có thể map từ API nếu backend trả về danh sách city */}
        </OptGroup>
      </Select>

      {/* Phòng khám */}
      <Select
        placeholder="Chọn phòng khám"
        style={{ width: 220 }}
        size="large"
        allowClear
        onChange={(value) => onChangeClinic(value)}
      >
        <OptGroup label="Phòng khám">
          <Option value="clinic1">Phòng khám A</Option>
          <Option value="clinic2">Phòng khám B</Option>
          <Option value="clinic3">Phòng khám C</Option>
          {/* cũng có thể map từ testGetClinicApi */}
        </OptGroup>
      </Select>

      {/* Nút thêm */}
      <Button
        type="primary"
        size="large"
        className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm"
        onClick={onOpenAdd}
        style={{ minWidth: 180 }}
      >
        + Thêm trợ lý
      </Button>
    </div>
  );
};

export default SupportAdvancedFilter;
