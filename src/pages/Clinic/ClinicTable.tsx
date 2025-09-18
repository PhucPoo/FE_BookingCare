import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import InformationClinic from "./DetailClinic";
import EditClinic from "./EditClinic";
import Modal from "antd/lib/modal";

export interface Clinic {
  id: number;
  name: string;
  description: string;
  position: string;
  phoneNumber: string;
  email?: string;
  image?: string | null;
  address: {
    id: number;
    city: string;
  };
  create_at?: Date;
  update_at?: Date;
}

interface ClinicTableProps {
  clinics: Clinic[];
  onUpdateClinic: (updatedClinic: Clinic) => void;
  onDeleteClinic: (id: number) => void;
}

type SortColumn = "name" | "create_at" | "";
type SortDirection = "asc" | "desc";

const ClinicTable: React.FC<ClinicTableProps> = ({
  clinics,
  onUpdateClinic,
  onDeleteClinic,
}) => {
  // State sắp xếp
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteClinicId, setDeleteClinicId] = useState<number>(0);

  const handleOk = () => {
    onDeleteClinic(deleteClinicId);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Sắp xếp dữ liệu
  const sortedClinics = useMemo(() => {
    if (!sortColumn) return clinics;

    return [...clinics].sort((a, b) => {
      let aVal: any;
      let bVal: any;

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

  // Xử lý click sort cột
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

  // Modal chi tiết
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const showDetailModal = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedClinic(null);
  };

  // Modal sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  const handleUpdateClinic = (clinic: Clinic) => {
    onUpdateClinic(clinic);
    setEditingClinic(null);
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
              onClick={() => handleSort("name")}
            >
              Tên phòng khám {renderSortArrow("name")}
            </th>
            <th className="p-3 border hidden md:table-cell">Mô tả</th>
            <th className="p-3 border hidden lg:table-cell">Vị trí</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th className="p-3 border hidden md:table-cell">Thành phố</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={() => handleSort("create_at")}
            >
              Ngày tạo {renderSortArrow("create_at")}
            </th>
            <th className="p-3 border hidden xl:table-cell">Ngày cập nhật</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedClinics.map((clinic, index) => (
            <tr key={clinic.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{index + 1}</td>
              <td className="p-3 border">{clinic.name}</td>
              <td className="p-3 border hidden md:table-cell">
                {clinic.description}
              </td>
              <td className="p-3 border hidden lg:table-cell">
                {clinic.position}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {clinic.phoneNumber}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {clinic.address?.city}
              </td>
              <td className="p-3 border hidden md:table-cell">
                {clinic.create_at
                  ? new Date(clinic.create_at).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-3 border hidden xl:table-cell">
                {clinic.update_at
                  ? new Date(clinic.update_at).toLocaleDateString()
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
                      setEditingClinic(clinic);
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
                      setDeleteClinicId(clinic.id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button size="small" onClick={() => showDetailModal(clinic)}>
                    Xem
                  </Button>
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
        onClose={closeDetailModal}
      />

      {/* Modal sửa */}
      <EditClinic
        open={isEditModalOpen}
        clinic={editingClinic}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingClinic(null);
        }}
        onUpdate={handleUpdateClinic}
      />

      {/* Modal xóa */}
      <Modal
        title="Xóa phòng khám"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa phòng khám này không?</p>
      </Modal>
    </div>
  );
};

export default ClinicTable;
