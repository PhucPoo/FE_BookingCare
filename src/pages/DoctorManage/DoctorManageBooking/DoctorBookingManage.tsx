import { useEffect, useState } from "react";
import BookingTableManage from "./DoctorBookingTableManage";

import {
  doctorSearchBooking,
  doctorSortBooking,
  getBookingsByDoctorId,
} from "../../../api/Doctor/DoctorApi";
import DoctorBookingDetail from "./DoctorBookingDetail";
import type { DoctorBookingSortKeyModel } from "./DoctorBookingSortKeyModel";
import type { Item } from "./DoctorBookingManageModel";
import useUserInfoStore from "../../../Zustand/configZustand";

type dataToQueryModel = {
  name: string;
  phoneNumber: string;
  KeyToSort: string;
  date: string;
  orderBy: string;
  page: number;
  size: number;
};
type searchInputValueModel = {
  name: "";
  phoneNumber: "";
};
const BookingManage = () => {
  const [BookingList, setBookingList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBooking, setTotalBooking] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterCreatedAt, setFilterCreatedAt] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });
  const [dataToQuery, setDataToQuery] = useState<dataToQueryModel>({
    name: "",
    phoneNumber: "",
    date: "",
    KeyToSort: "",
    orderBy: "",
    page: 1,
    size: 5,
  });
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [isDoctorDetailModalOpen, setIsDoctorDetailModalOpen] = useState(false);
  const [detailDoctorBooking, setDetailDoctorBooking] = useState({});
  const [searchInputValue, setSearchInputValue] =
    useState<searchInputValueModel>({
      name: "",
      phoneNumber: "",
    });
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
    id: false,
  });

  const handleChangeSearchInputValue = (value: string, key: string) => {
    setSearchInputValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  // handle change option (status and clinic)
  // const handleChange = (value: string) => {
  //   let BookingListClone = BookingList;
  //   BookingListClone = BookingListClone.filter((item) => {
  //     return item.status === value;
  //   });
  //   setBookingList(BookingListClone);
  // };

  //search by createAt
  const handleFindByDate = () => {
    // if (!filterCreatedAt.from || !filterCreatedAt.to) {
    //   alert("missing parameter");
    //   return;
    // }
    // if (filterCreatedAt.from > filterCreatedAt.to) {
    //   alert("from must be smaller to");
    //   return;
    // }
    // const from = new Date(filterCreatedAt.from);
    // const to = new Date(filterCreatedAt.to);
    // let BookingListClone = BookingList;
    // BookingListClone = BookingListClone.filter((item) => {
    //   return from <= new Date(item.createdAt) && new Date(item.createdAt) <= to;
    // });
    // setBookingList(BookingListClone);
  };

  //handle sort
  const handleSort = async (key: DoctorBookingSortKeyModel) => {
    const res = await doctorSortBooking(
      userInfo.actorId,
      key,
      checkRender[key] ? "asc" : "desc",
      currentPage,
      pageSize
    );
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setBookingList(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalBooking(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };

  const buildQuery = (data: dataToQueryModel) => {
    let query = "";

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof dataToQueryModel;
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
    const res = await doctorSearchBooking(userInfo.actorId, queryString);
    setBookingList(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalBooking(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };

  // initial value
  const handleGetBookingList = async () => {
    const res = await getBookingsByDoctorId(userInfo.actorId);

    setBookingList(res.data.result);
    const {
      meta: { page, pageSize, totals },
    } = res.data;

    setPageSize(pageSize);
    setTotalBooking(totals);
    setCurrentPage(page);
    setSearchInputValue({
      name: "",
      phoneNumber: "",
    });
  };
  const onLog = async (page: number, pageSize: number) => {
    if (dataToQuery.name || dataToQuery.phoneNumber || dataToQuery.KeyToSort) {
      const nextData = { ...dataToQuery, page: page, size: pageSize };
      const queryString = buildQuery(nextData);
      const res = await doctorSearchBooking(userInfo.actorId, queryString);
      setBookingList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBooking(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    } else {
      const res = await getBookingsByDoctorId(userInfo.actorId, page, pageSize);
      setBookingList(res.data.result);
      const { meta } = res.data;
      setPageSize(meta.pageSize);
      setTotalBooking(meta.totals);
      setCurrentPage(meta.page);
    }
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
        totalBillList={totalBooking}
        onLog={onLog}
        // handleChange={handleChange}
        handleFindByDate={handleFindByDate}
        handleSort={handleSort}
        handleSearchBooking={handleSearchBooking}
        setFilterCreatedAt={setFilterCreatedAt}
        filterCreatedAt={filterCreatedAt}
        handleGetBookingList={handleGetBookingList}
        setDetailDoctorBooking={setDetailDoctorBooking}
        setIsDoctorDetailModalOpen={setIsDoctorDetailModalOpen}
        handleChangeSearchInputValue={handleChangeSearchInputValue}
        searchInputValue={searchInputValue}
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
