import { Dispatch, SetStateAction, createContext, useContext } from "react"
import { useState } from "react"

export const ChatContext = createContext<{ chat: any | null; setChat: Dispatch<SetStateAction<any | null>> }>({
  chat: null,
  setChat: () => {},
})

export function ChatProvider({ children }: any) {
  const [chat, setChat] = useState<any | null>(null)

  return <ChatContext.Provider value={{ chat, setChat }}>{children}</ChatContext.Provider>
}

export function useChat() {
  return useContext(ChatContext)
}

export default ChatContext
