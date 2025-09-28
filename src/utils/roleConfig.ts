export const roles = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  SUPPORT: "SUPPORT",
  CLIENT: "CLIENT",
};
export const permission = {
  ADMIN: "admin-dashboard",
  DOCTOR: "doctor-dashboard",
  SUPPORT: "support-dashboard",
};
export const rolePermission = {
  [roles.ADMIN]: Object.values(permission),
  [roles.DOCTOR]: [permission.DOCTOR],
  [roles.SUPPORT]: [permission.SUPPORT],
};
