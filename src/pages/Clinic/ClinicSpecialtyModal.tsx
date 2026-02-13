import { Modal, Button, Spin, Empty, List, Avatar, Popconfirm } from "antd/lib";
import { useState, useEffect } from "react";
import AddSpecialtyModal from "./AddSpecialtyModal";
import { testDeleteSpecialtyOfClinicApi, testGetClinicOFSpecialtyApi } from "../../api/testclinicSpecialty";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

interface ClinicSpecialtyModalProps {
  open: boolean;
  clinicId: number;
  clinicName: string | null;
  onClose: () => void;
}

interface Specialty {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ClinicSpecialtyModal: React.FC<ClinicSpecialtyModalProps> = ({ open, clinicId, clinicName, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const res = await testGetClinicOFSpecialtyApi(clinicId);
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
            Danh sách chuyên khoa của phòng khám <strong>{clinicName}</strong>
          </>
        }
        open={open}
        onCancel={onClose}
        footer={[
          <Button onClick={onClose}>Huỷ</Button>,
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
            Thêm
          </Button>,
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
              <List.Item
                actions={[
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xoá chuyên khoa này?"
                    onConfirm={async () => {
                      try {
                        await testDeleteSpecialtyOfClinicApi(clinicId, item.id);
                        message.success("Xoá chuyên khoa thành công");
                        fetchSpecialties(); // reload danh sách
                      } catch (err) {
                        message.error("Xoá thất bại");
                        console.error(err);
                      }
                    }}
                    okText="Xoá"
                    cancelText="Huỷ"
                  >
                    <DeleteOutlined style={{ color: "red", fontSize: 18, cursor: "pointer" }} />
                  </Popconfirm>
                ]}
                >
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

      {/* Modal Thêm chuyên khoa */}
      <AddSpecialtyModal
        open={isAddModalOpen}
        clinicId={clinicId}
        clinicName={clinicName}
        existingSpecialties={specialties.map((s) => s.id)}
        onClose={() => setIsAddModalOpen(false)}
        onAdded={() => {
          setIsAddModalOpen(false);
          fetchSpecialties(); // cập nhật lại sau khi thêm
        }}
      />
    </>
  );
};

export default ClinicSpecialtyModal;
