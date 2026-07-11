"use client";

import QRCode from "react-qr-code";

type LoyaltyCardProps = {
  customerName: string;
  customerId: string;
  cardNumber: string;
  level: "bronze" | "silver" | "gold" | "platinum" | string;
  points: number;
  activeCoupons: number;
  memberSince?: string;
};

const levelStyles: Record<string, string> = {
  bronze: "from-[#8C5A3C] via-[#B9794F] to-[#5C3827]",
  silver: "from-[#777777] via-[#D8D8D8] to-[#5A5A5A]",
  gold: "from-[#8A672D] via-[#E2C177] to-[#6B4D1F]",
  platinum: "from-[#3E4650] via-[#B7C0C8] to-[#252B31]",
};

export default function LoyaltyCard({
  customerName,
  customerId,
  cardNumber,
  level,
  points,
  activeCoupons,
  memberSince,
}: LoyaltyCardProps) {
  const normalizedLevel = String(level || "bronze").toLowerCase();
  const gradient =
    levelStyles[normalizedLevel] || levelStyles.bronze;

  return (
    <div className="relative aspect-[1.586/1] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:p-8">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}
      />

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10 bg-white/[0.03]" />
      <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-[#D2B07A]/15 bg-[#D2B07A]/[0.035]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D2B07A] md:text-xs">
              Perlage Loyalty
            </p>

            <h2 className="mt-3 text-3xl font-light text-white md:text-4xl [font-family:var(--font-playfair)]">
              Perlage
            </h2>

            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/40">
              Pizza & Restaurant
            </p>
          </div>

          <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              {normalizedLevel}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              Titolare
            </p>

            <p className="mt-2 text-2xl text-white md:text-3xl">
              {customerName}
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-white/35">
              Numero Card
            </p>

            <p className="mt-2 font-mono text-lg tracking-[0.18em] text-[#D2B07A] md:text-xl">
              {cardNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:min-w-[250px]">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Punti
              </p>

              <p className="mt-2 text-3xl text-white">{points}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Coupon
              </p>

              <p className="mt-2 text-3xl text-white">{activeCoupons}</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          <p className="text-xs text-white/35">
            {memberSince
              ? `Cliente dal ${memberSince}`
              : "Perlage Pizza & Restaurant"}
          </p>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D2B07A]/30 bg-[#D2B07A]/10 text-xl text-[#D2B07A]">
            <div className="rounded-xl bg-white p-2">
  <QRCode
    value={`${window.location.origin}/admin/clienti/${cardNumber}`}
    size={72}
  />
</div>
          </div>
        </div>
      </div>
    </div>
  );
}