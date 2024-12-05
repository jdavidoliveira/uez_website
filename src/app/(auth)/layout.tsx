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
    <main className="m-0 box-border flex min-h-full w-full flex-col items-center overflow-auto bg-azulao mobile:bg-white">
      <header className="box-border flex h-[15%] w-full items-center justify-center px-0 py-5 mobile:mt-4 mobile:py-2">
        <Link href="/" className="h-full">
          <Image
            width={200}
            height={200}
            src="/logo/full-logo.svg"
            alt="Logo_uez"
            className="h-full w-auto invert mobile:invert-0"
          />
        </Link>
      </header>
      <section className="flex h-full w-full flex-col items-center justify-center">{children}</section>
    </main>
  )
}
