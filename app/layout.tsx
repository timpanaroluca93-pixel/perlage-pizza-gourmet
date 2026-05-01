import './globals.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: 'Perlage Pizza & Restaurant',
  description: 'Perlage Pizza Gourmet a Catania',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`min-h-screen flex flex-col bg-[#0A0A0A] text-white ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}