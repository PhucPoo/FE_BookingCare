import React, { useEffect } from "react";
import Modal from "antd/es/modal";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { notification } from "antd";
import type { Patient } from "./PatientTable";
import { testPutPatientApi } from "../../../api/testPatient";
// import { testPutPatientApi } from "../../../api/testPatient";

interface EditPatientProps {
  open: boolean;
  onCancel: () => void;
  onUpdatepatient: (patient: Patient) => void; // đổi tên prop
  patient: Patient | null;
}

const EditPatient: React.FC<EditPatientProps> = ({
  open,
  onCancel,
  onUpdatepatient, // đổi tên destructuring
  patient,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        bhyt: patient.bhyt,
      });
    }
  }, [patient, form]);

  const handleSubmit = async (values: any) => {
    if (!patient) return;

    const payload = {
      ...patient,
      bhyt: values.bhyt,
    };

    try {
      const res = await testPutPatientApi(patient.id, payload);
      const updated = res.data;

      onUpdatepatient(updated); 

      notification.success({
        message: "Cập nhật thành công",
        description:""
      });

      form.resetFields();
      onCancel();
    } catch (err: any) {
      console.error("Cập nhật bệnh nhân thất bại:", err);
      notification.error({
        message: "Cập nhật thất bại",
        description: err?.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Chỉnh sửa bệnh nhân</div>}
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
        <Form.Item label="Account">
          <Input
            value={`${patient?.account?.name || ""} (${patient?.account?.email || ""})`}
            disabled
            size="large"
          />
        </Form.Item>

        <Form.Item name="bhyt" label="Mã BHYT">
          <Input placeholder="Nhập mã BHYT" size="large" />
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

export default EditPatient;

