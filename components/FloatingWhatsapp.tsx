const whatsappMessage = encodeURIComponent(
  "Ciao Perlage, vorrei prenotare un tavolo. Data: ___ Ora: ___ Persone: ___"
);

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/393892573240?text=${whatsappMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Prenota su WhatsApp"
      className="fixed bottom-5 right-5 z-[90] rounded-full bg-[#D2B07A] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-2xl shadow-black/40 transition hover:bg-[#E7C48B] md:bottom-8 md:right-8"
    >
      Prenota
    </a>
  );
}