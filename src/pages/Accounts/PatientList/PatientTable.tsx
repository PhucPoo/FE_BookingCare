import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { notification } from "antd";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import DetailPatient from "./DetailPatient";
import EditPatient from "./EditPatient";

export interface Patient {
  id: number;
  bhyt: string;
  account: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    avatar?: string | null;
    gender?: string | null;
    createAt?: string;
    address?: string | null;
  };
  createAt: string;
  updateAt: string;
}

interface PatientTableProps {
  patients: Patient[];
  setpatient: (patients: Patient[]) => void;
  genderFilter?: string | null;
  dateFilter?: string | null;
  addressFilter?: string | null;
  onUpdatePatient: (updatedPatient: Patient) => void;
  onDeletePatient: (id: number) => void;
}

type SortColumn = "name" | "createAt";
type SortDirection = "asc" | "desc";

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  setpatient,
  genderFilter,
  dateFilter,
  addressFilter,
  onUpdatePatient,
  onDeletePatient,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Modal xoá
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState<number>(0);

  // Modal chi tiết
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Modal sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // --- Filter + Sort
  const sortedPatients = useMemo(() => {
    let data = [...patients];

    if (genderFilter) {
      data = data.filter(
        (s) => s.account.gender?.toLowerCase() === genderFilter
      );
    }
    if (dateFilter) {
      data = data.filter(
        (s) =>
          new Date(s.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN")
      );
    }
    if (addressFilter) {
      data = data.filter(
        (s) => s.account.address?.toLowerCase() === addressFilter
      );
    }

    // Sort
    return data.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "name":
          aVal = a.account?.name?.toLowerCase() ?? "";
          bVal = b.account?.name?.toLowerCase() ?? "";
          break;
        case "createAt":
          aVal = a.createAt ? new Date(a.createAt).getTime() : 0;
          bVal = b.createAt ? new Date(b.createAt).getTime() : 0;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [patients, sortColumn, sortDirection, genderFilter, dateFilter, addressFilter]);

  const toggleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  // --- Delete
  const handleOk = async () => {
    try {
      onDeletePatient(deletePatientId);
    } catch (err: any) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: err?.response?.data?.message ?? "Không thể xoá bệnh nhân",
      });
      console.error("Lỗi xoá bệnh nhân:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  // --- Update
  const handleUpdatePatient = (patient: Patient) => {
    onUpdatePatient(patient);
    setEditingPatient(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">STT</th>
            <th
              className="p-3 border cursor-pointer select-none"
              onClick={() => toggleSort("name")}
            >
              Tên bệnh nhân{" "}
              {sortColumn === "name" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <th className="p-3 border hidden md:table-cell">Email</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={() => toggleSort("createAt")}
            >
              Ngày tạo{" "}
              {sortColumn === "createAt" &&
                (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <th className="p-3 border hidden md:table-cell">Cập nhật</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedPatients.map((bn, index) => (
            <tr key={bn.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{index + 1}</td>
              <td className="p-3 border">{bn.account?.name ?? "—"}</td>
              <td className="p-3 border hidden md:table-cell">
                {bn.account?.email ?? "—"}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {bn.account?.phoneNumber ?? "—"}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {bn.createAt
                  ? new Date(bn.createAt).toLocaleDateString("vi-VN")
                  : "—"}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {bn.updateAt
                  ? new Date(bn.updateAt).toLocaleDateString("vi-VN")
                  : "—"}
              </td>
              <td className="p-3 border text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="small"
                    icon={<FaEdit />}
                    style={{
                      backgroundColor: "#facc15",
                      borderColor: "#facc15",
                      color: "#000",
                    }}
                    onClick={() => {
                      setEditingPatient(bn);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <Button
                    size="small"
                    icon={<FaTrash />}
                    style={{
                      backgroundColor: "#b91c1c",
                      borderColor: "#b91c1c",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeletePatientId(bn.id);
                    }}
                  />
                  <Button
                    size="small"
                    icon={<FaEye />}
                    style={{
                      backgroundColor: "#3b82f6",
                      borderColor: "#3b82f6",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setSelectedPatient(bn);
                      setIsDetailModalOpen(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết */}
      <DetailPatient
        open={isDetailModalOpen}
        patient={selectedPatient}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Modal sửa */}
      <EditPatient
        open={isEditModalOpen}
        patient={editingPatient}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingPatient(null);
        }}
        onUpdate={handleUpdatePatient}
      />

      {/* Modal xoá */}
      <Modal
        title="Xác nhận xoá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa bệnh nhân này không?</p>
      </Modal>
    </div>
  );
};

export default PatientTable;
