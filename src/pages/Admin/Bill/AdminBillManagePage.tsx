import React, { useEffect, useState } from "react";
import BillTable from "./AdminBillManageTable";
import type { AdminBillManageModel } from "./AdminBillManageModel";
import { adminGetAllBill } from "../../../api/Admin/AdminApi";
import type { searchDataModel } from "./BillSearchModel";
import AdminBillDetail from "./AdminbillDetail";

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
  const [checkSort, setCheckSort] = useState({
    createdAt: false,
    patient: false,
    support: false,
    totalBill: false,
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
  const handleSort = (value: string) => {
    let BillListClone = BillList;
    switch (value) {
      case "patient":
        if (checkSort.patient) {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.patient?.name && b.patient?.name) {
              setCheckSort({ ...checkSort, patient: checkSort.patient });
              return a.patient?.name?.localeCompare(b.patient?.name);
            }
            return 0;
          });
          setCheckSort({ ...checkSort, patient: !checkSort.patient });
          setBillList(BillListClone);
        } else {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.patient?.name && b.patient?.name) {
              setCheckSort({ ...checkSort, patient: checkSort.patient });
              return b.patient?.name?.localeCompare(a.patient?.name);
            }
            return 0;
          });
          setCheckSort({ ...checkSort, patient: !checkSort.patient });
          setBillList(BillListClone);
        }
        break;
      case "support":
        if (checkSort.support) {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.support?.name && b.support?.name) {
              return a.support?.name?.localeCompare(b.support?.name);
            }
            return 0;
          });
          setCheckSort({ ...checkSort, support: !checkSort.support });
          setBillList(BillListClone);
        } else {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.support?.name && b.support?.name) {
              return b.support?.name?.localeCompare(a.support?.name);
            }
            return 0;
          });
          setCheckSort({ ...checkSort, support: !checkSort.support });
          setBillList(BillListClone);
        }
        break;
      case "createAt":
        if (checkSort.createdAt) {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.createAt && b.createAt) {
              return a.createAt?.localeCompare(b.createAt);
            }
            return 0;
          });
          setCheckSort({ ...checkSort, createdAt: !checkSort.createdAt });
          setBillList(BillListClone);
        } else {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.createAt && b.createAt) {
              return b.createAt?.localeCompare(a.createAt);
            }
            return 0;
          });
          setCheckSort({ ...checkSort, createdAt: !checkSort.createdAt });
          setBillList(BillListClone);
        }
        break;
      case "totalBill":
        if (checkSort.totalBill) {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.totalBill && b.totalBill) {
              return a.totalBill - b.totalBill;
            }
            return 0;
          });
          setCheckSort({ ...checkSort, totalBill: !checkSort.totalBill });
          setBillList(BillListClone);
        } else {
          BillListClone = BillListClone.sort((a, b) => {
            if (a.totalBill && b.totalBill) {
              return b.totalBill - a.totalBill;
            }
            return 0;
          });
          setCheckSort({ ...checkSort, totalBill: !checkSort.totalBill });
          setBillList(BillListClone);
        }
        break;
      default:
        break;
    }
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
