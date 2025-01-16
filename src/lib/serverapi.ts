import { getServerSession, NextAuthOptions } from "next-auth"
import { options as nextOptions } from "@/app/api/auth/[...nextauth]/options"

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/"

type ApiResponse<T> = {
  data: T
  status: number
  headers: Headers
  statusText: string
  ok: boolean
  redirected: boolean
  url: string
  type: ResponseType
}

export const api = {
  get: async <T>(routeUrl: string, options?: RequestInit): Promise<ApiResponse<T>> => {
    const fullUrl = (baseUrl + routeUrl).replace(/\/\//g, "/")
    const session = await getServerSession(nextOptions)
    const token = session?.accessToken
    try {
      const response = await fetch(fullUrl, {
        headers: {
          ...options?.headers,
          authorization: `Bearer ${token}`,
          "x-api-key": process.env.API_KEY || "",
        },
        ...options,
      })
      return {
        data: await response.json(),
        status: response.status,
        headers: response.headers,
        statusText: response.statusText,
        ok: response.ok,
        redirected: response.redirected,
        url: response.url,
        type: response.type,
      }
    } catch (err) {
      return {
        data: null as any, // Modify this as per your error handling requirement
        status: 500,
        headers: new Headers(),
        statusText: "Internal Server Error",
        ok: false,
        redirected: false,
        url: "",
        type: "basic",
      }
    }
  },
}
