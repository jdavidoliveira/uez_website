'use client'

import { createContext, useState, useEffect } from "react";
import { login as makeLogin } from "../services/api";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuth>({statusLogin: false,login: () => {},logout: () => {}});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializa o estado de login com base em localStorage ou false se não houver valor válido
  const initialStatusLogin: boolean | string =
    localStorage.getItem("statusLogin") === "true" || false;

  const [statusLogin, setStatusLogin] = useState<boolean>(initialStatusLogin);

  // Verifica e atualiza o estado de login ao carregar o aplicativo
  useEffect(() => {
    const storedStatusLogin =
      localStorage.getItem("statusLogin") === "true" || false;
    setStatusLogin(storedStatusLogin);
  }, []);

  // Atualiza o estado de login sempre que localStorage mudar
  useEffect(() => {
    localStorage.setItem("statusLogin", statusLogin.toString());
  }, [statusLogin]);

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