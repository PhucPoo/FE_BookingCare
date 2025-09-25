import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import EditSpecialty from "./EditSpecialty";
import InformationSpecialty from "./Detail.Specialty";

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
}

type SortColumn = "name" | "createAt" | "";
type SortDirection = "asc" | "desc";

const SpecialtyTable: React.FC<SpecialtyTableProps> = ({
  specialties,
  setSpecialties,
  onUpdateSpecialty,
  onDeleteSpecialty,
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

  const handleOk = () => {
    onDeleteSpecialty(deleteId);
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  // sort
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

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">STT</th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Tên chuyên khoa {renderSortArrow("name")}
            </th>
            <th className="p-3 border hidden md:table-cell">Mô tả</th>
            <th className="p-3 border hidden md:table-cell">Trạng thái</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer"
              onClick={() => handleSort("createAt")}
            >
              Ngày tạo {renderSortArrow("createAt")}
            </th>
            <th className="p-3 border hidden lg:table-cell">Ngày cập nhật</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedSpecialties.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{s.id}</td>
              <td className="p-3 border">{s.name}</td>
              <td className="p-3 border hidden md:table-cell">{s.description}</td>
              <td className="p-3 border hidden md:table-cell">
                {s.isActive ? "Hoạt động" : "Không hoạt động"}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {s.createAt
                  ? new Date(s.createAt).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-3 border hidden lg:table-cell">
                {s.updateAt
                  ? new Date(s.updateAt).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-3 border text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "#facc15",
                      borderColor: "#facc15",
                      color: "#000",
                    }}
                    onClick={() => {
                      setEditingSpecialty(s);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "#b91c1c",
                      borderColor: "#b91c1c",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeleteId(s.id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button size="small" onClick={() => {
                    setSelectedSpecialty(s);
                    setIsDetailModalOpen(true);
                  }}>
                    Xem
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal detail */}
      <InformationSpecialty
        open={isDetailModalOpen}
        specialty={selectedSpecialty}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedSpecialty(null);
        }}
      />

      {/* Modal edit */}
      <EditSpecialty
        open={isEditModalOpen}
        specialtys={editingSpecialty}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingSpecialty(null);
        }}
        onUpdate={onUpdateSpecialty}
      />

      {/* Modal delete */}
      <Modal
        title="Xóa chuyên khoa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa chuyên khoa này không?</p>
      </Modal>
    </div>
  );
};

export default SpecialtyTable;
