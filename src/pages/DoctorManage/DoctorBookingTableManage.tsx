import {
  Button,
  Dropdown,
  message,
  Pagination,
  Popconfirm,
  Select,
  type MenuProps,
  type PopconfirmProps,
} from "antd/lib";
import { formatDate } from "../../utils/constant";

type Props = {
  BookingList: {
    id?: number;
    appointmentDate?: string;
    description?: string;
    status?: string;
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
    createAt?: string;
  }[];

  pageSize: number;
  currentPage: number;
  totalBillList: number;
  onLog: (page: number, pageSize: number) => void;
  handleSort: () => void;
  handleChange: (value: string) => void;
  handleFindByDate: () => void;
  handleSearchBooking: (value: string, key: string) => void;
  setFilterCreatedAt: (value: { from: string; to: string }) => void;
  filterCreatedAt: { from: string; to: string };
  handleGetBookingList: () => void;
  showModal: () => void;
};

const BookingTableManage = ({
  BookingList,

  pageSize,
  currentPage,
  totalBillList,
  onLog,
  // handleSort,
  handleChange,
  handleFindByDate,
  handleSearchBooking,
  setFilterCreatedAt,
  filterCreatedAt,
  handleGetBookingList,
  showModal,
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
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Danh sách lịch khám
          </h1>
          <p className="text-gray-600">Danh sách lịch khám hiện có</p>
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
          {/* phone */}
          <div className="w-full lg:w-auto">
            <input
              type="number"
              placeholder="Tìm theo số điện thoại..."
              onChange={(e) => {
                setTimeout(() => {
                  handleSearchBooking(e.target.value, "phone");
                }, 500);
              }}
              className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              placeholder="Phòng khám"
              size="large"
              options={[
                { value: 1, label: "aaa" },
                { value: 2, label: "bbb" },
              ]}
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
                {/* {columns &&
                  columns.length > 0 &&
                  columns.map((item) => {
                    return (
                      <th
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                        key={item.value}
                        onClick={() => {
                          if (item.value === 7) {
                            handleSort();
                          }
                        }}
                      >
                        {item.label}
                      </th>
                    );
                  })} */}
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Ngày khám
                </th>

                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Bác sĩ
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Bệnh nhân
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Bệnh viện
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
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
                              // handleUpdateService(item);
                            }}
                          >
                            Chi tiết
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => {
                              // handleUpdateService(item);
                            }}
                          >
                            <Popconfirm
                              title={"Xác nhận khám"}
                              onConfirm={confirm}
                              onCancel={cancel}
                              okText="Xác nhận"
                              cancelText="huỷ"
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
