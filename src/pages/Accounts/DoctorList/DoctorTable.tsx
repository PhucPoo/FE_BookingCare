import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import DetailDoctor from "./DetailDoctor";
import EditDoctor from "./EditDoctor";
import Modal from "antd/lib/modal";

export interface Doctor {
  id: number;
  name: string;
  email: string;
  cccd: number;
  phone: string;
  price?: number;
  create_at: Date;
  update_at: Date;
  status: "active" | "inactive";
}

interface DoctorTableProps {
  doctors: Doctor[];
  onUpdateDoctor: (updatedDoctor: Doctor) => void;
  onDeleteDoctor: (id: number) => void;
}

// Hiển thị trạng thái bác sĩ
const getStatusBadge = (status: Doctor["status"]) => {
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

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors, onUpdateDoctor, onDeleteDoctor }) => {
  // State sắp xếp
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // console.log('OK clicked', editingDoctor?.id);
    onDeleteDoctor(Number(deleteDoctorid)); 
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // Sắp xếp dữ liệu theo cột và chiều
  const sortedDoctors = useMemo(() => {
    if (!sortColumn) return doctors;

    return [...doctors].sort((a, b) => {
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
  }, [doctors, sortColumn, sortDirection]);

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
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const showDetailModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDoctor(null);
  };

  // Modal sửa bác sĩ
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deleteDoctorid, setDeleteDoctorid] = useState<number>(0);

  // Cập nhật bác sĩ
  const handleUpdateDoctor = (doctor: Doctor) => {
    onUpdateDoctor(doctor); // Gọi về component cha
    setEditingDoctor(null);
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
              Tên bác sĩ {renderSortArrow("name")}
            </th>
            <th className="p-3 border hidden md:table-cell">Email</th>
            <th className="p-3 border hidden lg:table-cell">CCCD</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th className="p-3 border hidden xl:table-cell">Giá</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={() => handleSort("create_at")}
            >
              Ngày tạo {renderSortArrow("create_at")}
            </th>
            <th className="p-3 border hidden xl:table-cell">Ngày cập nhật</th>
            <th className="p-3 border">Trạng thái</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedDoctors.map((doc, index) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{index + 1}</td>
              <td className="p-3 border">{doc.name}</td>
              <td className="p-3 border hidden md:table-cell">{doc.email}</td>
              <td className="p-3 border hidden lg:table-cell">{doc.cccd}</td>
              <td className="p-3 border hidden md:table-cell">{doc.phone}</td>
              <td className="p-3 border hidden xl:table-cell">{doc.price}</td>
              <td className="p-3 border hidden md:table-cell">
                {doc.create_at.toLocaleDateString()}
              </td>
              <td className="p-3 border hidden xl:table-cell">
                {doc.update_at.toLocaleDateString()}
              </td>
              <td className="p-3 border">{getStatusBadge(doc.status)}</td>
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
                      
                      setEditingDoctor(doc);
                     
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
                      setDeleteDoctorid(doc.id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button size="small" onClick={() => showDetailModal(doc)}>
                    Xem
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thông tin chi tiết */}
      <DetailDoctor
        open={isDetailModalOpen}
        doctor={selectedDoctor}
        onClose={closeDetailModal}
      />

      {/* Modal sửa bác sĩ */}
      <EditDoctor
        open={isEditModalOpen}
        doctor={editingDoctor}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingDoctor(null);
        }}
        onUpdate={handleUpdateDoctor}
      />
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa bác sĩ này không?</p>
      </Modal>
    </div>
  );
};

export default DoctorTable;
