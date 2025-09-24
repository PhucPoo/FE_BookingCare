import React, { useEffect, useState } from "react";
import {
  adminGetAllBooking,
  adminSortBooking,
} from "../../../api/Admin/AdminApi";
import AdminBookingTable from "./AdminBookingTable";
import { toast } from "react-toastify";
import AdminBookingDetail from "./AdminBookingDetail";
import type { CheckRenderKey } from "./CheckRenderKeyModel";

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
  createdAt?: string;
};

const AdminBookingManage = () => {
  const [bookings, setBookings] = useState<AdminBookingTableModel[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBookingList, setTotalBookingList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [checkRender, setCheckRender] = useState<
    Record<CheckRenderKey, boolean>
  >({
    appointmentDate: false,
    createAt: false,
    status: false,
    doctor: false,
    patient: false,
    clinic: false,
    time: false,
    id: false,
  });
  const [filterCreatedAt, setFilterCreatedAt] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [BookingDetail, setBookingDetail] = useState<AdminBookingTableModel>(
    {}
  );
  const handleAdminGetAllBookings = async () => {
    const result = await adminGetAllBooking();
    if (!result.error) {
      const {
        meta: { page, pageSize, totals },
      } = result.data;
      setBookings(result.data.result);
      setPageSize(pageSize);
      setTotalBookingList(totals);
      setCurrentPage(page);
    }
  };
  //handle search
  const handleSearchBooking = (value: string) => {
    let BookingListClone = bookings;
    BookingListClone = BookingListClone.filter((item) => {
      return item.patient?.account?.name?.includes(value);
    });
    setBookings(BookingListClone);
  };
  //onLog
  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };
  //handle sort
  const handleSort = async (key: CheckRenderKey) => {
    const res = await adminSortBooking(key, checkRender[key] ? "asc" : "desc");
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setBookings(res.data.result);
  };
  // handle change option (status and clinic)
  const handleChange = (value: string) => {
    let BookingListClone = bookings;
    BookingListClone = BookingListClone.filter((item) => {
      return item.status === value;
    });
    setBookings(BookingListClone);
  };
  //search by createAt
  const handleFindByDate = () => {
    if (!filterCreatedAt.from || !filterCreatedAt.to) {
      toast.error("missing parameter");
      return;
    }
    if (filterCreatedAt.from > filterCreatedAt.to) {
      toast.error("from must be smaller to");
      return;
    }
    const from = new Date(filterCreatedAt.from);
    const to = new Date(filterCreatedAt.to);
    let BookingListClone = bookings;
    BookingListClone = BookingListClone.filter((item) => {
      if (item?.appointmentDate) {
        const date = new Date(item?.appointmentDate);
        return from <= new Date(date) && new Date(date) <= to;
      }
    });
    setBookings(BookingListClone);
  };

  const handleSearchByClinic = (value: string) => {
    let cloneBookings = bookings;
    cloneBookings = cloneBookings.filter((item) => {
      return item.clinic?.name?.includes(value);
    });
    setBookings(cloneBookings);
  };
  useEffect(() => {
    handleAdminGetAllBookings();
  }, []);
  return (
    <div className="p-5 bg-white mx-5 border-2 rounded border-gray-200">
      <AdminBookingTable
        AdminBookingList={bookings}
        pageSize={pageSize}
        currentPage={currentPage}
        totalBookingList={totalBookingList}
        handleAdminGetAllBookings={handleAdminGetAllBookings}
        onLog={onLog}
        handleChange={handleChange}
        handleFindByDate={handleFindByDate}
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        setFilterCreatedAt={setFilterCreatedAt}
        filterCreatedAt={filterCreatedAt}
        handleSearchByClinic={handleSearchByClinic}
        setBookingDetail={setBookingDetail}
        setIsModalOpen={setIsModalOpen}
      />
      <AdminBookingDetail
        BookingDetail={BookingDetail}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default AdminBookingManage;
