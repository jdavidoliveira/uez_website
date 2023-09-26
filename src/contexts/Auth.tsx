'use client'

import React, { createContext, useState, useContext } from "react";
import { getLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { useFetch } from "@/hooks/useFetch";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => any;
  logout: () => void;
}

export const AuthContext = createContext<IAuth>({ statusLogin: false, login: () => { }, logout: () => { } });
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [statusLogin, setStatusLogin] = useState<boolean | any>(checkLogin());

  function checkLogin() {
    const token = getLocalStorage("accessToken")
    if (token) {
      //rota do backend, pra verificar...
      if (token.length > 20) return true
    } else return false
  }

  const login = async (email: string, senha: string) => {
    const logError = await useFetch<{ token: string }>("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        senha,
      })
    }).then(({ token }) => {
      setLocalStorage("accessToken", token)
    })
      .catch(({ message }: { message: string }) => message)
    return logError
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
