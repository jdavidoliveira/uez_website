'use client'

import { createContext, useState, useEffect } from "react";
import { getLocalStorage } from "@/hooks/useLocalStorage";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuth>({statusLogin: false,login: () => {},logout: () => {}});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [statusLogin, setStatusLogin] = useState<boolean | any>(getLocalStorage("statusLogin"));

  const login = async (email: string, senha: string) => {
    alert("Login");
  };

  const logout = () => {
    alert("Logout");
  };

  return (
    <AuthContext.Provider value={{ statusLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;