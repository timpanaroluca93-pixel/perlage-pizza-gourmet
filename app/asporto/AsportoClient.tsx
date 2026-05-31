"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

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

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Perlage+Pizza+Restaurant+Via+Asiago+20+Catania";

const allowedCities = [
  "Catania",
  "Mascalucia",
  "Gravina di Catania",
  "Tremestieri Etneo",
  "Sant'Agata Li Battiati",
  "San Giovanni La Punta",
  "San Gregorio di Catania",
  "Misterbianco",
  "Valverde",
  "Viagrande",
  "Aci Castello",
  "Aci Catena",
  "Aci Sant'Antonio",
  "Acireale",
];

const extras = [
  { name: "Bresaola", price: 3 },
  { name: "Burrata", price: 3 },
  { name: "Capperi", price: 1 },
  { name: "Chips di Melanzana", price: 1.5 },
  { name: "Chips di Patate", price: 1.5 },
  { name: "Cipolla Caramellata", price: 1.5 },
  { name: "Cipollina", price: 1 },
  { name: "Crema di Porcini", price: 2 },
  { name: "Crema di Zucca", price: 1.5 },
  { name: "Filetti di Acciuga", price: 1.5 },
  { name: "Fonduta di Cheddar", price: 2 },
  { name: "Fonduta di Provola", price: 2 },
  { name: "Funghi Freschi", price: 1.5 },
  { name: "Funghi Misti", price: 2 },
  { name: "Funghi Porcini", price: 3 },
  { name: "Granella Pistacchio", price: 2 },
  { name: "Melanzane Fritte", price: 1.5 },
  { name: "Melanzane Grigliate", price: 1.5 },
  { name: "Mortadella", price: 2.5 },
  { name: "Mozzarella di Bufala", price: 2.5 },
  { name: "Mozzarella", price: 1.5 },
  { name: "Mozzarella Senza Lattosio", price: 2 },
  { name: "Nduja", price: 1.5 },
  { name: "Noci", price: 1.5 },
  { name: "Olio al Tartufo", price: 2 },
  { name: "Olive Nere", price: 1 },
  { name: "Pancetta", price: 2 },
  { name: "Panelle", price: 1.5 },
  { name: "Pangrattato", price: 0.5 },
  { name: "Panna", price: 1 },
  { name: "Patate al Forno", price: 1.5 },
  { name: "Patate Dippers", price: 2 },
  { name: "Patate Dolci al Forno", price: 2 },
  { name: "Patate Stick Dolci", price: 2 },
  { name: "Patate Stick", price: 1.5 },
  { name: "Pesce Spada Affumicato", price: 4 },
  { name: "Pesto di Pistacchio", price: 2.5 },
  { name: "Pesto Trapanese", price: 2 },
  { name: "Philadelphia", price: 1.5 },
  { name: "Piacentino Ennese", price: 2 },
  { name: "Pinoli", price: 1.5 },
  { name: "Piselli", price: 1 },
  { name: "Pomodori Secchi", price: 1.5 },
  { name: "Pomodoro Datterino", price: 1.5 },
  { name: "Prosciutto Cotto", price: 2 },
  { name: "Prosciutto Crudo", price: 2.5 },
  { name: "Provola Affumicata", price: 2 },
  { name: "Pulled Pork", price: 3 },
  { name: "Ricotta Fresca", price: 1.5 },
  { name: "Ricotta Salata", price: 1.5 },
  { name: "Rucola", price: 1 },
  { name: "Salame Nebrodi", price: 2.5 },
  { name: "Salame Piccante", price: 2 },
  { name: "Salmone Affumicato", price: 4 },
  { name: "Salsa al Pomodoro", price: 1 },
  { name: "Salsiccia", price: 2 },
  { name: "Scaglie di Grana", price: 1.5 },
  { name: "Scaglie di Mandorla", price: 1.5 },
  { name: "Speck", price: 2.5 },
  { name: "Spinaci", price: 1.5 },
  { name: "Stracciatella", price: 2.5 },
  { name: "Tonno", price: 2 },
  { name: "Tonno Affumicato", price: 3.5 },
  { name: "Tuma", price: 2 },
  { name: "Uovo Sodo", price: 1 },
  { name: "Wurstel", price: 1.5 },
  { name: "Zucchine Fritte", price: 1.5 },
  { name: "Zucchine Grigliate", price: 1.5 },
  { name: "Cipolla caramellata di Tropea", price: 1.5 },
  { name: "Cipolla caramellata di Tropea in gel", price: 2 },
  { name: "Porchetta di Ariccia", price: 3 },
  { name: "Hamburger", price: 3 },
  { name: "Pollo panato in cornflakes", price: 3 },
  { name: "Perlage tartufo", price: 3 },
  { name: "Scaglie di tartufo", price: 4 },
  { name: "Bacon", price: 2 },
  { name: "Dattero semidry", price: 1.5 },
  { name: "Chips di grana", price: 1.5 },
  { name: "Friarielli", price: 2 },
  { name: "Emulsione di basilico", price: 1 },
  { name: "Emulsione rucola", price: 1 },
];

