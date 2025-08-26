import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<Dashboard />}>
        <Route
          path="/admin-dashboard"
          element={<Navigate to={"statistics"} replace={true} />}
        />
        {/* <Route path="statistics" element={<Statistics />} />
        <Route path="service-list" element={<Users />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
