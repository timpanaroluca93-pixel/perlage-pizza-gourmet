"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function PublicLoyaltyCardPage() {
  const params = useParams();
  const cardNumber = String(params.cardNumber || "");

  const [loading, setLoading] = useState(true);
  const [loyaltyAccount, setLoyaltyAccount] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [activeCoupons, setActiveCoupons] = useState<any[]>([]);

 useEffect(() => {
  const loadCard = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/card/${encodeURIComponent(cardNumber)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setLoyaltyAccount(null);
        setCustomer(null);
        setActiveCoupons([]);
        setLoading(false);
        return;
      }

      setLoyaltyAccount(result.loyaltyAccount);
      setCustomer(result.customer);
      setActiveCoupons(result.activeCoupons || []);
    } catch (error) {
      console.error("CARD PAGE ERROR:", error);
      setLoyaltyAccount(null);
      setCustomer(null);
      setActiveCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  if (cardNumber) {
    loadCard();
  } else {
    setLoading(false);
  }
}, [cardNumber]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-white">
        <p className="text-white/50">Caricamento Perlage Card...</p>
      </main>
    );
  }

  if (!loyaltyAccount || !customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-white">
        <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-light text-[#D2B07A]">
            Card non trovata
          </h1>

          <p className="mt-4 text-white/50">
            Il numero della Perlage Card non è valido.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#D2B07A] px-6 py-3 text-sm font-semibold text-black"
          >
            Torna al sito
          </Link>
        </div>
      </main>
    );
  }

  const level = String(loyaltyAccount.level || "bronze").toLowerCase();

  const levelGradient: Record<string, string> = {
    bronze: "from-[#8C5A3C] via-[#B9794F] to-[#5C3827]",
    silver: "from-[#777777] via-[#D8D8D8] to-[#5A5A5A]",
    gold: "from-[#8A672D] via-[#E2C177] to-[#6B4D1F]",
    platinum: "from-[#3E4650] via-[#B7C0C8] to-[#252B31]",
  };

  const gradient = levelGradient[level] || levelGradient.bronze;

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-10 text-white md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D2B07A]">
            Perlage Loyalty
          </p>

          <h1 className="mt-4 text-4xl font-light md:text-6xl [font-family:var(--font-playfair)]">
            La tua Perlage Card
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55 md:text-base">
            Mostra questa card al personale per accedere ai tuoi punti,
            vantaggi e coupon attivi.
          </p>
        </div>

        <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#090909] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.65)] md:p-10">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-25`}
          />

          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10 bg-white/[0.03]" />
          <div className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full border border-[#D2B07A]/15 bg-[#D2B07A]/[0.035]" />

          <div className="relative z-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#D2B07A]">
                  Perlage Loyalty
                </p>

                <h2 className="mt-3 text-4xl font-light md:text-5xl [font-family:var(--font-playfair)]">
                  Perlage
                </h2>

                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/40">
                  Pizza & Restaurant
                </p>
              </div>

              <div className="w-fit rounded-full border border-white/15 bg-black/30 px-5 py-2 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
                  {level}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                  Titolare
                </p>

                <p className="mt-2 text-3xl md:text-4xl">
                  {customer.name || "Cliente"}
                </p>

                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/35">
                  Numero Card
                </p>

                <p className="mt-2 font-mono text-xl tracking-[0.18em] text-[#D2B07A] md:text-2xl">
                  {loyaltyAccount.card_number}
                </p>

                <div className="mt-7 grid max-w-sm grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      Punti
                    </p>
                    <p className="mt-2 text-3xl">
                      {Number(loyaltyAccount.points || 0)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      Coupon
                    </p>
                    <p className="mt-2 text-3xl">{activeCoupons.length}</p>
                  </div>
                </div>
              </div>

              <div className="mx-auto rounded-3xl bg-white p-4 md:mx-0">
                <QRCode
                  value={`https://perlagepizzaerestaurant.it/card/${loyaltyAccount.card_number}`}
                  size={150}
                />
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-xs text-white/35">
                Cliente dal {customer.created_at?.slice(0, 10) || "-"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/35">
                Vantaggi disponibili
              </p>

              <h2 className="mt-3 text-2xl font-light text-[#D2B07A]">
                Coupon attivi
              </h2>
            </div>

            <span className="rounded-full bg-[#D2B07A]/15 px-4 py-2 text-sm text-[#D2B07A]">
              {activeCoupons.length}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {activeCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="rounded-2xl border border-white/10 bg-black/25 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-xl text-[#D2B07A]">
                      {coupon.code}
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      {coupon.type || "welcome"} ·{" "}
                      {coupon.discount_percent || 20}% di sconto
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-green-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-300">
                    Attivo
                  </span>
                </div>

                {coupon.expires_at && (
                  <p className="mt-4 text-xs text-white/35">
                    Valido fino al {coupon.expires_at.slice(0, 10)}
                  </p>
                )}
              </div>
            ))}

            {activeCoupons.length === 0 && (
              <p className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center text-white/45">
                Nessun coupon attivo.
              </p>
            )}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/prenotazioni"
            className="inline-flex rounded-full bg-[#D2B07A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#E7C48B]"
          >
            Prenota da Perlage
          </Link>
        </div>
      </div>
    </main>
  );
}