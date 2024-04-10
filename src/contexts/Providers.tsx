"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import { GlobalSocketProvider } from "./GlobalSocket"
import { ChatProvider } from "./Chat"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster />
      <ChatProvider>
        <GlobalSocketProvider>{children}</GlobalSocketProvider>
      </ChatProvider>
    </SessionProvider>
  )
}
