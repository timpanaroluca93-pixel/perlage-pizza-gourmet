"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminClientiPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const { data: customersData } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: reservationsData } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: false });

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: couponsData } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    setCustomers(customersData || []);
    setReservations(reservationsData || []);
    setOrders(ordersData || []);
    setCoupons(couponsData || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCustomerReservations = (customerId: string) =>
    reservations.filter((r) => r.customer_id === customerId);

  const getCustomerOrders = (customerId: string) =>
    orders.filter((o) => o.customer_id === customerId);

  const getCustomerCoupons = (customerId: string) =>
    coupons.filter((c) => c.customer_id === customerId);

  const getDeliveryTotal = (customerId: string) =>
    getCustomerOrders(customerId).reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

  const getVipLabel = (reservationsCount: number, deliveryTotal: number) => {
    if (reservationsCount >= 10 || deliveryTotal >= 500) return "VIP GOLD";
    if (reservationsCount >= 5 || deliveryTotal >= 250) return "VIP SILVER";
    if (reservationsCount >= 2 || deliveryTotal >= 100) return "VIP BRONZE";
    return "NUOVO CLIENTE";
  };

  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase();

    return customers.filter((customer) => {
      const text = `${customer.name || ""} ${customer.phone || ""} ${
        customer.email || ""
      }`.toLowerCase();

      return text.includes(value);
    });
  }, [customers, search]);

  const totalDelivery = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const vipGold = customers.filter((customer) => {
    const r = getCustomerReservations(customer.id).length;
    const d = getDeliveryTotal(customer.id);
    return getVipLabel(r, d) === "VIP GOLD";
  }).length;

  const currentMonth = new Date().toISOString().slice(0, 7);

  const newThisMonth = customers.filter((customer) =>
    customer.created_at?.startsWith(currentMonth)
  ).length;

  const cleanPhone = (phone?: string) => String(phone || "").replace(/\D/g, "");

  const getWhatsAppLink = (phone?: string) => {
    const cleaned = cleanPhone(phone);
    if (!cleaned) return "#";
    const international = cleaned.startsWith("39") ? cleaned : `39${cleaned}`;
    return `https://wa.me/${international}`;
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">
            Perlage OS
          </p>

          <h1 className="mt-3 text-4xl font-light text-[#D2B07A]">
            👥 CRM Clienti
          </h1>

          <p className="mt-2 text-white/50">
            Archivio clienti, storico prenotazioni, delivery e coupon.
          </p>
        </div>

        <input
          type="text"
          placeholder="Cerca nome, telefono o email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/35 focus:border-[#D2B07A] xl:max-w-md"
        />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Clienti totali</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">{customers.length}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">VIP GOLD</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">{vipGold}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Nuovi questo mese</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">{newThisMonth}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Delivery totale</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">
            € {totalDelivery.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {filteredCustomers.map((customer) => {
          const customerReservations = getCustomerReservations(customer.id);
          const customerOrders = getCustomerOrders(customer.id);
          const customerCoupons = getCustomerCoupons(customer.id);
          const deliveryTotal = getDeliveryTotal(customer.id);
          const vipLabel = getVipLabel(
            customerReservations.length,
            deliveryTotal
          );

          const lastReservation = customerReservations[0];

          const activeCoupons = customerCoupons.filter((c) => !c.used).length;
          const usedCoupons = customerCoupons.filter((c) => c.used).length;

          return (
            <div
              key={customer.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6"
            >
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl text-white">
                    {customer.name || "Cliente"}
                  </h2>

                  <a
                    href={`tel:${customer.phone}`}
                    className="mt-2 block text-sm text-white/55 hover:text-[#D2B07A]"
                  >
                    📞 {customer.phone || "-"}
                  </a>

                  {customer.email && (
                    <a
                      href={`mailto:${customer.email}`}
                      className="mt-1 block text-sm text-white/35 hover:text-[#D2B07A]"
                    >
                      ✉️ {customer.email}
                    </a>
                  )}
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs ${
                    vipLabel === "VIP GOLD"
                      ? "bg-[#D2B07A]/20 text-[#D2B07A]"
                      : vipLabel === "VIP SILVER"
                      ? "bg-white/15 text-white"
                      : vipLabel === "VIP BRONZE"
                      ? "bg-orange-500/20 text-orange-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {vipLabel}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/45">Prenotazioni</p>
                  <p className="mt-2 text-3xl text-[#D2B07A]">
                    {customerReservations.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/45">Delivery</p>
                  <p className="mt-2 text-3xl text-[#D2B07A]">
                    {customerOrders.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/45">Spesa</p>
                  <p className="mt-2 text-2xl text-[#D2B07A]">
                    € {deliveryTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-white/45">Ultima visita</p>
                  <p className="mt-2 text-sm text-white">
                    {lastReservation?.reservation_date || "-"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-white/45">Coupon attivi</p>
                  <p className="mt-2 text-xl text-[#D2B07A]">
                    {activeCoupons}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-white/45">Coupon usati</p>
                  <p className="mt-2 text-xl text-[#D2B07A]">
                    {usedCoupons}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`tel:${customer.phone}`}
                  className="rounded-full bg-blue-500/20 px-4 py-2 text-xs text-blue-300"
                >
                  📞 Chiama
                </a>

                <a
                  href={getWhatsAppLink(customer.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-500/20 px-4 py-2 text-xs text-green-300"
                >
                  💬 WhatsApp
                </a>

                <button className="rounded-full bg-[#D2B07A]/20 px-4 py-2 text-xs text-[#D2B07A]">
                  🎟 Invia coupon
                </button>

                <a
  href={`/admin/clienti/${customer.id}`}
  className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/70"
>
  Apri scheda
</a>
              </div>
            </div>
          );
        })}

        {filteredCustomers.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center text-white/50">
            Nessun cliente trovato.
          </div>
        )}
      </div>
    </div>
  );
}