import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    patient_id: "",
    total_bill: 0,
    status: "Unpaid",
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:3000/bills/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
        .catch(err => console.error(err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit
      ? `http://localhost:3000/bills/${id}`
      : "http://localhost:3000/bills";
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => navigate("/invoices"))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Sửa Hóa đơn" : "Thêm Hóa đơn"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Mã bệnh nhân</label>
          <input
            type="text"
            name="patient_id"
            value={form.patient_id}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label>Tổng tiền</label>
          <input
            type="number"
            name="total_bill"
            value={form.total_bill}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label>Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="Paid">Đã thanh toán</option>
            <option value="Unpaid">Chưa thanh toán</option>
            <option value="Cancelled">Đã hủy</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEdit ? "Cập nhật" : "Tạo mới"}
        </button>
      </form>
    </div>
  );
}
