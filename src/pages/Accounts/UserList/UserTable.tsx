import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import DetailUser from "./DetailUser";
import EditUser from "./EditUser";
import { testDeleteAccountsApi, testSortAccountsApi } from "../../../api/testApi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { notification, Pagination } from "antd";

export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  cccd: number;
  birth: Date;
  address: string;
  gender: string;
  avatar: File;
  role: {
    id: number;
    name: string;
  };
  createAt: Date;
  updateAt: Date;
}

interface UserTableProps {
  users: User[];
  setusers: (users: User[]) => void;
  roleFilter?: string | null;
  genderFilter?: string | null;
  dateFilter?: string | null;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (id: number) => void;
}

type SortColumn = "name" | "createAt";
type SortDirection = "asc" | "desc";

const UserTable: React.FC<UserTableProps> = ({
  users,
  setusers,
  roleFilter,
  genderFilter,
  dateFilter,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number>(0);

  // Modal chi tiết
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Modal sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Fetch sorted users
  const fetchSortedUsers = async (direction: SortDirection) => {
    try {
      const res = await testSortAccountsApi(1, 100, sortColumn, direction);
      setusers(res.data.result);
    } catch (err) {
      console.error("Lỗi load users sort:", err);
    }
  };

  const handleClick = () => {
    const next = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(next);
    fetchSortedUsers(next);
  };

  // Modal delete
  const handleOk = async () => {
    try {
      await testDeleteAccountsApi(deleteUserId);
      onDeleteUser(deleteUserId);
    } catch (err: any) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: err.response?.data?.message || "Xoá thất bại",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  // Update
  const handleUpdateUser = (user: User) => {
    onUpdateUser(user);
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  const roleMap: Record<number, string> = {
    1: "Admin",
    2: "Doctor",
    3: "Support",
    4: "Client",
  };

  // Filter
  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter && u.role?.name.toLowerCase() !== roleFilter) return false;
      if (genderFilter && u.gender?.toLowerCase() !== genderFilter) return false;
      if (
        dateFilter &&
        new Date(u.createAt).toLocaleDateString("vi-VN") !==
        new Date(dateFilter).toLocaleDateString("vi-VN")
      )
        return false;
      return true;
    });
  }, [users, roleFilter, genderFilter, dateFilter]);

  // Pagination slice
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-200 text-center font-medium">STT</th>
            <th
              className="p-3 border border-gray-200 cursor-pointer text-left font-medium select-none"
              onClick={handleClick}
            >
              Tên {sortDirection === "asc" ? "🔼" : "🔽"}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell font-medium">Email</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">SĐT</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Gender</th>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">CCCD</th>
            <th className="p-3 border border-gray-200 hidden lg:table-cell text-center font-medium">Role</th>
            <th
              className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer text-center font-medium select-none"
              onClick={handleClick}
            >
              Ngày tạo {sortDirection === "asc" ? "🔼" : "🔽"}
            </th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200 text-center">{u.id}</td>
              <td className="p-3 border border-gray-200">{u.name}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell">{u.email}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{u.phoneNumber}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{u.gender}</td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">{u.cccd}</td>
              <td className="p-3 border border-gray-200 hidden lg:table-cell text-center">
                {roleMap[u.role?.id || 0]}
              </td>
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {new Date(u.createAt).toLocaleString()}
              </td>
              <td className="p-3 border border-gray-200 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    size="large"
                    icon={<FaEdit />}
                    style={{ backgroundColor: "#facc15", borderColor: "#facc15", color: "#000" }}
                    onClick={() => {
                      setEditingUser(u);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeleteUserId(u.id);
                    }}
                  />
                  <Button
                    size="large"
                    icon={<FaEye />}
                    style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" }}
                    onClick={() => {
                      setSelectedUser(u);
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
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Modal chi tiết */}
      <DetailUser
        open={isDetailModalOpen}
        user={selectedUser}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Modal sửa */}
      <EditUser
        open={isEditModalOpen}
        user={editingUser}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        onUpdate={handleUpdateUser}
      />

      {/* Modal xoá */}
      <Modal
        title="Xác nhận xoá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </div>
  );
};

export default UserTable;