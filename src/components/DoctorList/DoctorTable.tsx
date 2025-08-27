import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Doctor {
    id: number;
    name: string;
    email: string;
    password: string;
    cccd: number;
    phone: string;
    department: string;
    Gender: string;
    address: string;
    birthday: Date;
    create_at: Date;
    update_at: Date;

    
    status: 'active' | 'inactive';
}

const doctors: Doctor[] = [
    { id: 1, name: 'BS. Nguyễn Văn A',email: 'hp@gmail.com',password:'aaaa',cccd: 1289389, phone: '0901234567', department: 'Nội khoa',Gender:'male',address:'Hà Nội',birthday:new Date('2025-08-27'),create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
    { id: 2, name: 'BS. Nguyễn Văn A',email: 'hp@gmail.com',password:'aaaa',cccd: 1289389, phone: '0901234567', department: 'Nội khoa',Gender:'male',address:'Hà Nội',birthday:new Date('2025-08-27'),create_at:new Date('2025-08-27'),update_at:new Date('2025-08-27'), status: 'active' },
    // Thêm dữ liệu giả khác tại đây nếu cần
];

const getStatusBadge = (status: Doctor['status']) => {
    switch (status) {
        case 'active':
            return <span className="bg-green-500 text-white py-1 rounded text-sm">Hoạt động</span>;
        case 'inactive':
            return <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Nghỉ</span>;
    }
};

const DoctorTable: React.FC = () => {
    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <th className="w-[3%] p-3 border">STT</th>
                    <th className="w-[6%] p-3 border">Tên bác sĩ</th>
                    <th className="w-[8%] p-3 border">Email bác sĩ</th>
                    <th className="w-[6%] p-3 border">Password</th>
                    <th className="w-[6%] p-3 border">CCCD</th>
                    <th className="w-[6%] p-3 border">Phone</th>
                    <th className="w-[6%] p-3 border">Gender</th>
                    <th className="w-[6%] p-3 border">Address</th>
                    <th className="w-[7%] p-3 border">Department</th>
                    <th className="w-[6%] p-3 border">Birthday</th>
                    <th className="w-[6%] p-3 border">Create_at</th>
                    <th className="w-[6%] p-3 border">Update_at</th>
                    <th className="w-[6%] p-3 border">Trạng thái</th>
                    <th className="w-[10%] p-3 border text-center">Thao tác</th>
                </thead>
                <tbody>
                    {doctors.map((doc, index) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="p-3 border">{index + 1}</td>
                            <td className="p-3 border">{doc.name}</td>
                            <td className="p-3 border">{doc.email}</td>
                            <td className="p-3 border">{doc.password}</td>
                            <td className="p-3 border">{doc.cccd}</td>
                            <td className="p-3 border">{doc.phone}</td>
                            <td className="p-3 border">{doc.Gender}</td>
                            <td className="p-3 border">{doc.address}</td>
                            <td className="p-3 border">{doc.department}</td>
                            <td className="p-3 border">{doc.birthday.toLocaleDateString()}</td>
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
