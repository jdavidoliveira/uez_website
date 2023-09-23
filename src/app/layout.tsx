import './globals.css'
import Providers from '@/contexts/Providers'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uez Company',
  description: 'Surgiu algum problema e você precisa de ajuda? Então bem-vindo á Uez!',
}

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
