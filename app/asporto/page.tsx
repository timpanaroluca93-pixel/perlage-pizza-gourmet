import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asporto & Delivery | Perlage Pizza & Restaurant",
  description:
    "Ordina le pizze gourmet e il menu delivery di Perlage Pizza & Restaurant a Catania.",
};

export default function AsportoPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
          Perlage Pizza & Restaurant
        </p>

        <h1 className="mt-6 text-5xl font-light md:text-7xl">
          Asporto & Delivery
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
          Ordina le nostre pizze gourmet e il menu Perlage direttamente a casa.
        </p>
      </div>
    </main>
  );
}