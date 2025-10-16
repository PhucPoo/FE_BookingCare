import React, { useEffect, useState } from "react";
import BillTable from "./AdminBillManageTable";
import type { AdminBillManageModel } from "./AdminBillManageModel";
import {
  adminGetAllBill,
  adminSearchBill,
  adminSortBill,
} from "../../../api/Admin/AdminApi";
import type { searchDataModel, ServicesModel } from "./BillSearchModel";
import AdminBillDetail from "./AdminBillDetail";
import type { CheckBillSortKeyModel } from "./CheckBillSortKeyModel";
import { getAllService } from "../../../api/Services/ServiceApi";
import { formatMonthYear } from "../../../utils/constant";

const BillManage = () => {
  const [BillList, setBillList] = useState<AdminBillManageModel[]>([]);
  const [BillDetail, setBillDetail] = useState<AdminBillManageModel>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState<number>(3);
  const [totalBillList, setTotalBillList] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [services, setServices] = useState<ServicesModel[]>([]);
  const [searchData, setSearchData] = useState<searchDataModel>({
    accountName: "",
    support: "",
    monthYear: "",
    serviceId: "",
  });
  const [checkSort, setCheckSort] = useState<
    Record<CheckBillSortKeyModel, boolean>
  >({
    createAt: false,
    patient: false,
    support: false,
    totalBill: false,
    status: false,
    id: false,
  });
  const onLog = async (page: number, pageSize: number) => {
    if (
      searchData.accountName ||
      searchData.support ||
      searchData.monthYear ||
      searchData.serviceId
    ) {
      const nextData = { ...searchData, page: page, size: pageSize };
      const queryString = buildQuery(nextData);
      const res = await adminSearchBill(queryString, currentPage, pageSize);
      setBillList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBillList(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    } else {
      const res = await adminGetAllBill(page, pageSize);
      setBillList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBillList(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };

  const handleSearchBillByCondition = async (value: string, key: string) => {
    const nextData = { ...searchData, [key]: value };
    if (key === "monthDate") {
      value = formatMonthYear(value);
    }
    setSearchData({ ...searchData, [key]: value });
    const queryString = buildQuery(nextData);
    const res = await adminSearchBill(queryString, currentPage, pageSize);
    setBillList(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalBillList(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };
  const buildQuery = (data: searchDataModel) => {
    let query = "";

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof searchDataModel;
      const value = data[typedKey];

      if (value !== undefined && value !== "") {
        query += `&${typedKey}=${encodeURIComponent(String(value))}`;
      }
    });

    return query;
  };
  const handleSort = async (key: CheckBillSortKeyModel) => {
    const res = await adminSortBill(key, checkSort[key] ? "asc" : "desc");
    setCheckSort({ ...checkSort, [key]: !checkSort[key] });
    setBillList(res.data.result);
  };
  const handleGetService = async () => {
    const res = await getAllService(1, 5);
    const data: any[] = [];
    res.data.result.map((item: ServicesModel) => {
      data.push({ value: item.id, label: item.name });
    });
    setServices(data);
  };
  const handleGetBillList = async () => {
    const result = await adminGetAllBill(1, 3);
    const {
      meta: { page, pageSize, totals },
    } = result.data;
    setBillList(result.data.result);
    setPageSize(pageSize);
    setTotalBillList(totals);
    setCurrentPage(page);
    setSearchData({
      accountName: "",
      support: "",
      monthYear: "",
      serviceId: "",
    });
  };
  useEffect(() => {
    handleGetBillList();
    handleGetService();
  }, []);
  return (
    <>
      <div className="p-5 bg-white mx-5">
        <BillTable
          BillList={BillList}
          pageSize={pageSize}
          currentPage={currentPage}
          totalBillList={totalBillList}
          onLog={onLog}
          handleSort={handleSort}
          handleSearchBillByCondition={handleSearchBillByCondition}
          handleGetBillList={handleGetBillList}
          searchData={searchData}
          setSearchData={setSearchData}
          setBillDetail={setBillDetail}
          setIsModalOpen={setIsModalOpen}
          services={services}
        />
        <AdminBillDetail
          BillDetail={BillDetail}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default BillManage;
