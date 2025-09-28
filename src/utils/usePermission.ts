import { rolePermission } from "./roleConfig";

export const usePermission = (userRole: string) => {
  const hasPermission = (permission: string) => {
    const allowedPermissions = rolePermission[userRole] || []; //tra ve mang cac permission cua userRole
    return allowedPermissions.includes(permission); //kiem tra xem co permission muon su dung khong
  };
  return { hasPermission };
};
