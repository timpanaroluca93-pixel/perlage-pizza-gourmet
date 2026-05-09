import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Asporto & Delivery | Perlage Pizza & Restaurant",
  description:
    "Menu asporto e delivery Perlage Pizza & Restaurant: pizze classiche, pizze gourmet, hamburger, scaccioni, scacciate, dolci, stuzzicherie e beverage.",
  alternates: {
    canonical: "https://perlagepizzaerestaurant.it/asporto",
  },
};

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=393892573240&text=Ciao%20Perlage%2C%20vorrei%20ordinare%20da%20asporto.";

type Item = {
  name: string;
  price?: string;
  desc?: string;
};

type Section = {
  title: string;
  subtitle?: string;
  items: Item[];
};

const sections: Section[] = [
  {
    title: "Pizze Classiche",
    items: [
      { name: "Semplice", price: "€4,50", desc: "Olio EVO, peperoncino, origano e basilico." },
      { name: "Rossa", price: "€5,50", desc: "Pomodoro San Marzano, olio EVO, origano e basilico." },
      { name: "Bianca", price: "€6,00", desc: "Mozzarella fiordilatte, olio EVO e basilico." },
      { name: "Margherita", price: "€7,00", desc: "Pomodoro San Marzano, mozzarella fiordilatte, olio EVO e basilico." },
      { name: "Norma", price: "€8,50", desc: "Pomodoro San Marzano, mozzarella fiordilatte, melanzane fritte, ricotta salata e basilico." },
      { name: "Romana", price: "€8,50", desc: "Pomodoro San Marzano, mozzarella fiordilatte, filetti di acciughe, olio EVO, origano e basilico." },
      { name: "Vegana", price: "€8,50", desc: "Cipolla fresca di Giarratana caramellata, zucchine grigliate, scaglie di mandorle, olio EVO e basilico." },
      { name: "Calzone Verde", price: "€8,50", desc: "Mozzarella fiordilatte, olive nere, filetti di acciughe, spinaci e olio EVO." },
      { name: "Fuori Menù", price: "€9,00", desc: "Pomodoro San Marzano, mozzarella fiordilatte, wurstel, patatine fritte, olio EVO e basilico." },
      { name: "Vegetariana", price: "€9,00", desc: "Pomodoro San Marzano, mozzarella fiordilatte, zucchine e melanzane grigliate, patate al forno, cipollina fresca, olio EVO e basilico." },
      { name: "Siciliana", price: "€9,00", desc: "Tuma sicula, cipollina, olive nere, filetti di acciughe, olio EVO e basilico." },
      { name: "Tonnina", price: "€9,00", desc: "Mozzarella fiordilatte, tonno, cipollina, capperi, prezzemolo, olive, pepe e olio EVO." },
      { name: "Calzone", price: "€9,50", desc: "Pomodoro San Marzano, mozzarella fiordilatte, prosciutto cotto di suino nero, olive nere e basilico." },
      { name: "Affumicata", price: "€10,00", desc: "Mozzarella fiordilatte, provola affumicata delle Madonie, cipolla di Giarratana caramellata, patate al forno, pancetta croccante, rosmarino e olio EVO." },
      { name: "Capricciosa", price: "€10,00", desc: "Pomodoro San Marzano, mozzarella fiordilatte, prosciutto cotto di suino nero, funghi freschi, piselli, olive nere, uovo sodo, olio EVO e basilico." },
      { name: "Rucola", price: "€10,00", desc: "Mozzarella fiordilatte, pomodoro datterino, rucola, prosciutto crudo siciliano, scaglie di grana 24 mesi e olio EVO." },
      { name: "Diavola", price: "€10,00", desc: "Pomodoro San Marzano, mozzarella fiordilatte, salame piccante, cipollina fresca, salsiccia, olive nere, olio EVO e basilico." },
      { name: "Parmigiana", price: "€10,00", desc: "Pomodoro San Marzano, mozzarella fiordilatte, prosciutto cotto di suino nero, uovo sodo bio, melanzane fritte, scaglie di grana 24 mesi, pangrattato tostato, olio EVO e basilico." },
      { name: "5 Caci", price: "€10,50", desc: "Mozzarella fiordilatte, caciocavallo ragusano, provola affumicata delle Madonie, piacentino ennese, grana 24 mesi, olio EVO e basilico." },
      { name: "Ortolana", price: "€10,50", desc: "Mozzarella fiordilatte, melanzane e zucchine grigliate, uovo sodo bio, piacentino ennese, grana 24 mesi, olio EVO e basilico." },
      { name: "Porcina", price: "€11,00", desc: "Mozzarella fiordilatte, funghi porcini, funghi misti, piacentino ennese, salsiccia, olio EVO e basilico." },
      { name: "Pizza Fritta", price: "€11,00", desc: "Ricotta fresca, provola affumicata, salame piccante e basilico." },
      { name: "Trapanese", price: "€11,50", desc: "Mozzarella fiordilatte, pesto trapanese, datterino semidry condito, pinoli, speck di suino nero siciliano, olio EVO e basilico." },
      { name: "Zuccarossa", price: "€11,50", desc: "Mozzarella fiordilatte, crema di zucca fresca, provola affumicata delle Madonie, pancetta croccante, semi di zucca, olio EVO e basilico." },
      { name: "Bronte", price: "€12,00", desc: "Mozzarella fiordilatte, mozzarella di bufala, pesto di pistacchio, granella di pistacchio e prosciutto crudo siciliano." },
      { name: "Mongibello", price: "€12,50", desc: "Crema di funghi porcini dell’Etna, quenelle di ricotta fresca al tartufo, salsiccia, noci, olio EVO e basilico." },
      { name: "Mortazza", price: "€13,00", desc: "Mozzarella fiordilatte, mousse di ricotta fresca al pistacchio, mortadella di asino ragusana, datterino semidry e granella di pistacchio di Bronte D.O.P." },
      { name: "Friarielli", price: "€12,00", desc: "Mozzarella fiordilatte, crema di friarielli, salsiccia di suino sfumata al vino e cipolla croccante di Tropea." },
      { name: "Smoked Salmon", price: "€13,50", desc: "Mozzarella fiordilatte, salmone affumicato al legno di faggio, salmerino di Trapani, Philadelphia light e granella di pistacchio di Bronte D.O.P." },
      { name: "BBQ", price: "€14,00", desc: "Mozzarella fiordilatte, cheddar 24 mesi, cipolla di Giarratana caramellata, pulled pork, chips croccanti e salsa barbecue." },
      { name: "Pistacchio Food Porn", price: "€14,50", desc: "Mozzarella fiordilatte, mozzarella di bufala siciliana, pulled pork, chips croccanti e pistacchio di Bronte D.O.P." },
      { name: "Salmon Roll", price: "€14,50", desc: "Crema di avocado e menta, bocconcini di bufala, fiori di salmone affumicato al legno di faggio, sale marino di Trapani, semi di sesamo." },
    ],
  },
  {
    title: "Pizze Gourmet",
    subtitle: "Condite a crudo.",
    items: [
      { name: "Regina Margherita", price: "€9,50", desc: "Pomodoro San Marzano, datterino giallo, ciliegino di bufala, olio EVO ed emulsione di basilico." },
      { name: "Caprese", price: "€10,50", desc: "Ciliegino di bufala, pomodoro datterino, olio EVO e basilico." },
      { name: "Marinara", price: "€11,50", desc: "Pomodoro San Marzano, pomodoro datterino, filetti di acciughe, olive nere, capperi, aglio, olio EVO, origano e basilico." },
      { name: "Giarratana", price: "€12,50", desc: "Philadelphia, cipolla fresca di Giarratana caramellata, noci, n’duja calabrese piccante, olio EVO e basilico." },
      { name: "Nduja", price: "€12,50", desc: "Nduja calabrese piccante, burrata siciliana, fili di peperoncino Red Chili del Sud Africa, olio EVO e basilico." },
      { name: "Norma Gourmet", price: "€13,00", desc: "Pomodoro San Marzano, burrata siciliana, chips di melanzane, ricotta salata, pangrattato tostato, olio EVO e basilico." },
      { name: "Maialino Nero", price: "€13,00", desc: "Ragù di suino nero dei Nebrodi, mozzarella di bufala, fonduta di cheddar e basilico." },
      { name: "Burrata", price: "€13,50", desc: "Pomodoro San Marzano, burrata siciliana, prosciutto crudo siciliano, olio EVO e basilico." },
      { name: "Perlage", price: "€13,50", desc: "Pistacchio di Bronte D.O.P., stracciatella, prosciutto crudo siciliano e pomodori secchi." },
      { name: "Soave", price: "€14,50", desc: "Primosale, letto di rucola, salmone affumicato al legno di faggio, sale marino di Trapani, noci e miele di agrumi di Sicilia." },
      { name: "Sicilia", price: "€14,50", desc: "Prosciutto crudo siciliano, mortadella di asino ragusana, salame di suino nero, mozzarella di bufala e pistacchio di Bronte D.O.P." },
      { name: "Super Perlage", price: "€15,50", desc: "Bordo ricoperto di pistacchio di Bronte D.O.P., stracciatella di fiordilatte, prosciutto crudo siciliano, datterino giallo, pesto di pistacchio e granella di pistacchio." },
      { name: "La Datterina", price: "€14,00", desc: "Salsa di pomodorino giallo del piennolo, prosciutto cotto di suino nero, stracciatella, cipolla di Tropea in agrodolce e sesamo tostato." },
      { name: "Rucola Perlage", price: "€16,00", desc: "Mozzarella fiordilatte, datterino rosso semidry, prosciutto crudo siciliano, emulsione di rucola e perlage di tartufo nero." },
      { name: "L’Ariccia", price: "€13,50", desc: "Crema di patate al rosmarino, mozzarella fiordilatte, porchetta d’Ariccia, cipolla caramellata di Tropea in gel, chips di grana 24 mesi e basilico cristallizzato." },
      { name: "Semidry", price: "€13,00", desc: "Pesto di zucchine, stracciatella, speck di suino nero siciliano, datterino semidry giallo e rosso, chips di grana 24 mesi." },
      { name: "Tartufina", price: "€14,00", desc: "Mozzarella fiordilatte, scaglie di grana padano 24 mesi e scaglie di tartufo nero." },
    ],
  },
  {
    title: "Hamburger",
    subtitle: "Tutti i burger vengono serviti in box con patatine miste fritte.",
    items: [
      { name: "Burger", price: "€9,00", desc: "Hamburger 150g, iceberg, pomodoro, cheddar, bacon e salsa homemade." },
      { name: "Chicken", price: "€9,00", desc: "Pollo panato in cornflakes, iceberg, pomodoro, cheddar, bacon e salsa homemade." },
      { name: "L’Affumicato", price: "€13,00", desc: "Hamburger 150g, provola affumicata, bacon, cipolla caramellata di Giarratana, pulled pork e salsa barbecue." },
      { name: "Perlage Burger", price: "€14,50", desc: "Bun ricoperto di pistacchio, pollo panato in cornflakes, cheddar, bacon, pulled pork, pesto di pistacchio di Bronte e farina di pistacchio." },
      { name: "Double Burger", price: "€14,00", desc: "Doppio hamburger 150g, doppio cheddar, cipolla croccante di Tropea, cetriolini e salsa homemade." },
      { name: "Arriccia Burger", price: "€12,00", desc: "Porchetta d’Ariccia, provola affumicata, crema di patate al rosmarino e cipolla caramellata di Tropea." },
      { name: "Salmon Burger", price: "€14,00", desc: "Bun ai carboni attivi, tartare di salmone affumicato, rucola, stracciata e zest di lime." },
    ],
  },
  {
    title: "Gli Scaccioni",
    items: [
      { name: "Semplice", price: "€5,00", desc: "Olio EVO, origano, sale e peperoncino." },
      { name: "Classico", price: "€8,50", desc: "Mozzarella fiordilatte, prosciutto cotto di suino nero e olio EVO." },
      { name: "Nostrano", price: "€8,50", desc: "Tuma sicula, olive nere, cipollina fresca e olio EVO." },
      { name: "Infornato", price: "€9,50", desc: "Mozzarella fiordilatte, prosciutto crudo siciliano, patate al forno e olio EVO." },
      { name: "Saporito", price: "€10,00", desc: "Ricotta fresca, mortadella di asino ragusana, pomodori secchi e provola affumicata delle Madonie." },
      { name: "Palermitano", price: "€10,50", desc: "Mortadella di asino ragusana, panelle, limone a fettine e pepe nero." },
      { name: "Brontese", price: "€12,00", desc: "Tuma sicula, speck di suino nero siciliano e pistacchio di Bronte D.O.P." },
      { name: "Pistacchio Food Porn", price: "€14,00", desc: "Tuma sicula, pulled pork, patate americane dolci e pistacchio di Bronte D.O.P." },
    ],
  },
  {
    title: "Le Scacciate",
    subtitle: "A peso €18,50 al kg.",
    items: [
      { name: "Scacciata con condimenti a piacere", desc: "Base consigliata di tuma sicula e condimenti a scelta fra un’ampia selezione di materie prime." },
      { name: "Scacciata Brontese", desc: "Tuma sicula, speck di suino nero dei Nebrodi e pistacchio di Bronte D.O.P." },
      { name: "Pistacchio Food Porn", desc: "Tuma sicula, pulled pork, patate americane dolci e pistacchio di Bronte D.O.P." },
      { name: "Porchetta di Ariccia", desc: "Tuma sicula, provola affumicata delle Madonie, porchetta di Ariccia I.G.P. e patate alla pizzaiola." },
    ],
  },
  {
    title: "Pizze Dolci",
    items: [
      { name: "Nutella", price: "€8,50 / Super €10,50", desc: "Bordo ricoperto di nocciole, Nutella spalmata e granella di nocciole." },
      { name: "Cannolo Siciliano", price: "€10,50", desc: "Ricotta siciliana dolce, scorza di cannolo, cioccolato di Modica, pistacchio di Bronte D.O.P., zucchero a velo e cannella." },
      { name: "Dolce Pistacchio", price: "€11,50 / Super €13,50", desc: "Bordo ricoperto di pistacchio, Nutella al pistacchio, Nutella e granella di pistacchio di Bronte D.O.P." },
      { name: "Coconut", price: "€12,50", desc: "Bordo ricoperto di cocco, Nutella bianca e scaglie di cioccolato di Modica." },
      { name: "Frittelline con Nutella", price: "Piccole €6,50 / Grandi €10,50" },
    ],
  },
  {
    title: "Stuzzicherie",
    items: [
      { name: "Patatine miste rustiche fritte", price: "€4,00 / €5,50" },
      { name: "Patatine Pistacchissimo", price: "€5,50 / €7,50", desc: "Con pistacchio di Bronte D.O.P. e pulled pork." },
      { name: "Patate americane dolci fritte", price: "€4,50 / €6,50" },
      { name: "Panelle palermitane", price: "€4,00 / €5,50" },
    ],
  },
  {
    title: "Beverage",
    items: [
      { name: "Acqua San Benedetto / Acqua Lete 500ml", price: "€1,00" },
      { name: "Coca Cola / Coca Cola Zero / Fanta / Sprite 330ml", price: "€2,50" },
      { name: "Birra Heineken 330ml", price: "€3,00" },
      { name: "Birra Messina Cristalli di Sale 330ml", price: "€3,50" },
      { name: "Birra Moretti 330ml", price: "€2,00" },
    ],
  },
];

