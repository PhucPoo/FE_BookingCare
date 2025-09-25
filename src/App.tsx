import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Header from "./components/Header/Header.tsx";
import DoctorManagement from "./pages/Accounts/DoctorList/DoctorManagement.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
