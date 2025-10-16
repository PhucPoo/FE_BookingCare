import { useEffect, useState } from "react";
import { getBillByPatient } from "../../api/Bill/BillApi";
import useUserInfoStore from "../../Zustand/configZustand";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import type { PatientBillListModel } from "./PatientBillListModel";
import { Button, Card, Divider, Empty, Pagination, Tag } from "antd/lib";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusText,
} from "../../utils/constant";
import {
  ClockCircleOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import PatientBillDescriptionModal from "./PatientBillDescriptionModal";
const PatientBillList = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [BillList, setBillList] = useState<PatientBillListModel[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalBills, setTotalBills] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descriptionData, setDescriptionData] = useState<string>("");
  const [openListService, setOpenListService] = useState({
    open: false,
    idOpen: 0,
  });

  const handleGetBillByPatientId = async () => {
    if (userInfo && userInfo.patientId) {
      const res = await getBillByPatient(userInfo.patientId);
      setBillList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBills(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };

  const onLog = async (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
    window.scroll(0, 0);
    if (userInfo.patientId) {
      const res = await getBillByPatient(userInfo?.patientId, page, pageSize);
      setBillList(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalBills(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    }
  };
  useEffect(() => {
    handleGetBillByPatientId();
  }, []);
  return (
    <div>
      <MainPageHeader />
      <div className="container">
        <div className="flex flex-col gap-6 my-6">
          {BillList.length === 0 ? (
            <Card className="shadow-lg">
              <Empty description="Chưa có dịch vụ nào" />
            </Card>
          ) : (
            <div className="flex flex-col gap-2">
              {BillList.map((item) => (
                <Card
                  key={item.id}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-0"
                  style={{ padding: "24px" }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <MedicineBoxOutlined className="text-2xl text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Hoá đơn #{item.medicalRecord.id}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <UserOutlined />
                        <span className="font-medium">{item.patient.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm">ID: {item.patient.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                          <ClockCircleOutlined /> Ngày lập đơn:
                          <span>{formatDate(item.createAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">
                        Tổng hóa đơn
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(item.totalBill)}
                      </div>
                    </div>
                  </div>

                  <Divider className="my-4" />

                  {/* Services List */}
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h4 className="text-base font-semibold text-gray-700 mb-3">
                        Dịch vụ đã sử dụng
                      </h4>
                      <Button
                        onClick={() => {
                          setOpenListService({
                            idOpen: item.id,
                            open: !openListService.open,
                          });
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                    {openListService.idOpen === item.id && (
                      <div className="space-y-3">
                        {item.services.map((service) => (
                          <div
                            key={service.id}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="font-medium text-gray-800 mb-2">
                                  {service.service.name}
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm">
                                  <span className="text-gray-600">
                                    Số lượng:{" "}
                                    <span className="font-medium text-gray-800">
                                      {service.quantity}
                                    </span>
                                  </span>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-gray-600">
                                    Đơn giá:{" "}
                                    <span className="font-medium text-gray-800">
                                      {formatCurrency(service.serviceCost)}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <Tag
                                  color={getStatusColor(item.status)}
                                  className="mb-2"
                                >
                                  {getStatusText(item.status)}
                                </Tag>
                                <div className="text-lg font-bold text-blue-600">
                                  {formatCurrency(service.totalService)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Người tạo đơn:</span>{" "}
                      {item.support.name}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="default"
                        className="rounded-lg"
                        onClick={() => {
                          setDescriptionData(item.medicalRecord.description);
                          setIsModalOpen(true);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                      <Button type="primary" className="rounded-lg bg-blue-600">
                        In hóa đơn
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <Pagination
          defaultCurrent={currentPage}
          pageSize={pageSize}
          total={totalBills}
          onChange={onLog}
          pageSizeOptions={["3", "5", "10"]}
          showSizeChanger
          responsive
        />
        <PatientBillDescriptionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          descriptionData={descriptionData}
        />
      </div>
    </div>
  );
};

export default PatientBillList;
