import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "English Menu | Perlage Pizza & Restaurant",
  description:
    "Discover the English menu of Perlage Pizza & Restaurant in Catania: gourmet pizzas, starters, fried specialties, pasta dishes, main courses, burgers, desserts and wine list.",
  alternates: {
    canonical: "https://perlagepizzaerestaurant.it/en/menu",
    languages: {
      "it-IT": "https://perlagepizzaerestaurant.it/menu",
      "en-GB": "https://perlagepizzaerestaurant.it/en/menu",
    },
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
    title: "Perlage Sharing Board",
    subtitle: "€18 per person — minimum 2 people",
    items: [
      {
        name: "Cold Cuts and Sicilian Cheeses",
        desc: "A selection of cured meats, Sicilian cheeses and starters: mixed fried bites, selected Patanegra ham, Ariccia porchetta, San Daniele prosciutto, Nebrodi black pig speck, Nebrodi black pig salami, Iblean caciocavallo cheese, fresh primosale cheese with rocket and primosale cheese with walnuts. Served with freshly baked warm focaccia.",
        price: "€18 p.p.",
      },
      {
        name: "Recommended Pairing",
        desc: "Murgo Brut - Etna",
        price: "Glass €7 | Bottle €26",
      },
    ],
  },
  {
    title: "Montanarine",
    subtitle:
      "Three fried mini pizzas or one pan-baked pizza with double cooking.",
    items: [
      {
        name: "North — Montanarine",
        desc: "Gorgonzola, fresh pear, lamb’s lettuce, walnuts and honey.",
        price: "€12",
      },
      {
        name: "North — Pan-Baked Pizza",
        desc: "Gorgonzola, fresh pear, lamb’s lettuce, walnuts and honey.",
        price: "€10",
      },
      {
        name: "Centre — Montanarine",
        desc: "Pecorino Romano cream, guanciale and black pepper.",
        price: "€11",
      },
      {
        name: "Centre — Pan-Baked Pizza",
        desc: "Pecorino Romano cream, guanciale and black pepper.",
        price: "€9",
      },
      {
        name: "South — Montanarine",
        desc: "Tomato, Parmesan cream and basil pesto.",
        price: "€10",
      },
      {
        name: "South — Pan-Baked Pizza",
        desc: "Tomato, Parmesan cream and basil pesto.",
        price: "€8",
      },
    ],
  },
  {
    title: "Perlage Fried Specialties",
    items: [
      {
        name: "North — Hand-Cut Fries",
        desc: "Fresh hand-cut fries served with Ragusano PDO cheese fondue.",
        price: "€7",
      },
      {
        name: "North — Perlage Fried Gnocco",
        desc: "Fried dough bites topped with Patanegra ham and stracciatella cheese.",
        price: "€14",
      },
      {
        name: "Centre — Crispy Courgette Flower",
        desc: "Fried courgette flower filled with fresh ricotta cream and anchovy.",
        price: "€8",
      },
      {
        name: "Centre — Mozzarella in Carrozza",
        desc: "Artisan bread filled with melted mozzarella and fried until golden.",
        price: "€9",
      },
      {
        name: "South — Perlage Mixed Fried Platter",
        desc: "Potato dippers, mini arancini, jalapeños, onion rings and camembert bites.",
        price: "€12",
      },
      {
        name: "South — Perlage Crispella",
        desc: "Fried dough filled with ricotta cream, topped with ricotta mousse and anchovy cream.",
        price: "€9",
      },
    ],
  },
  {
    title: "Starters",
    items: [
      {
        name: "North — Vitello Tonnato",
        desc: "Low-temperature cooked veal roast with tuna sauce and capers.",
        price: "€14",
      },
      {
        name: "North — Truffle Croquette",
        desc: "Potato croquettes served on Parmesan cream with black truffle shavings.",
        price: "€9",
      },
      {
        name: "Centre — Burrata & Patanegra",
        desc: "Burrata served with fresh rocket, red datterino tomatoes and Patanegra ham.",
        price: "€15",
      },
      {
        name: "Centre — Chargrilled Vegetables",
        desc: "Grilled vegetables with Ragusano PDO cheese, honey and extra virgin olive oil.",
        price: "€8",
      },
      {
        name: "South — Mediterranean Bruschetta",
        desc: "Three varieties: tomato and basil, anchovies with lime zest, and confit tomatoes with black olive powder.",
        price: "€9",
      },
      {
        name: "South — Aubergine Roll",
        desc: "Fried aubergine with tomato sauce, provola cheese and basil, topped with salted ricotta mousse.",
        price: "€11",
      },
    ],
  },
  {
    title: "Pasta Dishes",
    items: [
      {
        name: "North — Potato Gnocchi",
        desc: "Potato gnocchi with Ragusano PDO cheese fondue and crispy speck.",
        price: "€16",
      },
      {
        name: "Centre — Tonnarelli Carbonara",
        desc: "Tonnarelli pasta with egg yolk and Pecorino Romano PDO cream, crispy guanciale and black pepper.",
        price: "€15",
      },
      {
        name: "South — Paccheri alla Norma",
        desc: "Paccheri pasta with tomato sauce, fried aubergines, salted ricotta cream and aubergine crisps.",
        price: "€14",
      },
    ],
  },
  {
    title: "Main Courses",
    items: [
      {
        name: "North — Alpine Sliced Steak",
        desc: "Grilled 300 g sirloin steak with rocket, Grana cheese shavings and extra virgin olive oil.",
        price: "€25",
      },
      {
        name: "Centre — Veal Escalopes with Mushrooms",
        desc: "Veal escalopes with sautéed mushrooms and white wine jus, served with roast potatoes.",
        price: "€18",
      },
      {
        name: "South — Horse Fillet with Nero d’Avola",
        desc: "Slow-cooked horse fillet with Nero d’Avola wine jus and roast potatoes.",
        price: "€25",
      },
    ],
  },
  {
    title: "Perlage Pizzas — Reinvented Traditions",
    items: [
      {
        name: "Zuccarossa",
        desc: "Fior di latte mozzarella, pumpkin cream, smoked Madonie provola, crispy pancetta, pumpkin seeds, extra virgin olive oil and basil.",
        price: "€13",
      },
      {
        name: "Friarielli",
        desc: "Fior di latte mozzarella, friarielli cream, pork sausage glazed with wine and crispy Tropea onion.",
        price: "€14",
      },
      {
        name: "Porcina",
        desc: "Fior di latte mozzarella, porcini mushrooms, mixed Picentini mushrooms, sausage, extra virgin olive oil and basil.",
        price: "€14",
      },
      {
        name: "Trapanese",
        desc: "Fior di latte mozzarella, Trapani-style pesto, seasoned semi-dried datterino tomatoes, POMIS tomato dressing and Sicilian black pig speck.",
        price: "€13",
      },
      {
        name: "Affumicata",
        desc: "Fior di latte mozzarella, smoked Madonie provola, caramelised Giarratana onion, roast potatoes, crispy pancetta and rosemary.",
        price: "€14",
      },
    ],
  },
  {
    title: "Perlage Pizzas — Classics",
    subtitle: "Also available with a thin, crustless-style edge.",
    items: [
      {
        name: "Regina Margherita",
        desc: "San Marzano tomato, buffalo cherry mozzarella, extra virgin olive oil and basil emulsion.",
        price: "€11",
      },
      {
        name: "Margherita",
        desc: "San Marzano tomato and fior di latte mozzarella.",
        price: "€9",
      },
      {
        name: "Norma",
        desc: "San Marzano tomato, fior di latte mozzarella, fried aubergines, salted ricotta and basil.",
        price: "€11",
      },
      {
        name: "Romana",
        desc: "San Marzano tomato, fior di latte mozzarella, anchovies, black olives, oregano and extra virgin olive oil.",
        price: "€11",
      },
      {
        name: "Vegetarian",
        desc: "Courgette cream, Giarratana onion, grilled aubergines, confit cherry tomatoes, almonds, extra virgin olive oil and basil.",
        price: "€12",
      },
      {
        name: "Vegan",
        desc: "Caramelised Giarratana onion, grilled courgettes, almonds, extra virgin olive oil and basil.",
        price: "€12",
      },
    ],
  },
  {
    title: "Perlage Pizzas — Identity",
    items: [
      {
        name: "Perlage",
        desc: "Sicilian pistachio pesto, stracciatella cheese, Sicilian prosciutto and sun-dried tomatoes.",
        price: "€13",
      },
      {
        name: "Cynara",
        desc: "Artichoke cream, fior di latte mozzarella, crispy guanciale, Pecorino cream and fried baby artichokes.",
        price: "€15",
      },
      {
        name: "Salina",
        desc: "Yellow datterino tomatoes, roasted tomato gel, tuna, Tropea onion, anchovy mayonnaise, olives, capers and bottarga.",
        price: "€18",
      },
      {
        name: "Tre Terre",
        desc: "Fior di latte mozzarella, Parmesan cream, roasted aubergine, crispy guanciale and roasted tomato gel.",
        price: "€13",
      },
    ],
  },
  {
    title: "Perlage Pizzas — Signature",
    items: [
      {
        name: "Soave",
        desc: "Primosale cheese, rocket, smoked salmon, Trapani sea salt, walnuts and citrus blossom honey.",
        price: "€13",
      },
      {
        name: "Semidry",
        desc: "Courgette pesto, stracciatella cheese, black pig speck, semi-dried datterino tomatoes and 24-month aged Grana cheese.",
        price: "€15",
      },
      {
        name: "La Datterina",
        desc: "Yellow datterino tomato sauce, black pig cooked ham, stracciatella cheese, Tropea onion, confit datterino tomatoes and toasted sesame.",
        price: "€14",
      },
      {
        name: "Rucola Perlage",
        desc: "Fior di latte mozzarella, semi-dried red datterino tomatoes, Sicilian prosciutto, rocket emulsion and black truffle pearls.",
        price: "€15",
      },
      {
        name: "L’Arriccia",
        desc: "Rosemary potato cream, fior di latte mozzarella, Ariccia porchetta, Tropea onion, Grana crisps and crystallised basil.",
        price: "€16",
      },
      {
        name: "Tartufina",
        desc: "Fior di latte mozzarella, 24-month aged Grana cheese shavings and black truffle.",
        price: "€17",
      },
      {
        name: "Norma Gourmet",
        desc: "San Marzano tomato, Sicilian burrata, aubergine crisps, salted ricotta, toasted breadcrumbs and basil.",
        price: "€14",
      },
    ],
  },
  {
    title: "Perlage Burgers",
    items: [
      {
        name: "Burger",
        desc: "150 g beef burger, iceberg lettuce, tomato, cheddar, bacon and homemade sauce.",
        price: "€15",
      },
      {
        name: "Chicken",
        desc: "Cornflake-crusted chicken, iceberg lettuce, tomato, cheddar, bacon and homemade sauce.",
        price: "€14",
      },
      {
        name: "Ariccia Burger",
        desc: "Ariccia porchetta, smoked provola, rosemary potato cream and caramelised Tropea onion.",
        price: "€16",
      },
      {
        name: "Salmon Burger",
        desc: "Charcoal bun, smoked salmon tartare, rocket, stracciatella cheese and lime zest.",
        price: "€17",
      },
      {
        name: "Perlage Pistachio",
        desc: "Pistachio bun, cornflake-crusted chicken, cheddar, bacon, pulled pork and Bronte pistachio pesto.",
        price: "€18",
      },
      {
        name: "Double Burger",
        desc: "Two 150 g beef patties, double cheddar, crispy Tropea onion, pickles and homemade sauce.",
        price: "€19",
      },
      {
        name: "Smoked Burger",
        desc: "Beef burger, smoked provola, crispy bacon, pulled pork and artisan BBQ sauce.",
        price: "€18",
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Warm Chocolate Fondant",
        desc: "Dark chocolate fondant with a molten centre, served with a scoop of vanilla gelato.",
        price: "€8",
      },
      {
        name: "Cheesecake",
        desc: "Available with pistachio, Nutella or mixed berries.",
        price: "€7",
      },
      {
        name: "Millefeuille",
        desc: "Crispy millefeuille with pastry cream and fresh wild strawberries.",
        price: "€8",
      },
      {
        name: "Fedora Cake",
        price: "€7",
      },
      {
        name: "Tiramisù",
        price: "€7",
      },
      {
        name: "Seven-Layer Chocolate Cake",
        price: "€9",
      },
    ],
  },
  {
    title: "Drinks — Draught Beers",
    items: [
      {
        name: "Messina Cristalli di Sale 5%",
        desc: "Unfiltered Sicilian lager brewed with sea salt crystals.",
        price: "20cl €4 | 40cl €6",
      },
      {
        name: "Affligem Dubbel 6.8%",
        desc: "Amber Belgian beer with a smooth, malty flavour and notes of caramel and ripe fruit.",
        price: "30cl €7",
      },
    ],
  },
  {
    title: "Drinks — Craft Beers",
    items: [
      {
        name: "1851 Blanche",
        desc: "Fresh, spiced wheat beer with notes of coriander and orange peel.",
        price: "€7",
      },
      {
        name: "1851 IPA",
        desc: "India Pale Ale with hoppy and citrus aromas.",
        price: "€8",
      },
      {
        name: "1851 Tripel",
        desc: "Full-bodied Tripel beer with fruity and spicy notes.",
        price: "€9",
      },
    ],
  },
  {
    title: "Drinks — Digestifs",
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
    title: "Drinks — Water and Soft Drinks",
    items: [
      { name: "Still Water 75cl", price: "€2.50" },
      { name: "Sparkling Water 75cl", price: "€2.50" },
      { name: "Coca-Cola 33cl", price: "€3" },
      { name: "Fanta 33cl", price: "€3" },
      { name: "Sprite 33cl", price: "€3" },
      { name: "Espresso Coffee", price: "€1.50" },
    ],
  },
];

