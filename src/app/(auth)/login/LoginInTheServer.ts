"use server"

import api from "@/lib/api"

export default async function loginInServer(email: string, senha: string) {
  const result = await api.post("/login", {
    email,
    senha,
  })
}
