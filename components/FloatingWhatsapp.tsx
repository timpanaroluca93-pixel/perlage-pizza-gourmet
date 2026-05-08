"use client";

import { motion } from "framer-motion";

const whatsappMessage = encodeURIComponent(
  "Ciao Perlage, vorrei prenotare un tavolo. Data: ___ Ora: ___ Persone: ___"
);

export default function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 1,
      }}
      className="fixed bottom-4 right-4 z-[90] md:bottom-8 md:right-8"
    >
      <a
        href={`https://wa.me/393892573240?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Prenota su WhatsApp"
        className="group flex items-center gap-3 rounded-full border border-[#D2B07A]/40 bg-black/75 px-5 py-4 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D2B07A] hover:bg-[#111111]"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D2B07A] text-black transition-transform duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M19.11 17.39c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.14-.19.29-.74.92-.91 1.11-.17.19-.33.22-.62.07-.29-.14-1.2-.44-2.29-1.41-.85-.75-1.43-1.68-1.6-1.97-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.08 4.89 4.31.68.29 1.21.46 1.62.59.68.22 1.29.19 1.78.12.54-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
            <path d="M16.01 3.2c-7.05 0-12.77 5.72-12.77 12.77 0 2.25.59 4.45 1.71 6.39L3 29l6.83-1.79a12.72 12.72 0 006.18 1.58h.01c7.05 0 12.77-5.72 12.77-12.77S23.06 3.2 16.01 3.2zm0 23.3h-.01a10.5 10.5 0 01-5.35-1.46l-.38-.23-4.05 1.06 1.08-3.95-.25-.41a10.48 10.48 0 01-1.61-5.49c0-5.8 4.72-10.52 10.53-10.52 2.81 0 5.45 1.09 7.44 3.08a10.45 10.45 0 013.08 7.44c0 5.8-4.72 10.52-10.52 10.52z" />
          </svg>
        </div>

        <div className="hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            Prenotazione
          </p>

          <p className="mt-1 text-sm font-medium text-[#E7C48B]">
            Scrivici su WhatsApp
          </p>
        </div>
      </a>
    </motion.div>
  );
}