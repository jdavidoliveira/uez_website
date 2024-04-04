"use client"

import { useEffect, useState } from "react"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import ChatInterface from "@/types/Chat"
import { useAuth } from "@/contexts/Auth"
import { useSearchParams } from "next/navigation"
import api from "@/lib/api"

interface ChatProps {
  serverData_chat: ChatInterface[]
  serverData_user: unknown
}

export default function Chat({ serverData_chat, serverData_user }: ChatProps) {
  const [globalSelectedData, setGlobalSelectedData] = useState<ChatInterface | null>(null)
  const [chatsData, setChatsData] = useState<ChatInterface[]>(serverData_chat)

  const userChatId = useSearchParams().get("userChatId")

  async function refreshData() {
    const refreshedChatData = await api
      .get<ChatInterface[]>("/chats")
      .then((res) => res.data)
      .catch((err) => [])
    if (JSON.stringify(refreshedChatData) === JSON.stringify(chatsData)) {
      return console.log("Não há novas mensagens")
    } else {
      setChatsData(refreshedChatData)
      return console.log("Nova mensagem")
    }
  }

  useEffect(() => {
    if (userChatId) {
      const data: ChatInterface | any = serverData_chat.find((chat: ChatInterface) => {
        return chat._id === userChatId
      })
      setGlobalSelectedData(data)
    }
    const refreshInterval = setInterval(() => {
      refreshData()
    }, 1000 * 2) // 2 segundos
    return () => {
      clearInterval(refreshInterval)
    }
  }, [])

  const { userType } = useAuth()

  return (
    <main className="w-full h-full bg-white flex items-center justify-center">
      <LeftSide
        userType={userType}
        userData={serverData_user}
        serverData={chatsData}
        setGlobalSelectedData={setGlobalSelectedData}
        globalSelectedData={globalSelectedData}
      />
      <RightSide
        userData={serverData_user}
        globalSelectedData={globalSelectedData}
        setGlobalSelectedData={setGlobalSelectedData}
        userType={userType}
      />
    </main>
  )
}
