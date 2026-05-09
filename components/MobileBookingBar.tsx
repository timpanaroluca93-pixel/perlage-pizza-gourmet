"use client";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=393892573240&text=Ciao%20Perlage%2C%20vorrei%20prenotare%20un%20tavolo.";

export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[#D2B07A]/20 bg-black/90 px-4 py-3 backdrop-blur-xl md:hidden">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-full bg-[#D2B07A] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-2xl shadow-black/40"
      >
        Prenota un tavolo
      </a>
    </div>
  );
}