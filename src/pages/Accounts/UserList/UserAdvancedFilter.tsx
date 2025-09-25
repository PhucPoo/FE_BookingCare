import React from "react";
import { DatePicker, Select, Space, Button } from "antd/lib";

const { Option, OptGroup } = Select;

interface UserAdvancedFilterProps {
    onChangeRole: (value: string | null) => void;
    onChangeGender: (value: string | null) => void;
    onChangeDate: (dateString: string | null) => void;
    onOpenAdd: () => void;
}

const UserAdvancedFilter: React.FC<UserAdvancedFilterProps> = ({
    onChangeRole,
    onChangeGender,
    onChangeDate,
    onOpenAdd,
}) => {
    return (
        <div className="mb-6 flex flex-wrap items-center gap-4">
            <Select
                placeholder="Chọn role"
                style={{ width: 200 }}
                size="large"
                allowClear
                onChange={(value) => onChangeRole(value)}
            >
                <OptGroup label="Manager">
                    <Option value="doctor">Doctor</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="support">Support</Option>
                    <Option value="patient">Patient</Option>

                </OptGroup>
            </Select>

            <Select
                placeholder="Chọn giới tính"
                style={{ width: 200 }}
                size="large"
                allowClear
                onChange={(value) => onChangeGender(value)}
            >
                <OptGroup label="Gender">
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="other">Khác</Option>
                </OptGroup>
            </Select>

            <Space.Compact size="large">
                <DatePicker
                    placeholder="Ngày tạo"
                    style={{ width: 180 }}
                    size="large"
                    onChange={(_, dateString) => onChangeDate(dateString || null)}
                />
            </Space.Compact>

            <Button
                type="primary"
                size="large"
                className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm"
                onClick={onOpenAdd}
                style={{ minWidth: 180 }}
            >
                + Thêm người dùng
            </Button>
        </div>
    );
};

export default UserAdvancedFilter;
