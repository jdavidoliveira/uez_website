"use client"

import { useEffect, useState } from "react"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import ChatInterface from "@/types/Chat"
import { useAuth } from "@/contexts/Auth"
import { useSearchParams } from "next/navigation"
import api from "@/lib/api"
import { io } from "socket.io-client"
import { Session, User } from "next-auth"
import { useSession } from "next-auth/react"

interface ChatProps {
  chatData: any
  userData: User
}

export default function Chat({ chatData, userData: userData }: ChatProps) {
  const [globalSelectedData, setGlobalSelectedData] = useState<ChatInterface | null>(null)
  const [chatsData, setChatsData] = useState<any[]>(chatData)

  const userChatId = useSearchParams().get("userChatId")

  // async function refreshData() {
  //   const refreshedChatData = await api
  //     .get<ChatInterface[]>("/chats")
  //     .then((res) => res.data)
  //     .catch((err) => [])
  //   if (JSON.stringify(refreshedChatData) === JSON.stringify(chatsData)) {
  //     return console.log("Não há novas mensagens")
  //   } else {
  //     setChatsData(refreshedChatData)
  //     return console.log("Nova mensagem")
  //   }
  // }

  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333")

    socket.on("connect", () => {
      console.log("Conectado!", socket.id)
      if (socket.connected) {
        setIsOnline(true)
      }
    })

    if (userChatId) {
      const data: ChatInterface | any = chatData.find((chat: any) => {
        return chat.id === userChatId
      })
      setGlobalSelectedData(data)
    }
    return () => {
      socket.disconnect()
    }
  }, [])

  const { data } = useSession()

  if (!data) return <div>Offline</div>

  const userType = data.user.userType

  return isOnline ? (
    <main className="w-full h-full bg-white flex items-center justify-center">
      <LeftSide
        userType={userType}
        userData={userData}
        serverData={chatsData}
        setGlobalSelectedData={setGlobalSelectedData}
        globalSelectedData={globalSelectedData}
        isOnline
      />
      <RightSide
        userData={userData}
        globalSelectedData={globalSelectedData}
        setGlobalSelectedData={setGlobalSelectedData}
        userType={userType}
      />
    </main>
  ) : (
    <div>Offline</div>
  )
}
