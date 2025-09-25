import React from "react";
import { DatePicker, Select, Button } from "antd/lib";
import dayjs from "dayjs";

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
    <div className="mb-6 flex flex-wrap items-center gap-4">
      {/* Học vị */}
      <Select
        placeholder="Chọn học vị"
        style={{ width: 200 }}
        size="large"
        allowClear
        onChange={(value) => onChangeDegree(value)}
      >
        <OptGroup label="Học vị">
          <Option value="BACHELOR">Cử nhân</Option>
          <Option value="MASTER">Thạc sĩ</Option>
          <Option value="DOCTOR">Tiến sĩ</Option>
        </OptGroup>
      </Select>

      {/* Tháng/Năm tạo */}
      <DatePicker
        picker="month"
        placeholder="Tháng/Năm tạo"
        style={{ width: 180 }}
        size="large"
        onChange={(_, dateString) => onChangeCreatedAt(dateString || null)}
      />

      {/* Chuyên khoa */}
      <Select
        placeholder="Chọn chuyên khoa"
        style={{ width: 220 }}
        size="large"
        allowClear
        onChange={(value) => onChangeSpecialty(value)}
      >
        <OptGroup label="Chuyên khoa">
          <Option value="cardiology">Tim mạch</Option>
          <Option value="neurology">Thần kinh</Option>
          <Option value="dermatology">Da liễu</Option>
          <Option value="pediatrics">Nhi khoa</Option>
          {/* TODO: map từ API specialties */}
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
          {/* TODO: map từ API clinics */}
        </OptGroup>
      </Select>

      {/* Nút thêm bác sĩ */}
      <Button
        type="primary"
        size="large"
        className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm"
        onClick={onOpenAdd}
        style={{ minWidth: 180 }}
      >
        + Thêm bác sĩ
      </Button>
    </div>
  );
};

export default DoctorAdvancedFilter;
