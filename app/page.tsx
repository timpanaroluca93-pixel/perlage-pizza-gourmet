"use client";

import { useState } from "react";

const menu = [
  {
    category: "Le Montanarine",
    items: [
      { name: "Nord", desc: "Gorgonzola, pera fresca, valeriana, noci e miele.", price: "€12" },
      { name: "Centro", desc: "Crema di pecorino romano, guanciale e pepe nero.", price: "€11" },
      { name: "Sud", desc: "Pomodoro, crema di parmigiano e pesto di basilico.", price: "€10" },
    ],
  },
  {
    category: "I Fritti Perlage",
    items: [
      { name: "Le Patatine Fresche", desc: "Servite con fonduta di Ragusano DOP.", price: "€7" },
      { name: "Lo Gnocco Fritto Perlage", desc: "Servito con Patanegra e stracciatella.", price: "€14" },
      { name: "Il Fritto Misto Perlage", desc: "Dippers, arancinetti, jalapeños e camembert bites.", price: "€12" },
    ],
  },
  {
    category: "Le Pizze Perlage",
    items: [
      { name: "Perlage", desc: "Pesto di pistacchio, stracciatella e crudo siciliano.", price: "€13" },
      { name: "Tre Terre", desc: "Fiordilatte, melanzana arrosto e guanciale croccante.", price: "€13" },
      { name: "Rucola Perlage", desc: "Fiordilatte, crudo, rucola e chips di grana.", price: "€15" },
    ],
  },
];

const gallery = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
  "/gallery7.jpg",
  "/gallery8.jpg",
  "/gallery9.jpg",
  "/gallery10.jpg",
  "/gallery11.jpg",
  "/gallery12.jpg",
  "/gallery13.jpg",
  "/gallery14.jpg",
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#eventi", label: "Eventi" },
  { href: "#contatti", label: "Contatti" },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="Perlage" className="h-24 w-auto object-contain md:h-28" />
          </a>

          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-white/60 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#D2B07A]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
  <a
    href="https://perlage.clickmenu.net"
    target="_blank"
    rel="noreferrer"
    className="rounded-full border border-white/15 px-3 py-2 text-[10px] uppercase text-white/70"
  >
    Delivery
  </a>

  <a
    href="https://wa.me/393892573240"
    target="_blank"
    rel="noreferrer"
    className="rounded-full bg-[#D2B07A] px-3 py-2 text-[10px] uppercase text-black"
  >
    Prenota
  </a>
