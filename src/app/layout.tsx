import './globals.css'
import Providers from '@/contexts/Providers'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Uez Company',
    default: 'Uez Company',
  },
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
      <Providers>
        <body className={montserrat.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </Providers>
    </html>
  )
}
