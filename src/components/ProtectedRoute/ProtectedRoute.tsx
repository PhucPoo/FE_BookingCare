import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/client/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
