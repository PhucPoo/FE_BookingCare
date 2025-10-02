import { Modal } from "antd/lib";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  descriptionData: string;
};

const PatientBillDescriptionModal = ({
  isModalOpen,
  setIsModalOpen,
  descriptionData,
}: Props) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Thông tin ghi chú từ bác sĩ"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        {descriptionData && (
          <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-sm font-medium text-amber-800 mb-1">
              Ghi chú:
            </div>
            <div className="text-sm text-amber-700">{descriptionData}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientBillDescriptionModal;