const wineSections: MenuSection[] = [
  {
    title: "White Wines — Sicily",
    items: [
      {
        name: "Murgo Lapilli",
        desc: "Chardonnay 50%, Sauvignon Blanc 35%, other grape varieties 15%.",
        price: "€15",
      },
      {
        name: "Fina Kikè",
        desc: "Aromatic Traminer.",
        price: "€23",
      },
      {
        name: "Giovinco Sgarretta DOC Organic",
        desc: "Grillo.",
        price: "€25",
      },
    ],
  },
  {
    title: "White Wines — Etna",
    items: [
      {
        name: "Murgo Etna DOC",
        desc: "Carricante 70%, Catarratto 30%.",
        price: "€26",
      },
      {
        name: "Tornatore Etna DOC",
        desc: "Carricante.",
        price: "€38",
      },
      {
        name: "Azienda di Rachele Ricciolo DOC",
        desc: "Carricante.",
        price: "€47",
      },
    ],
  },
  {
    title: "Red Wines — Sicily",
    items: [
      {
        name: "Murgo Lapilli",
        desc: "Cabernet Sauvignon 70%, Syrah 30%.",
        price: "€15",
      },
      {
        name: "Fina Syrah",
        desc: "Syrah.",
        price: "€24",
      },
      {
        name: "Giovinco Sgarretta DOC Organic",
        desc: "Nero d’Avola.",
        price: "€28",
      },
    ],
  },
  {
    title: "Red Wines — Etna",
    items: [
      {
        name: "Murgo Etna DOC",
        desc: "Nerello Mascalese.",
        price: "€26",
      },
      {
        name: "Tornatore Etna DOC",
        desc: "Nerello Mascalese 95%, Nerello Cappuccio 5%.",
        price: "€38",
      },
    ],
  },
  {
    title: "Sparkling Wines",
    items: [
      {
        name: "Murgo Brut Traditional Method",
        desc: "Nerello Mascalese, eastern slope of Mount Etna.",
        price: "€33",
      },
      {
        name: "Murgo Brut Rosé Traditional Method",
        desc: "Nerello Mascalese, eastern slope of Mount Etna.",
        price: "€42",
      },
      {
        name: "Giovinco Extra Brut Traditional Method",
        desc: "Nerello Mascalese, Sambuca di Sicilia.",
        price: "€46",
      },
      {
        name: "Terrazze dell’Etna Brut Rosé Traditional Method",
        desc: "Pinot Noir 90%, Nerello Mascalese 10%, north-eastern slope of Mount Etna.",
        price: "€61",
      },
      {
        name: "V8 Berto Brut Prosecco",
        desc: "Glera.",
        price: "€21",
      },
    ],
  },
];

