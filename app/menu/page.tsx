import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Menu | Perlage Pizza & Restaurant",
  description:
    "Scopri il menu di Perlage Pizza & Restaurant a Catania: pizze gourmet, antipasti, fritti, primi, secondi, burger, dolci e carta dei vini.",
  alternates: {
    canonical: "https://perlagepizzaerestaurant.it/menu",
  },
};

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
};

type MenuSection = {
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "Il Tagliere Perlage",
    subtitle: "€18 a persona — minimo 2 persone",
    items: [
      {
        name: "Salumi e Formaggi",
        desc: "Tagliere di salumi, formaggi siciliani e antipasti: fritto misto, Patanegra selezionato, porchetta Ariccia, prosciutto crudo San Daniele, speck di Suino Nero dei Nebrodi, salame di Suino Nero dei Nebrodi, caciocavallo ibleo, primo sale con rucola fresca e primo sale con noci. Servito con focaccia calda appena sfornata.",
        price: "€18 p.p.",
      },
      {
        name: "Abbinamento consigliato",
        desc: "Murgo Brut - Etna",
        price: "Calice €7 | Bottiglia €26",
      },
    ],
  },
  {
    title: "Le Montanarine",
    subtitle:
      "Montanarine 3 pezzi fritte oppure Padellino 1 pezzo con doppia cottura.",
    items: [
      {
        name: "Nord — Montanarine",
        desc: "Gorgonzola, pera fresca, valeriana, noci e miele.",
        price: "€12",
      },
      {
        name: "Nord — Padellino",
        desc: "Gorgonzola, pera fresca, valeriana, noci e miele.",
        price: "€10",
      },
      {
        name: "Centro — Montanarine",
        desc: "Crema di pecorino romano, guanciale e pepe nero.",
        price: "€11",
      },
      {
        name: "Centro — Padellino",
        desc: "Crema di pecorino romano, guanciale e pepe nero.",
        price: "€9",
      },
      {
        name: "Sud — Montanarine",
        desc: "Pomodoro, crema di parmigiano e pesto di basilico.",
        price: "€10",
      },
      {
        name: "Sud — Padellino",
        desc: "Pomodoro, crema di parmigiano e pesto di basilico.",
        price: "€8",
      },
    ],
  },
  {
    title: "I Fritti Perlage",
    items: [
      {
        name: "Nord — Le Patatine Fresche",
        desc: "Patatine fresche tagliate a mano servite con fonduta di Ragusano DOP.",
        price: "€7",
      },
      {
        name: "Nord — Lo Gnocco Fritto Perlage",
        desc: "Gnocco fritto servito in uscita con Patanegra e stracciatella.",
        price: "€14",
      },
      {
        name: "Centro — Il Fiore di zucca croccante",
        desc: "Fiore di zucca fritto con crema di ricotta fresca e acciuga.",
        price: "€8",
      },
      {
        name: "Centro — La Mozzarella in carrozza",
        desc: "Pane artigianale e mozzarella filante.",
        price: "€9",
      },
      {
        name: "Sud — Il Fritto Misto Perlage",
        desc: "Dippers, arancinetti, jalapeños, anelli di cipolla e camembert bites.",
        price: "€12",
      },
      {
        name: "Sud — La Crispella Perlage",
        desc: "Impasto fritto con crema di ricotta all’interno. In uscita: mousse di ricotta e crema di acciughe.",
        price: "€9",
      },
    ],
  },
  {
    title: "Antipasti",
    items: [
      {
        name: "Nord — Il Vitello Tonnato",
        desc: "Arrosto di vitello cotto a bassa temperatura con salsa tonnata e capperi.",
        price: "€14",
      },
      {
        name: "Nord — La Crocchetta al Tartufo",
        desc: "Crocchette di patate servite su crema di parmigiano con scaglie di tartufo.",
        price: "€9",
      },
      {
        name: "Centro — Burrata & Patanegra",
        desc: "Burrata servita su rucola fresca e datterino rosso, con Patanegra.",
        price: "€15",
      },
      {
        name: "Centro — Le Verdure alla Brace",
        desc: "Verdure grigliate con Ragusano DOP e miele, completate con olio EVO.",
        price: "€8",
      },
      {
        name: "Sud — Bruschette Mediterranee",
        desc: "Tre varianti: pomodoro e basilico, acciughe e scorza di lime, pomodori confit e polvere di olive nere.",
        price: "€9",
      },
      {
        name: "Sud — L’Involtino di melanzana",
        desc: "Melanzana fritta con salsa di pomodoro, provola e basilico. In uscita: mousse di ricotta salata.",
        price: "€11",
      },
    ],
  },
  {
    title: "I Primi",
    items: [
      {
        name: "Nord — Gli Gnocchi",
        desc: "Gnocchi di patate con fonduta di Ragusano DOP e speck croccante.",
        price: "€16",
      },
      {
        name: "Centro — Il Tonnarello alla Carbonara",
        desc: "Tonnarello con crema di tuorlo e pecorino romano DOP, guanciale croccante e pepe nero.",
        price: "€15",
      },
      {
        name: "Sud — Il Pacchero alla Norma",
        desc: "Pacchero con salsa di pomodoro, melanzane fritte, crema di ricotta salata e chips di melanzana.",
        price: "€14",
      },
    ],
  },
  {
    title: "I Secondi",
    items: [
      {
        name: "Nord — La Tagliata delle Alpi",
        desc: "Controfiletto 300 g alla griglia, rucola, scaglie di grana e olio EVO.",
        price: "€25",
      },
      {
        name: "Centro — Le Scaloppine ai Funghi",
        desc: "Scaloppine di vitello con funghi trifolati e fondo al vino bianco, servite con patate arrosto.",
        price: "€18",
      },
      {
        name: "Sud — Il Filetto al Nero d’Avola",
        desc: "Filetto di cavallo cotto lentamente con fondo al Nero d’Avola e patate arrosto.",
        price: "€25",
      },
    ],
  },
  {
    title: "Le Pizze Perlage — Tradizionali Evolute",
    items: [
      {
        name: "Zuccarossa",
        desc: "Fior di latte, crema di zucca, provola affumicata delle Madonie, pancetta croccante, semi di zucca, olio EVO e basilico.",
        price: "€13",
      },
      {
        name: "Friarielli",
        desc: "Fior di latte, crema di friarielli, salsiccia di suino sfumata al vino e cipolla croccante di Tropea.",
        price: "€14",
      },
      {
        name: "Porcina",
        desc: "Fior di latte, funghi porcini, funghi misti picentini, salsiccia, olio EVO e basilico.",
        price: "€14",
      },
      {
        name: "Trapanese",
        desc: "Fior di latte, pesto trapanese, datterino semidry condito, pomis e speck suino nero siciliano.",
        price: "€13",
      },
      {
        name: "Affumicata",
        desc: "Fior di latte, provola affumicata delle Madonie, cipolla di Giarratana caramellata, patate al forno, pancetta croccante e rosmarino.",
        price: "€14",
      },
    ],
  },
  {
    title: "Le Pizze Perlage — Classiche Perlage",
    subtitle: "Disponibili anche con stesura senza bordo.",
    items: [
      {
        name: "Regina Margherita",
        desc: "Pomodoro San Marzano, ciliegino di bufala, olio EVO ed emulsione di basilico.",
        price: "€11",
      },
      {
        name: "Margherita",
        desc: "Pomodoro San Marzano, mozzarella fior di latte.",
        price: "€9",
      },
      {
        name: "Norma",
        desc: "Pomodoro San Marzano, fior di latte, melanzane fritte, ricotta salata e basilico.",
        price: "€11",
      },
      {
        name: "Romana",
        desc: "Pomodoro San Marzano, fior di latte, alici, olive nere, origano e olio EVO.",
        price: "€11",
      },
      {
        name: "Vegetariana",
        desc: "Crema di zucchine, cipolla di Giarratana, melanzane grigliate, pomodorini confit, mandorle, olio EVO e basilico.",
        price: "€12",
      },
      {
        name: "Vegana",
        desc: "Cipolla di Giarratana caramellata, zucchine grigliate, mandorle, olio EVO e basilico.",
        price: "€12",
      },
    ],
  },
  {
    title: "Le Pizze Perlage — Identità",
    items: [
      {
        name: "Perlage",
        desc: "Pesto di pistacchio di Sicilia, stracciatella, crudo siciliano, pomodori secchi.",
        price: "€13",
      },
      {
        name: "Cynara",
        desc: "Crema di carciofi, fiordilatte, guanciale croccante, crema di pecorino, carciofini fritti.",
        price: "€15",
      },
      {
        name: "Salina",
        desc: "Datterino giallo, gel di pomodori arrosto, tonno, cipolla di Tropea, mayo alle alici, olive, capperi e bottarga.",
        price: "€18",
      },
      {
        name: "Tre Terre",
        desc: "Fiordilatte, crema di parmigiano, melanzana arrosto, guanciale croccante, gel di pomodori arrosto.",
        price: "€13",
      },
    ],
  },
  {
    title: "Le Pizze Perlage — Signature",
    items: [
      {
        name: "Soave",
        desc: "Primosale, rucola, salmone affumicato, sale di Trapani, noci e miele di agrumi.",
        price: "€13",
      },
      {
        name: "Semidry",
        desc: "Pesto di zucchine, stracciatella, speck di suino nero, datterino semidry e grana 24 mesi.",
        price: "€15",
      },
      {
        name: "La Datterina",
        desc: "Salsa di datterino giallo, cotto di suino nero, stracciatella, cipolla di Tropea, datterini confit e sesamo tostato.",
        price: "€14",
      },
      {
        name: "Rucola Perlage",
        desc: "Fiordilatte, datterino rosso semidry, crudo siciliano, emulsione di rucola e perlage di tartufo nero.",
        price: "€15",
      },
      {
        name: "L’Arriccia",
        desc: "Crema di patate al rosmarino, fiordilatte, porchetta d’Ariccia, cipolla di Tropea, chips di grana e basilico cristallizzato.",
        price: "€16",
      },
      {
        name: "Tartufina",
        desc: "Fiordilatte, scaglie di grana 24 mesi e tartufo nero.",
        price: "€17",
      },
      {
        name: "Norma Gourmet",
        desc: "Pomodoro San Marzano, burrata siciliana, chips di melanzane, ricotta salata, pangrattato tostato e basilico.",
        price: "€14",
      },
    ],
  },
  {
    title: "Burger Perlage",
    items: [
      {
        name: "Burger",
        desc: "Hamburger di scottona 150 g, iceberg, pomodoro, cheddar, bacon e salsa homemade.",
        price: "€15",
      },
      {
        name: "Chicken",
        desc: "Pollo panato in cornflakes, iceberg, pomodoro, cheddar, bacon e salsa homemade.",
        price: "€14",
      },
      {
        name: "Ariccia Burger",
        desc: "Porchetta d’Ariccia, provola affumicata, crema di patate al rosmarino e cipolla caramellata di Tropea.",
        price: "€16",
      },
      {
        name: "Salmon Burger",
        desc: "Bun ai carboni attivi, tartare di salmone affumicato, rucola, stracciatella e zest di lime.",
        price: "€17",
      },
      {
        name: "Perlage Pistacchio",
        desc: "Bun al pistacchio, pollo panato in cornflakes, cheddar, bacon, pulled pork e pesto di pistacchio di Bronte.",
        price: "€18",
      },
      {
        name: "Double Burger",
        desc: "Doppio hamburger di scottona 150 g, doppio cheddar, cipolla croccante di Tropea, cetriolini e salsa homemade.",
        price: "€19",
      },
      {
        name: "Affumicato",
        desc: "Hamburger di scottona, provola affumicata, bacon croccante, pulled pork e salsa BBQ artigianale.",
        price: "€18",
      },
    ],
  },
  {
    title: "I Dolci",
    items: [
      {
        name: "Cuore Caldo al Cioccolato",
        desc: "Tortino al cioccolato fondente con cuore caldo, servito con pallina di gelato bianco.",
        price: "€8",
      },
      {
        name: "Cheesecake",
        desc: "Disponibile con pistacchio, Nutella o frutti di bosco.",
        price: "€7",
      },
      {
        name: "Millefoglie",
        desc: "Millefoglie croccante con crema e fragoline fresche.",
        price: "€8",
      },
      { name: "Fedora", price: "€7" },
      { name: "Tiramisù", price: "€7" },
      { name: "Setteveli", price: "€9" },
    ],
  },
  {
    title: "Beverage — Birre alla Spina",
    items: [
      {
        name: "Messina Cristalli di Sale 5%",
        desc: "Birra lager siciliana non filtrata con cristalli di sale marino.",
        price: "20cl €4 | 40cl €6",
      },
      {
        name: "Affligem Rossa Dubel 6,8%",
        desc: "Birra belga ambrata dal gusto morbido e maltato con note di caramello e frutta matura.",
        price: "30cl €7",
      },
    ],
  },
  {
    title: "Beverage — Birre Artigianali",
    items: [
      {
        name: "1851 Blanche",
        desc: "Birra blanche fresca e speziata con note di coriandolo e scorza d’arancia.",
        price: "€7",
      },
      {
        name: "1851 IPA",
        desc: "India Pale Ale con profumi di luppolo e agrumi.",
        price: "€8",
      },
      {
        name: "1851 Tripel",
        desc: "Birra tripel strutturata con sentori fruttati e speziati.",
        price: "€9",
      },
    ],
  },
  {
    title: "Beverage — Amari",
    items: [
      { name: "903 Barricata", price: "€6" },
      { name: "903 Bianca", price: "€6" },
      { name: "Montenegro", price: "€5" },
      { name: "Jägermeister", price: "€5" },
      { name: "Limoncello", price: "€5" },
      { name: "Unicum", price: "€5" },
      { name: "Amaro del Capo", price: "€5" },
    ],
  },
  {
    title: "Beverage — Acqua e Bibite",
    items: [
      { name: "Acqua Naturale 75cl", price: "€2.50" },
      { name: "Acqua Frizzante 75cl", price: "€2.50" },
      { name: "Coca Cola 33cl", price: "€3" },
      { name: "Fanta 33cl", price: "€3" },
      { name: "Sprite 33cl", price: "€3" },
      { name: "Caffè Espresso", price: "€1.50" },
    ],
  },
];

