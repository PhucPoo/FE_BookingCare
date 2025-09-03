import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Detailsupport from "./DetailSupport";
import Editsupport from "./EditSupport";

export interface Support {
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

interface SupportTableProps {
  supports: Support[];
  onUpdatesupport: (updatedsupport: Support) => void;
  onDeletesupport: (id: number) => void;
}

// Hiển thị trạng thái support
const getStatusBadge = (status: Support["status"]) => {
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

const supportTable: React.FC<SupportTableProps> = ({ supports, onUpdatesupport, onDeletesupport }) => {
  // State sắp xếp
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // console.log('OK clicked', editingsupport?.id);
    onDeletesupport(Number(deletesupportid)); 
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // Sắp xếp dữ liệu theo cột và chiều
  const sortedsupports = useMemo(() => {
    if (!sortColumn) return supports;

    return [...supports].sort((a, b) => {
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
  }, [supports, sortColumn, sortDirection]);

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
  const [selectedsupport, setSelectedsupport] = useState<Support | null>(null);

  const showDetailModal = (support: Support) => {
    setSelectedsupport(support);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedsupport(null);
  };

  // Modal sửa trợ lý
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingsupport, setEditingsupport] = useState<Support | null>(null);
  const [deletesupportid, setDeletesupportid] = useState<number>(0);

  // Cập nhật trợ lý
  const handleUpdatesupport = (support: Support) => {
    onUpdatesupport(support); // Gọi về component cha
    setEditingsupport(null);
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
              Tên trợ lý {renderSortArrow("name")}
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
          {sortedsupports.map((sp, index) => (
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
                      
                      setEditingsupport(sp);
                     
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
                      setDeletesupportid(sp.id);
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
      <Detailsupport
        open={isDetailModalOpen}
        support={selectedsupport}
        onClose={closeDetailModal}
      />

      {/* Modal sửa trợ lý */}
      <Editsupport
        open={isEditModalOpen}
        support={editingsupport}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingsupport(null);
        }}
        onUpdate={handleUpdatesupport}
      />
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa trợ lý này không?</p>
      </Modal>
    </div>
  );
};

export default supportTable;
