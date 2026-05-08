"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-black/85 shadow-2xl shadow-black/30 backdrop-blur-xl"
            : "border-transparent bg-black/35 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <a href="#home" onClick={() => setMenuOpen(false)} className="shrink-0">
            <Image
              src="/logo.png"
              alt="Perlage Pizza & Restaurant"
              width={240}
              height={140}
              priority
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled ? "h-12 md:h-20" : "h-14 md:h-28"
              }`}
            />
          </a>

          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-white/60 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#D2B07A]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://perlage.clickmenu.net"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-[#D2B07A]/60 hover:text-[#D2B07A]"
            >
              Delivery
            </a>

            <a
              href="https://wa.me/393892573240"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#D2B07A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
            >
              Prenota
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="https://perlage.clickmenu.net"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80"
            >
              Delivery
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#D2B07A]"
              aria-label="Apri menu"
            >
              <span className="text-2xl leading-none">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
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
                href="https://perlage.clickmenu.net"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/75"
              >
                Delivery
              </a>

              <a
                href="https://wa.me/393892573240"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#D2B07A] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black"
              >
                Prenota
              </a>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[86vh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="h-full w-full scale-[1.02] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero4.jpg"
          >
            <source src="/perlage-hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/34" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.34)_42%,rgba(0,0,0,0.10)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_40%,rgba(210,176,122,0.24),transparent_36%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.38)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl items-center px-6 py-20">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                Perlage Pizza & Restaurant · Catania
              </p>

              <h1 className="mt-8 text-5xl font-light leading-[1.05] tracking-wide md:text-7xl">
                <span className="block text-white/95">Pizza contemporanea</span>
                <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
                  e cucina italiana d’autore.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">
                A Catania, in Via Asiago, Perlage unisce impasti ricercati,
                ingredienti selezionati, cucina italiana e un’atmosfera elegante
                pensata per cene, eventi e momenti speciali.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#prenotazione"
                  className="rounded-full bg-[#D2B07A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
                >
                  Prenota un tavolo
                </a>

                <a
                  href="/menu"
                  className="rounded-full border border-[#D2B07A]/60 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
                >
                  Menu completo
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FadeIn delay={0.1}>
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                L’esperienza Perlage
              </p>

              <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl [font-family:var(--font-playfair)]">
                Un ristorante contemporaneo nel cuore di Catania.
              </h2>
            </div>

            <p className="max-w-3xl text-lg leading-9 text-white/65">
              Perlage Pizza & Restaurant nasce per trasformare la cena in un
              percorso di gusto: pizze contemporanee, cucina italiana, vini
              selezionati e dettagli pensati per offrire un’esperienza raffinata
              ma accogliente.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section id="gallery" className="border-y border-white/10 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                  Gallery
                </p>

                <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                  Atmosfera Perlage
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-white/60">
                Dettagli, piatti e momenti pensati per raccontare l’esperienza
                del locale: eleganza, convivialità e gusto contemporaneo.
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
                    className={`group relative overflow-hidden rounded-[2rem] bg-white/[0.03] ${
                      large ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                    aria-label={`Apri immagine gallery Perlage ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`Perlage Pizza & Restaurant gallery ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section id="menu" className="px-6 py-28">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Menu
            </p>

            <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
              Scopri il nostro menu completo
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Dalle pizze gourmet agli antipasti territoriali, dai fritti alle
              proposte di cucina: il menu Perlage è pensato come un viaggio tra
              Nord, Centro e Sud Italia.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/menu"
                className="rounded-full bg-[#D2B07A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
              >
                Vedi menu completo
              </a>

              <a
                href="/menu#vini"
                className="rounded-full border border-[#D2B07A]/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
              >
                Carta vini
              </a>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section id="eventi" className="border-y border-white/10 px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                  Eventi
                </p>

                <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                  Celebrazioni private, cene e ricorrenze.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-9 text-white/65">
                  Organizziamo compleanni, lauree, cene aziendali, anniversari
                  ed eventi privati in un ambiente curato, con menu dedicati e
                  soluzioni personalizzate per ogni occasione.
                </p>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {["Compleanni", "Lauree", "Eventi privati"].map((item) => (
                    <div
                      key={item}
                      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
                    >
                      <p className="text-xl text-[#E7C48B] [font-family:var(--font-playfair)]">
                        {item}
                      </p>
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
      </FadeIn>

      <FadeIn delay={0.15}>
        <section id="contatti" className="px-6 py-28">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                Contatti
              </p>

              <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Ristorante e pizzeria gourmet a Catania
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                <div className="space-y-4 text-lg leading-8 text-white/70">
                  <p>Perlage Pizza & Restaurant</p>
                  <p>Via Asiago 20, Catania</p>
                  <p>Tel. 389 2573240</p>
                  <p className="break-all">perlagepizzaerestaurant@outlook.com</p>
                  <p>Aperti tutti i giorni dalle 19:00 alle 01:00</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://www.instagram.com/perlagepizzagourmet/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-3 text-sm text-white/70 hover:text-[#D2B07A]"
                  >
                    Instagram
                  </a>

                  <a
                    href="https://www.facebook.com/perlagepizzagourmetcatania/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-3 text-sm text-white/70 hover:text-[#D2B07A]"
                  >
                    Facebook
                  </a>

                  <a
                    href="https://share.google/xPnHd6Sv6HlTQn7Zq"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#D2B07A]/40 px-4 py-3 text-sm text-[#E7C48B]"
                  >
                    Google Maps
                  </a>
                </div>
              </div>

              <div
                id="prenotazione"
                className="rounded-[2rem] border border-[#D2B07A]/30 bg-[#D2B07A]/[0.06] p-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
                  Prenotazione
                </p>

                <h3 className="mt-4 text-3xl font-light [font-family:var(--font-playfair)]">
                  Prenota il tuo tavolo
                </h3>

                <p className="mt-5 leading-8 text-white/65">
                  Riserva la tua esperienza da Perlage Pizza & Restaurant.
                  Contattaci direttamente su WhatsApp oppure via email.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/393892573240"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
                  >
                    WhatsApp
                  </a>

                  <a
                    href="mailto:perlagepizzaerestaurant@outlook.com"
                    className="rounded-full border border-[#D2B07A]/50 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Image
            src="/logo.png"
            alt="Perlage Pizza & Restaurant footer logo"
            width={180}
            height={100}
            className="h-14 w-auto object-contain"
          />

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
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative h-[90vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-4 py-2 text-sm text-white ring-1 ring-white/20"
            >
              Chiudi
            </button>

            <Image
              src={selectedImage}
              alt="Immagine Perlage Pizza & Restaurant ingrandita"
              fill
              sizes="100vw"
              className="rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}