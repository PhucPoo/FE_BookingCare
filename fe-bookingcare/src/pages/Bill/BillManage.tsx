import React, { useEffect, useState } from "react";
import BillListData from "../../MockData/BillData";
import "./BillManage.css";
import BillTable from "./BillTable";
type Item = {
  id: number;
  patient_id: string;
  email: string;
  medicalRecords_id: number;
  total_bill: number;
  support_id: string;
  status: string;
  createdAt: string;
  phoneNumber: string;
};

const BillManage = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBillList, setTotalBillList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [BillList, setBillList] = useState<Item[]>([]);
  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
  };
  // const handleSearchService = (value: string) => {
  //   let ServiceListClone = ServiceListData;
  //   ServiceListClone = ServiceListClone.filter((item) => {
  //     return item.name.includes(value);
  //   });
  //   setServiceList(ServiceListClone);
  // };
  const [checkRender, setCheckRender] = useState({
    createdAt: false,
  });
  const handleSort = () => {
    let BillListClone = BillList;
    if (checkRender.createdAt) {
      BillListClone = BillListClone.sort((a: Item, b: Item) =>
        a.createdAt.localeCompare(b.createdAt)
      );
      setCheckRender({ ...checkRender, createdAt: !checkRender.createdAt });
    } else {
      BillListClone = BillListClone.sort((a: Item, b: Item) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setCheckRender({ ...checkRender, createdAt: !checkRender.createdAt });
    }
    setBillList(BillListClone);
  };
  const handleGetBillList = () => {
    setBillList(BillListData);
  };
  useEffect(() => {
    handleGetBillList();
  }, []);
  return (
    <>
      <div className="bill-container">
        <BillTable
          BillList={BillList}
          pageSize={pageSize}
          currentPage={currentPage}
          totalBillList={totalBillList}
          onLog={onLog}
          handleSort={handleSort}
        />
      </div>
    </>
  );
};

export default BillManage;
