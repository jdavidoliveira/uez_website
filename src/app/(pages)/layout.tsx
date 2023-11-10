import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    template: '%s | Uez Company',
    default: 'Uez Company',
  },
  description: 'Surgiu algum problema e você precisa de ajuda? Então bem-vindo á Uez!',
}

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Link title="SAC" href="https://api.whatsapp.com/send?phone=5521982964498&text=SERVI%C3%87O%20DE%20ATENDIMENTO%20DA%20UEZCOMPANY" target='_blank' className='fixed bottom-8 bg-emerald-500 right-4 rounded-full w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer animate-pulse'>
        <Phone color='white' size={30} />
      </Link>
      <Footer />
    </>
  )
}