</div>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#D2B07A] md:hidden"
            aria-label="Apri menu"
          >
            <span className="text-2xl leading-none">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] text-white/75"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="https://wa.me/393892573240"
                target="_blank"
                rel="noreferrer"
                className="mt-3 rounded-full bg-[#D2B07A] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black"
              >
                Prenota
              </a>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[82vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero4.jpg" alt="Perlage" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.48)_45%,rgba(0,0,0,0.25)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(210,176,122,0.12),transparent_38%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Perlage Pizza & Restaurant
            </p>

            <h1 className="mt-8 text-5xl font-light leading-[1.05] tracking-wide md:text-7xl">
              <span className="block text-white/95">Tre terre,</span>
              <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
                un solo viaggio.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">
              Pizza contemporanea, cucina italiana e atmosfera ricercata nel cuore di Catania.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#prenotazione"
                className="rounded-full bg-[#D2B07A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
              >
                Prenota
              </a>

              <a
                href="/menu"
                className="rounded-full border border-[#D2B07A]/60 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
              >
                Menu completo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              La nostra identità
            </p>
            <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl [font-family:var(--font-playfair)]">
              Tradizione, ricerca e gusto contemporaneo.
            </h2>
          </div>

          <p className="max-w-3xl text-lg leading-9 text-white/65">
            Una proposta costruita su ingredienti selezionati, impasti curati e abbinamenti pensati per raccontare Nord, Centro e Sud in chiave Perlage.
          </p>
        </div>
      </section>

      <section id="gallery" className="border-y border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">Gallery</p>
              <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Atmosfera Perlage
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-white/60">
              Dettagli, piatti e momenti pensati per raccontare l’esperienza del locale.
            </p>
          </div>

          <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gallery.map((src, i) => {
              const large = i === 0 || i === 4 || i === 9 || i === 13;

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelectedImage(src)}
                  className={`group overflow-hidden rounded-[2rem] bg-white/[0.03] ${
                    large ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`Perlage gallery ${i + 1}`}
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="menu" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">Menu</p>
              <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Una selezione firmata Perlage
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-white/65">
                Un assaggio della carta: montanarine, fritti gourmet e pizze identitarie.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="/menu"
                  className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
                >
                  Vedi menu completo
                </a>

                <a
                  href="/menu#vini"
                  className="rounded-full border border-[#D2B07A]/50 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
                >
                  Carta dei vini
                </a>
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {menu.map((section) => (
              <div key={section.category} className="grid gap-8 py-10 md:grid-cols-[0.45fr_1fr]">
                <h3 className="text-3xl font-light text-[#E7C48B] [font-family:var(--font-playfair)]">
                  {section.category}
                </h3>

                <div className="space-y-7">
                  {section.items.map((item) => (
                    <div key={item.name} className="grid gap-3 md:grid-cols-[1fr_auto] md:gap-8">
                      <div>
                        <h4 className="text-lg font-medium text-white/90">{item.name}</h4>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/55">{item.desc}</p>
                      </div>

                      <p className="text-[#D2B07A]">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="eventi" className="border-y border-white/10 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">Eventi</p>
              <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Celebrazioni private, cene e ricorrenze.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-9 text-white/65">
                Compleanni, lauree, cene aziendali ed eventi privati in un ambiente elegante, con proposte dedicate e menu personalizzabili.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {["Compleanni", "Lauree", "Cene aziendali"].map((item) => (
                  <div key={item} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-xl text-[#E7C48B] [font-family:var(--font-playfair)]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/eventi"
                  className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
                >
                  Menu eventi
                </a>

                <a
                  href="https://wa.me/393892573240"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#D2B07A]/50 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
                >
                  Richiedi informazioni
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contatti" className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">Contatti</p>
            <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
              Vieni a trovarci
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="space-y-4 text-lg leading-8 text-white/70">
                <p>Via Asiago 20, Catania</p>
                <p>389 2573240</p>
                <p className="break-all">perlagepizzaerestaurant@outlook.com</p>
                <p>Tutti i giorni 19:00 – 01:00</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.instagram.com/perlagepizzagourmet/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-sm text-white/70 hover:text-[#D2B07A]">
                  Instagram
                </a>
                <a href="https://www.facebook.com/perlagepizzagourmetcatania/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-sm text-white/70 hover:text-[#D2B07A]">
                  Facebook
                </a>
                <a href="https://share.google/xPnHd6Sv6HlTQn7Zq" target="_blank" rel="noreferrer" className="rounded-full border border-[#D2B07A]/40 px-4 py-3 text-sm text-[#E7C48B]">
                  Google Maps
                </a>
              </div>
            </div>

            <div id="prenotazione" className="rounded-[2rem] border border-[#D2B07A]/30 bg-[#D2B07A]/[0.06] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
                Prenotazione
              </p>

              <h3 className="mt-4 text-3xl font-light [font-family:var(--font-playfair)]">
                Prenota il tuo tavolo
              </h3>

              <p className="mt-5 leading-8 text-white/65">
                Contattaci direttamente su WhatsApp oppure via email.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="https://wa.me/393892573240" target="_blank" rel="noreferrer" className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]">
                  WhatsApp
                </a>

                <a href="mailto:perlagepizzaerestaurant@outlook.com" className="rounded-full border border-[#D2B07A]/50 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <img src="/logo.png" alt="Perlage footer logo" className="h-14 w-auto object-contain" />

          <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-white/45">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[#D2B07A]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-h-[90vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-4 py-2 text-sm text-white ring-1 ring-white/20">
              Chiudi
            </button>

            <img src={selectedImage} alt="Perlage gallery enlarged" className="max-h-[90vh] max-w-full rounded-2xl object-contain" />
          </div>
        </div>
      )}
    </main>
  );
}