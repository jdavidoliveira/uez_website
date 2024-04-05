"use client"

import Image from "next/image"
import { twMerge } from "tailwind-merge"
import MessageBar from "./MessageBar"
import { useEffect } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import Link from "next/link"
import MessageItem from "./Message"
import { useChat } from "@/contexts/Chat"

interface RightSideProps {
  userType: "UZER" | "CLIENTE"
  userData: any
}

export default function RightSide({ userType, userData }: RightSideProps) {
  const { chat, setChat } = useChat()
  useEffect(() => {
    scrollToBottom()
  }, [chat])
  function scrollToBottom() {
    const chatContainer = document.getElementById("chat-container")
    // @ts-ignore
    if (chatContainer) chatContainer.scrollTop = chatContainer?.scrollHeight
  }

  return chat ? (
    <section
      className={twMerge("md:flex-1 md:flex flex h-full bg-cinzero flex-col relative", chat ? "flex w-full" : "hidden")}
    >
      <header className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-[2] w-full">
        <div className="flex items-center gap-2">
          <Image
            src={userType === "CLIENTE" ? chat?.uzer?.photoUrl : chat?.cliente.photoUrl}
            width={60}
            height={60}
            alt="Icone do Usuario"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col items-start">
            <Link
              title="Abrir Perfil"
              href={userType === "CLIENTE" ? `/uzers/${chat?.uzer?.username}` : `/clientes/${chat?.cliente?.username}`}
              className="text-lg font-bold"
            >
              {userType === "CLIENTE" ? chat?.uzer?.nome : chat?.cliente?.nome}
            </Link>
            <h2 className="text-base font-medium">{userType === "CLIENTE" ? chat?.uzer?.servico?.nome : "Cliente"}</h2>
          </div>
        </div>
        <button
          className="text-base font-bold p-2 bg-azulao rounded-xl text-white flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault()
            setChat(null)
          }}
        >
          <Cross2Icon color="white" width={30} height={30} />
        </button>
      </header>
      <main className="flex-1 overflow-auto py-1 flex flex-col gap-2 relative" id="chat-container">
        <Image
          src="/images/default-chat-background.png"
          priority
          className="h-full md:w-2/3 w-full object-cover fixed top-0"
          width={5144}
          height={5144}
          alt="Background"
        />
        {chat &&
          chat.messages.map((message: any, index: any) => (
            <MessageItem
              key={index}
              {...message}
              userType={userType}
              content={message.content}
              sendHour={message.createdAt.substring(11, 16)}
              userData={userData}
              globalSelectedData={chat}
              type={message.type}
            />
          ))}
      </main>
      <MessageBar chatId={chat.id} userType={userType} />
    </section>
  ) : (
    <main className="flex-1 h-full flex items-center justify-center bg-cinzero">
      <Image src="/logo.svg" width={200} height={200} alt="Logo da UEZ" />
    </main>
  )
}
