import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Tooltip, notification } from "antd/lib";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import DetailUser from "./DetailUser";
import EditUser from "./EditUser";
import { testDeleteAccountsApi, testSortAccountsApi } from "../../../api/testApi";

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  cccd: number;
  birth: Date;
  address: string;
  gender: string;
  avatar: string | null;
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
  searchCccd?: string;
  searchPhone?: string;
  searchEmail?: string;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (id: number) => void;
  totalUsers: number;
  pages: number;
  pageSize: number;
  setpages: (pages: number) => void;
  setpageSize: (pageSize: number) => void;
}

type SortColumn = "name" | "createAt";
type SortDirection = "asc" | "desc";

const UserTable: React.FC<UserTableProps> = ({
  users,
  setusers,
  onUpdateUser,
  onDeleteUser,
  searchCccd = "",
  searchPhone = "",
  searchEmail = "",
  totalUsers,
  pages,
  pageSize,
  setpages,
  setpageSize,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number>(0);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  
  // Fetch sorted users
  const fetchSortedUsers = async (column: SortColumn, direction: SortDirection) => {
    try {
      const res = await testSortAccountsApi(pages, pageSize, column, direction);
      setusers(res.data.result);
    } catch (err) {
      console.error("Lỗi load users sort:", err);
    }
  };

  const handleSortClick = (column: SortColumn) => {
    const nextDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(nextDirection);
    fetchSortedUsers(column, nextDirection);
  };

  const handleOk = async () => {
    try {
      await testDeleteAccountsApi(deleteUserId);
      onDeleteUser(deleteUserId);
      notification.success({ message: "Xoá người dùng thành công" });
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

  const highlightText = (text: string | number, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return String(text).replace(
      regex,
      `<mark style="background: yellow;">$1</mark>`
    );
  };

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-base border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-200 text-center font-medium">ID</th>
            <th
              className="p-3 border border-gray-200 cursor-pointer text-left font-medium select-none"
              onClick={() => handleSortClick("name")}
            >
              Tên {sortDirection === "asc" ? "🔼" : "🔽"}
            </th>
            <th className="p-3 border border-gray-200 hidden md:table-cell font-medium">Email</th>
            <Tooltip title="Số điện thoại">
              <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">
                SĐT
              </th>
            </Tooltip>
            <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">Gender</th>
            <Tooltip title="Căn cước công dân">
              <th className="p-3 border border-gray-200 hidden md:table-cell text-center font-medium">CCCD</th>
            </Tooltip>
            <th className="p-3 border border-gray-200 hidden lg:table-cell text-center font-medium">Role</th>
            <th
              className="p-3 border border-gray-200 hidden md:table-cell cursor-pointer text-center font-medium select-none"
              onClick={() => handleSortClick("createAt")}
            >
              Ngày tạo {sortDirection === "asc" ? "🔼" : "🔽"}
            </th>
            <th className="p-3 border border-gray-200 text-center font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200 text-center">{u.id}</td>
              <td className="p-3 border border-gray-200">{u.name}</td>
              <td
                className="p-3 border border-gray-200 hidden md:table-cell"
                dangerouslySetInnerHTML={{
                  __html: highlightText(u.email || "", searchEmail),
                }}
              />
              <td
                className="p-3 border border-gray-200 hidden md:table-cell text-center"
                dangerouslySetInnerHTML={{
                  __html: highlightText(u.phoneNumber || "", searchPhone),
                }}
              />
              <td className="p-3 border border-gray-200 hidden md:table-cell text-center">
                {u.gender}
              </td>
              <td
                className="p-3 border border-gray-200 hidden md:table-cell text-center"
                dangerouslySetInnerHTML={{
                  __html: highlightText(u.cccd || "", searchCccd),
                }}
              />
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
                  {/* <Button
                    size="large"
                    icon={<FaTrash />}
                    style={{ backgroundColor: "#b91c1c", borderColor: "#b91c1c", color: "#fff" }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setDeleteUserId(u.id);
                    }}
                  /> */}
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
          showSizeChanger
          current={pages}
          total={totalUsers}
          pageSize={pageSize}
          pageSizeOptions={["1", "2", "3", "5"]}
          onChange={(page, size) => {
            setpages(page);
            setpageSize(size);
          }}
        />
      </div>

      {/* Modal chi tiết */}
      <DetailUser open={isDetailModalOpen} user={selectedUser} onClose={() => setIsDetailModalOpen(false)} />

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
      <Modal title="Xác nhận xoá" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </div>
  );
};

export default UserTable;
