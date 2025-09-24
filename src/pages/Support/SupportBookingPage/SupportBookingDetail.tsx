import { Divider, Modal } from "antd/lib";
import { formatDate, getDegree } from "../../../utils/constant";

type accountModel = {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birth?: string;
};
type SupportBookingDetailModel = {
  id?: number;
  appointmentDate?: string;
  description?: string;
  status?: string;
  doctor?: {
    id?: number;
    account?: accountModel;
    degree?: string;
    specialtyName?: string;
  };
  patient?: {
    id?: number;
    account?: accountModel;
    bhyt?: string;
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
  SupportBookingDetail: SupportBookingDetailModel;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const SupportBookingDetail = ({
  SupportBookingDetail,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  return (
    <Modal
      title="Thông tin lịch khám chi tiết"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      width={"1000px"}
    >
      <div className="flex items-center gap-5">
        <div>
          <img
            src={SupportBookingDetail.doctor?.account?.avatar}
            style={{ width: "100px", height: "100px" }}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xl font-bold">
              Tên: {SupportBookingDetail.doctor?.account?.name}
            </p>
            <p>Chuyên khoa: {SupportBookingDetail.doctor?.specialtyName}</p>
          </div>
          <div>
            <p>Địa chỉ: {SupportBookingDetail.doctor?.account?.address}</p>
            <p>Trình độ: {getDegree(SupportBookingDetail.doctor?.degree)}</p>
          </div>
          <div>
            <p>
              Số điện thoại: {SupportBookingDetail.doctor?.account?.phoneNumber}
            </p>
            <p>Email: {SupportBookingDetail.doctor?.account?.email}</p>
          </div>
        </div>
      </div>

      <Divider>Thông tin đơn khám</Divider>

      <div>
        <p className="text-xl">
          Bệnh nhân: {SupportBookingDetail.patient?.account?.name}
        </p>
        <p>- Địa chỉ: {SupportBookingDetail.patient?.account?.address}</p>
        <p>- Ngày sinh: {SupportBookingDetail.patient?.account?.birth}</p>
        <p>- Email: {SupportBookingDetail.patient?.account?.email}</p>
        <p>
          - Số điện thoại: {SupportBookingDetail.patient?.account?.phoneNumber}
        </p>
        <p>- Mã bảo hiểm y tế: {SupportBookingDetail.patient?.bhyt}</p>
      </div>

      <p className="text-xl mt-1">
        Trạng thái đơn khám: {SupportBookingDetail.status}
      </p>
      <p className="text-xl mt-1">
        Thời gian đặt lịch: {formatDate(SupportBookingDetail.createAt)}
      </p>
      <p className="text-xl mt-1">
        Ngày khám: {SupportBookingDetail.appointmentDate}
      </p>
      <p className="text-xl mt-1">
        Thời gian khám:{" "}
        {`${SupportBookingDetail.time?.start} - ${SupportBookingDetail.time?.end}`}
      </p>
    </Modal>
  );
};

export default SupportBookingDetail;