function parsePrice(price?: string) {
  if (!price) return 0;
  const match = price.match(/€\s?(\d+[,.]?\d*)/);
  return match ? Number(match[1].replace(",", ".")) : 0;
}

function canUseExtras(sectionTitle: string) {
  return sectionTitle !== "Beverage" && sectionTitle !== "Stuzzicherie";
}

function canUseCooked(sectionTitle: string) {
  return [
    "Pizze Classiche",
    "Pizze Gourmet",
    "Gli Scaccioni",
    "Le Scacciate",
  ].includes(sectionTitle);
}

export default function AsportoClient({ sections }: { sections: Section[] }) {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [distanceCheck, setDistanceCheck] = useState<any>(null);
  const [checkingDistance, setCheckingDistance] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Catania",
    notes: "",
    orderType: "delivery",
    payment: "Contanti",
    time: "Prima possibile",
  });

  const deliveryFee = 0;

  const fullDeliveryAddress =
    customer.orderType === "delivery"
      ? `${customer.address}, ${customer.city}, Italia`
      : "Ritiro in sede - Perlage Pizza & Restaurant, Via Asiago 20, Catania";

  const addToCart = (item: Item, sectionTitle: string) => {
    const price = parsePrice(item.price);

    if (!price) {
      alert("Prodotto ordinabile solo su richiesta.");
      return;
    }

    setCart((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sectionTitle,
        name: item.name,
        price,
        quantity: 1,
        extras: [],
        extrasOpen: false,
        cooked: false,
        notes: "",
      },
    ]);
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleExtraSection = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, extrasOpen: !item.extrasOpen } : item
      )
    );
  };

  const toggleExtra = (id: string, extra: any) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const exists = item.extras.find((e: any) => e.name === extra.name);

        return {
          ...item,
          extras: exists
            ? item.extras.filter((e: any) => e.name !== extra.name)
            : [...item.extras, extra],
        };
      })
    );
  };

  const updateItemNotes = (id: string, notes: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const toggleCooked = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cooked: !item.cooked } : item
      )
    );
  };

  const itemTotal = (item: any) => {
    const extrasTotal = item.extras.reduce(
      (sum: number, extra: any) => sum + extra.price,
      0
    );

    return (item.price + extrasTotal) * item.quantity;
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + itemTotal(item), 0);
  }, [cart]);

  const discount = useMemo(() => {
    if (coupon.trim().toUpperCase() === "PERLAGE10") {
      return subtotal * 0.1;
    }

    return 0;
  }, [coupon, subtotal]);

  const total = useMemo(() => {
    return Math.max(subtotal + deliveryFee - discount, 0);
  }, [subtotal, discount]);

  const openMapsAddress = () => {
    if (!customer.address) {
      alert("Inserisci prima l'indirizzo.");
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullDeliveryAddress
    )}`;

    window.open(url, "_blank");
  };

  const verifyDistance = async () => {
    if (!customer.address || !customer.city) {
      alert("Inserisci indirizzo e comune.");
      return;
    }

    setCheckingDistance(true);

    try {
      const response = await fetch("/api/delivery-distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: fullDeliveryAddress,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Errore verifica distanza");
      }

      setDistanceCheck(result);

      if (!result.allowed) {
        alert(
          `Zona troppo distante: ${result.distanceText}. Limite massimo ${result.maxDistanceKm} km.`
        );
      }
    } catch (error: any) {
      alert(error.message || "Errore verifica distanza");
    } finally {
      setCheckingDistance(false);
    }
  };

  const submitOrder = async () => {
    if (!customer.name || !customer.phone) {
      alert("Inserisci nome e telefono.");
      return;
    }

    if (customer.orderType === "delivery") {
      if (!customer.address) {
        alert("Inserisci indirizzo di consegna.");
        return;
      }

      if (!customer.city) {
        alert("Seleziona il comune di consegna.");
        return;
      }

      if (!distanceCheck) {
        alert("Verifica prima la distanza di consegna.");
        return;
      }

      if (!distanceCheck.allowed) {
        alert("Indirizzo fuori zona di consegna.");
        return;
      }
    }

    if (cart.length === 0) {
      alert("Aggiungi almeno un prodotto al carrello.");
      return;
    }

    setLoading(true);

    try {
      const formattedCart = cart.map((item) => {
        const extrasText =
          item.extras.length > 0
            ? `Extra: ${item.extras
                .map((extra: any) => `${extra.name} +€${extra.price}`)
                .join(", ")}`
            : "";

        const cookedText = item.cooked ? "Ben cotta" : "";

        const productNotes = [extrasText, cookedText, item.notes]
          .filter(Boolean)
          .join(" | ");

        const extrasTotal = item.extras.reduce(
          (sum: number, extra: any) => sum + extra.price,
          0
        );

        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price + extrasTotal,
          notes: productNotes || null,
        };
      });

      if (discount > 0) {
        formattedCart.push({
          name: `Coupon ${coupon.trim().toUpperCase()}`,
          quantity: 1,
          price: -discount,
          notes: "Sconto fidelity",
        });
      }

      const orderNotes = [
        `Tipo ordine: ${
          customer.orderType === "delivery" ? "Delivery" : "Ritiro in sede"
        }`,
        customer.orderType === "delivery" ? `Comune: ${customer.city}` : "",
        customer.orderType === "delivery" ? "Costo consegna: Gratis" : "",
        distanceCheck
          ? `Distanza: ${distanceCheck.distanceText} - ${distanceCheck.durationText}`
          : "",
        discount > 0
          ? `Coupon: ${coupon.trim().toUpperCase()} - Sconto €${discount.toFixed(
              2
            )}`
          : "",
        `Orario: ${customer.time}`,
        `Pagamento: ${customer.payment}`,
        customer.notes ? `Note generali: ${customer.notes}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const response = await fetch("/api/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: fullDeliveryAddress,
          notes: orderNotes,
          cart: formattedCart,
          total,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Errore durante l’invio ordine");
      }

     alert("Ordine inviato correttamente!");

