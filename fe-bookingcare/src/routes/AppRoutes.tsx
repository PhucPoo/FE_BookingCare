import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Statistics from "../pages/Statistics/Statistics";
import ServiceList from "../pages/Services/ServicesList/ServiceList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<Dashboard />}>
        <Route
          path="/admin-dashboard"
          element={<Navigate to={"statistics"} replace={true} />}
        />
        <Route path="statistics" element={<Statistics />} />
        <Route path="service-list" element={<ServiceList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
