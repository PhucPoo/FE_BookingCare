import React, { useState } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import type { Patient } from "./PatientTable";


const { Option } = Select;

interface AddpatientProps {
    open: boolean;
    onCancel: () => void;
    onAdd: (patient: Patient) => void;
}

const Addpatient: React.FC<AddpatientProps> = ({ open, onCancel, onAdd }) => {
     const [form] = Form.useForm();

    const handleSubmit = (values:any) => {
         const { name, email, phone, cccd, price, status } = values;

        const newpatient: Patient = {
            id: Date.now(),
            name,
            email,
            cccd: Number(cccd),
            phone,
            date_of_birth: undefined,
            create_at: new Date(),
            update_at: new Date(),
            status,
        };

        onAdd(newpatient);
        // reset form
        form.resetFields();
    };

    return (
        <Modal
            title={<div className="text-center text-lg font-semibold">Thêm bệnh nhân mới</div>}
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width={520}
           
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
            >
                <Form.Item
                    name="name"
                    label="Tên bệnh nhân"
                    rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân!' }]}
                >
                    <Input placeholder="Nhập tên bệnh nhân" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập email" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="cccd"
                    label="CCCD"
                    rules={[{ required: true, message: 'Vui lòng nhập CCCD!' }]}
                >
                    <Input placeholder="Nhập số CCCD" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input placeholder="Nhập số điện thoại" size="large" className="rounded-md px-3 py-2" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
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
                            Thêm
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>



    );
};

export default Addpatient;
