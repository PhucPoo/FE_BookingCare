import React from "react";
// import Dashboard from "../pages/Dashboard/AdminDashboard/Dashboard";
import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BillPage from "../pages/Admin/Bill/AdminBillManagePage";
import BookingPage from "../pages/Support/SupportBookingPage/SupportBookingPage";
import DoctorBookingPage from "../pages/DoctorManage/DoctorBookingManage";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import SupportDashboard from "../pages/Dashboard/SupportDashboard/SupportDashboard";
import DoctorManagement from "../pages/Accounts/DoctorList/DoctorManagement";

import SupportList from "../pages/Accounts/SupportList/SupportList";
import PatientList from "../pages/Accounts/PatientList/PatientList";
import UserList from "../pages/Accounts/UserList/UserList";
import SpecialtyGrid from "../pages/Specialty/SpecialtyGrid";
import ListPatient_Doctor from "../pages/Doctors/ListPatient_Doctor";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/AdminDashboard/Dashboard";
import MainPage from "../pages/MainPage/MainPage";
import MedicalFacilityList from "../pages/DanhSach/MedicalFacility/MedicalFacilityList";
import DoctorList from "../pages/DanhSach/Doctor/DoctorList";
import SpecialtyList from "../pages/DanhSach/Specialty/SpecialtyList";
import ArticleList from "../pages/DanhSach/Article/ArticleList";
import List from "../pages/DanhSach/List";
import MedicalFacilityDetail from "../pages/DanhSach/MedicalFacility/MedicalFacilityDetail";
import AdminBookingManage from "../pages/Admin/AdminBookingManage/AdminBookingManage";
import DoctorDetail from "../pages/DanhSach/Doctor/DoctorDetail";

const AppRoutes = () => {
  return (
    <Routes>
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

      {/* admin */}
      <Route path="/admin-dashboard" element={<Dashboard />}>
        <Route
          path="/admin-dashboard"
          element={<Navigate to={"statistics"} replace={true} />}
        />
        <Route path="statistics" element={<Statistics />} />
        <Route path="service-list" element={<ServiceList />} />
        <Route path="bill-manage" element={<BillPage />} />
        <Route path="booking-manage" element={<AdminBookingManage />} />

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
        <Route path="booking-manage" element={<DoctorBookingPage />} />
      </Route>

      {/* support */}
      <Route path="/support-dashboard" element={<SupportDashboard />}>
        <Route
          path="/support-dashboard"
          element={<Navigate to={"booking-support-manage"} replace={true} />}
        />
        <Route path="booking-support-manage" element={<BookingPage />} />
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
