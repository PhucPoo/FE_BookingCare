import { useEffect, useState } from "react";
import type { AdminBillManageModel } from "../../Admin/Bill/AdminBillManageModel";
import {
  getBillByClinicId,
  supportSearchBill,
  supportSortBill,
} from "../../../api/Support/SupportApi";
// import useUserInfoStore from "../../../Zustand/configZustand";
import SupportBillManageTable from "./SupportBillManageTable";
import type { CheckBillSortKeyModel } from "../../Admin/Bill/CheckBillSortKeyModel";
import SupportBIllManageDetail from "./SupportBIllManageDetail";
import SupportBillCreateNew from "./SupportBillCreateNew";

const SupportBillManagePage = () => {
  // const userInfo = useUserInfoStore((state) => state.userInfo);
  const [BillList, setBillList] = useState<AdminBillManageModel[]>([]);
  const [BillDetail, setBillDetail] = useState<AdminBillManageModel>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalBillList, setTotalBillList] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const handleGetBillList = async () => {
    const result = await getBillByClinicId(1, currentPage, pageSize);

    const { meta } = result.data;
    setBillList(result.data.result);
    setPageSize(meta.pageSize);
    setTotalBillList(meta.totals);
    setCurrentPage(meta.page);
  };
  const handleSearchBillByCondition = async (value: string, key: string) => {
    const result = await supportSearchBill(value, key);
    const {
      meta: { page, pageSize, totals },
    } = result.data;
    setBillList(result.data.result);
    setPageSize(pageSize);
    setTotalBillList(totals);
    setCurrentPage(page);
  };
  const handleSort = async (key: CheckBillSortKeyModel) => {
    const res = await supportSortBill(key, checkSort[key] ? "asc" : "desc");
    setCheckSort({ ...checkSort, [key]: !checkSort[key] });
    setBillList(res.data.result);
  };
  const onLog = async (page: number, pageSize: number) => {
    const result = await getBillByClinicId(1, page, pageSize);

    const { meta } = result.data;
    setBillList(result.data.result);
    setPageSize(meta.pageSize);
    setTotalBillList(meta.totals);
    setCurrentPage(meta.page);
  };
  useEffect(() => {
    handleGetBillList();
  }, []);

  return (
    <div className="p-5 bg-white mx-5">
      <SupportBillManageTable
        BillList={BillList}
        currentPage={currentPage}
        pageSize={pageSize}
        totalBillList={totalBillList}
        handleGetBillList={handleGetBillList}
        handleSearchBillByCondition={handleSearchBillByCondition}
        handleSort={handleSort}
        onLog={onLog}
        setBillDetail={setBillDetail}
        setIsModalOpen={setIsModalOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
      />
      <SupportBIllManageDetail
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        BillDetail={BillDetail}
      />
      <SupportBillCreateNew
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        handleGetBillList={handleGetBillList}
      />
    </div>
  );
};

export default SupportBillManagePage;
