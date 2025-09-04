import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BillManage from "../pages/Bill/BillManage";
import BookingPage from "../pages/BookingPage/BookingPage";

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
        <Route path="bill-manage" element={<BillManage />} />
        <Route path="booking-manage" element={<BookingPage />} />
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
