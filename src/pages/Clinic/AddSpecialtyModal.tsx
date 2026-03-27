import { Modal, Button, Spin, Tag } from "antd/lib";
import { useEffect, useState } from "react";
import { testGetSpecialtyApi, testPostSpecialtyApi } from "../../api/testSpecialty";
import type { Specialty } from "../Specialty/SpecialtyTable";
import { testPostClinicSpecialtyApi } from "../../api/testclinicSpecialty";

interface AddSpecialtyModalProps {
    open: boolean;
    clinicId: number;
    clinicName: string|null;
    existingSpecialties: number[];
    onClose: () => void;
    onAdded: () => void;
}

const AddSpecialtyModal: React.FC<AddSpecialtyModalProps> = ({ open, clinicId, clinicName, existingSpecialties, onClose, onAdded }) => {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [selectedIds, setSelectedIds] = useState([...existingSpecialties]);
    const [loading, setLoading] = useState(true);

    const fetchAllSpecialties = async () => {
        setLoading(true);
        try {
            const res = await testGetSpecialtyApi();
            setSpecialties(res.data.result || []);

        } finally {
            setLoading(false);
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleAdd = async () => {
        await testPostClinicSpecialtyApi({ clinicId, specialties: selectedIds });
        onAdded();
    };

    useEffect(() => {
        if (open) {
            setSelectedIds([...existingSpecialties]);
            fetchAllSpecialties();
        }
    }, [open, existingSpecialties]);

    return (
        <Modal
            title={
                <>
                    Danh sách chuyên khoa của phòng khám <strong>{clinicName}</strong>
                </>
            }
            open={open}
            onCancel={onClose}
            footer={[
                <Button onClick={onClose}>Quay lại</Button>,
                <Button type="primary" onClick={handleAdd}>Thêm</Button>,
            ]}
        >
            {loading ? (
                <Spin />
            ) : (
                <div className="flex flex-wrap gap-2">
                    {specialties.map((item) => (
                        <Tag
                            key={item.id}
                            color={selectedIds.includes(item.id) ? "blue" : "default"}
                            onClick={() => toggleSelect(item.id)}
                            style={{ cursor: "pointer", padding: "5px 10px" }}
                        >
                            <img src={item.image} alt={item.name} width={30} style={{ marginRight: 8 }} />
                            {item.name}
                        </Tag>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default AddSpecialtyModal;
