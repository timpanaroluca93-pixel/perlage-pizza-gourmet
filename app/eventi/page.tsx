export default function EventiMenuPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <div className="fixed inset-0 z-0">
        <img
          src="/eventi-bg.jpg"
          alt="Eventi Perlage"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
       <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.7)_100%)]" />      </div>

      <div className="relative z-10">
        <header className="border-b border-white/10 px-6 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <a href="/" className="text-sm uppercase tracking-[0.18em] text-white/60">
              ← Home
            </a>

            <img src="/logo.png" alt="Perlage" className="h-32 w-auto object-contain" />

            <a
              href="https://wa.me/393892573240"
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-[0.18em] text-[#E7C48B]"
            >
              WhatsApp
            </a>
          </div>
        </header>

        <section className="px-6 py-24 text-center md:py-28">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D2B07A]">
            Perlage Pizza & Restaurant
          </p>

          <h1 className="mt-6 text-5xl font-light tracking-wide md:text-7xl">
  <span className="block text-4xl text-white/90 md:text-6xl">Menu</span>
  <span className="block font-serif italic text-[#D2B07A] tracking-wide [font-family:var(--font-playfair)]">
    Eventi Perlage
  </span>
</h1>
<p className="mt-4 text-sm uppercase tracking-[0.4em] text-white/40">
  Esperienze • Eventi • Celebrazioni
</p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Proposte dedicate per compleanni, lauree, cene aziendali ed eventi
            privati. Menu personalizzabili in base al numero di persone.
          </p>
        </section>

        <section className="px-6 pb-20 pt-8">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-[#D2B07A]/40 bg-white/[0.04] p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-4 hover:scale-105 hover:border-[#D2B07A] hover:bg-[#D2B07A]/10 hover:shadow-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Per gruppi
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#E7C48B]">
                Menu Base
              </h2>

              <p className="mt-2 text-xl text-white/85">
                a partire da €20 a persona
              </p>

              <ul className="mt-6 space-y-3 text-white/75">
                <li>• Antipasti condivisi</li>
                <li>• Pizza a scelta</li>
                <li>• Bevanda inclusa</li>
                <li>• Soluzione semplice e conviviale</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#D2B07A]/70 bg-white/[0.05] p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-4 hover:scale-105 hover:border-[#D2B07A] hover:bg-[#D2B07A]/15 hover:shadow-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D2B07A]">
                Consigliato
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#E7C48B]">
                Menu Premium
              </h2>

              <p className="mt-2 text-xl text-white/85">
                a partire da €24 a persona
              </p>

              <ul className="mt-6 space-y-3 text-white/75">
                <li>• Antipasti gourmet</li>
                <li>• Pizza o primo</li>
                <li>• Dolce</li>
                <li>• Bevande selezionate</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#D2B07A]/40 bg-white/[0.04] p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-4 hover:scale-105 hover:border-[#D2B07A] hover:bg-[#D2B07A]/10 hover:shadow-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Su misura
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#E7C48B]">
                Menu Experience
              </h2>

              <p className="mt-2 text-xl text-white/85">
                a partire da €28 a persona
              </p>

              <ul className="mt-6 space-y-3 text-white/75">
                <li>• Percorso completo</li>
                <li>• Proposta food personalizzata</li>
                <li>• Abbinamento vini o bollicine</li>
                <li>• Ideale per eventi speciali</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl rounded-3xl border border-[#D2B07A]/40 bg-white/[0.05] p-8 backdrop-blur-md md:p-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D2B07A]">
              Richiesta evento
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Costruiamo il menu giusto per te
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
              Scrivici indicando data, numero di persone e tipo di evento.
              Ti ricontatteremo per creare una proposta personalizzata.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/393892573240"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black"
              >
                Scrivi su WhatsApp
              </a>

              <a
                href="mailto:perlagepizzaerestaurant@outlook.com?subject=Richiesta menu eventi Perlage"
                className="rounded-2xl border border-[#D2B07A]/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B]"
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