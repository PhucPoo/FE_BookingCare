import React, { useState, useMemo } from "react";
import { Button, Modal, Pagination, type PaginationProps } from "antd/lib";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import EditSpecialty from "./EditSpecialty";
import InformationSpecialty from "./Detail.Specialty";
import SpecialtyClinicModal from "./SpecialtyClinicModal";

export interface Specialty {
  id: number;
  name: string;
  description: string;
  image: string | null;
  isActive: boolean;
  createAt?: string;
  updateAt?: string;
}

interface SpecialtyTableProps {
  specialties: Specialty[];
  setSpecialties: (s: Specialty[]) => void;
  onUpdateSpecialty: (s: Specialty) => void;
  onDeleteSpecialty: (id: number) => void;
  totalSpecialtys: number;
  pages: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setpages: (pages: number) => void;
}

type SortColumn = "name" | "createAt" | "";
type SortDirection = "asc" | "desc";

const SpecialtyTable: React.FC<SpecialtyTableProps> = ({
  specialties,
  setSpecialties,
  onUpdateSpecialty,
  onDeleteSpecialty,
  totalSpecialtys,
  pages,
  pageSize,
  setPageSize,
  setpages,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null
  );

    const [selectedSpecialtiesId, setSelectedSpecialtiesId] = useState<number | null>(null);
    const [selectedSpecialtiesName, setSelectedSpecialtiesName] = useState<string | null>(null);
    const [isSpecialtyClinicModalOpen, setIsSpecialtyClinicModalOpen] = useState(false);

  // 🟩 Pagination
  const handlePageChange: PaginationProps["onChange"] = (page, size) => {
    setpages(page);
    setPageSize(size || pageSize);
  };

  // 🟥 Delete
  const handleOk = () => {
    onDeleteSpecialty(deleteId);
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  // 🟦 Sort logic
  const sortedSpecialties = useMemo(() => {
    if (!sortColumn) return specialties;
    return [...specialties].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
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
  }, [specialties, sortColumn, sortDirection]);

  const handleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (col: SortColumn) =>
    sortColumn === col ? (
      <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
    ) : null;

     const handleOpenModal = (clinicId: number,clinicName:string) => {
    setSelectedSpecialtiesId(clinicId);
    setSelectedSpecialtiesName(clinicName)
    setIsSpecialtyClinicModalOpen(true);
  };

  // 🧾 Render table
  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-200 text-center font-medium">STT</th>
            <th
              className="p-3 border border-gray-200 cursor-pointer text-left font-medium"
              onClick={() => handleSort("name")}
            >
              Tên chuyên khoa {renderSortArrow("name")}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell font-medium">Mô tả</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">
              Trạng thái
            </th>
            <th
              className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer text-center font-medium"
              onClick={() => handleSort("createAt")}
            >
              Ngày tạo {renderSortArrow("createAt")}
            </th>
            <th className="p-3 border border-gray-200 hidden lg:table-cell text-center font-medium">
              Ngày cập nhật
            </th>
            <th className="p-3 border border-gray-200 hidden lg:table-cell text-center font-medium">
              Ảnh
            </th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedSpecialties.length > 0 ? (
            sortedSpecialties.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-200 text-center">
                  {s.id}
                </td>
                <td className="p-3 border border-gray-200">{s.name}</td>
                <td className="p-3 border border-gray-200 hidden md:table-cell">{s.description}</td>
                <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                  {s.isActive ? "Hoạt động" : "Không hoạt động"}
                </td>
                <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                  {s.createAt ? new Date(s.createAt).toLocaleDateString("vi-VN") : "—"}
                </td>
                <td className="p-3 border border-gray-200 hidden lg:table-cell text-center">
                  {s.updateAt ? new Date(s.updateAt).toLocaleDateString("vi-VN") : "—"}
                </td>
                <td className="p-3 border border-gray-200 hidden lg:table-cell text-center">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="large"
                      icon={<FaEdit />}
                      style={{
                        backgroundColor: "#facc15",
                        borderColor: "#facc15",
                        color: "#000",
                      }}
                      onClick={() => {
                        setEditingSpecialty(s);
                        setIsEditModalOpen(true);
                      }}
                    />
                    <Button
                      size="large"
                      icon={<FaTrash />}
                      style={{
                        backgroundColor: "#b91c1c",
                        borderColor: "#b91c1c",
                        color: "#fff",
                      }}
                      onClick={() => {
                        setIsModalOpen(true);
                        setDeleteId(s.id);
                      }}
                    />
                    <Button
                      size="large"
                      icon={<FaEye />}
                      style={{
                        backgroundColor: "#3b82f6",
                        borderColor: "#3b82f6",
                        color: "#fff",
                      }}
                      onClick={() => {
                        setSelectedSpecialty(s);
                        setIsDetailModalOpen(true);
                      }}
                    />
                    <Button
                      size="large"
                      icon={<FaPlus />}
                      className="!bg-green-500 !border-green-500 !text-white hover:!bg-green-600 rounded-lg"
                      onClick={() => handleOpenModal(s.id,s.name)}

                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center text-gray-500 py-6 border border-gray-200"
              >
                Không có chuyên khoa nào được tìm thấy
              </td>
            </tr>
          )}
        </tbody>
      </table>

        {selectedSpecialtiesId !== null && (
        <SpecialtyClinicModal
          open={isSpecialtyClinicModalOpen}
          specialtyId={selectedSpecialtiesId} 
          specialtyName={selectedSpecialtiesName}
          onClose={() => setIsSpecialtyClinicModalOpen(false)}
        />
      )}

      {/* Modal xem chi tiết */}
      <InformationSpecialty
        open={isDetailModalOpen}
        specialty={selectedSpecialty}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedSpecialty(null);
        }}
      />

      {/* Modal sửa */}
      <EditSpecialty
        open={isEditModalOpen}
        specialty={editingSpecialty}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingSpecialty(null);
        }}
        onUpdate={onUpdateSpecialty}
      />

      {/* Modal xóa */}
      <Modal
        title="Xóa chuyên khoa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa chuyên khoa này không?</p>
      </Modal>

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          showSizeChanger
          current={pages}
          total={totalSpecialtys}
          pageSize={pageSize}
          pageSizeOptions={["3", "5", "10"]}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SpecialtyTable;
