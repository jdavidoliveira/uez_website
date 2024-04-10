import { createContext, useContext } from "react"
import { useState } from "react"
import { Socket } from "socket.io-client"

export const GlobalSocketContext = createContext<{ globalSocket: Socket | null; setGlobalSocket: any }>({
  globalSocket: null,
  setGlobalSocket: () => {},
})

export function GlobalSocketProvider({ children }: any) {
  const [globalSocket, setGlobalSocket] = useState<any>(null)

  return (
    <GlobalSocketContext.Provider value={{ globalSocket, setGlobalSocket }}>{children}</GlobalSocketContext.Provider>
  )
}

export function useGlobalSocket() {
  return useContext(GlobalSocketContext)
}

export default GlobalSocketContext
