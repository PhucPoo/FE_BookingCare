import React, { useEffect, useState } from "react";
import { adminGetAllBooking } from "../../../api/Admin/AdminApi";
import AdminBookingTable from "./AdminBookingTable";

type AdminBookingTableModel = {
  id?: number;
  appointmentDate?: string;
  description?: string;
  status?: string;
  doctor?: {
    id?: number;
    account?: {
      id?: number;
      name?: string;
    };
  };
  patient?: {
    id?: number;
    account?: {
      id?: number;
      name?: string;
    };
  };
  time?: {
    id?: number;
    start?: string;
    end?: string;
  };
  clinic?: {
    id?: number;
    name?: string;
  };
  createAt?: string;
};

const AdminBookingManage = () => {
  const [bookings, setBooking] = useState<AdminBookingTableModel[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBookingList, setTotalBookingList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [columns, setColumns] = useState<{ value: number; label: string }[]>(
    []
  );
  const handleAdminGetAllBookings = async () => {
    const result = await adminGetAllBooking();
    if (!result.error) {
      setBooking(result.data.result);
      const columnArr = Object.keys(result.data.result[0]).map(
        (item, index) => {
          return {
            value: index,
            label: item,
          };
        }
      );
      console.log("🚀 ~ handleAdminGetAllBookings ~ columnArr:", columnArr);
      delete columnArr[4];
      delete columnArr[0];
      setColumns(columnArr);
      setPageSize(10);
      setTotalBookingList(result.data.result.length);
      setCurrentPage(1);
    }
  };
  useEffect(() => {
    handleAdminGetAllBookings();
  }, []);
  return (
    <div className="p-5 bg-white mx-5">
      <AdminBookingTable
        AdminBookingList={bookings}
        pageSize={pageSize}
        currentPage={currentPage}
        totalBookingList={totalBookingList}
        columns={columns}
        handleAdminGetAllBookings={handleAdminGetAllBookings}
        // onLog={onLog}
        // handleChange={handleChange}
        // handleFindByDate={handleFindByDate}
        // handleSort={handleSort}
        // handleSearchBooking={handleSearchBooking}
        // setFilterCreatedAt={setFilterCreatedAt}
        // filterCreatedAt={filterCreatedAt}
      />
    </div>
  );
};

export default AdminBookingManage;
