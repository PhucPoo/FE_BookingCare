import { Modal, Button, Spin, Empty, List, Avatar } from "antd/lib";
import { useState, useEffect } from "react";
import { testGetSpecialtyOFClinicApi } from "../../api/testclinicSpecialty";

interface ClinicSpecialtyModalProps {
  open: boolean;
  specialtyId: number;
  specialtyName: string|null;
  onClose: () => void;
}
interface Clinic {
  id: number;
  name: string;
  description: string;
  image: string;
}



const ClinicSpecialtyModal: React.FC<ClinicSpecialtyModalProps> = ({ open, specialtyId, specialtyName, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<Clinic[]>([]);

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const res = await testGetSpecialtyOFClinicApi(specialtyId);

      const result = res?.data?.result.specialties || [];

      setSpecialties(result);
    } catch (error) {
      setSpecialties([]);
      console.error("Failed to fetch clinic specialties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchSpecialties();
  }, [open]);

  return (
    <>
      <Modal
        title={
          <>
            Danh sách phòng khám của chuyên khoa <strong>{specialtyName}</strong>
          </>

        }
        open={open}
        onCancel={onClose}
        footer={[
          <Button onClick={onClose}>Huỷ</Button>,

        ]}
      >
        {loading ? (
          <Spin />
        ) : specialties.length === 0 ? (
          <Empty description="Phòng khám chưa có chuyên khoa nào" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={specialties}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} shape="square" size={64} />}
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>



    </>
  );
};

export default ClinicSpecialtyModal;
