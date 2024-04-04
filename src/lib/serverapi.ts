import { cookies } from "next/headers"

export const api = {
  get: async (url: string) => {
    const response = await fetch(url, {
      headers: {
        cookie: cookies().toString(),
      },
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
  },
}
