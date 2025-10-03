import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import DetailDoctor from "./DetailDoctor";
import EditDoctor from "./EditDoctor";
import type { Clinic } from "../../Clinic/ClinicTable";
import type { Specialty } from "../../Specialty/SpecialtyTable";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Pagination } from "antd/lib";

export interface Doctor {
  id: number;
  cost: number;
  degree: "BACHELOR" | "MASTER" | "DOCTOR";
  accountId: number;
  account: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    cccd?: string;
    address: string;
  };
  clinic: Clinic;
  specialty: Specialty;
  createAt: Date;
  updateAt: Date;
  status: "active" | "inactive";
}

interface DoctorTableProps {
  doctors: Doctor[];
  setdoctor: (doctors: Doctor[]) => void;
  onUpdateDoctor: (updatedDoctor: Doctor) => void;
  onDeleteDoctor: (id: number) => void;
}

type SortColumn = "name" | "createAt" | "";
type SortDirection = "asc" | "desc";

const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  setdoctor,
  onUpdateDoctor,
  onDeleteDoctor,
}) => {
  // Sort
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modal delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteDoctorId, setDeleteDoctorId] = useState<number>(0);

  const handleConfirmDelete = async () => {
    try {
      await onDeleteDoctor(deleteDoctorId);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Lỗi khi xóa bác sĩ:", err);
    }
  };

  // Modal detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleUpdateDoctor = (doctor: Doctor) => {
    onUpdateDoctor(doctor);
    setEditingDoctor(null);
    setIsEditModalOpen(false);
  };

  // Sort logic
  const sortedDoctors = useMemo(() => {
    if (!sortColumn) return doctors;

    return [...doctors].sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortColumn) {
        case "name":
          aVal = a.account.name.toLowerCase();
          bVal = b.account.name.toLowerCase();
          break;
        case "createAt":
          aVal = new Date(a.createAt).getTime();
          bVal = new Date(b.createAt).getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [doctors, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>;
  };

  // Pagination slice
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDoctors = sortedDoctors.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-200 text-center font-medium">STT</th>
            <th
              className="p-3 border border-gray-200 cursor-pointer select-none md:table-cell font-medium"
              onClick={() => handleSort("name")}
            >
              Tên bác sĩ {renderSortArrow("name")}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">SĐT</th>
            <th className="p-3 border border-gray-200 hidden xl:table-cell text-center font-medium">Chi phí</th>
            <th className="p-3 border border-gray-200 hidden xl:table-cell text-center font-medium">Bằng cấp</th>
            <th className="p-3 border border-gray-200 hidden xl:table-cell font-medium">Chuyên khoa</th>
            <th className="p-3 border border-gray-200 hidden xl:table-cell font-medium">Phòng khám</th>
            <th
              className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer select-none text-center font-medium"
              onClick={() => handleSort("createAt")}
            >
              Ngày tạo {renderSortArrow("createAt")}
            </th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDoctors.map((doc, idx) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200 text-center">{startIndex + idx + 1}</td>
              <td className="p-3 border border-gray-200">{doc.account.name}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{doc.account.phoneNumber}</td>
              <td className="p-3 border border-gray-200 hidden xl:table-cell text-center">{doc.cost}</td>
              <td className="p-3 border border-gray-200 hidden xl:table-cell text-center">{doc.degree}</td>
              <td className="p-3 border border-gray-200 hidden xl:table-cell">{doc.specialtyName || "—"}</td>
              <td className="p-3 border border-gray-200 hidden xl:table-cell">{doc.clinic?.name || "—"}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {doc.createAt ? new Date(doc.createAt).toLocaleDateString() : "—"}
              </td>
              <td className="p-3 border border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="large"
                    icon={<FaEdit />}
                    style={{ backgroundColor: "#facc15", borderColor: "#facc15", color: "#000" }}
                    onClick={() => {
                      setEditingDoctor(doc);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    onClick={() => {
                      setDeleteDoctorId(doc.id);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaEye />}
                    style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" }}
                    onClick={() => {
                      setSelectedDoctor(doc);
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
          current={currentPage}
          pageSize={pageSize}
          total={sortedDoctors.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Modal chi tiết */}
      <DetailDoctor
        open={isDetailModalOpen}
        doctor={selectedDoctor}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Modal sửa */}
      <EditDoctor
        open={isEditModalOpen}
        doctor={editingDoctor}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingDoctor(null);
        }}
        onUpdate={handleUpdateDoctor}
      />

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        onOk={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa bác sĩ này không?</p>
      </Modal>
    </div>
  );
};

export default DoctorTable;
