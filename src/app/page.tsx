import PagesLayout from "./(pages)/layout"
import Home from "./(pages)/home/page"
import Dashboard from "./(pages)/dashboard/page"
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function Main() {
  const session = await getServerSession(options)

  if (session?.needsSignUp) {
    redirect("/cadastro/google")
  }

  // return !session && <PagesLayout>{session ? <Dashboard /> : <Home />}</PagesLayout>
  return (
    !session && (
      <PagesLayout>
        <Home />
      </PagesLayout>
    )
  )
}
