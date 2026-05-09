import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Asporto & Delivery | Perlage Pizza & Restaurant",
  description:
    "Ordina pizze gourmet, burger, scacciate e specialità Perlage direttamente a casa tua a Catania.",
};

const gourmetPizzas = [
  {
    name: "La Datterina",
    price: "€14",
    desc: "Pomodorino giallo del piennolo, prosciutto di suino nero, stracciatella e cipolla di Tropea.",
  },
  {
    name: "Rucola Perlage",
    price: "€16",
    desc: "Prosciutto crudo siciliano, datterino semidry, emulsione di rucola e tartufo nero.",
  },
  {
    name: "L’Ariccia",
    price: "€13.50",
    desc: "Crema di patate, porchetta d’Ariccia, cipolla caramellata e chips di grana.",
  },
  {
    name: "Semidry",
    price: "€13",
    desc: "Pesto di zucchine, stracciatella, speck siciliano e datterino semidry.",
  },
  {
    name: "Tartufina",
    price: "€14",
    desc: "Mozzarella fiordilatte, scaglie di grana e tartufo nero.",
  },
];

const burgers = [
  {
    name: "Perlage Burger",
    price: "€14.50",
  },
  {
    name: "L’Affumicato",
    price: "€13",
  },
  {
    name: "Double Burger",
    price: "€14",
  },
  {
    name: "Salmon Burger",
    price: "€14",
  },
];

const whatsappUrl =
  "https://wa.me/393892573240?text=Ciao%20Perlage,%20vorrei%20ordinare%20da%20asporto";

export default function AsportoPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Image
          src="/gallery7.jpg"
          alt="Perlage Delivery"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,176,122,0.18),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D2B07A]">
            Perlage Pizza & Restaurant
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-light leading-[1.05] md:text-7xl">
            Asporto &
            <span className="block italic text-[#D2B07A]">
              Delivery Gourmet
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/75">
            Pizza contemporanea, burger gourmet, scacciate e specialità
            siciliane direttamente a casa tua.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#D2B07A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#E7C48B]"
            >
              Ordina Ora
            </a>

            <a
              href="/menu"
              className="rounded-full border border-white/20 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:border-[#D2B07A]"
            >
              Menu Sala
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Gourmet Selection
            </p>

            <h2 className="mt-4 text-4xl font-light md:text-5xl">
              Pizze Gourmet
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gourmetPizzas.map((pizza) => (
              <div
                key={pizza.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-light text-[#E7C48B]">
                    {pizza.name}
                  </h3>

                  <span className="text-sm uppercase tracking-[0.18em] text-white/60">
                    {pizza.price}
                  </span>
                </div>

                <p className="mt-5 text-base leading-7 text-white/70">
                  {pizza.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Burger Gourmet
            </p>

            <h2 className="mt-4 text-4xl font-light md:text-5xl">
              Signature Burger
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {burgers.map((burger) => (
              <div
                key={burger.name}
                className="rounded-[2rem] border border-white/10 bg-black/40 p-8"
              >
                <h3 className="text-2xl font-light text-[#E7C48B]">
                  {burger.name}
                </h3>

                <p className="mt-4 text-white/60">{burger.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#D2B07A]/30 bg-[#0D0D0D] p-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
            Delivery Perlage
          </p>

          <h2 className="mt-5 text-4xl font-light md:text-6xl">
            Consegna gratuita
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Le pizze vengono consegnate con hot box professionali per mantenere
            temperatura e qualità come appena sfornate.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex rounded-full bg-[#D2B07A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#E7C48B]"
          >
            Ordina su WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}