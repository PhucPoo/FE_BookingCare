import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { notification } from "antd";
import api from "../../../api/axios";
import type { Support } from "./SupportTable";
import type { User } from "../UserList/UserTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import { testGetAccountsApi } from "../../../api/testApi";
import { testGetClinicApi } from "../../../api/testClinic";

const { Option } = Select;

interface AddSupportProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (support: Support) => void;
  supports: Support[];
  setSupports: (supports: Support[]) => void;
}

const AddSupport: React.FC<AddSupportProps> = ({
  open,
  onCancel,
  onAdd,
  supports,
  setSupports,
}) => {
  const [form] = Form.useForm();
  const [accounts, setAccounts] = useState<User[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);

  // Load dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountRes, clinicRes] = await Promise.all([
          testGetAccountsApi(),
          testGetClinicApi(),
        ]);
        setAccounts(accountRes.data.result || []);
        setClinics(clinicRes.data.result || []);
      } catch (error) {
        console.error("Fetch dropdown data failed:", error);
      }
    };
    fetchData();
  }, []);

  // Submit form
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        account: { id: Number(values.accountId) },
        clinic: { id: Number(values.clinicId) },
      };

      const res = await api.post("/v1/supports", payload);
      const newSupport: Support = res.data.data;

      // update state
      setSupports([...supports, newSupport]);
      onAdd(newSupport);

      notification.success({
        message: "Thêm thành công",
        description: `Đã thêm trợ lý: ${newSupport.account.name || ""}`,
      });

      form.resetFields();
      onCancel();
    } catch (err: any) {
      console.error("Thêm trợ lý thất bại:", err);
      notification.error({
        message: "Thêm thất bại",
        description: err.response.data.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <Modal
      title={
        <div className="text-center text-lg font-semibold">
          Thêm trợ lý mới
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        {/* Account */}
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

        {/* Clinic */}
        <Form.Item
          name="clinicId"
          label="Clinic"
          rules={[{ required: true, message: "Vui lòng chọn clinic!" }]}
        >
          <Select placeholder="Chọn clinic" size="large" showSearch>
            {clinics.map((clinic) => (
              <Option key={clinic.id} value={clinic.id}>
                {clinic.name}
              </Option>
            ))}
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

export default AddSupport;
