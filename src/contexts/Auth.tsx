"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { parseCookies, setCookie, destroyCookie } from "nookies"
import { useFetch as myFetch } from "@/hooks/useFetch"
import api from "@/lib/api"

interface IAuth {
  statusLogin: boolean
  login: (email: string, senha: string) => any
  logout: () => void
  userType: "uzer" | "cliente" | any
}

export const AuthContext = createContext<IAuth | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [statusLogin, setStatusLogin] = useState<boolean | any>(false)
  const [userType, setUserType] = useState<string>("")

  useEffect(() => {
    const { uezaccesstoken } = parseCookies()
    if (uezaccesstoken) {
      validateToken(uezaccesstoken)
    }
    setUserType(parseCookies().userType)
  }, [])

  async function validateToken(token: string) {
    const res = await api
      .post("/validate-jwt", {
        token: token,
      })
      .then((res) => res)
      .catch((err) => {
        return {
          data: {
            token: false,
          },
        }
      })

    const { data } = res
    if (!data.token) {
      setStatusLogin(false)
      destroyCookie(null, "uezaccesstoken")
      return
    } else {
      return setStatusLogin(true)
    }
  }

  const login = async (email: string, senha: string) => {
    try {
      const { token, userType } = await myFetch<{ token: string; userType: string }>("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          senha,
        }),
      })
      setCookie(null, "uezaccesstoken", token, {
        maxAge: 1 * 24 * 60 * 60, // Cookie expira em 1 dia
        path: "/",
      })
      setCookie(null, "userType", userType, {
        maxAge: 1 * 24 * 60 * 60, // Cookie expira em 1 dia
        path: "/",
      })
      setUserType(userType)
      setStatusLogin(true)
      return null
    } catch (error: any) {
      console.error("Error during login:", error)
      return error.message || "An error occurred during login."
    }
  }

  const logout = async () => {
    await destroyCookie(null, "uezaccesstoken")
    setStatusLogin(false)
    // Limpar outros cookies, se necessário
  }

  return <AuthContext.Provider value={{ statusLogin, login, logout, userType }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
