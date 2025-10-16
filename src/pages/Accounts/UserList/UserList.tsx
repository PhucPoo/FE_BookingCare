import React, { useEffect, useState } from "react";
import type { User } from "./UserTable";
import UserFilterBar from "./UserFilterBar";
import UserTable from "./UserTable";
import AddUser from "./AddUser";
import { testSearchAccountApi } from "../../../api/testApi";
import { Button } from "antd/lib";

const UserManagement: React.FC = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Pagination
  const [pages, setPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  // Filter states
  const [cccd, setCccd] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [monthYear, setMonthYear] = useState<string | null>(null);

  // Search keywords
  const [keywords, setKeywords] = useState({
    cccd: "",
    phone: "",
    email: "",
    role: null as string | null,
    gender: null as string | null,
    monthYear: null as string | null,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await testSearchAccountApi({
          cccd: cccd || undefined,
          phoneNumber: phone || undefined,
          email: email || undefined,
          roleName: role ?? undefined,
          gender: gender || undefined,
          monthYear: monthYear || undefined,
        }, pages, pageSize);


        const data = result.data.result;
        
        setUsers(data);
        setFilteredUsers(data);
        
        setTotalUsers(result.data.meta?.totals || data.length);
      } catch (error) {
        console.error("Lỗi lấy danh sách người dùng:", error);
      }
    };
    fetchData();
  }, [pages, pageSize]);

  //  Update user
  const handleUpdateUser = (updatedUser: User) => {
    const updatedList = users.map((u) =>
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    );
    setUsers(updatedList);
    setFilteredUsers(updatedList);
    console.log("Cập nhật user:", updatedUser);
  };

  //  Delete user
  const handleDeleteUser = (id: number) => {

    const updatedList = users.filter((u) => u.id !== id);
    setUsers(updatedList);
    setFilteredUsers(updatedList);
    console.log("Đã xóa user ID:", id);
  };

  //  Client-side filter
  // const handleFilter = () => {
  //   let data = [...users];
  //   if (role) data = data.filter((u) => u.role.name?.toLowerCase() === role);
  //   if (gender) data = data.filter((u) => u.gender?.toLowerCase() === gender);
  //   if (monthYear) {
  //     data = data.filter(
  //       (u) =>
  //         new Date(u.createAt).toLocaleDateString("vi-VN") ===
  //         new Date(monthYear).toLocaleDateString("vi-VN")
  //     );
  //   }
  //   setFilteredUsers(data);
  // };

  // useEffect(() => {
  //   handleFilter();
  // }, [role, gender, monthYear, users]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Quản lý người dùng
      </h1>

      <UserFilterBar
        filteredUsers={setFilteredUsers}
        onFilter={(filtered, kw) => {
          setFilteredUsers(filtered);
          setKeywords({
            cccd: kw.cccd ?? "",
            phone: kw.phone ?? "",
            email: kw.email ?? "",
            role: kw.role ?? null,
            gender: kw.gender ?? null,
            monthYear: kw.monthYear ?? null,
          });
        }}
        pages={pages}
        pageSize={pageSize}
        cccd={cccd}
        setCccd={setCccd}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        gender={gender}
        setGender={setGender}
        monthYear={monthYear}
        setMonthYear={setMonthYear}
      />

      <div className="mb-4">
        <Button
          type="primary"
          size="large"
          className="!bg-blue-600 hover:!bg-blue-700 rounded-lg font-medium shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
          style={{ minWidth: 180 }}
        >
          + Thêm người dùng
        </Button>
      </div>

      <UserTable
        users={filteredUsers}
        setusers={setUsers}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
        searchCccd={keywords.cccd}
        searchPhone={keywords.phone}
        searchEmail={keywords.email}
        totalUsers={totalUsers}
        pages={pages}
        setpages={setPages}
        pageSize={pageSize}
        setpageSize={setPageSize}
      />

      <AddUser
        users={users}
        setusers={setUsers}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default UserManagement;
