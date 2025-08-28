import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from 'antd/lib/button';
import Modal from 'antd/es/modal/Modal';

export interface Doctor {
  id: number;
  name: string;
  email: string;
  cccd: number;
  phone: string;
  price?: number;
  create_at: Date;
  update_at: Date;
  status: 'active' | 'inactive';
}

interface DoctorTableProps {
  doctors: Doctor[];
}

const getStatusBadge = (status: Doctor['status']) => {
  switch (status) {
    case 'active':
      return <span className="bg-green-500 text-white py-1 rounded text-sm">Hoạt động</span>;
    case 'inactive':
      return <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Nghỉ</span>;
  }
};

type SortColumn = 'name' | 'create_at' | 'department' | '';
type SortDirection = 'asc' | 'desc';

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors }) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      //    Ấn lại cột đó lần nữa thì hủy sắp xếp
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      //Ấn sang cột khác thì sắp xếp theo thứ tự tăng dần của cột
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (!sortColumn) return 0;

    let aVal: any;
    let bVal: any;
    // So sánh các giá trị dựa trên cột được chọn
    switch (sortColumn) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'create_at':
        aVal = a.create_at.getTime();
        bVal = b.create_at.getTime();
        break;

    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const renderSortArrow = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  // Hiển thị/ẩn danh sách
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-[3%] p-3 border">STT</th>
            <th
              className="w-[8%] p-3 border cursor-pointer select-none"
              onClick={() => handleSort('name')}
            >
              Tên bác sĩ{renderSortArrow('name')}
            </th>
            <th className="w-[8%] p-3 border">Email bác sĩ</th>
            <th className="w-[6%] p-3 border">CCCD</th>
            <th className="w-[7%] p-3 border">Phone</th>

            <th className="w-[6%] p-3 border">Price</th>
            <th
              className="w-[6%] p-3 border cursor-pointer select-none"
              onClick={() => handleSort('create_at')}
            >
              Create_at{renderSortArrow('create_at')}
            </th>
            <th className="w-[6%] p-3 border">Update_at</th>
            <th className="w-[6%] p-3 border">Trạng thái</th>
            <th className="w-[10%] p-3 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedDoctors.map((doc, index) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{doc.name}</td>
              <td className="p-3 border">{doc.email}</td>
              <td className="p-3 border">{doc.cccd}</td>
              <td className="p-3 border">{doc.phone}</td>
              <td className="p-3 border">{doc.price}</td>
              <td className="p-3 border">{doc.create_at.toLocaleDateString()}</td>
              <td className="p-3 border">{doc.update_at.toLocaleDateString()}</td>
              <td className="p-3 border">{getStatusBadge(doc.status)}</td>
              <td className="p-3 border text-center">
                <div className="flex justify-center gap-3">
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <Button type="primary" onClick={showModal}>
                    Thông tin thêm
                  </Button>
                  <Modal
                    title="Basic Modal"
                    closable={true}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Modal>



                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
