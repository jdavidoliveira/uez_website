"use client"

import { createContext, useState, useContext, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useFetch as myFetch } from "@/hooks/useFetch";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => any;
  logout: () => void;
}

export const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [statusLogin, setStatusLogin] = useState<boolean | any>(false);

  useEffect(() => {
    const { accessToken } = parseCookies();
    if (accessToken) {
      // Você pode adicionar validação de token aqui, se necessário
      setStatusLogin(true);
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const { token } = await myFetch<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          senha,
        }),
      });
      setCookie(null, "accessToken", token, { maxAge: 7 * 24 * 60 * 60 }); // Cookie expira em 7 dias
      setStatusLogin(true);
      return null;
    } catch (error: any) {
      console.error("Error during login:", error);
      return error.message || "An error occurred during login.";
    }
  };

  const logout = async () => {
    destroyCookie(null, "accessToken");
    setStatusLogin(false);
    // Limpar outros cookies, se necessário
  };

  return (
    <AuthContext.Provider value={{ statusLogin, login, logout }}>
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