const wineSections: MenuSection[] = [
  {
    title: "Vini Bianchi — Sicilia",
    items: [
      {
        name: "Murgo Lapilli",
        desc: "Chardonnay 50%, Sauvignon Blanc 35%, altri vitigni 15%.",
        price: "€15",
      },
      { name: "Fina Kikè", desc: "Traminer aromatico.", price: "€23" },
      { name: "Giovinco Sgarretta DOC Bio", desc: "Grillo.", price: "€25" },
    ],
  },
  {
    title: "Vini Bianchi — Etna",
    items: [
      {
        name: "Murgo Etna DOC",
        desc: "Carricante 70%, Catarratto 30%.",
        price: "€26",
      },
      { name: "Tornatore Etna DOC", desc: "Carricante.", price: "€38" },
      {
        name: "Azienda di Rachele Ricciolo DOC",
        desc: "Carricante.",
        price: "€47",
      },
    ],
  },
  {
    title: "Vini Rossi — Sicilia",
    items: [
      {
        name: "Murgo Lapilli",
        desc: "Cabernet Sauvignon 70%, Syrah 30%.",
        price: "€15",
      },
      { name: "Fina Syrah", desc: "Syrah.", price: "€24" },
      {
        name: "Giovinco Sgarretta DOC Bio",
        desc: "Nero d’Avola.",
        price: "€28",
      },
    ],
  },
  {
    title: "Vini Rossi — Etna",
    items: [
      { name: "Murgo Etna DOC", desc: "Nerello Mascalese.", price: "€26" },
      {
        name: "Tornatore Etna DOC",
        desc: "Nerello Mascalese 95%, Nerello Cappuccio 5%.",
        price: "€38",
      },
    ],
  },
  {
    title: "Bollicine",
    items: [
      {
        name: "Murgo Brut Metodo Classico",
        desc: "Nerello Mascalese, Etna versante est.",
        price: "€33",
      },
      {
        name: "Murgo Brut Rosè Metodo Classico",
        desc: "Nerello Mascalese, Etna versante est.",
        price: "€42",
      },
      {
        name: "Giovinco Extra Brut Metodo Classico",
        desc: "Nerello Mascalese, Sambuca di Sicilia.",
        price: "€46",
      },
      {
        name: "Terrazze dell’Etna Brut Rosè Metodo Classico",
        desc: "Pinot Nero 90%, Nerello Mascalese 10%, Etna versante nord-est.",
        price: "€61",
      },
      { name: "V8 Berto Brut Prosecco", desc: "Glera.", price: "€21" },
    ],
  },
];

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=393892573240&text=Ciao%20Perlage%2C%20vorrei%20prenotare%20un%20tavolo.";

