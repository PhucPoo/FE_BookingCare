import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DoctorManagement from "../pages/Accounts/DoctorManagement";
import Dashboard from "../pages/Dashboard/Dashboard";
import SupportList from "../pages/Accounts/SupportList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="doctor-list" replace />} />
        
      <Route />
        {/* Quản lí bác sĩ nhánh con của quản lý admin */}
        <Route path="doctor-list" element={<DoctorManagement />} />
        <Route path="assistant-list" element={<SupportList />} />
       
      </Route>

      
    </Routes>
  );
};

export default AppRoutes;