function MenuSection({ section }: { section: Section }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
            Menu Asporto
          </p>

          <h2 className="mt-4 text-4xl font-light md:text-5xl [font-family:var(--font-playfair)]">
            {section.title}
          </h2>

          {section.subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              {section.subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {section.items.map((item) => (
            <article
              key={`${section.title}-${item.name}`}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#D2B07A]/50"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-light text-[#E7C48B] [font-family:var(--font-playfair)]">
                  {item.name}
                </h3>

                {item.price && (
                  <span className="shrink-0 text-right text-sm font-semibold text-white/70">
                    {item.price}
                  </span>
                )}
              </div>

              {item.desc && (
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {item.desc}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AsportoPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <Image
          src="/gallery14.jpg"
          alt="Menu asporto Perlage Pizza & Restaurant"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,176,122,0.18),transparent_42%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D2B07A]">
            Perlage Pizza & Restaurant · Catania
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-light leading-[1.05] md:text-7xl">
            Asporto &
            <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
              Delivery Gourmet
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/75">
            Pizza contemporanea, burger gourmet, scaccioni, scacciate e
            specialità siciliane direttamente a casa tua.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#D2B07A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#E7C48B]"
            >
              Ordina Ora
            </a>

            <a
              href="/"
              className="rounded-full border border-white/20 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:border-[#D2B07A]"
            >
              Torna alla Home
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
              Orari Delivery
            </p>
            <p className="mt-3 text-lg text-white/75">
              Tutti i giorni dalle 19:00 alle 23:00
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
              Consegna
            </p>
            <p className="mt-3 text-lg text-white/75">
              Sempre gratuita, con hot box per mantenere la pizza calda.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
              Pagamento
            </p>
            <p className="mt-3 text-lg text-white/75">
              A richiesta POS a domicilio.
            </p>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <MenuSection key={section.title} section={section} />
      ))}

      <section className="px-6 pb-28 pt-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#D2B07A]/30 bg-[#0D0D0D] p-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
            Delivery Perlage
          </p>

          <h2 className="mt-5 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
            Ordina il tuo asporto
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Scrivici su WhatsApp indicando prodotti, quantità, indirizzo e
            orario desiderato per ritiro o consegna.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-full bg-[#D2B07A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#E7C48B]"
          >
            Ordina su WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}