import { IoIosAddCircle } from "react-icons/io";
import { Button, Pagination, Popconfirm } from "antd/lib";
import { deleteService } from "../../../api/Services/ServiceApi";
import { toast } from "react-toastify";

type Props = {
  pageSize: number;
  totalServiceList: number;
  currentPage: number;
  handleSearchService: (value: string) => void;
  filterService: () => void;
  handleGetServiceList: () => void;
  setFilterData: (value: { from: string; to: string }) => void;
  filterData: { from: string; to: string };
  setIsModalOpen: (e: boolean) => void;
  handleSort: (value: number) => void;
  ServiceList: {
    id: number;
    name: string;
    cost: number;
    description: string;
  }[];
  handleUpdateService: (item: {
    id: number;
    name: string;
    cost: number;
    description: string;
  }) => void;
  onLog: (page: number, pageSize: number) => void;
};

const ServiceListTable = ({
  currentPage,
  pageSize,
  totalServiceList,
  handleSearchService,
  filterService,
  handleGetServiceList,
  setFilterData,
  filterData,
  setIsModalOpen,
  handleSort,
  ServiceList,
  handleUpdateService,
  onLog,
}: Props) => {
  const handleDeleteService = async (id: number) => {
    const result = await deleteService(id);
    if (!result?.error) {
      toast.success("Xoá dịch vụ hoàn tất");
      handleGetServiceList();
    }
  };
  return (
    <>
      {/* table search feature */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              onChange={(e) => {
                setTimeout(() => {
                  handleSearchService(e.target.value);
                }, 500);
              }}
              className="w-full sm:w-15 md:w-25 lg:w-50  not-only: px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="w-full sm:w-auto md:w-auto lg:w-auto flex gap-3 flex-col sm:flex-row items-center">
            <label className="w-full sm:w-auto text-center">
              Lọc theo giá:
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                placeholder="Từ"
                value={filterData.from}
                className="w-full sm:w-16 md:w-32  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  setFilterData({ ...filterData, from: e.target.value });
                }}
              />
              <input
                type="number"
                placeholder="Đến"
                value={filterData.to}
                className="w-full sm:w-16 md:w-32   px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  setFilterData({ ...filterData, to: e.target.value });
                }}
              />
            </div>
            <Button
              size="large"
              type="primary"
              className="sm:flex-row gap-2 w-full sm:w-auto"
              onClick={() => {
                filterService();
              }}
            >
              Lọc
            </Button>
            <Button
              size="large"
              type="dashed"
              className="sm:flex-row gap-2 w-full sm:w-auto"
              onClick={() => {
                handleGetServiceList();
              }}
            >
              làm mới
            </Button>
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

      {/* table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort(0);
                  }}
                >
                  id
                </th>
                <th
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort(1);
                  }}
                >
                  Tên
                </th>
                <th
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white"
                  onClick={() => {
                    handleSort(2);
                  }}
                >
                  Giá
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center cursor-pointer transition-all delay-100 hover:bg-gray-500 hover:text-white">
                  Miêu tả
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center hover:bg-gray-500 hover:text-white transition-all delay-100">
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
                              onConfirm={() => handleDeleteService(item.id)}
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

      {/* pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm text-gray-700 mb-4 sm:mb-0">
          Hiển thị <span className="font-semibold">{currentPage}</span> đến
          <span className="font-semibold">{pageSize}</span>
          của <span className="font-semibold">{totalServiceList}</span> kết quả
        </div>
        <div className="flex items-center space-x-1">
          <Pagination
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalServiceList}
            onChange={onLog}
            responsive
          />
        </div>
      </div>
    </>
  );
};

export default ServiceListTable;
