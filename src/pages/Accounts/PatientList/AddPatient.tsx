import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import { notification } from "antd";
import type { Patient } from "./PatientTable";
import type { User } from "../UserList/UserTable";
import api from "../../../api/axios";
import { testGetAccountsApi } from "../../../api/testApi";
import { testPostPatientApi } from "../../../api/testPatient";

const { Option } = Select;

interface AddPatientProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (patient: Patient) => void;
  patients: Patient[];
  setpatients: (patients: Patient[]) => void;
}

const AddPatient: React.FC<AddPatientProps> = ({
  open,
  onCancel,
  onAdd,
  patients,
  setpatients,
}) => {
  const [form] = Form.useForm();
  const [accounts, setAccounts] = useState<User[]>([]);

  // load accounts dropdown
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await testGetAccountsApi();
        setAccounts(res.data.result || []);
      } catch (error) {
        console.error("Fetch accounts failed:", error);
      }
    };
    fetchAccounts();
  }, []);

  // submit form
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        account: { id: Number(values.accountId) },
        bhyt: values.bhyt || null,
      };

      const res = await testPostPatientApi(payload);
      const newPatient: Patient = res.data.data;

      // update state
      setpatients([...patients, newPatient]);
      onAdd(newPatient);

      notification.success({
        message: "Thêm thành công",
        description: `Đã thêm bệnh nhân: ${newPatient.account?.name || ""}`,
      });

      form.resetFields();
      onCancel();
    } catch (err: any) {
      console.error("Thêm bệnh nhân thất bại:", err);
      notification.error({
        message: "Thêm thất bại",
        description: err?.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Thêm bệnh nhân mới</div>}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
        {/* Chọn account */}
        <Form.Item
          name="accountId"
          label="Account"
          rules={[{ required: true, message: "Vui lòng chọn account!" }]}
        >
          <Select placeholder="Chọn account" size="large" showSearch>
            {accounts.map((acc) => (
              <Option key={acc.id} value={acc.id}>
                {acc.name} – {acc.gender} ({acc.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Mã BHYT */}
        <Form.Item name="bhyt" label="Mã BHYT">
          <Input placeholder="Nhập mã BHYT (nếu có)" size="large" />
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

export default AddPatient;
