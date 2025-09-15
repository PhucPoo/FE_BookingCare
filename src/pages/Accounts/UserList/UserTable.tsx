import React, { useState, useMemo } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Detailuser from "./DetailUser";
import Edituser from "./EditUser";

export interface User {
  id: number
  name: string
  email: string
  phoneNumber: string
  gender: any
  address: any
  password: string,
  birth: any
  createAt: string
  updateAt: string
  cccd: any
  role: Role | "USER" | "ADMIN"
}

export interface Role {
  id: number
  name: string
}


interface userTableProps {
  users: User[];
  onUpdateuser: (updateduser: User) => void;
  onDeleteuser: (id: number) => void;
}

// Hiển thị trạng thái user
// const getStatusBadge = (status: User["status"]) => {
//   if (status === "active") {
//     return (
//       <uan className="bg-green-500 text-white px-2 py-1 rounded text-sm">
//         Hoạt động
//       </uan>
//     );
//   }
//   if (status === "inactive") {
//     return (
//       <uan className="bg-red-500 text-white px-2 py-1 rounded text-sm">
//         Nghỉ
//       </uan>
//     );
//   }
//   return null;
// };

type SortColumn = "name" | "create_at" | "";
type SortDirection = "asc" | "desc";

const userTable: React.FC<userTableProps> = ({ users, onUpdateuser, onDeleteuser }) => {
  // State sắp xếp
  const [sortColumn, setSortColumn] = useState<SortColumn>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // console.log('OK clicked', editinguser?.id);
    onDeleteuser(Number(deleteuserid)); 
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // Sắp xếp dữ liệu theo cột và chiều
  const sortedusers = useMemo(() => {
    if (!sortColumn) return users;

    return [...users].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "create_at":
          aVal = a.createAt;
          bVal = b.createAt
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortColumn, sortDirection]);

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
  const [selecteduser, setSelecteduser] = useState<User | null>(null);

  const showDetailModal = (user: User) => {
    setSelecteduser(user);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelecteduser(null);
  };

  // Modal sửa người dùng
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editinguser, setEditinguser] = useState<User | null>(null);
  const [deleteuserid, setDeleteuserid] = useState<number>(0);

  // Cập nhật người dùng
  const handleUpdateuser = (user: User) => {
    onUpdateuser(user); // Gọi về component cha
    setEditinguser(null);
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
              Tên người dùng {renderSortArrow("name")}
            </th>
            <th className="p-3 border hidden md:table-cell">Email</th>
            {/* <th className="p-3 border hidden lg:table-cell">Password</th> */}
            <th className="p-3 border hidden md:table-cell">SĐT</th>
            <th
              className="p-3 border hidden md:table-cell cursor-pointer select-none"
              onClick={() => handleSort("create_at")}
            >
              Ngày tạo {renderSortArrow("create_at")}
            </th>
            <th className="p-3 border hidden xl:table-cell">Cập nhật</th>
            {/* <th className="p-3 border">Trạng thái</th> */}
            <th className="p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedusers.map((u, index) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{index + 1}</td>
              <td className="p-3 border">{u.name}</td>
              <td className="p-3 border hidden md:table-cell">{u.email}</td>
              {/* <td className="p-3 border hidden lg:table-cell">{u.password}</td> */}
              <td className="p-3 border hidden md:table-cell">{u.phoneNumber}</td>
              <td className="p-3 border hidden md:table-cell">
                {u.createAt}
              </td>
              <td className="p-3 border hidden xl:table-cell">
                {u.updateAt}
              </td>
              {/* <td className="p-3 border">{getStatusBadge(u.status)}</td> */}
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
                      
                      setEditinguser(u);
                     
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
                      setDeleteuserid(u.id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button size="small" onClick={() => showDetailModal(u)}>
                    Xem
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thông tin chi tiết */}
      <Detailuser
        open={isDetailModalOpen}
        user={selecteduser}
        onClose={closeDetailModal}
      />

      {/* Modal sửa người dùng */}
      <Edituser
        open={isEditModalOpen}
        user={editinguser}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditinguser(null);
        }}
        onUpdate={handleUpdateuser}
      />
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </div>
  );
};

export default userTable;
