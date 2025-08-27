import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import {
  Button,
  message,
  Pagination,
  Popconfirm,
  type PopconfirmProps,
} from "antd";
import ModalAddServices from "./ModalAddServices";
import ServiceListData from "../../../MockData/ServiceListData.ts";
import "./ServiceList.css";
import ModalUpdateServices from "./ModalUpdateServices.tsx";
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
  const [columns, setColumns] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalServiceList, setTotalServiceList] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [DataToUpdate, setDataToUpdate] = useState<Item>({
    id: 0,
    name: "",
    cost: 0,
    description: "",
  });

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
    alert("Cút");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleUpdateService = (item: Item) => {
    setDataToUpdate(item);
    setIsModalUpdateOpen(true);
  };
  const onLog = (page, pageSize) => {
    console.log("Đang ở trang:", page, pageSize);
  };
  useEffect(() => {
    const columnArr = Object.keys(ServiceListData[0]);
    setColumns(columnArr);
    setServiceList(ServiceListData);
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

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Tìm kiếm dịch vụ..."
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  type="primary"
                  icon={<IoIosAddCircle />}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  size="large"
                >
                  Thêm
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns &&
                      columns.length > 0 &&
                      columns.map((item, index) => {
                        return (
                          <th
                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                            key={index}
                          >
                            {item}
                          </th>
                        );
                      })}
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Hành động
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {ServiceList &&
                    ServiceList.length > 0 &&
                    ServiceList.map((item) => {
                      return (
                        <tr
                          className="hover:bg-gray-50 transition-colors duration-150"
                          key={item.id}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                            {item.cost}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-center space-x-5">
                              <Button
                                type="primary"
                                onClick={() => {
                                  handleUpdateService(item);
                                }}
                              >
                                Chỉnh sửa
                              </Button>
                              <Button danger>
                                <Popconfirm
                                  title={"Xoá " + item.name}
                                  description="Bạn có muốn xoá không?"
                                  onConfirm={confirm}
                                  onCancel={cancel}
                                  okText="Có"
                                  cancelText="Không"
                                >
                                  Xóa
                                </Popconfirm>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
              Hiển thị <span className="font-semibold">1</span> đến{" "}
              <span className="font-semibold">5</span>
              của <span className="font-semibold">20</span> kết quả
            </div>
            <div className="flex items-center space-x-1">
              <Pagination
                defaultCurrent={currentPage}
                pageSize={pageSize}
                total={totalServiceList}
                onChange={onLog}
              />
            </div>
          </div>
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
