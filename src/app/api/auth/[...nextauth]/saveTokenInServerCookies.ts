"use server"

import { cookies } from "next/headers"

export default async function saveTokenInServerCookies(token: string) {
  cookies().set("token", token)
  return
}
