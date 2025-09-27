import React, { useState, useMemo, useEffect } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import DetailUser from "./DetailUser";
import EditUser from "./EditUser";
import { testDeleteAccountsApi, testSortAccountsApi } from "../../../api/testApi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { notification } from 'antd'
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  cccd: number;
  birth:Date;
  address:string;
  gender: string;
  avatar: File;
  role: {
    id: number;
    name: string;
  };
  createAt: Date;
  updateAt: Date;
}
export type CreateUserForm = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  cccd: number;
  address:string;
  birth: Date;
  gender:string;
  password: string;
  avatar: File;
  roleId: number;
  createAt: Date;
  updateAt: Date;
}


export type CreateUser = Omit<CreateUserForm, "id" | "createAt" | "updateAt">;

interface UserTableProps {
  users: User[];
  setusers: (users: User[]) => void
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

  // Sắp xếp

  const fetchSortedUsers = async () => {
    try {
      const res = await testSortAccountsApi(1, 10, sortColumn, sortDirection);
      console.log(">>>", res)
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
    4: "Patient",

  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter && u.role?.name.toLowerCase() !== roleFilter) return false;
      if (genderFilter && u.gender?.toLowerCase() !== genderFilter) return false;
      if (dateFilter && new Date(u.createAt).toLocaleDateString("vi-VN") !== new Date(dateFilter).toLocaleDateString("vi-VN")) return false;
      return true;
    });
  }, [users, roleFilter, genderFilter, dateFilter]);

  

  return (
    <div className="w-full bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">STT</th>
            <th
              className="p-3 border cursor-pointer select-none"
              onClick={handleClick}   // ✅
            >
              Tên {sortDirection === "asc" ? "🔼" : "🔽"}
            </th>
            <th className="p-3 border hidden md:table-cell">Email</th>
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th className="p-3 border hidden md:table-cell">Gender</th>
            <th className="p-3 border hidden md:table-cell">CCCD</th>
            {/* <th className="p-3 border hidden md:table-cell">Ngày sinh</th> */}
            <th className="p-3 border hidden lg:table-cell">Role</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={handleClick}
            >
              Ngày tạo
              {sortDirection === "asc" ? "🔼" : "🔽"}
            </th>
            {/* <th className="p-3 border hidden xl:table-cell">Cập nhật</th> */}
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{u.id}</td>
              <td className="p-3 border">{u.name}</td>
              <td className="p-3 border hidden md:table-cell">{u.email}</td>
              <td className="p-3 border hidden md:table-cell">{u.phoneNumber}</td>
              <td className="p-3 border hidden md:table-cell">{u.gender}</td>
              <td className="p-3 border hidden md:table-cell">{u.cccd}</td>
              {/* <td className="p-3 border hidden md:table-cell">
                {new Date(u.birth).toLocaleString()}
              </td> */}
              <td className="p-3 border hidden lg:table-cell">
                {roleMap[u.role?.id || 0]}
              </td>

              <td className="p-3 border hidden md:table-cell">
                {new Date(u.createAt).toLocaleString()}
              </td>
              {/* <td className="p-3 border hidden xl:table-cell">
                {new Date(u.updateAt).toLocaleString()}
              </td> */}
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
                      setEditingUser(u);
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
                      setDeleteUserId(u.id);
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
    </div >
  );
};

export default UserTable;
