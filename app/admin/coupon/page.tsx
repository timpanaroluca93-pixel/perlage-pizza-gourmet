"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminCouponPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadCoupons = async () => {
    const { data } = await supabase
      .from("coupons")
      .select("*, customers(*), reservations(*)")
      .order("created_at", { ascending: false });

    setCoupons(data || []);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const filteredCoupons = useMemo(() => {
    const value = search.toLowerCase();

    return coupons.filter((coupon) => {
      const customer = coupon.customers || {};
      const text = `${coupon.code || ""} ${customer.name || ""} ${
        customer.phone || ""
      } ${customer.email || ""}`.toLowerCase();

      const matchSearch = text.includes(value);

      const matchFilter =
        filter === "all" ||
        (filter === "active" && !coupon.used) ||
        (filter === "used" && coupon.used) ||
        (filter === "welcome" && coupon.type === "welcome");

      return matchSearch && matchFilter;
    });
  }, [coupons, search, filter]);

  const activeCoupons = coupons.filter((coupon) => !coupon.used).length;
  const usedCoupons = coupons.filter((coupon) => coupon.used).length;
  const welcomeCoupons = coupons.filter(
    (coupon) => coupon.type === "welcome"
  ).length;

  const markAsUsed = async (id: string) => {
    await supabase
      .from("coupons")
      .update({
        used: true,
        used_at: new Date().toISOString(),
      })
      .eq("id", id);

    await loadCoupons();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <Header
          title="🎟 Coupon"
          subtitle="Gestione coupon, codici promozionali e fidelizzazione clienti."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:min-w-[620px]">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca coupon, cliente o telefono..."
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
          >
            <option value="all">Tutti</option>
            <option value="active">Attivi</option>
            <option value="used">Usati</option>
            <option value="welcome">Welcome</option>
          </select>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Coupon totali" value={coupons.length} />
        <StatCard label="Attivi" value={activeCoupons} />
        <StatCard label="Usati" value={usedCoupons} />
        <StatCard label="Welcome" value={welcomeCoupons} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {filteredCoupons.map((coupon) => (
          <Card key={coupon.id}>
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Codice coupon
                </p>

                <h2 className="mt-2 font-mono text-3xl text-[#D2B07A]">
                  {coupon.code}
                </h2>
              </div>

              <Badge variant={coupon.used ? "red" : "green"}>
                {coupon.used ? "Usato" : "Attivo"}
              </Badge>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Cliente</p>
                <p className="mt-2 text-white">
                  {coupon.customers?.name || "-"}
                </p>
                <p className="mt-1 text-sm text-white/40">
                  {coupon.customers?.phone || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Sconto</p>
                <p className="mt-2 text-2xl text-[#D2B07A]">
                  {coupon.discount_percent || 20}%
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Tipo</p>
                <p className="mt-2 text-white">{coupon.type || "welcome"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Creato il</p>
                <p className="mt-2 text-white">
                  {coupon.created_at?.slice(0, 10) || "-"}
                </p>
              </div>
            </div>

            {coupon.used_at && (
              <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-sm text-red-300">
                  Utilizzato il {coupon.used_at.slice(0, 10)}
                </p>
              </div>
            )}

            {coupon.reservations && (
              <div className="mt-4 rounded-2xl border border-[#D2B07A]/25 bg-[#D2B07A]/10 p-4">
                <p className="text-sm text-[#D2B07A]">
                  Prenotazione collegata:{" "}
                  {coupon.reservations.reservation_date} ·{" "}
                  {coupon.reservations.reservation_time}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {!coupon.used && (
                <Button variant="success" onClick={() => markAsUsed(coupon.id)}>
                  Segna come usato
                </Button>
              )}

              {coupon.customers?.phone && (
                <a
                  href={`https://wa.me/39${String(
                    coupon.customers.phone
                  ).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-500/20 px-5 py-3 text-sm text-green-300"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </Card>
        ))}

        {filteredCoupons.length === 0 && (
          <Card>
            <p className="text-center text-white/50">
              Nessun coupon trovato.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}