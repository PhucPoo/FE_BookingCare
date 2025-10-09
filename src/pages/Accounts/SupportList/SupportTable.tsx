import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { notification } from "antd";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import DetailSupport from "./DetailSupport";
import EditSupport from "./EditSupport";
import type { User } from "../UserList/UserTable";
import type { Clinic } from "../../Clinic/ClinicTable";
import { type PaginationProps, Pagination, Tooltip } from "antd/lib";

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
  searchName?: string;
  searchPhone?: string;
  onUpdateSupport: (updatedSupport: Support) => void;
  onDeleteSupport: (id: number) => void;
  totalSupportList: number;
  pages: number;
  pageSize: number;
  setpages: (pages: number) => void;
  setpageSize: (pageSize: number) => void;
}

type SortColumn = "id" | "name" | "createAt";
type SortDirection = "asc" | "desc";

const getStatusBadge = (isActive: boolean) =>
  isActive ? (
    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Hoạt động</span>
  ) : (
    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Nghỉ</span>
  );

const SupportTable: React.FC<SupportTableProps> = ({
  supports,
  onUpdateSupport,
  onDeleteSupport,
  searchName = "",
  searchPhone = "",
  totalSupportList,
  pages,
  pageSize,
  setpages,
  setpageSize,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("id");
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

  // --- Filter + Sort ---
  const filteredAndSorted = useMemo(() => {
    let data = [...supports];

    // --- Sắp xếp theo cột ---
    data.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "id":
          aVal = a.id;
          bVal = b.id;
          break;
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

    return data;
  }, [supports, sortColumn, sortDirection]);

  // --- Pagination ---
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current, size) => {
    setpageSize(size);
    setpages(current);
  };

  const toggleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  // --- Delete ---
  const handleDelete = async (id: number) => {
    onDeleteSupport(id);
    setEditingSupport(null);
    setIsEditModalOpen(false);
  };

  // --- Update ---
  const handleUpdateSupport = (support: Support) => {
    onUpdateSupport(support);
    setEditingSupport(null);
    setIsEditModalOpen(false);
  };

  // --- Highlight search ---
  const highlightText = (text: string | number, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return String(text).replace(regex, `<mark style="background: yellow;">$1</mark>`);
  };

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            {/* ID */}
            <th
              className="p-3 border border-gray-200 cursor-pointer text-center font-medium select-none"
              onClick={() => toggleSort("id")}
            >
              ID {sortColumn === "id" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>

            {/* Tên */}
            <th
              className="p-3 border border-gray-200 cursor-pointer text-left font-medium select-none"
              onClick={() => toggleSort("name")}
            >
              Tên {sortColumn === "name" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>

            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Giới tính</th>
            <Tooltip title="Số điện thoại">
              <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">SĐT</th>
            </Tooltip>
            <th className="p-3 border border-gray-200 hidden md:table-cell font-medium">Phòng khám</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell font-medium">Địa chỉ phòng khám</th>

            {/* Ngày tạo */}
            <th
              className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer text-center font-medium select-none"
              onClick={() => toggleSort("createAt")}
            >
              Ngày tạo {sortColumn === "createAt" && (sortDirection === "asc" ? "🔼" : "🔽")}
            </th>

            <th className="p-3 border border-gray-200 text-center font-medium">Trạng thái</th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {filteredAndSorted.map((sp) => (
            <tr key={sp.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200 text-center">{sp.id}</td>
              <td className="p-3 border border-gray-200">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(sp.account?.name ?? "", searchName || ""),
                  }}
                />
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {sp.account?.gender ?? "—"}
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(sp.account?.phoneNumber ?? "", searchPhone || ""),
                  }}
                />
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell">{sp.clinic?.name ?? "—"}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell">{sp.account?.address ?? "—"}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {sp.account.createAt ? new Date(sp.account.createAt).toLocaleString("vi-VN") : "—"}
              </td>
              <td className="p-3 border border-gray-200 text-center">{getStatusBadge(sp.isActive)}</td>
              <td className="p-3 border border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="large"
                    icon={<FaEdit />}
                    style={{ backgroundColor: "#facc15", borderColor: "#facc15", color: "#000" }}
                    onClick={() => {
                      setEditingSupport(sp);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeleteSupportId(sp.id);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaEye />}
                    style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" }}
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

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          defaultCurrent={pages}
          total={totalSupportList}
          pageSize={pageSize}
          pageSizeOptions={["1", "2", "3", "5"]}
        />
      </div>

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
        onOk={() => {
          handleDelete(deleteSupportId);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa trợ lý này không?</p>
      </Modal>
    </div>
  );
};

export default SupportTable;
