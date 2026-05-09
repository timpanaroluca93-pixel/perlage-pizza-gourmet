const siteUrl = "https://perlagepizzaerestaurant.it";

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: "Perlage Pizza & Restaurant",
  alternateName: "Perlage Pizza Gourmet",
  url: siteUrl,
  image: [`${siteUrl}/perlage-share-final.jpg`],
  logo: `${siteUrl}/logo.png`,
  telephone: "+393892573240",
  email: "perlagepizzaerestaurant@outlook.com",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Debit Card",
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
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://wa.me/393892573240?text=Ciao%20Perlage%2C%20vorrei%20prenotare%20un%20tavolo.",
      inLanguage: "it-IT",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Perlage Pizza & Restaurant",
  url: siteUrl,
  inLanguage: "it-IT",
  publisher: {
    "@id": `${siteUrl}/#restaurant`,
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Perlage Pizza & Restaurant",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://www.instagram.com/perlagepizzagourmet/",
    "https://www.facebook.com/perlagepizzagourmetcatania/",
  ],
};