"use server"

import { cookies } from "next/headers"

export default async function action(credentials: { email: string; senha: string }) {
  const response = await fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  })

  return
}
