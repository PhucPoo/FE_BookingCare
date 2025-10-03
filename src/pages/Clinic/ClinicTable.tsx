import React, { useState, useMemo } from "react";
import { Button, Modal, Pagination,  } from "antd/lib";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import InformationClinic from "./DetailClinic";
import EditClinic from "./EditClinic";
import type { Address } from "./AddClinic";
import {notification} from "antd";
export interface Clinic {
  id: number;
  name: string;
  description: string;
  position: string;
  phoneNumber: string;
  email?: string;
  image?: string | null;
  address: Address;
}

interface ClinicTableProps {
  clinics: Clinic[];
  onUpdateClinic: (updatedClinic: Clinic) => void;
  onDeleteClinic: (id: number) => Promise<void>; // sửa thành async để notification bắt lỗi
}

type SortColumn = "name" | "create_at" | "";
type SortDirection = "asc" | "desc";

const ClinicTable: React.FC<ClinicTableProps> = ({
  clinics,
  onUpdateClinic,
  onDeleteClinic,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteClinicId, setDeleteClinicId] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const sortedClinics = useMemo(() => {
    if (!sortColumn) return clinics;
    return [...clinics].sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortColumn) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "create_at":
          aVal = a.create_at ? a.create_at.getTime() : 0;
          bVal = b.create_at ? b.create_at.getTime() : 0;
          break;
        default:
          return 0;
      }
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [clinics, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (column: SortColumn) =>
    sortColumn === column ? (
      <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
    ) : null;

  // Pagination
  const paginatedClinics = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedClinics.slice(start, start + pageSize);
  }, [sortedClinics, currentPage]);

  const handleDelete = async () => {
    try {
      await onDeleteClinic(deleteClinicId);
      notification.success({
        message: "Xóa phòng khám thành công",
        description: `Phòng khám ID ${deleteClinicId} đã bị xóa.`,
      });
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      notification.error({
        message: "Lỗi xóa phòng khám",
        description: err?.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">STT</th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("name")}>
              Tên phòng khám {renderSortArrow("name")}
            </th>
            <th className="p-3 border hidden md:table-cell">Mô tả</th>
            <th className="p-3 border hidden lg:table-cell">Vị trí</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th className="p-3 border hidden md:table-cell">Thành phố</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClinics.map((clinic, idx) => (
            <tr key={clinic.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{idx + 1 + (currentPage - 1) * pageSize}</td>
              <td className="p-3 border">{clinic.name}</td>
              <td className="p-3 border hidden md:table-cell">{clinic.description}</td>
              <td className="p-3 border hidden lg:table-cell">{clinic.position}</td>
              <td className="p-3 border hidden md:table-cell">{clinic.phoneNumber}</td>
              <td className="p-3 border hidden md:table-cell">{clinic.address?.city}</td>
              <td className="p-3 border text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="small"
                    icon={<FaEdit />}
                    style={{ backgroundColor: "#facc15", borderColor: "#facc15", color: "#000" }}
                    onClick={() => { setEditingClinic(clinic); setIsEditModalOpen(true); }}
                  />
                  <Button
                    size="small"
                    icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    onClick={() => { setDeleteClinicId(clinic.id); setIsDeleteModalOpen(true); }}
                  />
                  <Button
                    size="small"
                    icon={<FaEye />}
                    style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" }}
                    onClick={() => { setSelectedClinic(clinic); setIsDetailModalOpen(true); }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết */}
      <InformationClinic
        open={isDetailModalOpen}
        clinic={selectedClinic}
        onClose={() => { setIsDetailModalOpen(false); setSelectedClinic(null); }}
      />

      {/* Modal sửa */}
      <EditClinic
        open={isEditModalOpen}
        clinic={editingClinic}
        onCancel={() => { setIsEditModalOpen(false); setEditingClinic(null); }}
        onUpdate={onUpdateClinic}
      />

      {/* Modal xóa */}
      <Modal
        title="Xóa phòng khám"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa phòng khám này không?</p>
      </Modal>

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedClinics.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ClinicTable;
