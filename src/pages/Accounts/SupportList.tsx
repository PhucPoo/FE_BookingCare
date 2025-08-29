import React, { useState } from "react";
import supportFilterBar from "../../components/SupportList/SupportFilterBar";
import supportTable, { type Support } from "../../components/SupportList/SupportTable";
import Addsupport from "../../components/SupportList/AppSupport";
import Button from "antd/lib/button";
import SupportFilterBar from "../../components/SupportList/SupportFilterBar";
import SupportTable from "../../components/SupportList/SupportTable";

const initialsupports: Support[] = [
  { id: 2, name: "Sp. Nguyễn Văn B", email: "hp234@gmail.com", cccd: 1289389, phone: "0942234567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 1, name: "Sp. Nguyễn Văn A", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 3, name: "Sp. Nguyễn Văn C", email: "hp36@gmail.com", cccd: 1289389, phone: "0939234567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 4, name: "Sp. Nguyễn Văn D", email: "hp@gmail.com", cccd: 1289389, phone: "0920234567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
  { id: 5, name: "Sp. Nguyễn Văn CD", email: "hp@gmail.com", cccd: 1289389, phone: "0901234567", create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
  { id: 6, name: "Sp. Nguyễn Văn AB", email: "hp@gmail.com", cccd: 1289389, phone: "0910744567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "active" },
  { id: 7, name: "Sp. Nguyễn Văn ABC", email: "hp@gmail.com", cccd: 1289389, phone: "0910784567",  create_at: new Date("2025-08-27"), update_at: new Date("2025-08-27"), status: "inactive" },
];

const supportManagement: React.FC = () => {
  const [supports, setsupports] = useState<Support[]>(initialsupports);
  const [filteredsupports, setFilteredsupports] = useState<Support[]>(initialsupports);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Thêm trợ lý mới
  const handleAddsupport = (newsupport: Support) => {
    const updatedsupports = [...supports, newsupport];
    setsupports(updatedsupports);
    setFilteredsupports(updatedsupports);
    setIsAddModalOpen(false);
  };

  // Cập nhật trợ lý
  const handleUpdatesupport = (updatedsupport: Support) => {
    const updatedList = supports.map((doc) =>
      doc.id === updatedsupport.id
        ? { ...doc, ...updatedsupport, update_at: new Date() }
        : doc
    );
    setsupports(updatedList);
    setFilteredsupports(updatedList); // rất quan trọng để table hiển thị đúng
  };
  // Xóa trợ lý
  const handleDeletesupport = (id: number) => {
    console.log("Deleted support with id:", id);
    const updatedsupports = supports.filter((d) => d.id !== id);
    setsupports(updatedsupports);
    setFilteredsupports(updatedsupports); 
    
  };
  return (
    <div className="p-6">
      <h1 className="text-xxl font-bold mb-4 text-blue-700">Quản lý trợ lý</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <SupportFilterBar supports={supports} onFilter={setFilteredsupports} />
        </div>
      </div>

      <div className="mb-4">
        <Button
          type="primary"
          size="large"
          onClick={() => setIsAddModalOpen(true)}
          style={{ minWidth: 150 }}
        >
          + Thêm trợ lý
        </Button>
      </div>

      <SupportTable
        supports={filteredsupports}
        onUpdatesupport={handleUpdatesupport}
        onDeletesupport={handleDeletesupport}
      />

      <Addsupport
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onAdd={handleAddsupport}
      />
    </div>
  );
};

export default supportManagement;
