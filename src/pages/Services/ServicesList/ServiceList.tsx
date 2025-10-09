import React, { useEffect, useState } from "react";

import ModalAddServices from "./ModalServices/ModalAddServices.tsx";
import ModalUpdateServices from "./ModalServices/ModalUpdateServices.tsx";
import ServiceListTable from "./ServiceListTable.tsx";
import {
  getAllService,
  getSortService,
  searchService,
} from "../../../api/Services/ServiceApi.ts";
import type {
  CheckServiceSortKeyModel,
  searchServiceModel,
} from "./CheckServiceSortKeyModel.ts";
import { toast } from "react-toastify";
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
  const [dataToQuery, setDataToQuery] = useState<searchServiceModel>({
    name: "",
    min: "",
    max: "",
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

  const onLog = async (currentPage: number, pageSize: number) => {
    if (dataToQuery.name || dataToQuery.min || dataToQuery.max) {
      const nextData = {
        ...dataToQuery,
        page: currentPage,
        size: pageSize,
      };
      const queryString = buildQuery(nextData);
      const res = await searchService(queryString, currentPage, pageSize);
      setServiceList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalServiceList(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    } else {
      const res = await getAllService(currentPage, pageSize);
      setServiceList(res.data.result);
      const { meta } = res.data;
      setPageSize(meta.pageSize);
      setTotalServiceList(meta.totals);
      setCurrentPage(meta.page);
    }
  };

  const handleSort = async (key: CheckServiceSortKeyModel) => {
    const res = await getSortService(key, checkRender[key] ? "asc" : "desc");
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setServiceList(res.data.result);
  };
  const handleSetDataToQuery = async (value: string, key: string) => {
    setDataToQuery((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  const handleSearchService = async (value: string, key: string) => {
    const nextData = { ...dataToQuery, [key]: value };
    const queryString = buildQuery(nextData);
    const res = await searchService(queryString);
    setServiceList(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalServiceList(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };
  const filterService = async () => {
    const nextData = { ...dataToQuery };
    if (
      !nextData.min ||
      !nextData.max ||
      nextData.min > nextData.max ||
      +nextData.max <= 0 ||
      +nextData.min <= 0
    ) {
      toast.error("Hãy đặt điều kiện hợp lí");
    } else {
      const queryString = buildQuery(nextData);
      const res = await searchService(queryString);
      setServiceList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalServiceList(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };
  const buildQuery = (data: searchServiceModel) => {
    let query = "";

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof searchServiceModel;
      const value = data[typedKey];
      if (value !== undefined && value !== "") {
        if (typedKey === "min" || typedKey === "max") {
          query += `&cost.${typedKey}=${encodeURIComponent(String(value))}`;
        } else {
          query += `&${typedKey}=${encodeURIComponent(String(value))}`;
        }
      }
    });

    return query;
  };
  const handleGetServiceList = async () => {
    const result = await getAllService(0, 3);
    setServiceList(result.data.result);
    const {
      data: { meta },
    } = result;
    setCurrentPage(meta.page);
    setPageSize(meta.pageSize);
    setTotalServiceList(meta.totals);
    setDataToQuery({
      name: "",
      min: "",
      max: "",
    });
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
            handleGetServiceList={handleGetServiceList}
            setIsModalOpen={setIsModalOpen}
            handleSort={handleSort}
            ServiceList={ServiceList}
            handleUpdateService={handleUpdateService}
            onLog={onLog}
            dataToQuery={dataToQuery}
            handleSetDataToQuery={handleSetDataToQuery}
            filterService={filterService}
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
