import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Detailpatient from "./DetailPatient";
import Editpatient from "./EditPatient";

export interface Patient {
  id: number;
  name: string;
  email: string;
  cccd: number;
  phone: string;
  price?: number;
  date_of_birth?: Date;
  create_at: Date;
  update_at: Date;
  status: "active" | "inactive";
}

interface patientTableProps {
  patients: Patient[];
  onUpdatepatient: (updatedpatient: Patient) => void;
  onDeletepatient: (id: number) => void;
}

// Hiển thị trạng thái patient
const getStatusBadge = (status: Patient["status"]) => {
  if (status === "active") {
    return (
      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
        Hoạt động
      </span>
    );
  }
  if (status === "inactive") {
    return (
      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
        Nghỉ
      </span>
    );
  }
  return null;
};

type SortColumn = "name" | "create_at" | "";
type SortDirection = "asc" | "desc";

const patientTable: React.FC<patientTableProps> = ({ patients, onUpdatepatient, onDeletepatient }) => {
  // State sắp xếp
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // console.log('OK clicked', editingpatient?.id);
    onDeletepatient(Number(deletepatientid)); 
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // Sắp xếp dữ liệu theo cột và chiều
  const sortedpatients = useMemo(() => {
    if (!sortColumn) return patients;

    return [...patients].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "create_at":
          aVal = a.create_at.getTime();
          bVal = b.create_at.getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [patients, sortColumn, sortDirection]);

  // Xử lý click sort cột
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Render mũi tên sắp xếp
  const renderSortArrow = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>;
  };

  // Modal xem chi tiết
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedpatient, setSelectedpatient] = useState<Patient | null>(null);

  const showDetailModal = (patient: Patient) => {
    setSelectedpatient(patient);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedpatient(null);
  };

  // Modal sửa bệnh nhân
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingpatient, setEditingpatient] = useState<Patient | null>(null);
  const [deletepatientid, setDeletepatientid] = useState<number>(0);

  // Cập nhật bệnh nhân
  const handleUpdatepatient = (patient: Patient) => {
    onUpdatepatient(patient); // Gọi về component cha
    setEditingpatient(null);
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
              Tên bệnh nhân {renderSortArrow("name")}
            </th>
            <th className="p-3 border hidden md:table-cell">Email</th>
            <th className="p-3 border hidden lg:table-cell">CCCD</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={() => handleSort("create_at")}
            >
              Ngày tạo {renderSortArrow("create_at")}
            </th>
            <th className="p-3 border hidden xl:table-cell">Cập nhật</th>
            <th className="p-3 border">Trạng thái</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedpatients.map((sp, index) => (
            <tr key={sp.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{index + 1}</td>
              <td className="p-3 border">{sp.name}</td>
              <td className="p-3 border hidden md:table-cell">{sp.email}</td>
              <td className="p-3 border hidden lg:table-cell">{sp.cccd}</td>
              <td className="p-3 border hidden md:table-cell">{sp.phone}</td>
              <td className="p-3 border hidden md:table-cell">
                {sp.create_at.toLocaleDateString()}
              </td>
              <td className="p-3 border hidden xl:table-cell">
                {sp.update_at.toLocaleDateString()}
              </td>
              <td className="p-3 border">{getStatusBadge(sp.status)}</td>
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
                      
                      setEditingpatient(sp);
                     
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
                      setDeletepatientid(sp.id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button size="small" onClick={() => showDetailModal(sp)}>
                    Xem
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thông tin chi tiết */}
      <Detailpatient
        open={isDetailModalOpen}
        patient={selectedpatient}
        onClose={closeDetailModal}
      />

      {/* Modal sửa bệnh nhân */}
      <Editpatient
        open={isEditModalOpen}
        patient={editingpatient}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingpatient(null);
        }}
        onUpdate={handleUpdatepatient}
      />
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa bệnh nhân này không?</p>
      </Modal>
    </div>
  );
};

export default patientTable;