const whatsappMessage = [
  "🍕 NUOVO ORDINE PERLAGE",
  "",
  `👤 Cliente: ${customer.name}`,
  `📞 Telefono: ${customer.phone}`,
  `📧 Email: ${customer.email || "-"}`,
  "",
  `📦 Tipo: ${
    customer.orderType === "delivery" ? "Delivery" : "Ritiro"
  }`,
  `📍 Indirizzo: ${fullDeliveryAddress}`,
  distanceCheck
    ? `🗺️ Distanza: ${distanceCheck.distanceText} - ${distanceCheck.durationText}`
    : "",
  `🕒 Orario: ${customer.time}`,
  `💳 Pagamento: ${customer.payment}`,
  "",
  "🛒 PRODOTTI",
  "",
  ...formattedCart.map(
    (item: any) =>
      `• ${item.quantity}x ${item.name} - € ${(item.price * item.quantity).toFixed(2)}${
        item.notes ? `\n  Note: ${item.notes}` : ""
      }`
  ),
  "",
  discount > 0
    ? `🎟️ Coupon ${coupon.trim().toUpperCase()}: -€ ${discount.toFixed(2)}`
    : "",
  `💰 Totale: € ${total.toFixed(2)}`,
  "",
  customer.notes ? `📝 Note: ${customer.notes}` : "",
].filter(Boolean).join("\n");

window.open(
  `https://wa.me/393892573240?text=${encodeURIComponent(whatsappMessage)}`,
  "_blank"
);

