"use client";

import { useEffect, useState } from "react";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=393892573240&text=Ciao%20Perlage%2C%20vorrei%20prenotare%20un%20tavolo.";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Prenota su WhatsApp"
  className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-black/40 ring-1 ring-white/20 transition duration-300 hover:scale-105 md:bottom-7 md:right-7"
>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-white"
      >
        <path d="M16.04 3C8.86 3 3.02 8.74 3.02 15.8c0 2.26.61 4.47 1.77 6.4L3 29l7.03-1.8a13.2 13.2 0 0 0 6.01 1.47c7.18 0 13.02-5.74 13.02-12.8S23.22 3 16.04 3Zm0 23.49c-1.9 0-3.76-.5-5.39-1.44l-.39-.22-4.17 1.07 1.11-4.01-.26-.41a10.44 10.44 0 0 1-1.64-5.68c0-5.85 4.82-10.62 10.74-10.62s10.74 4.77 10.74 10.62-4.82 10.69-10.74 10.69Zm5.89-7.96c-.32-.16-1.9-.92-2.2-1.03-.29-.11-.51-.16-.72.16-.21.32-.83 1.03-1.02 1.24-.19.21-.38.24-.7.08-.32-.16-1.36-.49-2.59-1.56-.96-.84-1.61-1.88-1.8-2.2-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.72-1.71-.99-2.34-.26-.61-.53-.53-.72-.54h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.07-1.12 2.61s1.15 3.03 1.31 3.24c.16.21 2.27 3.41 5.5 4.78.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.9-.76 2.17-1.5.27-.74.27-1.37.19-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}