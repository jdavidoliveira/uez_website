import PagesLayout from "./(pages)/layout"
import Home from "./(pages)/home/page"
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function Main() {
  const session = await getServerSession(options)

  // caso o usuário tenha feito login com o google, mas ainda precisa fazer o cadastro
  if (session?.needsSignUp) {
    redirect("/cadastro/google")
  }

  return (
    <PagesLayout>
      <Home />
    </PagesLayout>
  )
}
