import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import NotFound from "./pages/NotFound/NotFound";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/client/login" replace />} />
        {/* Admin */}
        <Route path="/admin/login" element={<AuthForm role="admin" type="login" />} />

        {/* Doctor */}
        <Route path="/doctor/login" element={<AuthForm role="doctor" type="login" />} />

        {/* Support */}
        <Route path="/support/login" element={<AuthForm role="support" type="login" />} />

        {/* Client */}
        <Route path="/client/login" element={<AuthForm role="client" type="login" />} />
        <Route path="/client/signup" element={<AuthForm role="client" type="signup" />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
