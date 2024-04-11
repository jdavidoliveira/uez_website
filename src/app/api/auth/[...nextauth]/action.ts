"use server"

import { cookies } from "next/headers"

export default async function action(credentials: { email: string; senha: string }) {
  if (!credentials || !process.env.NEXT_PUBLIC_API_URL) return null
  console.log(process.env.NEXT_PUBLIC_API_URL)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  })
  return
}
