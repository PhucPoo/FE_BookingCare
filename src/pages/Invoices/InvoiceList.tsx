import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("create_at");
  const [sortOrder, setSortOrder] = useState("desc");

  // Mock data để test frontend mà không cần database
  useEffect(() => {
    const mockInvoices = [
      {
        id: 1,
        patient_id: "BN001",
        meadicalRecords_id: "MR001",
        total_bill: 500000,
        create_at: "2025-08-20",
        update_at: "2025-08-21",
        support_id: "NV01",
        status: "Đã thanh toán",
      },
      {
        id: 2,
        patient_id: "BN002",
        meadicalRecords_id: "MR002",
        total_bill: 750000,
        create_at: "2025-08-22",
        update_at: "2025-08-23",
        support_id: "NV02",
        status: "Chưa thanh toán",
      },
      {
        id: 3,
        patient_id: "BN003",
        meadicalRecords_id: "MR003",
        total_bill: 300000,
        create_at: "2025-08-25",
        update_at: "2025-08-26",
        support_id: "NV03",
        status: "Đã thanh toán",
      },
    ];
    setInvoices(mockInvoices);
  }, []);

  // Lọc + sắp xếp
  const filteredInvoices = invoices
    .filter((invoice) =>
      invoice.patient_id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "create_at") {
        return sortOrder === "asc"
          ? new Date(a.create_at) - new Date(b.create_at)
          : new Date(b.create_at) - new Date(a.create_at);
      }
      if (sortField === "total_bill") {
        return sortOrder === "asc"
          ? a.total_bill - b.total_bill
          : b.total_bill - a.total_bill;
      }
      return 0;
    });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Hóa đơn</h1>

      {/* Bộ lọc / Tìm kiếm */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Tìm kiếm theo Patient ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="create_at">Ngày tạo</option>
          <option value="total_bill">Tổng tiền</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
        <Link to="#" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          + Thêm Hóa đơn
        </Link>
      </div>

      {/* Bảng dữ liệu */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Patient ID</th>
            <th className="border px-4 py-2">Tổng tiền</th>
            <th className="border px-4 py-2">Ngày tạo</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="border px-4 py-2">{invoice.id}</td>
              <td className="border px-4 py-2">{invoice.patient_id}</td>
              <td className="border px-4 py-2">{invoice.total_bill.toLocaleString()}</td>
              <td className="border px-4 py-2">
                {new Date(invoice.create_at).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{invoice.status}</td>
              <td className="border px-4 py-2 flex gap-2">
                <Link to="#" className="bg-green-500 text-white px-2 py-1 rounded">
                    Xem
                </Link>
                <Link
                  to="#"
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Sửa
                </Link>
                <button
                  onClick={() =>
                    setInvoices(invoices.filter((i) => i.id !== invoice.id))
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {filteredInvoices.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Không tìm thấy hóa đơn
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
