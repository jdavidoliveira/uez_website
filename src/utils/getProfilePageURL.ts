import { getSession } from "next-auth/react"

export async function getProfilePageURL() {
  const session = await getSession()
  return `/usuarios/${session?.user.username}`
}