function cleanPrice(price: string) {
  const match = price.replace(",", ".").match(/\d+(\.\d+)?/);
  return match ? match[0] : undefined;
}

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://perlagepizzaerestaurant.it/en/menu#menu",
  name: "English Menu | Perlage Pizza & Restaurant",
  url: "https://perlagepizzaerestaurant.it/en/menu",
  inLanguage: "en-GB",
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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
          Perlage Selection
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

export default function EnglishMenuPage() {
  const quickLinks = [
    { href: "#food", label: "Food" },
    { href: "#wines", label: "Wines" },
    { href: "#book", label: "Book" },
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
          alt="English menu at Perlage Pizza & Restaurant"
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
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.18em] text-white/60 transition hover:text-[#D2B07A]"
            >
              ← Home
            </Link>

            <Image
              src="/logo.png"
              alt="Perlage Pizza & Restaurant"
              width={160}
              height={90}
              className="h-16 w-auto object-contain md:h-24"
              priority
            />

           <div className="flex items-center gap-3">
  <div className="flex items-center rounded-full border border-white/15 bg-black/40 p-1">
    <Link
      href="/menu"
      aria-label="Visualizza il menu in italiano"
      className="rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 transition hover:text-white"
    >
      IT
    </Link>

    <Link
      href="/en/menu"
      aria-label="View the menu in English"
      className="rounded-full bg-[#D2B07A] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black"
    >
      EN
    </Link>
  </div>

  <Link
    href="/prenotazioni"
    className="hidden text-xs uppercase tracking-[0.18em] text-[#E7C48B] transition hover:text-white sm:block"
  >
    Book
  </Link>
</div>
          </div>
        </header>

        <section className="px-6 py-20 text-center md:py-28">
          <p className="text-xs uppercase tracking-[0.36em] text-[#D2B07A]">
            Perlage Pizza & Restaurant · Catania
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-light leading-[1.05] tracking-wide md:text-7xl">
            <span className="block text-white/90">English Menu</span>

            <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
              Perlage
            </span>
          </h1>

          <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/40 md:text-sm">
            Three Lands · Gourmet Pizza · Italian Cuisine · Wine List
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/72">
            An elegant culinary journey through starters, fried specialties,
            pasta dishes, main courses, gourmet pizzas, burgers, desserts and
            selected wines.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-[#D2B07A]/45 bg-black/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#E7C48B] backdrop-blur transition hover:-translate-y-1 hover:bg-[#D2B07A]/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/menu"
              className="text-xs uppercase tracking-[0.18em] text-white/50 transition hover:text-[#D2B07A]"
            >
              View menu in Italian
            </Link>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[...menuSections, ...wineSections].map((section) => (
                <Link
                  key={section.title}
                  href={`#${slugify(section.title)}`}
                  className="shrink-0 rounded-full border border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-white/55 transition hover:border-[#D2B07A]/50 hover:text-[#D2B07A]"
                >
                  {section.title}
                </Link>
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
                The Menu
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {menuSections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section id="wines" className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
                Wine Selection
              </p>

              <h2 className="mt-4 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
                Wine List
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {wineSections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="px-6 pb-28">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#D2B07A]/40 bg-black/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-12">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Reservations
            </p>

            <h2 className="mt-4 text-3xl font-light md:text-5xl [font-family:var(--font-playfair)]">
              Experience Perlage
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              Book your table and enjoy our menu in an elegant, modern setting
              designed to make every detail special.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/prenotazioni"
                className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
              >
                Book a Table
              </Link>

              <Link
                href="mailto:perlagepizzaerestaurant@outlook.com?subject=Perlage%20Reservation"
                className="rounded-full border border-[#D2B07A]/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7C48B] transition hover:bg-[#D2B07A]/10"
              >
                Send an Email
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}