import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import MobileBookingBar from "@/components/MobileBookingBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import {
  organizationJsonLd,
  restaurantJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://perlagepizzaerestaurant.it";
const ogImage = `${siteUrl}/perlage-share-final.jpg`;

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Perlage Pizza & Restaurant | Pizzeria Gourmet e Ristorante a Catania",
    template: "%s | Perlage Pizza & Restaurant",
  },

  description:
    "Perlage Pizza & Restaurant è una pizzeria gourmet e ristorante a Catania, in Via Asiago 20. Pizza contemporanea, cucina italiana, carta vini ed eventi privati.",

  keywords: [
    "pizzeria gourmet Catania",
    "ristorante Catania",
    "pizza contemporanea Catania",
    "Perlage Pizza Restaurant",
    "ristorante Via Asiago Catania",
    "eventi privati Catania",
    "menu eventi Catania",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Perlage Pizza & Restaurant | Pizzeria Gourmet a Catania",
    description:
      "Pizza contemporanea, cucina italiana, carta vini ed eventi privati in Via Asiago 20 a Catania.",
    url: "/",
    siteName: "Perlage Pizza & Restaurant",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Sala elegante di Perlage Pizza & Restaurant a Catania",
      },
    ],
    locale: "it_IT",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Perlage Pizza & Restaurant | Pizzeria Gourmet a Catania",
    description:
      "Pizza contemporanea, cucina italiana ed eventi privati in Via Asiago 20 a Catania.",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [restaurantJsonLd, websiteJsonLd, organizationJsonLd];

  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {children}

        <FloatingWhatsApp />
        <MobileBookingBar />
            </body>
    </html>
  );
}