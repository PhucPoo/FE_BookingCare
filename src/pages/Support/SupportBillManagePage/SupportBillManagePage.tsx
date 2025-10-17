import { useEffect, useState } from "react";
import type { AdminBillManageModel } from "../../Admin/Bill/AdminBillManageModel";
import {
  getBillByClinicId,
  getClinicBySupportId,
  supportSearchBill,
} from "../../../api/Support/SupportApi";
import SupportBillManageTable from "./SupportBillManageTable";
import type { CheckBillSortKeyModel } from "../../Admin/Bill/CheckBillSortKeyModel";
import SupportBIllManageDetail from "./SupportBIllManageDetail";
import SupportBillCreateNew from "./SupportBillCreateNew";
import type { searchBillModel } from "./searchBillModel";
import useUserInfoStore from "../../../Zustand/configZustand";
type clinicInfoModel = {
  id: string | number;
  name: string;
};
const SupportBillManagePage = () => {
  const [BillList, setBillList] = useState<AdminBillManageModel[]>([]);
  const [BillDetail, setBillDetail] = useState<AdminBillManageModel>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(3);
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
  const [checkSearchCondition, setCheckSearchCondition] =
    useState<searchBillModel>({
      phoneNumber: "",
      cccd: "",
      email: "",
      page: currentPage,
      size: pageSize,
      sort: "",
    });
  const [clinicInfo, setClinicInfo] = useState<clinicInfoModel>();
  const handleSetCheckSearchCondition = (
    key: keyof searchBillModel,
    value: string
  ) => {
    setCheckSearchCondition((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const userInfo = useUserInfoStore((state) => state.userInfo);
  const handleGetClinicInfo = async () => {
    const res = await getClinicBySupportId(userInfo.actorId);
    setClinicInfo(res.data);
  };
  const handleGetBillList = async () => {
    await handleGetClinicInfo();
    if (clinicInfo?.id) {
      const result = await getBillByClinicId(
        clinicInfo?.id,
        currentPage,
        pageSize
      );
      const { meta } = result.data;
      setBillList(result.data.result);
      setPageSize(meta.pageSize);
      setTotalBillList(meta.totals);
      setCurrentPage(meta.page);
      setCheckSearchCondition({
        cccd: "",
        email: "",
        phoneNumber: "",
        page: 1,
        size: 3,
        sort: "",
      });
    }
  };
  const handleSearchBillByCondition = async (value: string, key: string) => {
    const dataToBuildQuery = { ...checkSearchCondition, [key]: value };
    setCheckSearchCondition({ ...checkSearchCondition, [key]: value });
    const newQuery = buildQuery(dataToBuildQuery);
    if (clinicInfo?.id) {
      const result = await supportSearchBill(newQuery, clinicInfo?.id);
      const {
        meta: { page, pageSize, totals },
      } = result.data;
      setBillList(result.data.result);
      setPageSize(pageSize);
      setTotalBillList(totals);
      setCurrentPage(page);
    }
  };
  const buildQuery = (data: searchBillModel) => {
    let newQuery = "";
    Object.keys(data).map((item) => {
      const key = item as keyof searchBillModel;
      const value = data[key];
      if (value !== undefined && value !== "") {
        newQuery += `&${key}=${encodeURIComponent(String(value))}`;
      }
    });
    return newQuery;
  };
  const handleSort = async (key: CheckBillSortKeyModel) => {
    const dataToBuildQuery = {
      ...checkSearchCondition,
      ["sort"]: `${key},${checkSort[key] ? "asc" : "desc"}`,
    };
    setCheckSearchCondition({
      ...checkSearchCondition,
      ["sort"]: `${key},${checkSort[key] ? "asc" : "desc"}`,
    });
    const newQuery = buildQuery(dataToBuildQuery);

    if (clinicInfo?.id) {
      const res = await supportSearchBill(newQuery, clinicInfo?.id);
      setCheckSort({ ...checkSort, [key]: !checkSort[key] });
      const { meta } = res.data;
      setBillList(res.data.result);
      setPageSize(meta.pageSize);
      setTotalBillList(meta.totals);
      setCurrentPage(meta.page);
    }
  };
  const onLog = async (page: number, pageSize: number) => {
    if (
      checkSearchCondition.cccd ||
      checkSearchCondition.email ||
      checkSearchCondition.phoneNumber
    ) {
      const nextData = { ...checkSearchCondition, page: page, size: pageSize };
      const queryString = buildQuery(nextData);
      if (clinicInfo?.id) {
        const res = await supportSearchBill(queryString, clinicInfo?.id);
        setBillList(res.data.result);
        setPageSize(res.data.meta.pageSize);
        setTotalBillList(res.data.meta.totals);
        setCurrentPage(res.data.meta.page);
      }
    } else {
      if (clinicInfo?.id) {
        const result = await getBillByClinicId(clinicInfo?.id, page, pageSize);
        const { meta } = result.data;
        setBillList(result.data.result);
        setPageSize(meta.pageSize);
        setTotalBillList(meta.totals);
        setCurrentPage(meta.page);
      }
    }
  };
  useEffect(() => {
    handleGetBillList();
  }, [clinicInfo?.id]);

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
        checkSearchCondition={checkSearchCondition}
        handleSetCheckSearchCondition={handleSetCheckSearchCondition}
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
