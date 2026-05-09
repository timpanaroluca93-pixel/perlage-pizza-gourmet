import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Menu Eventi | Perlage Pizza & Restaurant",
  description:
    "Organizza compleanni, lauree, cene aziendali ed eventi privati da Perlage Pizza & Restaurant a Catania. Menu eventi personalizzabili e proposte dedicate.",
  alternates: {
    canonical: "https://perlagepizzaerestaurant.it/eventi",
  },
};

const eventMenus = [
  {
    eyebrow: "Per gruppi",
    title: "Menu Base",
    subtitle: "Proposta conviviale per gruppi",
    features: [
      "Antipasti condivisi",
      "Pizza a scelta",
      "Bevanda inclusa",
      "Soluzione semplice e conviviale",
    ],
  },
  {
    eyebrow: "Consigliato",
    title: "Menu Premium",
    subtitle: "Esperienza completa e raffinata",
    featured: true,
    features: [
      "Antipasti gourmet",
      "Pizza o primo",
      "Dolce",
      "Bevande selezionate",
    ],
  },
  {
    eyebrow: "Su misura",
    title: "Menu Experience",
    subtitle: "Percorso personalizzato",
    features: [
      "Percorso completo",
      "Proposta food personalizzata",
      "Abbinamento vini o bollicine",
      "Ideale per eventi speciali",
    ],
  },
];

const eventTypes = [
  "Compleanni",
  "Lauree",
  "Cene aziendali",
  "Anniversari",
  "Ricorrenze",
  "Eventi privati",
];

const whatsappMessage = encodeURIComponent(
  "Ciao Perlage, vorrei informazioni per organizzare un evento. Data: ___ Numero persone: ___ Tipo evento: ___"
);

const whatsappUrl = `https://api.whatsapp.com/send?phone=393892573240&text=${whatsappMessage}`;

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://perlagepizzaerestaurant.it/eventi#event-service",
  name: "Eventi privati da Perlage Pizza & Restaurant",
  serviceType: "Organizzazione eventi privati e menu eventi",
  description:
    "Menu eventi personalizzabili per compleanni, lauree, cene aziendali, anniversari ed eventi privati a Catania.",
  provider: {
    "@type": "Restaurant",
    "@id": "https://perlagepizzaerestaurant.it/#restaurant",
    name: "Perlage Pizza & Restaurant",
  },
  areaServed: {
    "@type": "City",
    name: "Catania",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: whatsappUrl,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Menu Eventi Perlage",
    itemListElement: eventMenus.map((menu) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: menu.title,
        description: menu.subtitle,
      },
    })),
  },
};

export default function EventiMenuPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="fixed inset-0 z-0">
        <Image
          src="/eventi-bg.jpg"
          alt="Eventi Perlage Pizza & Restaurant a Catania"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_42%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(210,176,122,0.16),transparent_34%)]" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/55 px-5 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <a
              href="/"
              className="text-xs uppercase tracking-[0.18em] text-white/60 transition hover:text-[#D2B07A]"
            >
              ← Home
            </a>

            <Image
              src="/logo.png"
              alt="Perlage Pizza & Restaurant"
              width={160}
              height={90}
              className="h-16 w-auto object-contain md:h-24"
              priority
            />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-[#E7C48B] transition hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </header>

        <section className="px-6 py-20 text-center md:py-28">
          <p className="text-xs uppercase tracking-[0.36em] text-[#D2B07A]">
            Perlage Pizza & Restaurant · Catania
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-light leading-[1.05] tracking-wide md:text-7xl">
            <span className="block text-white/90">Menu</span>
            <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
              Eventi Perlage
            </span>
          </h1>

          <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/40 md:text-sm">
            Esperienze · Eventi · Celebrazioni
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/72">
            Proposte dedicate per compleanni, lauree, cene aziendali ed eventi
            privati. Menu personalizzabili in base al numero di persone e allo
            stile della serata.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
            {eventTypes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/35 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-white/55 backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 pt-6">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {eventMenus.map((menu) => (
              <article
                key={menu.title}
                className={`rounded-[2rem] border p-8 shadow-2xl shadow-black/35 backdrop-blur-xl transition duration-300 hover:-translate-y-2 md:p-9 ${
                  menu.featured
                    ? "border-[#D2B07A]/75 bg-[#D2B07A]/[0.08]"
                    : "border-[#D2B07A]/30 bg-black/45"
                }`}
              >
                <p
                  className={`text-xs uppercase tracking-[0.26em] ${
                    menu.featured ? "text-[#D2B07A]" : "text-white/45"
                  }`}
                >
                  {menu.eyebrow}
                </p>

                <h2 className="mt-4 text-3xl font-light text-[#E7C48B] [font-family:var(--font-playfair)]">
                  {menu.title}
                </h2>

                <p className="mt-3 text-lg leading-7 text-white/78">
                  {menu.subtitle}
                </p>

                <ul className="mt-7 space-y-4 text-sm leading-7 text-white/68">
                  {menu.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-[2px] text-[#D2B07A]">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-28">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#D2B07A]/40 bg-black/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-12">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Richiesta evento
            </p>

            <h2 className="mt-4 text-3xl font-light md:text-5xl [font-family:var(--font-playfair)]">
              Costruiamo il menu giusto per te
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              Scrivici indicando data, numero di persone e tipo di evento.
              Ti ricontatteremo per creare una proposta personalizzata per la
              tua occasione da Perlage.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
              >
                Scrivi su WhatsApp
              </a>

              <a
                href="mailto:perlagepizzaerestaurant@outlook.com?subject=Richiesta menu eventi Perlage"
                className="rounded-full border border-[#D2B07A]/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
              >
                Invia email
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}