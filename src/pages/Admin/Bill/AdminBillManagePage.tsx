import React, { useEffect, useState } from "react";
import BillTable from "./AdminBillManageTable";
import type { AdminBillManageModel } from "./AdminBillManageModel";
import { adminGetAllBill, adminSortBill } from "../../../api/Admin/AdminApi";
import type { searchDataModel } from "./BillSearchModel";
import AdminBillDetail from "./AdminBillDetail";
import type { CheckBillSortKeyModel } from "./CheckBillSortKeyModel";

const BillManage = () => {
  const [BillList, setBillList] = useState<AdminBillManageModel[]>([]);
  const [BillDetail, setBillDetail] = useState<AdminBillManageModel>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBillList, setTotalBillList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchData, setSearchData] = useState<searchDataModel>({
    patient: "",
    support: "",
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
  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };
  const handleSearchBillByCondition = (value: string, key: string) => {
    let BillListClone = BillList;

    switch (key) {
      case "patient":
        BillListClone = BillListClone.filter((item) => {
          if (item && item.patient?.name)
            return item.patient?.name.includes(value);
        });
        setBillList(BillListClone);
        break;
      case "support":
        BillListClone = BillListClone.filter((item) => {
          if (item && item.support?.name)
            return item.support?.name.includes(value);
        });
        setBillList(BillListClone);
        break;

      default:
        break;
    }
  };
  const handleSort = async (key: CheckBillSortKeyModel) => {
    const res = await adminSortBill(key, checkSort[key] ? "asc" : "desc");
    setCheckSort({ ...checkSort, [key]: !checkSort[key] });
    setBillList(res.data.result);
  };
  const handleGetBillList = async () => {
    const result = await adminGetAllBill();

    const {
      meta: { page, pageSize, totals },
    } = result.data;
    setBillList(result.data.result);
    setPageSize(pageSize);
    setTotalBillList(totals);
    setCurrentPage(page);
    setSearchData({
      patient: "",
      support: "",
    });
  };
  useEffect(() => {
    handleGetBillList();
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
