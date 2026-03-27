import React, { useEffect, useState } from "react";
import {
  adminGetAllBooking,
  adminSearchBooking,
  adminSortBooking,
} from "../../../api/Admin/AdminApi";
import AdminBookingTable from "./AdminBookingTable";
import AdminBookingDetail from "./AdminBookingDetail";
import type {
  CheckRenderKey,
  dataToQueryAdminModel,
} from "./CheckRenderKeyModel";

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
  const [totalBookingList, setTotalBookingList] = useState<number>(10);
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
  const [dataToQuery, setDataToQuery] = useState<dataToQueryAdminModel>({
    accountName: "",
    date: "",
    phoneNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [BookingDetail, setBookingDetail] = useState<AdminBookingTableModel>(
    {}
  );
  const handleAdminGetAllBookings = async () => {
    const result = await adminGetAllBooking(currentPage, pageSize);
    if (!result.error) {
      const {
        meta: { page, pageSize, totals },
      } = result.data;
      setBookings(result.data.result);
      setPageSize(pageSize);
      setTotalBookingList(totals);
      setCurrentPage(page);
      setDataToQuery({
        accountName: "",
        date: "",
        phoneNumber: "",
      });
    }
  };
  const handleSetDataToQuery = (value: string, key: string) => {
    setDataToQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const buildQuery = (data: dataToQueryAdminModel) => {
    let query = "";

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof dataToQueryAdminModel;
      const value = data[typedKey];

      if (value !== undefined && value !== "") {
        query += `&${typedKey}=${encodeURIComponent(String(value))}`;
      }
    });

    return query;
  };
  //handle search
  const handleSearchBooking = async (value: string, key: string) => {
    const nextData = { ...dataToQuery, [key]: value };
    setDataToQuery({ ...dataToQuery, [key]: value });
    const queryString = buildQuery(nextData);
    const res = await adminSearchBooking(queryString);
    setBookings(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalBookingList(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };
  //onLog
  const onLog = async (page: number, pageSize: number) => {
    if (
      dataToQuery.accountName ||
      dataToQuery.phoneNumber ||
      dataToQuery.date
    ) {
      const nextData = { ...dataToQuery, page: page, size: pageSize };
      const queryString = buildQuery(nextData);
      const res = await adminSearchBooking(queryString, page, pageSize);
      setBookings(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBookingList(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    } else {
      const res = await adminGetAllBooking(page, pageSize);
      setBookings(res.data.result);
      const { meta } = res.data;
      setPageSize(meta.pageSize);
      setTotalBookingList(meta.totals);
      setCurrentPage(meta.page);
    }
  };
  //handle sort
  const handleSort = async (key: CheckRenderKey) => {
    const res = await adminSortBooking(
      key,
      checkRender[key] ? "asc" : "desc",
      currentPage,
      pageSize
    );
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setBookings(res.data.result);
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
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        setBookingDetail={setBookingDetail}
        setIsModalOpen={setIsModalOpen}
        handleSetDataToQuery={handleSetDataToQuery}
        dataToQuery={dataToQuery}
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
