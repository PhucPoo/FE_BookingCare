import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import { notification } from "antd";
import type { Support } from "./SupportTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import { testPutSupportApi } from "../../../api/testSupport";
import { testGetClinicApi } from "../../../api/testClinic";

const { Option } = Select;

interface EditSupportProps {
  open: boolean;
  onCancel: () => void;
  onUpdate: (support: Support) => void;
  support: Support | null;
}

const EditSupport: React.FC<EditSupportProps> = ({
  open,
  onCancel,
  onUpdate,
  support,
}) => {
  const [form] = Form.useForm();
  const [clinics, setClinics] = useState<Clinic[]>([]);

  // load clinics
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await testGetClinicApi();
        setClinics(res.data.result || []);
      

      } catch (err) {
        console.error("Fetch clinics failed:", err);
      }
    };
    fetchClinics();
  }, []);

  // set form values khi mở modal
  useEffect(() => {
    if (support) {
      form.setFieldsValue({
        clinicId: support.clinic?.id,
        isActive: support.isActive,
      });
    }
  }, [support, form]);

  // handle submit
  const handleSubmit = async (values: any) => {
    if (!support) return;

    const payload = {
      id: support.id,
      isActive: values.isActive,
      clinic: { id: Number(values.clinicId) },
    };

    try {
      const res = await testPutSupportApi(payload);
      const updatedSupport: Support = res.data.data;

      notification.success({
        message: "Cập nhật thành công",
        description: ``,
      });

      onUpdate(updatedSupport);
      form.resetFields();
      onCancel();
    } catch (err: any) {
      console.error("Cập nhật trợ lý thất bại:", err);
      notification.error({
        message: "Cập nhật thất bại",
        description: err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật trợ lý",
      });
    }
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Chỉnh sửa trợ lý</div>}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      centered
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* account hiển thị read-only */}
        <Form.Item label="Account">
          <Input
            value={`${support?.account?.name || ""} (${support?.account?.email || ""})`}
            disabled
            size="large"
          />
        </Form.Item>

        {/* clinic */}
        <Form.Item
          name="clinicId"
          label="Clinic"
          rules={[{ required: true, message: "Vui lòng chọn clinic!" }]}
        >
          <Select placeholder="Chọn clinic" size="large">
            {clinics.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* trạng thái */}
        <Form.Item
          name="isActive"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select placeholder="Chọn trạng thái" size="large">
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Nghỉ</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              onClick={() => {
                form.resetFields();
                onCancel();
              }}
              size="large"
            >
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

export default EditSupport;
