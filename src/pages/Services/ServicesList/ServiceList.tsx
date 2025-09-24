import React, { useEffect, useState } from "react";

import ModalAddServices from "./ModalServices/ModalAddServices.tsx";
import ModalUpdateServices from "./ModalServices/ModalUpdateServices.tsx";
import ServiceListTable from "./ServiceListTable.tsx";
import {
  getAllService,
  getSortService,
} from "../../../api/Services/ServiceApi.ts";
import { toast } from "react-toastify";
import type { CheckServiceSortKeyModel } from "./CheckServiceSortKeyModel.ts";
interface Item {
  id: number;
  name: string;
  cost: number;
  description: string;
}
const ServiceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [ServiceList, setServiceList] = useState<Item[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);
  const [totalServiceList, setTotalServiceList] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterData, setFilterData] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });

  const [checkRender, setCheckRender] = useState<
    Record<CheckServiceSortKeyModel, boolean>
  >({
    id: false,
    name: false,
    cost: false,
  });

  const [DataToUpdate, setDataToUpdate] = useState<Item>({
    id: 0,
    name: "",
    cost: 0,
    description: "",
  });

  const handleUpdateService = (item: Item) => {
    setDataToUpdate(item);
    setIsModalUpdateOpen(true);
  };

  const onLog = (currentPage: number, pageSize: number) => {
    console.log("Đang ở trang:", currentPage, pageSize);
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  };

  const handleSort = async (key: CheckServiceSortKeyModel) => {
    const res = await getSortService(key, checkRender[key] ? "asc" : "desc");
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setServiceList(res.data.result);
  };

  const filterService = () => {
    let ServiceListClone = ServiceList;
    if (
      filterData.from > filterData.to ||
      !filterData.from ||
      !filterData.to ||
      +filterData.from < 0 ||
      +filterData.to < 0
    ) {
      toast.error("error filter");
      return;
    }
    ServiceListClone = ServiceListClone.filter((item) => {
      return +filterData.from <= item.cost && item.cost <= +filterData.to;
    });
    setServiceList(ServiceListClone);
  };

  const handleSearchService = (value: string) => {
    let ServiceListClone = ServiceList;

    ServiceListClone = ServiceListClone.filter((item) => {
      return item.name.includes(value);
    });
    setServiceList(ServiceListClone);
  };

  const handleGetServiceList = async () => {
    const result = await getAllService();

    setServiceList(result.data.result);
    setFilterData({
      from: "",
      to: "",
    });
    setTotalServiceList(result.data.result.length);
  };

  useEffect(() => {
    handleGetServiceList();
  }, []);

  return (
    <>
      <div className="p-5 bg-white mx-5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Danh sách dịch vụ
            </h1>
            <p className="text-gray-600">Quản lý thông tin dịch vụ hiện có</p>
          </div>
          <ServiceListTable
            currentPage={currentPage}
            pageSize={pageSize}
            totalServiceList={totalServiceList}
            handleSearchService={handleSearchService}
            filterService={filterService}
            filterData={filterData}
            handleGetServiceList={handleGetServiceList}
            setFilterData={setFilterData}
            setIsModalOpen={setIsModalOpen}
            handleSort={handleSort}
            ServiceList={ServiceList}
            handleUpdateService={handleUpdateService}
            onLog={onLog}
          />
        </div>
      </div>
      <ModalAddServices
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleGetServiceList={handleGetServiceList}
      />
      <ModalUpdateServices
        key={DataToUpdate?.id || null}
        id={DataToUpdate?.id || null}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        DataToUpdateFromParent={DataToUpdate}
        handleGetServiceList={handleGetServiceList}
      />
    </>
  );
};

export default ServiceList;
