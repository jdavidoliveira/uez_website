import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Autenticação",
  },
  description: "Autentique-se ou cadastre-se em nossa plataforma, e comece a usar nossos serviços!",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-azulao w-full min-h-full m-0 flex flex-col items-center box-border overflow-auto mobile:bg-white">
      <section className="w-full h-full flex flex-col items-center justify-center">{children}</section>
    </main>
  )
}
