import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BillPage from "../pages/Admin/Bill/AdminBillManagePage";
import BookingPage from "../pages/Support/SupportBookingPage/SupportBookingPage";
import DoctorBookingPage from "../pages/DoctorManage/DoctorManageBooking/DoctorBookingManage";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import SupportDashboard from "../pages/Dashboard/SupportDashboard/SupportDashboard";
import DoctorManagement from "../pages/Accounts/DoctorList/DoctorManagement";

import DashboardLayout from "../layouts/DashboardLayout";

import SupportList from "../pages/Accounts/SupportList/SupportList";
import PatientList from "../pages/Accounts/PatientList/PatientList";
import UserList from "../pages/Accounts/UserList/UserList";
import SpecialtyGrid from "../pages/Specialty/SpecialtyList";
import ClinicDashboard from "../pages/Dashboard/ClinicDashboard/ClinicDashboard";
import ClinicManagement from "../pages/Clinic/ClinicManagement";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";
import OtpVerify from "../pages/Signup/Otpverify";
import UpdateInfo from "../../src/components/updateinfo/updateinfo";
import UpdateAdminInfo from "../../src/components/updateinfo/AdminUpdate";
import UpdateDoctorInfo from "../../src/components/updateinfo/DoctorUpdate";
import UpdateSupportInfo from "../../src/components/updateinfo/SupportUpdate";

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
import PatientBillList from "../pages/PatientBillList/PatientBillList";
import DoctorManagePatient from "../pages/DoctorManage/DoctorManagePatient/DoctorManagePatient";
import SupportBillManagePage from "../pages/Support/SupportBillManagePage/SupportBillManagePage";
import SpecialtyDetail from "../pages/DanhSach/Specialty/SpecialtyDetail";
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage";
import MedicalServices from "../pages/DichVuYTe/MeidcalServices";
import MedicalServicesDetail from "../pages/DichVuYTe/MedicalServicesDetail";

const AppRoutes = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const ProtectRouter = () => {
    if (!userInfo.email || !userInfo.role || !document.cookie) {
      return <Navigate to={"/auth"} replace={true} />;
    }
    return <Outlet />;
  };
  const CheckLoggedIn = () => {
    if (userInfo.email && userInfo.role && document.cookie) {
      return <Navigate to={"/"} replace={true} />;
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
        <Route element={<CheckLoggedIn />}>
          {" "}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="verify-otp" element={<OtpVerify />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="update" element={<UpdateInfo />}/>
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
        <Route path="chuyen-khoa/:id" element={<SpecialtyDetail />} />
        <Route path="bai-viet" element={<ArticleList />} />
      </Route>
      <Route path="/dich-vu-y-te" element={<List />}>
        <Route
          path="/dich-vu-y-te"
          element={<Navigate to={"error-page"} replace={true} />}
        />
        <Route path="kham-chuyen-khoa" element={<MedicalServices />} />
        <Route
          path="kham-chuyen-khoa/:id"
          element={<MedicalServicesDetail />}
        />
      </Route>
      {/* protected route */}
      <Route element={<ProtectRouter />}>
        <Route path="/update" element={<UpdateInfo />} />
        
        <Route path="/dat-lich-kham/:id" element={<BookingDoctor />} />
        <Route path="/danh-sach-lich-kham" element={<PatientBookingList />} />
        <Route path="/danh-sach-hoa-don" element={<PatientBillList />} />
        <Route path="/doi-mat-khau" element={<ChangePasswordPage />} />
      </Route>

      {/* admin */}
      <Route element={<RouteCheckRole requiredPermission={permission.ADMIN} />}>
        <Route path="/admin-dashboard" element={<DashboardLayout />}>
        <Route path="update" element={<UpdateAdminInfo />} />

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
          <Route path="clinic-page" element={<ClinicManagement />} />
          <Route path="update" element={<UpdateInfo />} />
        </Route>
      </Route>

      {/* Phòng khám */}
      <Route path="/clinic-dashboard" element={<ClinicDashboard />}>
        <Route
          path="/clinic-dashboard"
          element={<Navigate to={"clinic-list"} replace={true} />}
        />
        <Route path="clinic-list" element={<ClinicManagement />} />
      </Route>

      {/* doctor */}
      <Route
        element={<RouteCheckRole requiredPermission={permission.DOCTOR} />}
      >
        <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
        <Route path="update" element={<UpdateDoctorInfo />} />
          <Route
            path="/doctor-dashboard"
            element={<Navigate to={"booking-manage"} replace={true} />}
          />
          <Route path="booking-manage" element={<DoctorBookingPage />} />
          <Route path="patient-manage" element={<DoctorManagePatient />} />
        </Route>
      </Route>

      {/* support */}
      <Route
        element={<RouteCheckRole requiredPermission={permission.SUPPORT} />}
      >
        <Route path="/support-dashboard" element={<SupportDashboard />}>
        <Route path="update" element={<UpdateSupportInfo />} />
          <Route
            path="/support-dashboard"
            element={<Navigate to={"booking-support-manage"} replace={true} />}
          />
          <Route path="booking-support-manage" element={<BookingPage />} />
          <Route
            path="bill-support-manage"
            element={<SupportBillManagePage />}
          />
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
