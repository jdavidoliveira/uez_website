import { useAuth } from '@/contexts/Auth'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Autenticação',
  },
  description: 'Autentique-se ou cadastre-se em nossa plataforma, e comece a usar nossos serviços!',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className="bg-azulao w-full h-full m-0 flex flex-col items-center box-border mobile:bg-white">
      <header className="box-border w-full h-[15%] py-5 px-0 flex items-center justify-center mobile:py-2 mobile:mt-4">
        <Link href="/" className="h-full">
          <img src="/logo_white.png" alt="Logo_uez" className="h-full mobile:invert" />
        </Link>
      </header>
      <section className="w-full h-full flex flex-col items-center justify-center">
        {children}
      </section>
    </main>
  )
}
