import useUserInfoStore from "../Zustand/configZustand";
import { roles } from "./roleConfig";
import { usePermission } from "./usePermission";
import { Navigate, Outlet } from "react-router-dom";

const RouteCheckRole = ({ requiredPermission, redirectTo = "/error" }) => {
  // console.log("🚀 ~ requiredPermission:", requiredPermission);

  const user = useUserInfoStore((state) => state.userInfo);
  const userRole = user?.role || roles.CLIENT; //neu ko co user thi gan role la customer
  const { hasPermission } = usePermission(userRole);

  //neu user ko co quyen han thi doi huong ve redirectTo
  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace="true" />;
  }
  return <Outlet />;
};

export default RouteCheckRole;
