import { api } from "@/lib/serverapi"
import Link from "next/link"

import Chat from "./Chat"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
export default async function ChatPage() {
  const session = await getServerSession(options)

  if (!session) {
    return (
      <main className="w-full h-full text-center flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl">Chat em Desenvolvimento!</h1>
        <p className="text-xl">
          Previsão de entrega: <code className="bg-slate-300 rounded p-1">10/04/2024</code>
        </p>
        <Link href={"/"} className="text-xl font-bold text-sky-700 hover:underline">
          Voltar para a homepage
        </Link>
      </main>
    )
  }

  const userData = session.user
  const chatData = await api.get("/chats")

  if (!chatData.ok) {
    console.error(chatData)
    return <div>Erro</div>
  }

  return <Chat chatData={chatData.data} userData={userData} />
}
