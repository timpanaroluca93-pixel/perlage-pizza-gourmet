import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://perlagepizzaerestaurant.it";
const ogImage = `${siteUrl}/perlage-share-final.jpg?v=99`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Perlage Pizza & Restaurant | Pizzeria Gourmet e Ristorante a Catania",
    template: "%s | Perlage Pizza & Restaurant",
  },

  description:
    "Perlage Pizza & Restaurant è una pizzeria gourmet e ristorante a Catania, in Via Asiago 20. Pizza contemporanea, cucina italiana, carta vini ed eventi privati.",

  keywords: [
    "Perlage Pizza Restaurant",
    "Perlage Catania",
    "pizzeria gourmet Catania",
    "ristorante Catania",
    "pizza contemporanea Catania",
    "pizza gourmet Catania",
    "ristorante Via Asiago Catania",
    "eventi privati Catania",
    "menu eventi Catania",
    "carta vini Catania",
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Perlage Pizza & Restaurant | Pizzeria Gourmet a Catania",
    description:
      "Pizza contemporanea, cucina italiana, carta vini ed eventi privati in Via Asiago 20 a Catania.",
    url: siteUrl,
    siteName: "Perlage Pizza & Restaurant",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Perlage Pizza & Restaurant a Catania",
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

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: "Perlage Pizza & Restaurant",
  url: siteUrl,
  image: ogImage,
  logo: `${siteUrl}/logo.png`,
  telephone: "+393892573240",
  email: "perlagepizzaerestaurant@outlook.com",
  priceRange: "€€",
  servesCuisine: [
    "Pizza gourmet",
    "Pizza contemporanea",
    "Cucina italiana",
    "Ristorante italiano",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Asiago 20",
    addressLocality: "Catania",
    addressRegion: "Sicilia",
    postalCode: "95127",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.5227,
    longitude: 15.0966,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "19:00",
      closes: "01:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/perlagepizzagourmet/",
    "https://www.facebook.com/perlagepizzagourmetcatania/",
  ],
  hasMenu: `${siteUrl}/menu`,
  acceptsReservations: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}