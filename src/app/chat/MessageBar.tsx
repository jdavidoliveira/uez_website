"use client"

import { Banknote, Send } from "lucide-react"
import { useState } from "react"
import EscolherPedidoModal from "./EscolherPedidoModal"
import { useGlobalSocket } from "@/contexts/GlobalSocket"

interface MessageBarProps {
  globalSelectedData: any
  userType: "UZER" | "CLIENTE"
  chatId: string
  setGlobalSelectedData: any
}

export default function MessageBar({ userType, chatId, globalSelectedData, setGlobalSelectedData }: MessageBarProps) {
  const [message, setMessage] = useState("")
  const [showEscolherPedidoModal, setShowEscolherPedidoModal] = useState(false)
  const { globalSocket } = useGlobalSocket()

  async function sendMessage(e: any) {
    e.preventDefault()
    if (!message) {
      return
    }

    if (!globalSocket) {
      console.log("globalSocket not found")
      return
    }

    globalSocket.emit("message", {
      chatId: chatId,
      content: message,
      receiverId: userType === "UZER" ? globalSelectedData?.cliente?.id : globalSelectedData?.uzer?.id,
    })

    setGlobalSelectedData((prev: any) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          ...prev.messages[prev.messages.length - 1],
          content: message,
          type: "TEXT",
          createdAt: new Date().toISOString(),
        },
      ],
    }))

    setMessage("")
    await new Promise((resolve) => setTimeout(resolve, 150))
    scrollToBottom()
    function scrollToBottom() {
      const chatContainer = document.getElementById("chat-container")
      // @ts-ignore
      chatContainer.scrollTop = chatContainer.scrollHeight
    }

    scrollToBottom()
  }
  return (
    <form className="w-full flex border-t items-center justify-between p-2 gap-2 bg-white sticky bottom-0 z-[999]">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite aqui..."
        className="w-full h-10 px-3 py-6 text-lg outline-none"
      />
      <div className="flex gap-2">
        {userType === "UZER" && (
          <button
            type="button"
            onClick={() => setShowEscolherPedidoModal(true)}
            className="bg-azulinho h-12 w-12 hover:bg-azulinho/60 transition-colors text-white p-3 rounded-lg flex items-center justify-center"
            title="Enviar Orçamento"
          >
            <Banknote size={24} />
          </button>
        )}
        <button
          type="submit"
          onClick={sendMessage}
          className="bg-azulinho h-12 w-12 hover:bg-azulinho/60 transition-colors text-white p-3 rounded-lg flex items-center justify-center"
          title="Enviar Mensagem"
        >
          <Send size={24} />
        </button>
      </div>
      {showEscolherPedidoModal && (
        <EscolherPedidoModal
          chatId={chatId}
          closeFunction={() => setShowEscolherPedidoModal(false)}
          idCliente={globalSelectedData.clienteId}
        />
      )}
    </form>
  )
}
