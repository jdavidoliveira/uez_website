'use client'

import { createContext, useState, useEffect } from "react";
import { login as makeLogin } from "../services/api";
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
    try {
      const response = await makeLogin(email, senha);
      if (response.token) {
        localStorage.setItem("acessToken", response.token);
        setStatusLogin(true);
        return {
          message: "Login feito com sucesso!",
          data: response,
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("statusLogin");
    localStorage.removeItem("acessToken");
    setStatusLogin(false);
  };

  return (
    <AuthContext.Provider value={{ statusLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;