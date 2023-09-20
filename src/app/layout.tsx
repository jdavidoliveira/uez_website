import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uez Company',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
