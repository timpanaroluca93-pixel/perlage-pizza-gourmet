import './globals.css'
import { Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.perlagepizzaerestaurant.it'),

  title: 'Perlage Pizza & Restaurant | Pizza Gourmet a Catania',
  description:
    'Perlage Pizza & Restaurant a Catania: pizza gourmet, ingredienti selezionati, menu eventi e sapori ricercati.',

  openGraph: {
    title: 'Perlage Pizza & Restaurant | Pizza Gourmet a Catania',
    description:
      'Pizza gourmet a Catania con ingredienti selezionati e menu eventi.',
    url: 'https://www.perlagepizzaerestaurant.it',
    siteName: 'Perlage Pizza & Restaurant',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Perlage Pizza & Restaurant - Pizza Gourmet a Catania',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Perlage Pizza & Restaurant | Pizza Gourmet a Catania',
    description:
      'Pizza gourmet a Catania con ingredienti selezionati e menu eventi.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="it">
      <body
        className={`${playfair.variable} min-h-screen flex flex-col bg-[#0A0A0A] text-white`}
      >
        {children}
      </body>
    </html>
  )
}