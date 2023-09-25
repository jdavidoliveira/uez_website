'use client'

import React, { createContext, useState, useContext } from "react";
import { getLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { useFetch } from "@/hooks/useFetch";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuth>({statusLogin: false,login: () => {},logout: () => {}});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [statusLogin, setStatusLogin] = useState<boolean | any>(getLocalStorage("statusLogin"));

  const login = async (email: string, senha: string) => {
    alert("Login");
    const { token } = await useFetch<{ token: string }>("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        senha,
      })
    })
    setLocalStorage("accessToken", token)
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

export const useAuth = () => {
  return useContext(AuthContext);
}