setCart([]);
setCoupon("");
setDistanceCheck(null);
setCustomer({
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "Catania",
  notes: "",
  orderType: "delivery",
  payment: "Contanti",
  time: "Prima possibile",
});
    } catch (error: any) {
      alert(error.message || "Errore durante l’invio ordine");
    } finally {
      setLoading(false);
    }
  };

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
            Scegli i prodotti, aggiungili al carrello e personalizza il tuo
            ordine.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#ordine"
              className="rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
            >
              Ordina ora
            </a>

            <Link
              href="/"
              className="rounded-full border border-white/20 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:border-[#D2B07A]"
            >
              Torna alla Home
            </Link>
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
              Zone servite
            </p>
            <p className="mt-3 text-lg text-white/75">
              Consegna gratuita entro la distanza massima consentita.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
              Pagamento
            </p>
            <p className="mt-3 text-lg text-white/75">
              Contanti o POS alla consegna.
            </p>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="px-6 py-16">
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

                  {item.price && (
                    <button
                      onClick={() => addToCart(item, section.title)}
                      className="mt-6 rounded-full bg-[#D2B07A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B]"
                    >
                      Aggiungi
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="ordine" className="px-6 pb-28 pt-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div className="rounded-[2rem] border border-[#D2B07A]/30 bg-[#0D0D0D] p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Carrello
            </p>

            <h2 className="mt-5 text-4xl font-light [font-family:var(--font-playfair)]">
              Il tuo ordine
            </h2>

            <div className="mt-8 space-y-4">
              {cart.length === 0 && (
                <p className="text-white/50">
                  Nessun prodotto aggiunto al carrello.
                </p>
              )}

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg text-white">{item.name}</p>
                      <p className="text-sm text-white/50">
                        € {item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-full border border-red-500/40 px-3 py-1 text-red-300"
                      >
                        -
                      </button>

                      <span className="min-w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-full border border-green-500/40 px-3 py-1 text-green-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {canUseCooked(item.sectionTitle) && (
                    <div className="mt-4">
                      <label className="flex items-center gap-2 text-sm text-white/60">
                        <input
                          type="checkbox"
                          checked={item.cooked}
                          onChange={() => toggleCooked(item.id)}
                        />
                        Ben cotta
                      </label>
                    </div>
                  )}

                  {canUseExtras(item.sectionTitle) && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleExtraSection(item.id)}
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-[#D2B07A]"
                      >
                        {item.extrasOpen
                          ? "Chiudi extra"
                          : `Extra e personalizzazioni ${
                              item.extras.length > 0
                                ? `(${item.extras.length})`
                                : ""
                            }`}
                      </button>

                      {item.extrasOpen && (
                        <div className="mt-3 max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-black/50 p-3">
                          <div className="grid gap-2 md:grid-cols-2">
                            {extras.map((extra) => {
                              const selected = item.extras.some(
                                (e: any) => e.name === extra.name
                              );

                              return (
                                <button
                                  key={extra.name}
                                  onClick={() => toggleExtra(item.id, extra)}
                                  className={`rounded-xl border px-3 py-2 text-left text-xs ${
                                    selected
                                      ? "border-[#D2B07A] bg-[#D2B07A] text-black"
                                      : "border-white/10 text-white/60"
                                  }`}
                                >
                                  {extra.name} +€{extra.price}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <textarea
                    value={item.notes}
                    onChange={(event) =>
                      updateItemNotes(item.id, event.target.value)
                    }
                    placeholder="Note prodotto: senza cipolla, senza olive..."
                    className="mt-4 min-h-[80px] w-full rounded-2xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none"
                  />

                  <div className="mt-4 text-right text-[#D2B07A]">
                    € {itemTotal(item).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Subtotale</span>
                <span className="text-[#D2B07A]">
                  € {subtotal.toFixed(2)}
                </span>
              </div>

              {customer.orderType === "delivery" && (
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Consegna</span>
                  <span className="text-green-400">Gratis</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Sconto coupon</span>
                  <span className="text-green-400">
                    -€ {discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-3">
                <span className="text-xl text-white/60">Totale</span>
                <span className="text-4xl text-[#D2B07A]">
                  € {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Dati ordine
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setCustomer({ ...customer, orderType: "delivery" });
                    setDistanceCheck(null);
                  }}
                  className={`rounded-2xl border p-4 text-sm ${
                    customer.orderType === "delivery"
                      ? "border-[#D2B07A] bg-[#D2B07A] text-black"
                      : "border-white/10 text-white"
                  }`}
                >
                  Delivery
                </button>

                <button
                  onClick={() => {
                    setCustomer({ ...customer, orderType: "pickup" });
                    setDistanceCheck(null);
                  }}
                  className={`rounded-2xl border p-4 text-sm ${
                    customer.orderType === "pickup"
                      ? "border-[#D2B07A] bg-[#D2B07A] text-black"
                      : "border-white/10 text-white"
                  }`}
                >
                  Ritiro
                </button>
              </div>

              {customer.orderType === "pickup" && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-[#D2B07A]/50 bg-[#D2B07A]/10 p-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#D2B07A] transition hover:bg-[#D2B07A] hover:text-black"
                >
                  Apri indicazioni su Google Maps
                </a>
              )}

              <input
                value={customer.name}
                onChange={(event) =>
                  setCustomer({ ...customer, name: event.target.value })
                }
                placeholder="Nome"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              />

              <input
                value={customer.phone}
                onChange={(event) =>
                  setCustomer({ ...customer, phone: event.target.value })
                }
                placeholder="Telefono"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              />

              <input
                value={customer.email}
                onChange={(event) =>
                  setCustomer({ ...customer, email: event.target.value })
                }
                placeholder="Email opzionale"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              />

              {customer.orderType === "delivery" && (
                <>
                  <select
                    value={customer.city}
                    onChange={(event) => {
                      setCustomer({ ...customer, city: event.target.value });
                      setDistanceCheck(null);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
                  >
                    {allowedCities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>

                  <input
                    value={customer.address}
                    onChange={(event) => {
                      setCustomer({
                        ...customer,
                        address: event.target.value,
                      });
                      setDistanceCheck(null);
                    }}
                    placeholder="Via, numero civico, interno"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
                  />

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={openMapsAddress}
                      className="w-full rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/70"
                    >
                      Apri indirizzo su Google Maps
                    </button>

                    <button
                      type="button"
                      onClick={verifyDistance}
                      disabled={checkingDistance}
                      className="w-full rounded-full border border-[#D2B07A]/50 px-5 py-3 text-sm font-semibold text-[#D2B07A] disabled:opacity-50"
                    >
                      {checkingDistance
                        ? "Verifica distanza..."
                        : "Verifica distanza consegna"}
                    </button>
                  </div>

                  {distanceCheck && (
                    <p
                      className={`rounded-2xl border p-4 text-sm ${
                        distanceCheck.allowed
                          ? "border-green-500/30 bg-green-500/10 text-green-300"
                          : "border-red-500/30 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {distanceCheck.allowed
                        ? `Consegna disponibile: ${distanceCheck.distanceText}, circa ${distanceCheck.durationText}`
                        : `Zona non servita: ${distanceCheck.distanceText}`}
                    </p>
                  )}
                </>
              )}

              <select
                value={customer.time}
                onChange={(event) =>
                  setCustomer({ ...customer, time: event.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              >
                <option>Prima possibile</option>
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
                <option>20:30</option>
                <option>21:00</option>
                <option>21:30</option>
                <option>22:00</option>
                <option>22:30</option>
                <option>23:00</option>
              </select>

              <select
                value={customer.payment}
                onChange={(event) =>
                  setCustomer({ ...customer, payment: event.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              >
                <option>Contanti</option>
                <option>POS alla consegna</option>
              </select>

              <input
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="Codice coupon"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              />

              {discount > 0 && (
                <p className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
                  Coupon PERLAGE10 applicato: -€ {discount.toFixed(2)}
                </p>
              )}

              <textarea
                value={customer.notes}
                onChange={(event) =>
                  setCustomer({ ...customer, notes: event.target.value })
                }
                placeholder="Note generali, citofono, orario preferito..."
                className="min-h-[130px] w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none"
              />

              <button
                onClick={submitOrder}
                disabled={loading}
                className="w-full rounded-full bg-[#D2B07A] px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B] disabled:opacity-50"
              >
                {loading ? "Invio ordine..." : "Invia ordine"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}