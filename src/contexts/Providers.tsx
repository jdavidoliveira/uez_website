"use client"

import { AuthProvider } from "./Auth"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
