import './globals.css'
import Providers from '@/contexts/Providers'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    template: '%s | Uez Company',
    default: 'Uez Company',
  },
  description: 'Surgiu algum problema e você precisa de ajuda? Então bem-vindo á Uez!',
  keywords: 'UEZ',
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
        <head>
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </head>
        <body className={montserrat.className} suppressHydrationWarning={true}>
          {children}
          <Analytics />
        </body>
      </Providers>
    </html>
  )
}
