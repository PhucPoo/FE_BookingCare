import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { notification } from "antd";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";


import DetailPatient from "./DetailPatient";
import EditPatient from "./EditPatient";
import { Pagination, Tooltip, type PaginationProps } from "antd/lib";

export interface Patient {
  id: number;
  bhyt: string;
  account: {
    id: number;
    name: string;
    email: string;
    cccd: string;
    phoneNumber: string;
    avatar?: string | null;
    gender?: string | null;
    createAt?: string;
    updateAt?: string;
    address?: string | null;
  };
  createAt: string;
  updateAt: string;
}

export interface CreatePatientDto {
  accountId: number;
  bhyt: string;
}

interface PatientTableProps {
  patients: Patient[];
  searchName?: string;
  searchPhone?: string;
  searchBHYT?: string;
  searchCccd?: string;
  searchAddress?: string;
  genderFilter?: string | null;
  dateFilter?: string | null;
  addressFilter?: string | null;
  onUpdatePatient: (updatedPatient: Patient) => void;
  onDeletePatient: (id: number) => void;
  totalPatients: number;
  pages: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setpages: (pages: number) => void;
}

type SortColumn = "id" | "name" | "createAt";
type SortDirection = "asc" | "desc";

const PatientTable: React.FC<PatientTableProps> = ({
  patients,

  onUpdatePatient,
  onDeletePatient,
  searchName = "",
  searchPhone = "",
  searchBHYT = "",
  searchCccd = "",
  searchAddress = "",
  totalPatients,
  pages,
  pageSize,
  setPageSize,
  setpages,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("id");
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
  const filteredAndSorted = useMemo(() => {
    const data = Array.isArray(patients) ? [...patients] : [];

    return data.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "id":
          aVal = a.id;
          bVal = b.id;
          break;
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
  }, [patients, sortColumn, sortDirection]);


  // --- Pagination slice
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageSize(pageSize);
    setpages(current);
  };

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

  const highlightText = (text: string | number, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return String(text).replace(regex, `<mark style="background: yellow;">$1</mark>`);
  };


  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="p-3 border border-gray-200 text-center cursor-pointer select-none font-medium"
              onClick={() => toggleSort("id")}
            >
              ID  {sortColumn === "id" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              className="p-3 border border-gray-200 cursor-pointer select-none font-medium"
              onClick={() => toggleSort("name")}
            >
              Tên bệnh nhân {sortColumn === "name" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <Tooltip title="Căn cước công dân">
              <th className="p-3 border border-gray-200 hidden md:table-cell font-medium">CCCD</th>
            </Tooltip>
             <Tooltip title="Số điện thoại">
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">SĐT</th>
            </Tooltip>
             <Tooltip title="Mã bảo hiểm y tế">
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Mã BHYT</th>
            </Tooltip>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Địa chỉ</th>
            <th
              className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer select-none text-center font-medium"
              onClick={() => toggleSort("createAt")}
            >
              Ngày tạo {sortColumn === "createAt" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Cập nhật</th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSorted.map((bn) => (
            <tr key={bn.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200 text-center">{bn.id}</td>
              <td className="p-3 border border-gray-200">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(bn.account.name ?? "", searchName || ""),
                  }}
                />
              </td>

              <td className="p-3 border border-gray-200 hidden md:table-cell">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(bn.account.cccd ?? "", searchCccd || ""),
                  }}
                />
              </td>

              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(bn.account.phoneNumber ?? "", searchPhone || ""),
                  }}
                />
              </td>

              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(bn.bhyt ?? "", searchBHYT || ""),
                  }}
                />
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(bn.account.address ?? "", searchAddress || ""),
                  }}
                />
              </td>

              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {bn.account.createAt ? new Date(bn.account.createAt).toLocaleString("vi-VN") : "—"}
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {bn.account?.updateAt ? new Date(bn.account.updateAt).toLocaleString("vi-VN") : "—"}
              </td>
              <td className="p-3 border border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="large"
                    icon={<FaEdit />}
                    style={{ backgroundColor: "#facc15", borderColor: "#facc15", color: "#000" }}
                    onClick={() => {
                      setEditingPatient(bn);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeletePatientId(bn.id);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaEye />}
                    style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" }}
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

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          defaultCurrent={pages}
          total={totalPatients}
          pageSize={pageSize}
          pageSizeOptions={['1', '2', '3', '5']}

        />
      </div>

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
        onUpdatepatient={handleUpdatePatient}
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
