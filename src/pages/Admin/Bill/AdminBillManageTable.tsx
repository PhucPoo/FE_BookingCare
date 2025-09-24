import { Button, Pagination } from "antd/lib";

import type { AdminBillManageModel } from "./AdminBillManageModel";
import { formatDate } from "../../../utils/constant";
import type { searchDataModel } from "./BillSearchModel";
import type { CheckBillSortKeyModel } from "./CheckBillSortKeyModel";

type Props = {
  BillList: AdminBillManageModel[];
  pageSize: number;
  currentPage: number;
  totalBillList: number;
  onLog: (page: number, pageSize: number) => void;
  handleSearchBillByCondition: (value: string, key: string) => void;
  handleSort: (value: CheckBillSortKeyModel) => void;
  handleGetBillList: () => void;
  searchData: searchDataModel;
  setSearchData: (value: searchDataModel) => void;
  setBillDetail: (value: AdminBillManageModel) => void;
  setIsModalOpen: (value: boolean) => void;
};

const BillTable = ({
  BillList,
  currentPage,
  pageSize,
  totalBillList,
  handleSort,
  handleSearchBillByCondition,
  onLog,
  handleGetBillList,
  searchData,
  setSearchData,
  setBillDetail,
  setIsModalOpen,
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
                placeholder="Tên bệnh nhân"
                defaultValue={searchData.patient}
                onChange={(e) => {
                  setTimeout(() => {
                    setSearchData({ ...searchData, patient: e.target.value });
                    handleSearchBillByCondition(e.target.value, "patient");
                  }, 500);
                }}
                className="w-full sm:w-15 md:w-25 lg:w-50  not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Tên nhân viên hỗ trợ"
                defaultValue={searchData.support}
                onChange={(e) => {
                  setTimeout(() => {
                    setSearchData({ ...searchData, support: e.target.value });
                    handleSearchBillByCondition(e.target.value, "support");
                  }, 500);
                }}
                className="w-full sm:w-15 md:w-25 lg:w-50  not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="w-full sm:w-auto">
              <Button
                size="large"
                type="primary"
                onClick={() => handleGetBillList()}
              >
                Làm mới
              </Button>
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
                      handleSort("id");
                    }}
                  >
                    Id
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      handleSort("patient");
                    }}
                  >
                    Tên bệnh nhân
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      handleSort("support");
                    }}
                  >
                    người lập đơn
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      handleSort("status");
                    }}
                  >
                    Trạng thái
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      handleSort("totalBill");
                    }}
                  >
                    Tổng giá
                  </th>

                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      handleSort("createAt");
                    }}
                  >
                    Ngày tạo
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
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.patient?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.support?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.totalBill}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {formatDate(item.createAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-center space-x-5">
                            <Button
                              type="primary"
                              onClick={() => {
                                setBillDetail(item);
                                setIsModalOpen(true);
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
