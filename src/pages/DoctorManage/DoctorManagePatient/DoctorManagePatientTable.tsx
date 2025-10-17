import { Button, Pagination } from "antd/lib";
import type { DoctorManagePatientModel } from "./DoctorManagePatientModel";
import type { DoctorManagePatientSortKeyModel } from "./DoctorManagePatientSortKey";
import { formatDate } from "../../../utils/constant";
import useUserInfoStore from "../../../Zustand/configZustand";

type DataToQuery = {
  phoneNumber: string;
  name: string;
};
type Props = {
  ListPatient: DoctorManagePatientModel[];
  pageSize: number;
  currentPage: number;
  totalListPatient: number;
  searchValue: DataToQuery;
  setSearchValue: (key: keyof DataToQuery, value: string) => void;
  onLog: (page: number, pageSize: number) => void;
  handleSort: (value: DoctorManagePatientSortKeyModel) => void;
  handleSearch: (value: string, key: string) => void;
  handleGetPatientByDoctorId: () => void;
  setIsModalOpen: (value: boolean) => void;
  setMedicalRecordSelected: (value: DoctorManagePatientModel) => void;
};

const DoctorManagePatientTable = ({
  ListPatient,
  currentPage,
  pageSize,
  totalListPatient,
  searchValue,
  setSearchValue,
  handleGetPatientByDoctorId,
  handleSearch,
  handleSort,
  onLog,
  setIsModalOpen,
  setMedicalRecordSelected,
}: Props) => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Danh sách bệnh nhân
            </h1>
            <p className="text-gray-600">
              Danh sách bệnh nhân của bác sĩ {userInfo.name}
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
                placeholder="Tên bệnh nhân..."
                value={searchValue?.name}
                onChange={(e) => {
                  setSearchValue("name", e.target.value);
                  setTimeout(() => {
                    handleSearch(e.target.value, "name");
                  }, 500);
                }}
                className="w-full lg:w-45 not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="w-full lg:w-auto">
              <input
                type="text"
                placeholder="Số điện thoại..."
                value={searchValue?.phoneNumber}
                onChange={(e) => {
                  setSearchValue("phoneNumber", e.target.value);
                  setTimeout(() => {
                    handleSearch(e.target.value, "phoneNumber");
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
                  handleGetPatientByDoctorId();
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
                      handleSort("createAt");
                    }}
                  >
                    Ngày khám
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                    Ghi chú
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
                      handleSort("specialty");
                    }}
                  >
                    Chuyên khoa
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-center hover:bg-gray-500 hover:text-white transition-all delay-100">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {ListPatient &&
                  ListPatient.length > 0 &&
                  ListPatient.map((item) => {
                    return (
                      <tr
                        className="hover:bg-gray-50 transition-colors duration-150"
                        key={item.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {formatDate(item.createAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.patient?.name}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item?.clinic?.name && item?.clinic?.name?.length > 20
                            ? item.clinic?.name?.slice(0, 20) + "..."
                            : item.clinic?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900p text-center">
                          {item.specialty?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              type="primary"
                              onClick={() => {
                                setMedicalRecordSelected(item);
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
            Tìm thấy <span className="font-semibold">{totalListPatient}</span>{" "}
            kết quả
          </div>
          <div className="flex items-center space-x-1">
            <Pagination
              defaultCurrent={currentPage}
              pageSize={pageSize}
              total={totalListPatient}
              onChange={onLog}
              pageSizeOptions={["3", "5", "10"]}
              showSizeChanger
              responsive
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagePatientTable;
