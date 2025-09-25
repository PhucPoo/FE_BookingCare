import React from "react";
// import Dashboard from "../pages/Dashboard/AdminDashboard/Dashboard";
import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BillPage from "../pages/Bill/BillPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import BookingManage from "../pages/Doctor/BookingManage";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import SupportDashboard from "../pages/Dashboard/SupportDashboard/SupportDashboard";
import DoctorManagement from "../pages/Accounts/DoctorList/DoctorManagement";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout"
import SupportList from "../pages/Accounts/SupportList/SupportList";
import PatientList from "../pages/Accounts/PatientList/PatientList";
import UserList from "../pages/Accounts/UserList/UserList";
import SpecialtyGrid from "../pages/Specialty/SpecialtyGrid";
import ListPatient_Doctor from "../pages/Doctors/ListPatient_Doctor";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";

const AppRoutes = () => {
  return ( 
    <Routes>
      <Route
        path="/"
        element={<Navigate to={"admin-dashboard"} replace={true} />}
      />
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgot-password" element={<ForgotPasswordForm/>}/>
      </Route>

      {/* admin */}
      <Route path="/admin-dashboard" element={<DashboardLayout />}>
        <Route
          path="/admin-dashboard"
          element={<Navigate to={"statistics"} replace={true} />}
        />
        <Route path="statistics" element={<Statistics />} />
        <Route path="service-list" element={<ServiceList />} />
        <Route path="bill-manage" element={<BillPage />} />
        <Route path="booking-manage" element={<BookingPage />} />

        <Route path="user-list" element={<UserList />} />

        {/* Quản lí bác sĩ nhánh con của quản lý admin */}
        <Route path="doctor-list" element={<DoctorManagement />} />
        <Route path="assistant-list" element={<SupportList />} />
        <Route path="patient-list" element={<PatientList />} />

        <Route path="specialty" element={<SpecialtyGrid />} />

        <Route path="patient_list" element={<ListPatient_Doctor />} />
      </Route>

      {/* doctor */}
      <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
        <Route
          path="/doctor-dashboard"
          element={<Navigate to={"booking-manage"} replace={true} />}
        />
        <Route path="booking-manage" element={<BookingManage />} />
      </Route>

      {/* support */}
      <Route path="/support-dashboard" element={<SupportDashboard />}>
        <Route
          path="/support-dashboard"
          element={<Navigate to={"booking-support-manage"} replace={true} />}
        />
        <Route path="booking-support-manage" element={<BookingManage />} />
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
