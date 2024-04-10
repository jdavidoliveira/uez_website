import { Dispatch, SetStateAction, createContext, useContext } from "react"
import { useState } from "react"
import { IChat } from "@/types/IChat"

export const ChatContext = createContext<{ chat: IChat | null; setChat: Dispatch<SetStateAction<IChat | null>> }>({
  chat: null,
  setChat: () => {},
})

export function ChatProvider({ children }: any) {
  const [chat, setChat] = useState<IChat | null>(null)

  return <ChatContext.Provider value={{ chat, setChat }}>{children}</ChatContext.Provider>
}

export function useChat() {
  return useContext(ChatContext)
}

export default ChatContext
