"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#eventi", label: "Eventi" },
  { href: "#contatti", label: "Contatti" },
];

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=393892573240&text=Ciao%20Perlage%2C%20vorrei%20prenotare%20un%20tavolo.";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      for (const link of navLinks) {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");

            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive
                    ? "text-[#D2B07A]"
                    : "text-white/60 hover:text-[#D2B07A]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/asporto"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-[#D2B07A]/60 hover:text-[#D2B07A]"
          >
            Delivery
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#D2B07A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
          >
            Prenota
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/asporto"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80"
          >
            Delivery
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#D2B07A]"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
          >
            <span className="text-2xl leading-none">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] ${
                    isActive ? "text-[#D2B07A]" : "text-white/75"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href="/asporto"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/75"
            >
              Delivery
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#D2B07A] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black"
            >
              Prenota
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
