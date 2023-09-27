'use client'

import { createContext, useState, useContext, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { useFetch as myFetch } from "@/hooks/useFetch";

interface IAuth {
  statusLogin: boolean;
  login: (email: string, senha: string) => any;
  logout: () => void;
}

export const AuthContext = createContext<IAuth>({ statusLogin: false, login: () => { }, logout: () => { } });
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [statusLogin, setStatusLogin] = useState<boolean | any>(checkLogin());

  function checkLogin() {
    const token = getLocalStorage("accessToken");
    if (token) {
      // Make a request to the backend to verify the token
      // If the token is valid, return true; otherwise, return false
      // const isValid = await useFetch<boolean>("/validateToken");
      const isValid = true
      return isValid;
    }
    return false;
  }


  const login = async (email: string, senha: string) => {
    try {
      const { token } = await myFetch<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          senha,
        }),
      });
      setLocalStorage("accessToken", token);
      setStatusLogin(true); // Atualize o statusLogin imediatamente após o login
      return null; // Successful login
    } catch (error: any) {
      // Handle error (e.g., show a notification to the user)
      console.error("Error during login:", error);
      return error.message || "An error occurred during login.";
    }
  };

  const logout = async () => {
    // Implement logout logic here (e.g., clearing tokens, resetting state)
    setStatusLogin(false);
    setLocalStorage("accessToken", "");
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
