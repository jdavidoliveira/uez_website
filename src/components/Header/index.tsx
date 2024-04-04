import { User, getServerSession } from "next-auth"
import HeaderClient from "./HeaderClient"
import LoggedHeader from "./LoggedHeader"
import { options } from "@/app/api/auth/[...nextauth]/options"

export default async function Header() {
  const session = await getServerSession(options)

  return session && session.user ? <LoggedHeader session={session} /> : <HeaderClient />
}
