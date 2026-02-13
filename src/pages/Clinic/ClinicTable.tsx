import React, { useState, useMemo } from "react";
import { Button, Modal, Pagination, Tooltip, type PaginationProps, } from "antd/lib";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import InformationClinic from "./DetailClinic";
import EditClinic from "./EditClinic";
import type { Address } from "./AddClinic";
import { notification } from "antd";
import ClinicSpecialtyModal from "./ClinicSpecialtyModal";
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
  onDeleteClinic: (id: number) => void;
  totalClinics: number;
  pages: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setpages: (pages: number) => void;
}

type SortColumn = "name" | "create_at" | "";
type SortDirection = "asc" | "desc";

const ClinicTable: React.FC<ClinicTableProps> = ({
  clinics,
  onUpdateClinic,
  onDeleteClinic,
  totalClinics,
  pages,
  pageSize,
  setPageSize,
  setpages,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteClinicId, setDeleteClinicId] = useState<number>(0);

  const [selectedClinicId, setSelectedClinicId] = useState<number | null>(null);
  const [selectedClinicName, setSelectedClinicName] = useState<string | null>(null);
  const [isClinicSpecialtyModalOpen, setIsClinicSpecialtyModalOpen] = useState(false);



  const sortedClinics = useMemo(() => {
    if (!sortColumn) return clinics;
    return [...clinics].sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortColumn) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
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
  const handlePageChange: PaginationProps["onChange"] = (page, size) => {
    setpages(page);
    setPageSize(size);
  };

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
  console.log(totalClinics);

  const handleOpenModal = (clinicId: number,clinicName:string) => {
    setSelectedClinicId(clinicId);
    setSelectedClinicName(clinicName);
    setIsClinicSpecialtyModalOpen(true);

  };



  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="p-3 border border-gray-200 text-center text-base font-medium">
              STT
            </th>
            <th
              className="p-3 border border-gray-200 cursor-pointer text-base font-medium"
              onClick={() => handleSort("name")}
            >
              Tên phòng khám {renderSortArrow("name")}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-base font-medium">
              Mô tả
            </th>
            <th className="p-3 border border-gray-200 hidden lg:table-cell text-base font-medium">
              Vị trí
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-base font-medium">
              SĐT
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-base font-medium">
              Thành phố
            </th>
            <th className="p-3 border border-gray-200 text-center text-base font-medium">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-base">
          {sortedClinics.map((clinic) => (
            <tr
              key={clinic.id}
              className="hover:bg-gray-100 transition"
            >
              <td className="p-3 border border-gray-200 text-center">
                {clinic.id}
              </td>
              <td className="p-3 border border-gray-200">{clinic.name}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell max-w-[250px] truncate">
                <Tooltip title={clinic.description}>
                  {clinic.description.length > 50
                    ? clinic.description.slice(0, 50) + "..."
                    : clinic.description}
                </Tooltip>
              </td>
              <td className="p-3 border border-gray-200 hidden lg:table-cell">
                {clinic.position}
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {clinic.phoneNumber}
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {clinic.address?.city}
              </td>
              <td className="p-3 border border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {/* Edit */}
                  <Button
                    size="large"
                    icon={<FaEdit />}
                    className="!bg-yellow-400 !border-yellow-400 !text-black hover:!bg-yellow-500 rounded-lg"
                    onClick={() => {
                      setEditingClinic(clinic);
                      setIsEditModalOpen(true);
                    }}
                  />
                  {/* Delete */}
                  <Button
                    size="large"
                    icon={<FaTrash />}
                    className="!bg-red-600 !border-red-600 !text-white hover:!bg-red-700 rounded-lg"
                    onClick={() => {
                      setDeleteClinicId(clinic.id);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                  {/* Detail */}
                  <Button
                    size="large"
                    icon={<FaEye />}
                    className="!bg-blue-500 !border-blue-500 !text-white hover:!bg-blue-600 rounded-lg"
                    onClick={() => {
                      setSelectedClinic(clinic);
                      setIsDetailModalOpen(true);
                    }}

                  />
                  {/* Thêm chuyên khoa */}
                  <Button
                    size="large"
                    icon={<FaPlus />}
                    className="!bg-green-500 !border-green-500 !text-white hover:!bg-green-600 rounded-lg"
                    onClick={() => handleOpenModal(clinic.id,clinic.name)}

                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClinicId !== null && (
        <ClinicSpecialtyModal
          open={isClinicSpecialtyModalOpen}
          clinicId={selectedClinicId} 
          clinicName={selectedClinicName}
          onClose={() => setIsClinicSpecialtyModalOpen(false)}
        />
      )}


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
          showSizeChanger
          current={pages}
          total={totalClinics}
          pageSize={pageSize}
          pageSizeOptions={["1", "3", "5"]}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ClinicTable;