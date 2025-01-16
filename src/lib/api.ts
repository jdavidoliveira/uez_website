import axios from "axios"
import { getSession } from "next-auth/react"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
})

// Interceptor para add o token dinamicamente
api.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    const accessToken = session?.accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
