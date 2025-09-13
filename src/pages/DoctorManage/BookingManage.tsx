import { useEffect, useState } from "react";
import BookingTableManage from "./BookingTableManage";
import BookingData from "../../MockData/BookingData";
import ModalRegisterTime from "./ModalRegisterTime";
import { testGetAccountsApi, testLoginApi } from "../../api/testApi";

type Item = {
  id: number;
  doctor_id: string;
  patient_id: string;
  time_id: number;
  clinic_id: number;
  description: string;
  status: string;
  createdAt: string;
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [columns, setColumns] = useState<{ value: number; label: string }[]>(
    []
  );

  const [checkRender, setCheckRender] = useState({
    createdAt: false,
  });

  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };

  // handle change option (status and clinic)
  const handleChange = (value: string) => {
    let BookingListClone = BookingData;
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
    let BookingListClone = BookingData;
    BookingListClone = BookingListClone.filter((item) => {
      return from <= new Date(item.createdAt) && new Date(item.createdAt) <= to;
    });
    setBookingList(BookingListClone);
  };

  //handle sort
  const handleSort = () => {
    let BookingListCLone = BookingList;
    if (checkRender.createdAt) {
      BookingListCLone = BookingListCLone.sort((a: Item, b: Item) =>
        a.createdAt.localeCompare(b.createdAt)
      );
      setCheckRender({ ...checkRender, createdAt: !checkRender.createdAt });
      setBookingList(BookingListCLone);
    } else {
      BookingListCLone = BookingListCLone.sort((a: Item, b: Item) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setCheckRender({ ...checkRender, createdAt: !checkRender.createdAt });
      setBookingList(BookingListCLone);
    }
  };

  //handle search
  const handleSearchBooking = (value: string, key: string) => {
    let BookingListClone = BookingData;
    switch (key) {
      case "phone":
        BookingListClone = BookingListClone.filter((item) => {
          return item.doctor_id.includes(value);
        });
        setBookingList(BookingListClone);
        break;

      case "patient":
        BookingListClone = BookingListClone.filter((item) => {
          return item.patient_id.includes(value);
        });
        setBookingList(BookingListClone);
        break;
      default:
        break;
    }
  };

  // initial value
  const handleGetBookingList = () => {
    const columnArr = Object.keys(BookingData[0]).map((item, index) => {
      return {
        value: index,
        label: item,
      };
    });
    setColumns(columnArr);
    setBookingList(BookingData);
    setPageSize(10);
    setTotalBillList(BookingData.length);
    setCurrentPage(1);
  };
  const handleTestLoginApi = async () => {
    // testLoginApi();
    testGetAccountsApi();
  };
  useEffect(() => {
    handleGetBookingList();
    handleTestLoginApi();
  }, []);
  return (
    <div className="p-5 bg-white mx-5">
      <BookingTableManage
        BookingList={BookingList}
        pageSize={pageSize}
        currentPage={currentPage}
        totalBillList={totalBillList}
        onLog={onLog}
        columns={columns}
        handleChange={handleChange}
        handleFindByDate={handleFindByDate}
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        setFilterCreatedAt={setFilterCreatedAt}
        filterCreatedAt={filterCreatedAt}
        handleGetBookingList={handleGetBookingList}
        showModal={showModal}
      />
      <ModalRegisterTime
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        timeSelected={timeSelected}
        setTimeSelected={setTimeSelected}
        key={timeSelected[0]?.id || null}
      />
    </div>
  );
};

export default BookingManage;
