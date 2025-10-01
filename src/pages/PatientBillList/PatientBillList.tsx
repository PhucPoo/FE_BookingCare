import { useEffect, useState } from "react";
import { getBillByPatient } from "../../api/Bill/BillApi";
import useUserInfoStore from "../../Zustand/configZustand";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import type { PatientBillListModel } from "./PatientBillListModel";
import { Button, Card, Divider, Empty, Tag } from "antd/lib";
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
const PatientBillList = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [BillList, setBillList] = useState<PatientBillListModel[]>([]);
  const handleGetBillByPatientId = async () => {
    if (userInfo && userInfo.patientId) {
      const res = await getBillByPatient(userInfo.patientId);
      console.log("🚀 ~ handleGetBillByPatientId ~ res:", res);
      setBillList(res.data.result);
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
            <div className="space-y-6">
              {BillList.map((item) => (
                <Card
                  key={item.id}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-0"
                  bodyStyle={{ padding: "24px" }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <MedicineBoxOutlined className="text-2xl text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Hồ sơ bệnh án #{item.medicalRecord.id}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <UserOutlined />
                        <span className="font-medium">{item.patient.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm">ID: {item.patient.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <ClockCircleOutlined />
                        <span>{formatDate(item.createAt)}</span>
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

                  {/* Medical Record Description */}
                  {item.medicalRecord.description && (
                    <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="text-sm font-medium text-amber-800 mb-1">
                        Ghi chú:
                      </div>
                      <div className="text-sm text-amber-700">
                        {item.medicalRecord.description}
                      </div>
                    </div>
                  )}

                  {/* Services List */}
                  <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-700 mb-3">
                      Dịch vụ đã sử dụng
                    </h4>
                    <div className="space-y-3">
                      {item.services.map((service, idx) => (
                        <div
                          key={idx}
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
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Hỗ trợ bởi:</span>{" "}
                      {item.support.name}
                    </div>
                    <div className="flex gap-2">
                      <Button type="default" className="rounded-lg">
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
      </div>
    </div>
  );
};

export default PatientBillList;
