import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/AdminDashboard/Dashboard";
import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BillPage from "../pages/Bill/BillPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import BookingManage from "../pages/Doctor/BookingManage";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import SupportDashboard from "../pages/Dashboard/SupportDashboard/SupportDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={"/admin-dashboard"} replace={true} />}
      />

      <Route path="/admin-dashboard" element={<Dashboard />}>
        <Route
          path="/admin-dashboard"
          element={<Navigate to={"statistics"} replace={true} />}
        />
        <Route path="statistics" element={<Statistics />} />
        <Route path="service-list" element={<ServiceList />} />
        <Route path="bill-manage" element={<BillPage />} />
        <Route path="booking-manage" element={<BookingPage />} />
      </Route>

      <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
        <Route
          path="/doctor-dashboard"
          element={<Navigate to={"booking-manage"} replace={true} />}
        />
        <Route path="booking-manage" element={<BookingManage />} />
      </Route>

      <Route path="/support-dashboard" element={<SupportDashboard />}>
        <Route
          path="/support-dashboard"
          element={<Navigate to={"booking-support-manage"} replace={true} />}
        />
        <Route path="booking-support-manage" element={<BookingManage />} />
      </Route>
      <Route path="/error-page" element={<ErrorPage />} />
      <Route
        path="*"
        element={<Navigate to={"/error-page"} replace={true} />}
      />
    </Routes>
  );
};

export default AppRoutes;
