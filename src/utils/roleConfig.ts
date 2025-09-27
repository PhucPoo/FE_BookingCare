export const roles = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  SUPPORT: "support",
  CLIENT: "client",
};
export const permission = {
  admin: "admin-dashboard",
  doctor: "doctor-dashboard",
  support: "support-dashboard",
};
export const rolePermission = {
  [roles.ADMIN]: Object.values(permission),
  [roles.DOCTOR]: [permission.doctor],
  [roles.SUPPORT]: [permission.support],
};
