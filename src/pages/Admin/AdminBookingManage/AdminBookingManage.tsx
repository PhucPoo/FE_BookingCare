import React, { useEffect, useState } from "react";
import { adminGetAllBooking } from "../../../api/Admin/AdminApi";
import AdminBookingTable from "./AdminBookingTable";
import { toast } from "react-toastify";

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
  const [checkRender, setCheckRender] = useState({
    appointmentDate: false,
    createdAt: false,
    status: false,
    doctor: false,
    patient: false,
    clinic: false,
    time: false,
  });
  const [filterCreatedAt, setFilterCreatedAt] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });
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
  const handleSort = (key: string) => {
    let BookingListCLone = bookings;
    switch (key) {
      case "createdAt":
        if (checkRender.createdAt) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.createdAt?.localeCompare(b?.createdAt)
          );
          setCheckRender({
            ...checkRender,
            createdAt: !checkRender.createdAt,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.createdAt?.localeCompare(a?.createdAt)
          );
          setCheckRender({
            ...checkRender,
            createdAt: !checkRender.createdAt,
          });
          setBookings(BookingListCLone);
        }
        break;
      case "doctor":
        if (checkRender.doctor) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.doctor?.account?.name?.localeCompare(b?.doctor?.account?.name)
          );
          setCheckRender({
            ...checkRender,
            doctor: !checkRender.doctor,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.doctor?.account?.name?.localeCompare(a?.doctor.account?.name)
          );
          setCheckRender({
            ...checkRender,
            doctor: !checkRender.doctor,
          });
          setBookings(BookingListCLone);
        }
        break;
      case "appointmentDate":
        if (checkRender.appointmentDate) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.appointmentDate?.localeCompare(b?.appointmentDate)
          );
          setCheckRender({
            ...checkRender,
            appointmentDate: !checkRender.appointmentDate,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.appointmentDate?.localeCompare(a?.appointmentDate)
          );
          setCheckRender({
            ...checkRender,
            appointmentDate: !checkRender.appointmentDate,
          });
          setBookings(BookingListCLone);
        }
        break;
      case "status":
        if (checkRender.status) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.status?.localeCompare(b?.status)
          );
          setCheckRender({
            ...checkRender,
            status: !checkRender.status,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.status?.localeCompare(a?.status)
          );
          setCheckRender({
            ...checkRender,
            status: !checkRender.status,
          });
          setBookings(BookingListCLone);
        }
        break;
      case "patient":
        if (checkRender.patient) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.patient?.account?.name?.localeCompare(b?.patient?.account?.name)
          );
          setCheckRender({
            ...checkRender,
            patient: !checkRender.patient,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.patient?.account?.name?.localeCompare(a?.patient?.account?.name)
          );
          setCheckRender({
            ...checkRender,
            patient: !checkRender.patient,
          });
          setBookings(BookingListCLone);
        }
        break;
      case "clinic":
        if (checkRender.clinic) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.clinic?.name.localeCompare(b?.clinic?.name)
          );
          setCheckRender({
            ...checkRender,
            clinic: !checkRender.clinic,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.clinic?.name.localeCompare(a?.clinic?.name)
          );
          setCheckRender({
            ...checkRender,
            clinic: !checkRender.clinic,
          });
          setBookings(BookingListCLone);
        }
        break;
      case "time":
        if (checkRender.time) {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            a?.time?.start.localeCompare(b?.time?.start)
          );
          setCheckRender({
            ...checkRender,
            time: !checkRender.time,
          });
          setBookings(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) =>
            b?.time?.start.localeCompare(a?.time?.start)
          );
          setCheckRender({
            ...checkRender,
            time: !checkRender.time,
          });
          setBookings(BookingListCLone);
        }
        break;
    }
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
      return (
        from <= new Date(item.appointmentDate) &&
        new Date(item.appointmentDate) <= to
      );
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
      />
    </div>
  );
};

export default AdminBookingManage;
