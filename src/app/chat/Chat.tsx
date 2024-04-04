"use client"

import { useEffect, useState } from "react"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import { useSearchParams } from "next/navigation"
import { Socket, io } from "socket.io-client"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { useGlobalSocket } from "@/contexts/GlobalSocket"

interface ChatProps {
  chatData: any
  userData: User
}

export default function Chat({ chatData, userData }: ChatProps) {
  const [globalSelectedData, setGlobalSelectedData] = useState<any | null>(null)
  const [chatsData, setChatsData] = useState<any[]>(chatData)
  const [isOnline, setIsOnline] = useState(false)

  const { setGlobalSocket } = useGlobalSocket()
  const userChatIdSearchParams = useSearchParams().get("userChatId")

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333", {
      auth: {
        token: parseCookies().token,
      },
      autoConnect: true,
      reconnection: false,
    })

    setGlobalSocket(socket)

    socket.on("connect", () => {
      console.log("Conectado!", socket.id)
      if (socket.connected) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    })

    socket.emit("join", chatData?.id)

    socket.on(
      "message",
      (data: {
        id: string
        type: "TEXT" | "IMAGE" | "URL"
        content: string
        createdAt: Date
        readed: boolean
        senderId: string
        receiverId: string
        idChat: string
      }) => {
        console.log("Nova mensagem:", data)
        setChatsData((prevChats: any) => {
          return prevChats.map((chat: any) => {
            if (chat.id === data.idChat) {
              return {
                ...chat,
                messages: [...chat.messages, data],
              }
            } else {
              return chat
            }
          })
        })
      }
    )

    if (userChatIdSearchParams) {
      const data: any = chatData.find((chat: any) => {
        return chat.id === userChatIdSearchParams
      })
      setGlobalSelectedData(data)
    }

    return () => {
      socket.disconnect()
    }
  }, [])

  const { data } = useSession()

  return isOnline && data ? (
    <main className="w-full h-full bg-white flex items-center justify-center">
      <LeftSide
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
        userType={userData.userType}
      />
    </main>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-xl font-bold">Conectando...</h1>
    </div>
  )
}
