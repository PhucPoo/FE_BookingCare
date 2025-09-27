import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BillPage from "../pages/Admin/Bill/AdminBillManagePage";
import BookingPage from "../pages/Support/SupportBookingPage/SupportBookingPage";
import DoctorBookingPage from "../pages/DoctorManage/DoctorBookingManage";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import SupportDashboard from "../pages/Dashboard/SupportDashboard/SupportDashboard";
import DoctorManagement from "../pages/Accounts/DoctorList/DoctorManagement";

import DashboardLayout from "../layouts/DashboardLayout";

import SupportList from "../pages/Accounts/SupportList/SupportList";
import PatientList from "../pages/Accounts/PatientList/PatientList";
import UserList from "../pages/Accounts/UserList/UserList";
import SpecialtyGrid from "../pages/Specialty/SpecialtyGrid";
import ListPatient_Doctor from "../pages/Doctors/ListPatient_Doctor";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";

import MainPage from "../pages/MainPage/MainPage";
import MedicalFacilityList from "../pages/DanhSach/MedicalFacility/MedicalFacilityList";
import DoctorList from "../pages/DanhSach/Doctor/DoctorList";
import SpecialtyList from "../pages/DanhSach/Specialty/SpecialtyList";
import ArticleList from "../pages/DanhSach/Article/ArticleList";
import List from "../pages/DanhSach/List";
import MedicalFacilityDetail from "../pages/DanhSach/MedicalFacility/MedicalFacilityDetail";
import AdminBookingManage from "../pages/Admin/AdminBookingManage/AdminBookingManage";
import DoctorDetail from "../pages/DanhSach/Doctor/DoctorDetail";
import BookingDoctor from "../pages/BookingDoctor/BookingDoctor";
import useUserInfoStore from "../Zustand/configZustand";
import RouteCheckRole from "../utils/RouteCheckRole";
import { permission } from "../utils/roleConfig";
import PatientBookingList from "../pages/PatientBookingList/PatientBookingList";

const AppRoutes = () => {
  const ProtectRouter = () => {
    const userInfo = useUserInfoStore((state) => state.userInfo);
    if (!userInfo.email || !userInfo.role) {
      return <Navigate to={"/auth"} replace={true} />;
    }
    return <Outlet />;
  };
  return (
    <Routes>
      <Route path="/auth">
        <Route
          path="/auth"
          element={<Navigate to={"login"} replace={true} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
      </Route>

      <Route path="/" element={<MainPage />} />

      <Route path="/danh-sach" element={<List />}>
        <Route
          path="/danh-sach"
          element={<Navigate to={"error-page"} replace={true} />}
        />
        <Route path="co-so-y-te" element={<MedicalFacilityList />} />
        <Route path="co-so-y-te/:id" element={<MedicalFacilityDetail />} />
        <Route path="bac-si" element={<DoctorList />} />
        <Route path="bac-si/:id" element={<DoctorDetail />} />
        <Route path="chuyen-khoa" element={<SpecialtyList />} />
        <Route path="bai-viet" element={<ArticleList />} />
      </Route>
      {/* protected route */}
      <Route element={<ProtectRouter />}>
        <Route path="/dat-lich-kham/:id" element={<BookingDoctor />} />
        <Route path="/danh-sach-lich-kham" element={<PatientBookingList />} />
      </Route>

      {/* admin */}
      <Route element={<RouteCheckRole requiredPermission={permission.admin} />}>
        <Route path="/admin-dashboard" element={<DashboardLayout />}>
          <Route
            path="/admin-dashboard"
            element={<Navigate to={"statistics"} replace={true} />}
          />
          <Route path="statistics" element={<Statistics />} />
          <Route path="service-list" element={<ServiceList />} />
          <Route path="bill-manage" element={<BillPage />} />
          <Route path="booking-manage" element={<AdminBookingManage />} />

          <Route path="user-list" element={<UserList />} />
          <Route path="doctor-list" element={<DoctorManagement />} />
          <Route path="assistant-list" element={<SupportList />} />
          <Route path="patient-list" element={<PatientList />} />

          <Route path="specialty" element={<SpecialtyGrid />} />

          <Route path="patient_list" element={<ListPatient_Doctor />} />
        </Route>
      </Route>

      {/* doctor */}
      <Route
        element={<RouteCheckRole requiredPermission={permission.doctor} />}
      >
        <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
          <Route
            path="/doctor-dashboard"
            element={<Navigate to={"booking-manage"} replace={true} />}
          />
          <Route path="booking-manage" element={<DoctorBookingPage />} />
        </Route>
      </Route>

      {/* support */}
      <Route
        element={<RouteCheckRole requiredPermission={permission.support} />}
      >
        <Route path="/support-dashboard" element={<SupportDashboard />}>
          <Route
            path="/support-dashboard"
            element={<Navigate to={"booking-support-manage"} replace={true} />}
          />
          <Route path="booking-support-manage" element={<BookingPage />} />
        </Route>
      </Route>

      {/* error page */}
      <Route path="/error-page" element={<ErrorPage />} />
      <Route
        path="*"
        element={<Navigate to={"/error-page"} replace={true} />}
      />
    </Routes>
  );
};

export default AppRoutes;
