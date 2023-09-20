import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticação',
  description: 'Surgiu algum problema e você precisa de ajuda? Então bem-vindo á Uez!',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
