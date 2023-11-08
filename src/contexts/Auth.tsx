"use client"

import { createContext, useState, useContext, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useFetch as myFetch } from "@/hooks/useFetch";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => any;
  logout: () => void;
  userType: 'uzer' | 'cliente' | any;
}

export const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [statusLogin, setStatusLogin] = useState<boolean | any>(false);
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    const { uezaccesstoken } = parseCookies();
    if (uezaccesstoken) {
      // tem que adicionar a validação de token aqui
      setStatusLogin(true);
    }
    setUserType(parseCookies().userType);

  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const { token, userType } = await myFetch<{ token: string, userType: string }>("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          senha,
        }),
      });
      setCookie(null, "uezaccesstoken", token, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      }); // Cookie expira em 7 dias
      setCookie(null, "userType", userType, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      }); // Cookie expira em 7 dias
      setUserType(userType);
      setStatusLogin(true);
      return null;
    } catch (error: any) {
      console.error("Error during login:", error);
      return error.message || "An error occurred during login.";
    }
  };

  const logout = async () => {
    await destroyCookie(null, "uezaccesstoken");
    setStatusLogin(false);
    // Limpar outros cookies, se necessário
  };

  return (
    <AuthContext.Provider value={{ statusLogin, login, logout, userType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
