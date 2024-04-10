const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api"

interface FetchParams extends RequestInit {
  next?: NextFetchRequestConfig
}

export interface ApiError {
  message: string
}

export async function useFetch<T>(endpoint: string, config: FetchParams = {}): Promise<T> {
  endpoint = endpoint.replace(/^\//, "")
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }

  const headers = {
    ...defaultHeaders,
    ...(config.headers || {}),
  }

  const requestOptions: RequestInit = {
    ...config,
    headers,
    credentials: "include",
  }

  const url = `${baseURL}/${endpoint}`

  try {
    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw errorData
    }

    const data = await response.json()
    return data as T
  } catch (error: Error | any) {
    if (typeof error === "object" && "message" in error) {
      throw error as ApiError
    }

    throw new Error(`Error fetching data: ${error.message}`)
  }
}
