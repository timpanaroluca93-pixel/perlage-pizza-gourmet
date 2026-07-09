import Link from "next/link";
import Navbar from "@/components/home/Navbar";

export default function LeSeratePerlagePage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[url('/eventi-bg.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#D2B07A]">
            Ogni mercoledì
          </p>

          <h1 className="font-playfair text-5xl md:text-7xl">
            Le Serate Perlage
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Un appuntamento settimanale dedicato ai sapori di Perlage, con due
            percorsi tra cui scegliere: pizzeria gourmet o cucina.
          </p>

          <Link
            href="/prenotazioni"
            className="mt-10 inline-flex rounded-full bg-[#D2B07A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-[#E7C48B]"
          >
            Prenota il tuo tavolo
          </Link>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Due percorsi
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl">
              Un’unica esperienza
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/65">
              Scegli il percorso che preferisci e vivi il mercoledì da Perlage
              con atmosfera elegante, menu dedicato e servizio curato.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-[#D2B07A]/30 bg-white/[0.04] p-8 shadow-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#D2B07A]">
                Percorso Pizzeria
              </p>
              <h3 className="font-playfair text-4xl">€25</h3>

              <ul className="mt-8 space-y-4 text-white/75">
                <li>✓ Montanarina gourmet a scelta</li>
                <li>✓ Pizza a scelta dal menu</li>
                <li>✓ Tiramisù della casa</li>
                <li>✓ Acqua</li>
                <li>✓ Birra Messina 40 cl oppure calice di vino</li>
                <li>✓ Caffè</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#D2B07A]/30 bg-white/[0.04] p-8 shadow-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#D2B07A]">
                Percorso Cucina
              </p>
              <h3 className="font-playfair text-4xl">€30</h3>

              <ul className="mt-8 space-y-4 text-white/75">
                <li>✓ Crocchetta al tartufo</li>
                <li>✓ Pacchero alla Norma oppure petto di pollo ai ferri</li>
                <li>✓ Tiramisù della casa</li>
                <li>✓ Acqua</li>
                <li>✓ Birra Messina 40 cl oppure calice di vino</li>
                <li>✓ Caffè</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#D2B07A]/40 bg-[#D2B07A]/10 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
            Prenotazione obbligatoria
          </p>

          <h2 className="mt-4 font-playfair text-3xl md:text-4xl">
            Le Serate Perlage si svolgono esclusivamente su prenotazione.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Per garantire la migliore esperienza e un servizio curato in ogni
            dettaglio, i posti sono limitati. Ti consigliamo di riservare il tuo
            tavolo con anticipo.
          </p>

          <Link
            href="/prenotazioni"
            className="mt-8 inline-flex rounded-full bg-[#D2B07A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-[#E7C48B]"
          >
            Prenota ora
          </Link>
        </div>
      </section>
    </main>
  );
}