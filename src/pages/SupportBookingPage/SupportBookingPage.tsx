import React, { useEffect, useState } from "react";
import BookingTablePage from "./SupportBookingTablePage";
import { message, type PopconfirmProps } from "antd/lib";
import { getBookingByClinicId } from "../../api/Support/SupportApi";
import SupportBookingDetail from "./SupportBookingDetail";
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

const BookingPage = () => {
  const [BookingList, setBookingList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBillList, setTotalBillList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterCreatedAt, setFilterCreatedAt] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });
  const [checkRender, setCheckRender] = useState({
    appointmentDate: false,
    createdAt: false,
    status: false,
    doctor: false,
    patient: false,
    clinic: false,
    time: false,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [SupportBookingDetailData, SupportBookingDetailDataData] = useState({});
  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };

  // initial value
  const handleGetBookingList = async () => {
    const res = await getBookingByClinicId(1);
    setBookingList(res.data.result);
    const {
      meta: { page, pageSize, totals },
    } = res.data;

    setPageSize(pageSize);
    setTotalBillList(totals);
    setCurrentPage(page);
  };

  // handle change option (status and clinic)
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    let BookingListClone = BookingList;
    BookingListClone = BookingListClone.filter((item) => {
      return item.status === value;
    });
    setBookingList(BookingListClone);
  };

  //search by createAt
  const handleFindByDate = () => {
    if (!filterCreatedAt.from || !filterCreatedAt.to) {
      alert("missing parameter");
      return;
    }
    if (filterCreatedAt.from > filterCreatedAt.to) {
      alert("from must be smaller to");
      return;
    }
    const from = new Date(filterCreatedAt.from);
    const to = new Date(filterCreatedAt.to);
    let BookingListClone = BookingList;
    BookingListClone = BookingListClone.filter((item) => {
      if (item?.appointmentDate) {
        const date = new Date(item?.appointmentDate);
        return from <= new Date(date) && new Date(date) <= to;
      }
    });
    setBookingList(BookingListClone);
  };

  //handle sort
  const handleSort = (key: string) => {
    let BookingListCLone = BookingList;
    switch (key) {
      case "createdAt":
        if (checkRender.createdAt) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return a?.createdAt?.localeCompare(b?.createdAt);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            createdAt: !checkRender.createdAt,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return b?.createdAt?.localeCompare(a?.createdAt);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            createdAt: !checkRender.createdAt,
          });
          setBookingList(BookingListCLone);
        }
        break;
      case "doctor":
        if (checkRender.doctor) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.doctor?.account?.name && b.doctor?.account?.name) {
              return a?.doctor?.account?.name?.localeCompare(
                b?.doctor?.account?.name
              );
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            doctor: !checkRender.doctor,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.doctor?.account?.name && b.doctor?.account?.name) {
              return b?.doctor?.account?.name?.localeCompare(
                a?.doctor?.account?.name
              );
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            doctor: !checkRender.doctor,
          });
          setBookingList(BookingListCLone);
        }
        break;
      case "appointmentDate":
        if (checkRender.appointmentDate) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.appointmentDate && b.appointmentDate) {
              return a?.appointmentDate?.localeCompare(b?.appointmentDate);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            appointmentDate: !checkRender.appointmentDate,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.appointmentDate && b.appointmentDate) {
              return b?.appointmentDate?.localeCompare(a?.appointmentDate);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            appointmentDate: !checkRender.appointmentDate,
          });
          setBookingList(BookingListCLone);
        }
        break;
      case "status":
        if (checkRender.status) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.status && b.status) {
              return a?.status?.localeCompare(b?.status);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            status: !checkRender.status,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.status && b.status) {
              return b?.status?.localeCompare(a?.status);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            status: !checkRender.status,
          });
          setBookingList(BookingListCLone);
        }
        break;
      case "patient":
        if (checkRender.patient) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.patient?.account?.name && b.patient?.account?.name) {
              return a?.patient?.account?.name?.localeCompare(
                b?.patient?.account?.name
              );
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            patient: !checkRender.patient,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.patient?.account?.name && b.patient?.account?.name) {
              return b?.patient?.account?.name?.localeCompare(
                a?.patient?.account?.name
              );
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            patient: !checkRender.patient,
          });
          setBookingList(BookingListCLone);
        }
        break;
      case "clinic":
        if (checkRender.clinic) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.clinic?.name && b.clinic?.name) {
              return a?.clinic?.name?.localeCompare(b?.clinic?.name);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            clinic: !checkRender.clinic,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.clinic?.name && b.clinic?.name) {
              return b?.clinic?.name?.localeCompare(a?.clinic?.name);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            clinic: !checkRender.clinic,
          });
          setBookingList(BookingListCLone);
        }
        break;
      case "time":
        if (checkRender.time) {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.time?.start && b.time?.start) {
              return a?.time?.start?.localeCompare(b?.time?.start);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            time: !checkRender.time,
          });
          setBookingList(BookingListCLone);
        } else {
          BookingListCLone = BookingListCLone.sort((a, b) => {
            if (a.time?.start && b.time?.start) {
              return b?.time?.start?.localeCompare(a?.time?.start);
            }
            return 0;
          });
          setCheckRender({
            ...checkRender,
            time: !checkRender.time,
          });
          setBookingList(BookingListCLone);
        }
        break;
    }
  };

  //handle search
  const handleSearchBooking = (value: string, key: string) => {
    let BookingListClone = BookingList;
    switch (key) {
      case "doctor":
        BookingListClone = BookingListClone.filter((item) => {
          if (item && item.doctor?.account?.name) {
            return item.doctor?.account?.name.includes(value);
          }
        });
        setBookingList(BookingListClone);
        break;

      case "patient":
        BookingListClone = BookingListClone.filter((item) => {
          if (item && item.patient?.account?.name) {
            return item.patient?.account?.name.includes(value);
          }
        });
        setBookingList(BookingListClone);
        break;
      default:
        break;
    }
  };
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const handleSearchByClinic = (value: string) => {
    let cloneBookings = BookingList;
    cloneBookings = cloneBookings.filter((item) => {
      return item.clinic?.name?.includes(value);
    });
    setBookingList(cloneBookings);
  };
  useEffect(() => {
    handleGetBookingList();
  }, []);
  return (
    <div className="p-5 bg-white mx-5">
      <BookingTablePage
        BookingList={BookingList}
        pageSize={pageSize}
        currentPage={currentPage}
        totalBillList={totalBillList}
        onLog={onLog}
        handleChange={handleChange}
        handleFindByDate={handleFindByDate}
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        setFilterCreatedAt={setFilterCreatedAt}
        filterCreatedAt={filterCreatedAt}
        handleGetBookingList={handleGetBookingList}
        confirm={confirm}
        cancel={cancel}
        SupportBookingDetailDataData={SupportBookingDetailDataData}
        setIsModalOpen={setIsModalOpen}
        handleSearchByClinic={handleSearchByClinic}
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
