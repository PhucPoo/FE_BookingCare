import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import NotFound from "./pages/NotFound/NotFound";
import UpdateUserForm from "./components/updateinfo/updateinfo";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default → client login */}
        <Route path="/" element={<Navigate to="/client/login" replace />} />

        {/* Auth route chung cho tất cả role */}
        <Route path="/:role/:type" element={<AuthForm />} />

        {/* Forgot password */}
        <Route path="/:role/forgot-password" element={<ForgotPasswordForm />} />

        <Route path="/:role/profile" element={<UpdateUserForm />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
