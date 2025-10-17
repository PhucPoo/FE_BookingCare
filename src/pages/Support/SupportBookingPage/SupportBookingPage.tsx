import React, { useEffect, useState } from "react";
import BookingTablePage from "./SupportBookingTablePage";

import {
  getBookingByClinicId,
  getClinicBySupportId,
  handleSupportUpdateBooking,
  supportSearchBooking,
  supportSortBooking,
} from "../../../api/Support/SupportApi";
import SupportBookingDetail from "./SupportBookingDetail";
import type { dataToQueryModel, SupportSortKey } from "./SupportSortKey";

import useUserInfoStore from "../../../Zustand/configZustand";
import { toast } from "react-toastify";
type accountModel = {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birth?: string;
};
type Item = {
  id: number;
  doctor_id: string;
  patient_id: string;
  time_id: number;
  clinic_id: number;
  description: string;
  status: string;
  createdAt: string;
  doctor?: {
    id?: number;
    account?: accountModel;
    degree?: string;
    specialtyName?: string;
  };
  appointmentDate?: string;
  patient?: {
    id?: number;
    account?: accountModel;
    bhyt?: string;
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
};
type clinicInfoModel = {
  id: string | number;
  name: string;
};
const BookingPage = () => {
  const [BookingList, setBookingList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBillList, setTotalBillList] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [clinicInfo, setClinicInfo] = useState<clinicInfoModel>();
  const [dataToQuery, setDataToQuery] = useState<dataToQueryModel>({
    patientName: "",
    doctorName: "",
    date: "",
    page: currentPage,
    size: pageSize,
  });
  const [checkRender, setCheckRender] = useState<
    Record<SupportSortKey, boolean>
  >({
    appointmentDate: false,
    createAt: false,
    status: false,
    doctor: false,
    patient: false,
    clinic: false,
    time: false,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [SupportBookingDetailData, SupportBookingDetailDataData] = useState({});

  const onLog = async (page: number, pageSize: number) => {
    if (dataToQuery.doctorName || dataToQuery.date || dataToQuery.patientName) {
      const nextData = { ...dataToQuery, page: page, size: pageSize };
      const queryString = buildQuery(nextData);
      if (clinicInfo?.id) {
        const res = await supportSearchBooking(queryString, clinicInfo?.id);
        setBookingList(res.data.result);
        setPageSize(res.data.meta.pageSize);
        setTotalBillList(res.data.meta.totals);
        setCurrentPage(res.data.meta.page);
      }
    } else {
      if (clinicInfo?.id) {
        const res = await getBookingByClinicId(clinicInfo?.id, page, pageSize);
        setBookingList(res.data.result);
        const { meta } = res.data;
        setPageSize(meta.pageSize);
        setTotalBillList(meta.totals);
        setCurrentPage(meta.page);
      }
    }
  };
  const handleGetClinicInfo = async () => {
    const res = await getClinicBySupportId(userInfo.actorId);
    setClinicInfo(res.data);
  };
  // initial value
  const handleGetBookingList = async () => {
    await handleGetClinicInfo();
    if (clinicInfo?.id) {
      const res = await getBookingByClinicId(
        clinicInfo?.id,
        currentPage,
        pageSize
      );
      setBookingList(res.data.result);
      const { meta } = res.data;
      setPageSize(meta.pageSize);
      setTotalBillList(meta.totals);
      setCurrentPage(meta.page);
      setDataToQuery({
        patientName: "",
        doctorName: "",
        date: "",
        page: 1,
        size: 5,
      });
    }
  };

  //handle sort
  const handleSort = async (key: SupportSortKey) => {
    const res = await supportSortBooking(
      key,
      checkRender[key] ? "asc" : "desc",
      pageSize,
      currentPage
    );
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setBookingList(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalBillList(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };

  const handleSetDataToQuery = (key: keyof dataToQueryModel, value: string) => {
    setDataToQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const buildQuery = (data: dataToQueryModel) => {
    let newQuery = "";
    Object.keys(data).map((item) => {
      const key = item as keyof dataToQueryModel;
      const value = data[key];
      if (value !== undefined && value !== "") {
        newQuery += `&${key}=${encodeURIComponent(String(value))}`;
      }
    });
    return newQuery;
  };
  //handle search
  const handleSearchBooking = async (value: string, key: string) => {
    const dataToBuildQuery = { ...dataToQuery, [key]: value };

    setDataToQuery({ ...dataToQuery, [key]: value });
    const newQuery = buildQuery(dataToBuildQuery);
    if (clinicInfo?.id) {
      const res = await supportSearchBooking(newQuery, clinicInfo?.id);
      setBookingList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBillList(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };

  const confirm = async (id: number, status: string) => {
    if (id && status) {
      await handleSupportUpdateBooking(id, status)
        .then(() => {
          handleGetBookingList();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.warning(`Thiếu ${id ? "id" : "status"}`);
    }
  };

  const cancel = async (id: number, status: string) => {
    if (id && status) {
      await handleSupportUpdateBooking(id, status)
        .then(() => {
          handleGetBookingList();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.warning(`Thiếu ${id ? "id" : "status"}`);
    }
  };

  useEffect(() => {
    handleGetBookingList();
  }, [clinicInfo?.id]);
  return (
    <div className="p-5 bg-white mx-5">
      <BookingTablePage
        BookingList={BookingList}
        pageSize={pageSize}
        currentPage={currentPage}
        totalBillList={totalBillList}
        onLog={onLog}
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        handleGetBookingList={handleGetBookingList}
        confirm={confirm}
        cancel={cancel}
        SupportBookingDetailDataData={SupportBookingDetailDataData}
        setIsModalOpen={setIsModalOpen}
        handleSetDataToQuery={handleSetDataToQuery}
        dataToQuery={dataToQuery}
      />
      <SupportBookingDetail
        SupportBookingDetail={SupportBookingDetailData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default BookingPage;
