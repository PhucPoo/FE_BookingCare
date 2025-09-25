import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { notification } from "antd";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import DetailSupport from "./DetailSupport";
import EditSupport from "./EditSupport";
import type { User } from "../UserList/UserTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import { testDeleteSupportApi } from "../../../api/testSupport";

export interface Support {
  id: number;
  isActive: boolean;
  account: User;
  clinic: Clinic;
  createAt: Date;
  updateAt: Date;
}

interface SupportTableProps {
  supports: Support[];
  setsupport: (supports: Support[]) => void;
  genderFilter?: string | null;
  dateFilter?: string | null;
  clinicFilter?: string | null;
  onUpdateSupport: (updatedSupport: Support) => void;
  onDeleteSupport: (id: number) => void;
}

type SortColumn = "name" | "createAt";
type SortDirection = "asc" | "desc";

// Badge trạng thái
const getStatusBadge = (isActive: boolean) =>
  isActive ? (
    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
      Hoạt động
    </span>
  ) : (
    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
      Nghỉ
    </span>
  );

const SupportTable: React.FC<SupportTableProps> = ({
  supports,
  setsupport,
  genderFilter,
  dateFilter,
  clinicFilter,
  onUpdateSupport,
  onDeleteSupport,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Modal xoá
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSupportId, setDeleteSupportId] = useState<number>(0);

  // Modal chi tiết
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<Support | null>(null);

  // Modal sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSupport, setEditingSupport] = useState<Support | null>(null);

  // --- Sort client-side (có thể thay bằng API sort nếu backend support)
  const sorted = useMemo(() => {
    let data = [...supports];

    // filter
    if (genderFilter) {
      data = data.filter(
        (s) => s.account.gender?.toLowerCase() === genderFilter
      );
    }
    if (dateFilter) {
      data = data.filter(
        (s) =>
          new Date(s.createAt).toLocaleDateString("vi-VN") ===
          new Date(dateFilter).toLocaleDateString("vi-VN")
      );
    }
    if (clinicFilter) {
      data = data.filter(
        (s) => s.clinic?.name?.toLowerCase() === clinicFilter
      );
    }

    // sort
    return data.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "name":
          aVal = a.account?.name?.toLowerCase() ?? "";
          bVal = b.account?.name?.toLowerCase() ?? "";
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
  }, [supports, sortColumn, sortDirection, genderFilter, dateFilter, clinicFilter]);

  const toggleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  // --- Delete
  const handleOk = async () => {
    try {
      await testDeleteSupportApi(deleteSupportId);
      onDeleteSupport(deleteSupportId);
    } catch (err: any) {
      console.log(err.response.data.message)
      notification.error({
        message: "Có lỗi xảy ra",
        description: err.response.data.message
      })
      console.error("Lỗi xoá user:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  // --- Update
  const handleUpdateSupport = (support: Support) => {
    onUpdateSupport(support);
    setEditingSupport(null);
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
              onClick={() => toggleSort("name")}
            >
              Tên {sortColumn === "name" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <th className="p-3 border hidden md:table-cell">Giới tính</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th className="p-3 border hidden md:table-cell">Phòng khám</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={() => toggleSort("createAt")}
            >
              Ngày tạo{" "}
              {sortColumn === "createAt" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>
            <th className="p-3 border">Trạng thái</th>
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((sp) => (
            <tr key={sp.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{sp.account.id}</td>
              {/* {JSON.stringify(sp)} */}
              <td className="p-3 border">{sp.account?.name ?? "Unknown"}</td>
              <td className="p-3 border">{sp.account?.gender ?? "Unknown"}</td>
              <td className="p-3 border">{sp.account?.phoneNumber ?? "Unknown"}</td>
              <td className="p-3 border">{sp.clinic?.name ?? "Unknown"}</td>
              <td className="p-3 border">
                {sp.account.createAt ? new Date(sp.account.createAt).toLocaleString() : ""}
              </td>
              <td className="p-3 border">{getStatusBadge(sp.isActive)}</td>
              <td className="p-3 border text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="small"
                    icon={<FaEdit />}
                    style={{
                      backgroundColor: "#facc15",
                      borderColor: "#facc15",
                      color: "#000",
                    }}
                    onClick={() => {
                      setEditingSupport(sp);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <Button
                    size="small"
                    icon={<FaTrash />}
                    style={{
                      backgroundColor: "#b91c1c",
                      borderColor: "#b91c1c",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeleteSupportId(sp.id);
                    }}
                  />
                  <Button
                    size="small"
                    icon={<FaEye />}
                    style={{
                      backgroundColor: "#3b82f6",
                      borderColor: "#3b82f6",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setSelectedSupport(sp);
                      setIsDetailModalOpen(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết */}
      <DetailSupport
        open={isDetailModalOpen}
        support={selectedSupport}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Modal sửa */}
      <EditSupport
        open={isEditModalOpen}
        support={editingSupport}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingSupport(null);
        }}
        onUpdate={handleUpdateSupport}
      />

      {/* Modal xoá */}
      <Modal
        title="Xác nhận xoá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa trợ lý này không?</p>
      </Modal>
    </div>
  );
};

export default SupportTable;
