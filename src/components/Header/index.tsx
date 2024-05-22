import HeaderClient from "./HeaderClient"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

export default async function Header() {
  const session = await getServerSession(options)

  return <HeaderClient session={session} />
}
