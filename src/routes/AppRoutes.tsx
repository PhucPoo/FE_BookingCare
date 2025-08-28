import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import InvoiceList from "./pages/Invoices/InvoiceList.jsx";
import InvoiceDetail from "./pages/Invoices/InvoiceDetail.jsx";
import InvoiceForm from "./pages/Invoices/InvoiceForm.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/invoices/new" element={<InvoiceForm />} />
      <Route path="/invoices/:id" element={<InvoiceDetail />} />
      <Route path="/invoices/:id/edit" element={<InvoiceForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
