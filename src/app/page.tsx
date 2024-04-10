import PagesLayout from "./(pages)/layout"
import Home from "./(pages)/home/page"
import Dashboard from "./(pages)/dashboard/page"
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"

export default async function Main() {
  // const session = await getServerSession(options)
  const session = false // enquanto não tiver dashboard pronto, vai ser isso 👌

  return !session && <PagesLayout>{session ? <Dashboard /> : <Home />}</PagesLayout>
}
