import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "admin" | "doctor" | "support" | "client";

export interface User {
  id: string;        // dùng string để khớp route params / token subject
  role: Role;
  name?: string;
  email?: string;
}

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>; 
  token?: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return;
    // khi app load và có token, fetch /api/auth/me để lấy profile + role
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (!r.ok) throw new Error("not auth");
        return r.json();
      })
      .then((data) => setCurrentUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setCurrentUser(null);
      });
  }, [token]);

  // Khi login thành công, lưu token + setCurrentUser ở nơi login flow
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
