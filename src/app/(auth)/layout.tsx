import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Autenticação',
  description: 'Autentique-se ou cadastre-se em nossa plataforma, e comece a usar nossos serviços!',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-azulao w-full h-full m-0 flex flex-col items-center box-border">
      <header className="box-border w-full h-[15%] py-5 px-0 flex items-center justify-center">
        <Link href="/" className="h-full">
          <img src="/logo_white.png" alt="Logo_uez" className="h-full" />
        </Link>
      </header>
      <section className="container flex flex-col items-center justify-center h-5/6">
          {children}
      </section>
    </main>
  )
}
