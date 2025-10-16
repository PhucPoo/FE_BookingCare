import { Button, Pagination } from "antd/lib";
import { formatDate } from "../../../utils/constant";
import type {
  CheckRenderKey,
  dataToQueryAdminModel,
} from "./CheckRenderKeyModel";

type AdminBookingTableModel = {
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
};
type Props = {
  AdminBookingList: AdminBookingTableModel[];
  pageSize: number;
  currentPage: number;
  totalBookingList: number;
  handleAdminGetAllBookings: () => void;
  onLog: (page: number, pageSize: number) => void;
  handleSort: (value: CheckRenderKey) => void;
  handleSearchBooking: (searchValue: string, searchKey: string) => void;
  setBookingDetail: (value: AdminBookingTableModel) => void;
  setIsModalOpen: (value: boolean) => void;
  dataToQuery: dataToQueryAdminModel;
  handleSetDataToQuery: (value: string, key: string) => void;
};
const AdminBookingTable = ({
  onLog,
  handleSort,
  handleSearchBooking,
  AdminBookingList,
  pageSize,
  currentPage,
  totalBookingList,
  handleAdminGetAllBookings,
  setBookingDetail,
  setIsModalOpen,
  dataToQuery,
  handleSetDataToQuery,
}: Props) => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-xl sm:text-xl font-bold text-gray-900 mb-2">
            Danh sách lịch khám được quản lí bởi quản trị viên
          </h1>
        </div>
      </div>

      {/* table search feature */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          {/* patient */}
          <div className="w-full lg:w-auto">
            <input
              type="text"
              placeholder="Bệnh nhân..."
              value={dataToQuery.accountName}
              onChange={(e) => {
                handleSetDataToQuery(e.target.value, "accountName");
                setTimeout(() => {
                  handleSearchBooking(e.target.value, "accountName");
                }, 500);
              }}
              className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* phoneNumber */}
          <div className="w-full lg:w-auto">
            <input
              type="text"
              placeholder="Số điện thoại..."
              value={dataToQuery.phoneNumber}
              onChange={(e) => {
                handleSetDataToQuery(e.target.value, "phoneNumber");
                setTimeout(() => {
                  handleSearchBooking(e.target.value, "phoneNumber");
                }, 500);
              }}
              className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* date */}
          <div className="w-full lg:w-auto">
            <input
              type="date"
              onChange={(e) => {
                handleSetDataToQuery(e.target.value, "date");
                setTimeout(() => {
                  handleSearchBooking(e.target.value, "date");
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
                handleAdminGetAllBookings();
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
                  Id
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
                  Nơi khám
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
              {AdminBookingList &&
                AdminBookingList.length > 0 &&
                AdminBookingList.map((item) => {
                  return (
                    <tr
                      className="hover:bg-gray-50 transition-colors duration-150"
                      key={item.id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                        {formatDate(item.appointmentDate)}
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
                        {`${item.time?.start}-${item.time?.end}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            onClick={() => {
                              setBookingDetail(item);
                              setIsModalOpen(true);
                            }}
                          >
                            Chi tiết
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
          của <span className="font-semibold">{totalBookingList}</span> kết quả
        </div>
        <div className="flex items-center space-x-1">
          <Pagination
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalBookingList}
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

export default AdminBookingTable;