function cleanPrice(price: string) {
  const match = price.replace(",", ".").match(/\d+(\.\d+)?/);
  return match ? match[0] : undefined;
}

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://perlagepizzaerestaurant.it/menu#menu",
  name: "Menu Perlage Pizza & Restaurant",
  url: "https://perlagepizzaerestaurant.it/menu",
  inLanguage: "it-IT",
  hasMenuSection: [...menuSections, ...wineSections].map((section) => ({
    "@type": "MenuSection",
    name: section.title,
    description: section.subtitle,
    hasMenuItem: section.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.desc || undefined,
      offers: {
        "@type": "Offer",
        price: cleanPrice(item.price),
        priceCurrency: "EUR",
      },
    })),
  })),
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[àá]/g, "a")
    .replace(/[èé]/g, "e")
    .replace(/[ìí]/g, "i")
    .replace(/[òó]/g, "o")
    .replace(/[ùú]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function SectionCard({ section }: { section: MenuSection }) {
  return (
    <article
      id={slugify(section.title)}
      className="scroll-mt-28 rounded-[2rem] border border-[#D2B07A]/25 bg-black/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D2B07A]/70 hover:bg-[#D2B07A]/[0.055] md:p-8"
    >
      <div className="border-b border-[#D2B07A]/20 pb-5">
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
          Selezione Perlage
        </p>

        <h2 className="mt-3 text-3xl font-light leading-tight text-[#E7C48B] [font-family:var(--font-playfair)]">
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="mt-3 text-sm leading-6 text-white/55">
            {section.subtitle}
          </p>
        )}
      </div>

      <div className="mt-7 space-y-6">
        {section.items.map((item) => (
          <div
            key={`${section.title}-${item.name}`}
            className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-base font-medium leading-6 text-white md:text-lg">
                {item.name}
              </h3>

              <span className="shrink-0 text-right text-sm font-semibold text-[#E7C48B] md:text-base">
                {item.price}
              </span>
            </div>

            {item.desc && (
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/62">
                {item.desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function MenuPage() {
  const quickLinks = [
    { href: "#food", label: "Menu" },
    { href: "#vini", label: "Vini" },
    { href: "#prenota", label: "Prenota" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="fixed inset-0 z-0">
        <Image
          src="/menu-bg.jpg"
          alt="Menu Perlage Pizza & Restaurant"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.66)_0%,rgba(0,0,0,0.32)_35%,rgba(0,0,0,0.84)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(210,176,122,0.16),transparent_35%)]" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/55 px-5 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <a
              href="/"
              className="text-xs uppercase tracking-[0.18em] text-white/60 transition hover:text-[#D2B07A]"
            >
              ← Home
            </a>

            <Image
              src="/logo.png"
              alt="Perlage Pizza & Restaurant"
              width={160}
              height={90}
              className="h-16 w-auto object-contain md:h-24"
              priority
            />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-[#E7C48B] transition hover:text-white"
            >
              Prenota
            </a>
          </div>
        </header>

        <section className="px-6 py-20 text-center md:py-28">
          <p className="text-xs uppercase tracking-[0.36em] text-[#D2B07A]">
            Perlage Pizza & Restaurant · Catania
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-light leading-[1.05] tracking-wide md:text-7xl">
            <span className="block text-white/90">Menu</span>
            <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
              Perlage
            </span>
          </h1>

          <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/40 md:text-sm">
            Tre Terre · Pizza Gourmet · Cucina Italiana · Carta dei Vini
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/72">
            Un percorso gastronomico elegante tra antipasti, fritti, primi,
            secondi, pizze gourmet, burger, dolci e vini selezionati.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-[#D2B07A]/45 bg-black/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#E7C48B] backdrop-blur transition hover:-translate-y-1 hover:bg-[#D2B07A]/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[...menuSections, ...wineSections].map((section) => (
                <a
                  key={section.title}
                  href={`#${slugify(section.title)}`}
                  className="shrink-0 rounded-full border border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-white/55 transition hover:border-[#D2B07A]/50 hover:text-[#D2B07A]"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="food" className="px-6 pb-16 pt-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                Food Experience
              </p>

              <h2 className="mt-4 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Il Menu
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {menuSections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section id="vini" className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                Wine Selection
              </p>

              <h2 className="mt-4 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Carta dei vini
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {wineSections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section id="prenota" className="px-6 pb-28">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#D2B07A]/40 bg-black/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-12">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Prenotazioni
            </p>

            <h2 className="mt-4 text-3xl font-light md:text-5xl [font-family:var(--font-playfair)]">
              Vivi l’esperienza Perlage
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              Prenota il tuo tavolo e scopri il nostro menu in un ambiente
              elegante, moderno e pensato per valorizzare ogni dettaglio.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
              >
                Prenota su WhatsApp
              </a>

              <a
                href="mailto:perlagepizzaerestaurant@outlook.com?subject=Prenotazione Perlage"
                className="rounded-full border border-[#D2B07A]/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
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