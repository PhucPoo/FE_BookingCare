import React, { useEffect } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Support } from "./SupportTable";

const { Option } = Select;

interface EditsupportProps {
    open: boolean;
    onCancel: () => void;
    onUpdate: (support: Support) => void;
    support: Support | null;
}

const Editsupport: React.FC<EditsupportProps> = ({ open, onCancel, onUpdate, support }) => {
    const [form] = Form.useForm();

    // Đổ dữ liệu vào form khi modal mở
    useEffect(() => {
        if (support) {
            form.setFieldsValue({
                name: support.name,
                email: support.email,
                cccd: support.cccd.toString(),
                phone: support.phone,
                price: support.price?.toString(),
                status: support.status,
            });
        }
    }, [support, form]);

    const handleSubmit = (values: any) => {
        if (!support) return;

        const updatedsupport: Support = {
            ...support,
            name: values.name,
            email: values.email,
            cccd: Number(values.cccd),
            phone: values.phone,
            price: Number(values.price),
            status: values.status,
            update_at: new Date(),
        };

        onUpdate(updatedsupport); // 👈 Gọi hàm cập nhật truyền từ supportTable
        form.resetFields();
    };

    return (
        <Modal
            title={<div className="text-center text-lg font-semibold">Chỉnh sửa thông tin trợ lý</div>}
            open={open}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
            centered
            width={520}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
                form={form}
            >
                <Form.Item
                    name="name"
                    label="Tên trợ lý"
                    rules={[{ required: true, message: "Vui lòng nhập tên trợ lý!" }]}
                >
                    <Input placeholder="Nhập tên trợ lý" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input placeholder="Nhập email" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="cccd"
                    label="CCCD"
                    rules={[{ required: true, message: "Vui lòng nhập CCCD!" }]}
                >
                    <Input placeholder="Nhập số CCCD" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                >
                    <Input placeholder="Nhập số điện thoại" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá khám (VNĐ)"
                    rules={[{ required: true, message: "Vui lòng nhập giá khám!" }]}
                >
                    <Input type="number" placeholder="Nhập giá khám" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                >
                    <Select placeholder="Chọn trạng thái" size="large" className="rounded-md">
                        <Option value="active">Hoạt động</Option>
                        <Option value="inactive">Nghỉ</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-end space-x-3 pt-2">
                        <Button onClick={onCancel} size="large">
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit" size="large">
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Editsupport;
