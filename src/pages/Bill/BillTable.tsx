import { Button, Pagination } from "antd";
import React from "react";

type Props = {
  BillList: {
    id: number;
    patient_id: string;
    email: string;
    medicalRecords_id: number;
    total_bill: number;
    support_id: string;
    status: string;
    createdAt: string;
    phoneNumber: string;
  }[];
  pageSize: number;
  currentPage: number;
  totalBillList: number;
  onLog: (page: number, pageSize: number) => void;
  handleSort: () => void;
};

const BillTable = ({
  BillList,
  currentPage,
  pageSize,
  totalBillList,
  handleSort,
  onLog,
}: Props) => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Danh sách hoá đơn
          </h1>
          <p className="text-gray-600">Quản lý thông tin hoá đơn hiện có</p>
        </div>

        {/* table search feature */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Tìm kiếm hoá đơn..."
                //   onChange={(e) => {
                // setTimeout(() => {
                //   handleSearchService(e.target.value);
                // }, 500);
                //   }}
                className="w-full sm:w-15 md:w-25 lg:w-50  not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      //   handleSort(item.value);
                    }}
                  >
                    Tên bệnh nhân
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      //   handleSort(item.value);
                    }}
                  >
                    Giá tiền
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      //   handleSort(item.value);
                    }}
                  >
                    Support
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      //   handleSort(item.value);
                    }}
                  >
                    Trạng thái
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      //   handleSort(item.value);
                    }}
                  >
                    email
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      handleSort();
                    }}
                  >
                    Ngày tạo
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      //   handleSort(item.value);
                    }}
                  >
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center hover:bg-gray-500 hover:text-white transition-all delay-100">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {BillList &&
                  BillList.length > 0 &&
                  BillList.map((item) => {
                    return (
                      <tr
                        className="hover:bg-gray-50 transition-colors duration-150"
                        key={item.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.patient_id}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.total_bill}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.support_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-center space-x-5">
                            <Button
                              type="primary"
                              onClick={() => {
                                // handleUpdateService(item);
                              }}
                            >
                              Xem chi tiết
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

        {/* pagination */}
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
              total={totalBillList}
              onChange={onLog}
              responsive
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BillTable;
