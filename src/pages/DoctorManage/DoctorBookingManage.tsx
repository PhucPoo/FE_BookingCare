import { useEffect, useState } from "react";
import BookingTableManage from "./DoctorBookingTableManage";
import ModalRegisterTime from "./DoctorModalRegisterTime";
import {
  doctorSortBooking,
  getBookingsByDoctorId,
} from "../../api/Doctor/DoctorApi";
import DoctorBookingDetail from "./DoctorBookingDetail";
import type { DoctorBookingSortKeyModel } from "./DoctorBookingSortKeyModel";

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
type TimeItem = {
  id: number;
  label: string;
};
const BookingManage = () => {
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
  const [timeSelected, setTimeSelected] = useState<TimeItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoctorDetailModalOpen, setIsDoctorDetailModalOpen] = useState(false);

  const [detailDoctorBooking, setDetailDoctorBooking] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [checkRender, setCheckRender] = useState<
    Record<DoctorBookingSortKeyModel, boolean>
  >({
    appointmentDate: false,
    createAt: false,
    status: false,
    doctor: false,
    patient: false,
    clinic: false,
    time: false,
  });

  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };

  // handle change option (status and clinic)
  const handleChange = (value: string) => {
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
      return from <= new Date(item.createdAt) && new Date(item.createdAt) <= to;
    });
    setBookingList(BookingListClone);
  };

  //handle sort
  const handleSort = async (key: DoctorBookingSortKeyModel) => {
    const res = await doctorSortBooking(
      "2",
      key,
      checkRender[key] ? "asc" : "desc"
    );
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setBookingList(res.data.result);
  };
  const handleSearchByClinic = (value: string) => {
    let cloneBookings = BookingList;
    cloneBookings = cloneBookings.filter((item) => {
      return item.clinic?.name?.includes(value);
    });
    setBookingList(cloneBookings);
  };
  //handle search
  const handleSearchBooking = (value: string, key: string) => {
    let BookingListClone = BookingList;
    switch (key) {
      case "patient":
        BookingListClone = BookingListClone.filter((item) => {
          if (item && item.patient?.account?.name)
            return item.patient?.account?.name.includes(value);
        });
        setBookingList(BookingListClone);
        break;
      default:
        break;
    }
  };

  // initial value
  const handleGetBookingList = async () => {
    const res = await getBookingsByDoctorId("2");

    setBookingList(res.data.result);
    const {
      meta: { page, pageSize, totals },
    } = res.data;

    setPageSize(pageSize);
    setTotalBillList(totals);
    setCurrentPage(page);
  };

  useEffect(() => {
    handleGetBookingList();
  }, []);
  return (
    <div className="p-5 bg-white mx-5">
      <BookingTableManage
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
        showModal={showModal}
        setDetailDoctorBooking={setDetailDoctorBooking}
        setIsDoctorDetailModalOpen={setIsDoctorDetailModalOpen}
        handleSearchByClinic={handleSearchByClinic}
      />
      <ModalRegisterTime
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        timeSelected={timeSelected}
        setTimeSelected={setTimeSelected}
        key={timeSelected[0]?.id || null}
      />
      <DoctorBookingDetail
        BookingDetail={detailDoctorBooking}
        isModalOpen={isDoctorDetailModalOpen}
        setIsModalOpen={setIsDoctorDetailModalOpen}
      />
    </div>
  );
};

export default BookingManage;
