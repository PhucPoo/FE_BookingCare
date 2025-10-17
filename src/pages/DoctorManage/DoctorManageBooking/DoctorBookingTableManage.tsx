import { Button, Pagination, Popconfirm } from "antd/lib";
import {
  formatDate,
  // formatMonthYear,
  getStatusBooking,
} from "../../../utils/constant";
import { handleDoctorUpdateBooking } from "../../../api/Doctor/DoctorApi";
import type { DoctorBookingSortKeyModel } from "./DoctorBookingSortKeyModel";
import useUserInfoStore from "../../../Zustand/configZustand";
import type { Item } from "./DoctorBookingManageModel";

type Props = {
  BookingList: Item[];
  pageSize: number;
  currentPage: number;
  totalBillList: number;
  searchInputValue: { name: ""; phoneNumber: "" };
  onLog: (page: number, pageSize: number) => void;
  handleSort: (value: DoctorBookingSortKeyModel) => void;
  // handleChange: (value: string) => void;
  handleFindByDate: () => void;
  handleSearchBooking: (value: string, key: string) => void;
  setFilterCreatedAt: (value: { from: string; to: string }) => void;
  filterCreatedAt: { from: string; to: string };
  handleGetBookingList: () => void;
  setDetailDoctorBooking: (data: Item) => void;
  setIsDoctorDetailModalOpen: (value: boolean) => void;
  handleChangeSearchInputValue: (value: string, key: string) => void;
};

const BookingTableManage = ({
  BookingList,
  pageSize,
  currentPage,
  totalBillList,
  onLog,
  handleSort,

  handleSearchBooking,

  handleGetBookingList,
  setDetailDoctorBooking,
  setIsDoctorDetailModalOpen,
  handleChangeSearchInputValue,
  searchInputValue,
}: Props) => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const handleUpdateBooking = async (id: string, status: string) => {
    await handleDoctorUpdateBooking(id, status)
      .then(() => {
        handleGetBookingList();
      })
      .catch((err) => {
        console.log("🚀 ~ handleUpdateBooking ~ err:", err);
      });
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Danh sách lịch khám
          </h1>
          <p className="text-gray-600">
            Danh sách lịch khám bởi bác sĩ {userInfo.name}
          </p>
        </div>
      </div>

      {/* table search feature */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          {/* patient */}
          <div className="w-full lg:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              value={searchInputValue.name}
              onChange={(e) => {
                handleChangeSearchInputValue(e.target.value, "name");
                setTimeout(() => {
                  handleSearchBooking(e.target.value, "name");
                }, 500);
              }}
              className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* createdAt */}
          <div className="w-full sm:w-auto flex items-center gap-3">
            <p>Tìm theo ngày khám</p>
            <input
              type="date"
              onChange={(e) => {
                handleChangeSearchInputValue(e.target.value, "date");
                setTimeout(() => {
                  handleSearchBooking(
                    e.target.value,
                    // e.target.value,
                    "date"
                  );
                }, 500);
              }}
              className="w-full sm:w-15 md:w-25 lg:w-50  not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* refresh */}
          <div className="w-full lg:w-auto">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                handleGetBookingList();
              }}
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
              {/* column header */}
              <tr>
                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("id");
                  }}
                >
                  ID
                </th>
                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("appointmentDate");
                  }}
                >
                  Ngày khám
                </th>

                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("createAt");
                  }}
                >
                  Ngày tạo
                </th>
                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("status");
                  }}
                >
                  Status
                </th>

                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Số điện thoại
                </th>
                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("patient");
                  }}
                >
                  Bệnh nhân
                </th>

                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("time");
                  }}
                >
                  Time
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center hover:bg-gray-500 hover:text-white transition-all delay-100">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {BookingList &&
                BookingList.length > 0 &&
                BookingList.map((item) => {
                  return (
                    <tr
                      className="hover:bg-gray-50 transition-colors duration-150"
                      key={item.id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {formatDate(item?.appointmentDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {formatDate(item?.createAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {getStatusBooking(item.status)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.patient?.account?.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.patient?.account?.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {`${item.time?.end}-${item.time?.start}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            onClick={() => {
                              setDetailDoctorBooking(item);
                              setIsDoctorDetailModalOpen(true);
                            }}
                          >
                            Chi tiết
                          </Button>
                          {item.status === "COMPLETED" ||
                          item.status === "CANCELLED" ||
                          item.status === "PENDING" ? (
                            <Button disabled>Thao tác</Button>
                          ) : (
                            <Button type="primary">
                              <Popconfirm
                                title={"Xác nhận khám"}
                                onConfirm={() => {
                                  if (item && item.id) {
                                    handleUpdateBooking(
                                      `${item.id}`,
                                      "COMPLETED"
                                    );
                                  }
                                }}
                                onCancel={() => {
                                  if (item && item.id) {
                                    handleUpdateBooking(
                                      `${item.id}`,
                                      "CANCELLED"
                                    );
                                  }
                                }}
                                okText="Xác nhận"
                                cancelText="Từ chối"
                              >
                                Thao tác
                              </Popconfirm>
                            </Button>
                          )}
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
          Hiển thị <span className="font-semibold">{currentPage}</span> đến{" "}
          <span className="font-semibold">{pageSize}</span>
          của <span className="font-semibold">{totalBillList}</span> kết quả
        </div>
        <div className="flex items-center space-x-1">
          <Pagination
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalBillList}
            onChange={onLog}
            pageSizeOptions={["3", "5", "10"]}
            showSizeChanger
            responsive
          />
        </div>
      </div>
    </div>
  );
};

export default BookingTableManage;
