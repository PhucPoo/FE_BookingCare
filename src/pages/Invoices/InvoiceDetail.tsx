import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Định nghĩa kiểu cho chi tiết dịch vụ
interface InvoiceServiceDetail {
  id: number;
  service_id: string;
  service_cost: number;
  quantity: number;
  total_service: number;
}

// Định nghĩa kiểu cho hóa đơn
interface InvoiceDetailType {
  id: number;
  patient_id: number;
  total_bill: number;
  status: string;
  details: InvoiceServiceDetail[];
}

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceDetailType | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/bills/${id}`)
      .then(res => res.json())
      .then((data: InvoiceDetailType) => setInvoice(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!invoice) return <p className="p-6">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết Hóa đơn #{invoice.id}</h1>
      <p><b>Bệnh nhân:</b> {invoice.patient_id}</p>
      <p><b>Tổng tiền:</b> {invoice.total_bill.toLocaleString()} VND</p>
      <p><b>Trạng thái:</b> {invoice.status}</p>

      <h2 className="text-xl font-bold mt-6 mb-2">Chi tiết dịch vụ</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Dịch vụ</th>
            <th className="p-2 border">Đơn giá</th>
            <th className="p-2 border">Số lượng</th>
            <th className="p-2 border">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoice.details.map((d) => (
            <tr key={d.id}>
              <td className="p-2 border">{d.service_id}</td>
              <td className="p-2 border">{d.service_cost.toLocaleString()} VND</td>
              <td className="p-2 border">{d.quantity}</td>
              <td className="p-2 border">{d.total_service.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/invoices" className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded">
        Quay lại
      </Link>
    </div>
  );
}
