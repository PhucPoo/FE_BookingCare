import React, { useState, useMemo } from "react";
import { Button, Modal, Pagination } from "antd/lib";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import DetailDoctor from "./DetailDoctor";
import EditDoctor from "./EditDoctor";
import type { Clinic } from "../../Clinic/ClinicTable";
import type { Specialty } from "../../Specialty/SpecialtyTable";

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
  doctors?: Doctor[];
  setdoctor: (doctors: Doctor[]) => void;
  searchName?: string;
  searchPhone?: string;
  searchCost?: string;
  onUpdateDoctor: (updatedDoctor: Doctor) => void;
  onDeleteDoctor: (id: number) => void;
}

const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors = [],
  setdoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  searchName = "",
  searchPhone = "",
  searchCost = "",
}) => {
  const [sortColumn, setSortColumn] = useState<"name" | "createAt" | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteDoctorId, setDeleteDoctorId] = useState<number>(0);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleSort = (column: "name" | "createAt") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (column: "name" | "createAt") => {
    if (sortColumn !== column) return null;
    return <span>{sortDirection === "asc" ? "▲" : "▼"}</span>;
  };

  const highlightText = (text: string | number, keyword: string) => {
    if (!keyword) return String(text);
    const regex = new RegExp(`(${keyword})`, "gi");
    return String(text).replace(regex, `<mark style="background: yellow;">$1</mark>`);
  };

  const sortedDoctors = useMemo(() => {
    const validDoctors = Array.isArray(doctors) ? doctors : [];
    if (!sortColumn) return validDoctors;

    return [...validDoctors].sort((a, b) => {
      let aVal: any, bVal: any;
      if (sortColumn === "name") {
        aVal = a.account.name.toLowerCase();
        bVal = b.account.name.toLowerCase();
      } else {
        aVal = new Date(a.createAt).getTime();
        bVal = new Date(b.createAt).getTime();
      }
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [doctors, sortColumn, sortDirection]);

  const paginatedDoctors = sortedDoctors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleConfirmDelete = async () => {
    try {
      await onDeleteDoctor(deleteDoctorId);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Lỗi khi xóa bác sĩ:", err);
    }
  };

  const handleUpdateDoctor = (doctor: Doctor) => {
    onUpdateDoctor(doctor);
    setEditingDoctor(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-200 text-center font-medium">ID</th>
            <th className="p-3 border border-gray-200 cursor-pointer text-left font-medium select-none" onClick={() => handleSort("name")}>
              Tên bác sĩ {renderSortArrow("name")}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">SĐT</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Chi phí</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Bằng cấp</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Chuyên khoa</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Phòng khám</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer text-center font-medium select-none" onClick={() => handleSort("createAt")}>
              Ngày tạo {renderSortArrow("createAt")}
            </th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDoctors.map((doc) => (
          
            
            <tr className="hover:bg-gray-50" key={doc.id}>
              <td className="p-3 border border-gray-200 text-center">{doc.id}</td>
              <td
                className="p-3 border border-gray-200"
                dangerouslySetInnerHTML={{ __html: highlightText(doc.account.name, searchName) }}
              />
              <td
                className="p-3 border border-gray-200 hidden md:table-cell text-center"
                dangerouslySetInnerHTML={{ __html: highlightText(doc.account.phoneNumber, searchPhone) }}
              />
              <td
                className="p-3 border border-gray-200 hidden md:table-cell text-center"
                dangerouslySetInnerHTML={{ __html: highlightText(doc.cost, searchCost) }}
              />
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{doc.degree}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{doc.specialtyName || "—"}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{doc.clinic?.name || "—"}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {doc.createAt ? new Date(doc.createAt).toLocaleDateString() : "—"}
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                <div className="flex justify-center gap-2">
                  <Button icon={<FaEdit />}
                    style={{ backgroundColor: "#facc15", borderColor: "#facc15", color: "#000", }}
                    size="large"
                    onClick={() => { setEditingDoctor(doc); setIsEditModalOpen(true); }} />
                  <Button icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    size="large"
                    danger onClick={() => { setDeleteDoctorId(doc.id); setIsDeleteModalOpen(true); }} />
                  <Button icon={<FaEye />}
                    style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" }}
                    size="large"
                    onClick={() => { setSelectedDoctor(doc); setIsDetailModalOpen(true); }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center py-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedDoctors.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      <DetailDoctor open={isDetailModalOpen} doctor={selectedDoctor} onClose={() => setIsDetailModalOpen(false)} />
      <EditDoctor open={isEditModalOpen} doctor={editingDoctor} onCancel={() => { setIsEditModalOpen(false); setEditingDoctor(null); }} onUpdate={handleUpdateDoctor} />
      <Modal title="Xác nhận xóa" open={isDeleteModalOpen} onOk={handleConfirmDelete} onCancel={() => setIsDeleteModalOpen(false)}>
        <p>Bạn có chắc chắn muốn xóa bác sĩ này không?</p>
      </Modal>
    </div>
  );
};

export default DoctorTable;
