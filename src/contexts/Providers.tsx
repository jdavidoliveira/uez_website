"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import { GlobalSocketProvider } from "./GlobalSocket"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster />
      <GlobalSocketProvider>{children}</GlobalSocketProvider>
    </SessionProvider>
  )
}
