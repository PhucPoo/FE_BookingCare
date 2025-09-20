import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import NotFound from "./pages/NotFound/NotFound";
import UpdateUserForm from "./components/updateinfo/updateinfo";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";
import SupportDashboard from "./pages/Dashboard/SupportDashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chủ → chuyển sang login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* Dashboard theo role */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/support/dashboard" element={<SupportDashboard />} />

        {/* Trang update profile */}
        <Route path="/profile" element={<UpdateUserForm />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;