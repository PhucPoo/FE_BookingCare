import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Button, Typography } from "antd";
import ModalAddServices from "./ModalAddServices";
import ServiceListData from "../../../MockData/ServiceListData.ts";
import "./ServiceList.css";
interface Item {
  id: number;
  name: string;
  cost: number;
  description: string;
}
const ServiceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ServiceList, setServiceList] = useState<Item[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  useEffect(() => {
    const columnArr = Object.keys(ServiceListData[0]);
    setColumns(columnArr);
    setServiceList(ServiceListData);
  }, []);

  return (
    <>
      <div className="service-container">
        <Button
          type="primary"
          icon={<IoIosAddCircle />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Thêm
        </Button>
        <div className="mt-5">
          {ServiceList.length === 0 && (
            <Typography>Chưa có dịch vụ nào trong danh sách</Typography>
          )}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns &&
                  columns.length > 0 &&
                  columns.map((item, index) => {
                    return (
                      <th
                        scope="col"
                        className="px-6 py-3 text-center"
                        key={index}
                      >
                        {item}
                      </th>
                    );
                  })}
                <th scope="col" className="px-6 py-3  text-center">
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {ServiceList &&
                ServiceList.length > 0 &&
                ServiceList.map((item: Item) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      key={item.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        {item.id}
                      </th>
                      <td className="px-6 py-4 text-center">{item.name}</td>
                      <td className="px-6 py-4 text-center">{item.cost}</td>
                      <td className="px-6 py-4 text-center">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 flex gap-1 justify-center">
                        <Button type="primary">Chỉnh sửa</Button>
                        <Button danger>Xoá</Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddServices
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ServiceList;
