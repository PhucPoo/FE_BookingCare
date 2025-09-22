import React, { useEffect, useState } from "react";
import BookingTablePage from "./SupportBookingTablePage";
import BookingData from "../../MockData/BookingData";
import { message, type PopconfirmProps } from "antd/lib";
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

  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };
  const [columns, setColumns] = useState<{ value: number; label: string }[]>(
    []
  );
  const [checkRender, setCheckRender] = useState({
    createdAt: false,
  });

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

  // handle change option (status and clinic)
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
      case "doctor":
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
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
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
        columns={columns}
        handleChange={handleChange}
        handleFindByDate={handleFindByDate}
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        setFilterCreatedAt={setFilterCreatedAt}
        filterCreatedAt={filterCreatedAt}
        handleGetBookingList={handleGetBookingList}
        confirm={confirm}
        cancel={cancel}
      />
    </div>
  );
};

export default BookingPage;
