import {
  Button,
  Dropdown,
  Pagination,
  Popconfirm,
  Select,
  type MenuProps,
} from "antd/lib";
import { formatDate } from "../../utils/constant";
import { handleDoctorUpdateBooking } from "../../api/Doctor/DoctorApi";
import type { DoctorBookingSortKeyModel } from "./DoctorBookingSortKeyModel";
type BookingListModel = {
  id?: number;
  appointmentDate?: string;
  description?: string;
  status?: string;
  createAt?: string;
  doctor?: {
    id?: number;
    account?: {
      id?: number;
      name?: string;
    };
  };

  patient?: {
    id?: number;
    account?: {
      id?: number;
      name?: string;
    };
  };
  time?: {
    id?: number;
    start?: string;
    end?: string;
  };
  clinic?: {
    id?: number;
    name?: string;
  };
};
type Props = {
  BookingList: BookingListModel[];
  pageSize: number;
  currentPage: number;
  totalBillList: number;
  onLog: (page: number, pageSize: number) => void;
  handleSort: (value: DoctorBookingSortKeyModel) => void;
  handleChange: (value: string) => void;
  handleFindByDate: () => void;
  handleSearchBooking: (value: string, key: string) => void;
  setFilterCreatedAt: (value: { from: string; to: string }) => void;
  filterCreatedAt: { from: string; to: string };
  handleGetBookingList: () => void;
  showModal: () => void;
  setDetailDoctorBooking: (data: BookingListModel) => void;
  setIsDoctorDetailModalOpen: (value: boolean) => void;
  handleSearchByClinic: (value: string) => void;
};

const BookingTableManage = ({
  BookingList,

  pageSize,
  currentPage,
  totalBillList,
  onLog,
  handleSort,
  handleChange,
  handleFindByDate,
  handleSearchBooking,
  setFilterCreatedAt,
  filterCreatedAt,
  handleGetBookingList,
  showModal,
  setDetailDoctorBooking,
  setIsDoctorDetailModalOpen,
  handleSearchByClinic,
}: Props) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <input
            type="date"
            onChange={(e) => {
              setTimeout(() => {
                setFilterCreatedAt({
                  ...filterCreatedAt,
                  from: e.target.value,
                });
              }, 500);
            }}
            className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <input
            type="date"
            onChange={(e) => {
              setTimeout(() => {
                setFilterCreatedAt({
                  ...filterCreatedAt,
                  to: e.target.value,
                });
              }, 500);
            }}
            className="w-full lg:w-45  not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div>
          <Button
            size="large"
            onClick={() => handleFindByDate()}
            type="primary"
          >
            Xác nhận
          </Button>
        </div>
      ),
      key: "3",
    },
  ];
  const handleUpdateBooking = async (id: string, status: string) => {
    console.log("🚀 ~ handleUpdateBooking ~ status:", status);
    console.log("🚀 ~ handleUpdateBooking ~ id:", typeof id);

    handleDoctorUpdateBooking(id, status);
    handleGetBookingList();
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Danh sách lịch khám
          </h1>
          <p className="text-gray-600">Danh sách lịch khám bởi bác sĩ</p>
        </div>

        <div className="mb-6">
          <Button
            size="large"
            onClick={() => {
              showModal();
            }}
          >
            Đăng kí lịch khám
          </Button>
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
              onChange={(e) => {
                setTimeout(() => {
                  handleSearchBooking(e.target.value, "patient");
                }, 500);
              }}
              className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* createdAt */}
          <div className="w-full lg:w-auto">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className="w-full lg:w-auto"
            >
              <Button size="large">Tìm theo ngày</Button>
            </Dropdown>
          </div>
          {/* status */}
          <div className="w-full lg:w-auto">
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              size="large"
              placeholder="Trạng thái"
              options={[
                { value: "Done", label: "Done" },
                { value: "Pending", label: "Pending" },
              ]}
            />
          </div>
          {/* clinic */}
          <div className="w-full lg:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm theo nơi khám..."
              onChange={(e) => {
                setTimeout(() => {
                  handleSearchByClinic(e.target.value);
                }, 500);
              }}
              className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <th
                  className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort("doctor");
                  }}
                >
                  Bác sĩ
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
                    handleSort("clinic");
                  }}
                >
                  Bệnh viện
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
                        {item.appointmentDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {formatDate(item?.createAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.doctor?.account?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.patient?.account?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item?.clinic?.name && item?.clinic?.name?.length > 20
                          ? item.clinic?.name?.slice(0, 20) + "..."
                          : item.clinic?.name}
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
                          <Button type="primary">
                            <Popconfirm
                              title={"Xác nhận khám"}
                              onConfirm={() => {
                                if (item && item.id) {
                                  handleUpdateBooking(
                                    `${item.id}`,
                                    "CONFIRMED"
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
            responsive
          />
        </div>
      </div>
    </div>
  );
};

export default BookingTableManage;
