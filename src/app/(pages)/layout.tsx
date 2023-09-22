import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'Uez Company',
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
        <Footer />
      </>
  )
}
