import React, { useEffect, useState } from "react";

import ModalAddServices from "./ModalServices/ModalAddServices.tsx";
import ServiceListData from "../../../MockData/ServiceListData.ts";
import "./ServiceList.css";
import ModalUpdateServices from "./ModalServices/ModalUpdateServices.tsx";
import ServiceListTable from "./ServiceListTable.tsx";
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
  const [columns, setColumns] = useState<{ value: number; label: string }[]>(
    []
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalServiceList, setTotalServiceList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterData, setFilterData] = useState<{
    from: number;
    to: number;
  }>({
    from: 0,
    to: 0,
  });

  const [checkRender, setCheckRender] = useState({
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
  const handleSort = (value: number) => {
    console.log("search:", value);
    let ServiceListClone = ServiceList;
    switch (value) {
      case 0:
        if (checkRender.id) {
          ServiceListClone = ServiceListClone.sort(
            (a: Item, b: Item) => a.id - b.id
          );
          setCheckRender({ ...checkRender, id: !checkRender.id });
          setServiceList(ServiceListClone);
        } else {
          ServiceListClone = ServiceListClone.sort(
            (a: Item, b: Item) => b.id - a.id
          );
          setCheckRender({ ...checkRender, id: !checkRender.id });
          setServiceList(ServiceListClone);
        }
        break;
      case 1:
        if (checkRender.name) {
          ServiceListClone = ServiceListClone.sort((a: Item, b: Item) =>
            a.name.localeCompare(b.name)
          );
          setCheckRender({ ...checkRender, name: !checkRender.name });
          setServiceList(ServiceListClone);
        } else {
          ServiceListClone = ServiceListClone.sort((a: Item, b: Item) =>
            b.name.localeCompare(a.name)
          );
          setCheckRender({ ...checkRender, name: !checkRender.name });
          setServiceList(ServiceListClone);
        }
        break;
      case 2:
        if (checkRender.cost) {
          ServiceListClone = ServiceListClone.sort(
            (a: Item, b: Item) => a.cost - b.cost
          );
          setCheckRender({ ...checkRender, cost: !checkRender.cost });
          setServiceList(ServiceListClone);
        } else {
          ServiceListClone = ServiceListClone.sort(
            (a: Item, b: Item) => b.cost - a.cost
          );
          setCheckRender({ ...checkRender, cost: !checkRender.cost });
          setServiceList(ServiceListClone);
        }
        break;
      default:
        break;
    }
  };
  const filterService = () => {
    let ServiceListClone = ServiceListData;
    ServiceListClone = ServiceListClone.filter((item) => {
      return filterData.from <= item.cost && item.cost <= filterData.to;
    });
    setServiceList(ServiceListClone);
  };
  const handleSearchService = (value: string) => {
    let ServiceListClone = ServiceListData;
    ServiceListClone = ServiceListClone.filter((item) => {
      return item.name.includes(value);
    });
    setServiceList(ServiceListClone);
  };
  const handleGetServiceList = () => {
    const columnArr = Object.keys(ServiceListData[0]).map((item, index) => {
      return {
        value: index,
        label: item,
      };
    });
    setColumns(columnArr);
    setServiceList(ServiceListData);
    setFilterData({
      from: 0,
      to: 0,
    });
    // setTotalServiceList(ServiceListData.length);
  };
  useEffect(() => {
    handleGetServiceList();
  }, []);

  return (
    <>
      <div className="service-container">
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
            columns={columns}
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
      />
      <ModalUpdateServices
        key={DataToUpdate?.id || null}
        id={DataToUpdate?.id || null}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        DataToUpdateFromParent={DataToUpdate}
      />
    </>
  );
};

export default ServiceList;
