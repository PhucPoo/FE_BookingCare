import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DoctorManagement from "../pages/Accounts/DoctorList/DoctorManagement";
import Dashboard from "../pages/Dashboard/Dashboard";
import SupportList from "../pages/Accounts/SupportList/SupportList";
import PatientList from "../pages/Accounts/PatientList/PatientList";
import UserList from "../pages/Accounts/UserList/UserList";
import SpecialtyGrid from "../pages/Specialty/SpecialtyGrid";
import ListPatient_Doctor from "../pages/Doctors/ListPatient_Doctor";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<Dashboard />}>
        <Route path="/admin-dashboard/user-list" element={<UserList />}> </Route>
          <Route index element={<Navigate to="doctor-list" replace />} />
       
      <Route />
     
      
        {/* Quản lí bác sĩ nhánh con của quản lý admin */}
        <Route path="doctor-list" element={<DoctorManagement />} />
        <Route path="assistant-list" element={<SupportList />} />
        <Route path="patient-list" element={<PatientList />} />

        <Route path="specialty" element={<SpecialtyGrid />} />
       
        <Route path="patient_list" element={<ListPatient_Doctor />} />
      </Route>
      

      
    </Routes>
  );
};

export default AppRoutes;
