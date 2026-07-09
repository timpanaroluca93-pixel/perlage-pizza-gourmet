"use client";

import ResetCustomerButton from "@/components/admin/ResetCustomerButton";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function ClienteDettaglioPage() {
  const params = useParams();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCustomer = async () => {
    setLoading(true);

    const { data: customerData } = await supabase
      .from("customers")
      .select("*")
      .eq("id", customerId)
      .single();

    const { data: reservationsData } = await supabase
      .from("reservations")
      .select("*")
      .eq("customer_id", customerId)
      .order("reservation_date", { ascending: false });

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    const { data: couponsData } = await supabase
      .from("coupons")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    setCustomer(customerData);
    setReservations(reservationsData || []);
    setOrders(ordersData || []);
    setCoupons(couponsData || []);
    setLoading(false);
  };

  useEffect(() => {
    if (customerId) loadCustomer();
  }, [customerId]);

  const deliveryTotal = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const activeCoupons = coupons.filter((coupon) => !coupon.used);
  const usedCoupons = coupons.filter((coupon) => coupon.used);

  const lastReservation = reservations[0];

  const vipLabel = useMemo(() => {
    if (reservations.length >= 10 || deliveryTotal >= 500) return "VIP GOLD";
    if (reservations.length >= 5 || deliveryTotal >= 250) return "VIP SILVER";
    if (reservations.length >= 2 || deliveryTotal >= 100) return "VIP BRONZE";
    return "NUOVO CLIENTE";
  }, [reservations, deliveryTotal]);

  const cleanPhone = (phone?: string) => String(phone || "").replace(/\D/g, "");

  const getWhatsAppLink = (phone?: string) => {
    const cleaned = cleanPhone(phone);
    if (!cleaned) return "#";
    const international = cleaned.startsWith("39") ? cleaned : `39${cleaned}`;
    return `https://wa.me/${international}`;
  };

  const timeline = useMemo(() => {
    const reservationItems = reservations.map((reservation) => ({
      id: `reservation-${reservation.id}`,
      type: "Prenotazione",
      date: reservation.reservation_date,
      title: `${reservation.people} persone`,
      subtitle: `${reservation.reservation_time || "-"} · ${
        reservation.status || "pending"
      }`,
      badge: "🍽",
    }));

    const orderItems = orders.map((order) => ({
      id: `order-${order.id}`,
      type: "Delivery",
      date: order.created_at?.slice(0, 10),
      title: `€ ${Number(order.total || 0).toFixed(2)}`,
      subtitle: order.status || "pending",
      badge: "🛵",
    }));

    const couponItems = coupons.map((coupon) => ({
      id: `coupon-${coupon.id}`,
      type: "Coupon",
      date: coupon.created_at?.slice(0, 10),
      title: coupon.code,
      subtitle: coupon.used ? "Utilizzato" : "Attivo",
      badge: "🎟",
    }));

    return [...reservationItems, ...orderItems, ...couponItems]
      .filter((item) => item.date)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }, [reservations, orders, coupons]);

  if (loading) {
    return (
      <div>
        <Header title="👤 Scheda Cliente" subtitle="Caricamento cliente..." />
        <Card>
          <p className="text-white/50">Caricamento dati...</p>
        </Card>
      </div>
    );
  }

  if (!customer) {
    return (
      <div>
        <Header title="👤 Scheda Cliente" subtitle="Cliente non trovato." />
        <Card>
          <p className="text-white/50">Nessun cliente trovato.</p>
          <Link
            href="/admin/clienti"
            className="mt-4 inline-flex rounded-full bg-[#D2B07A] px-5 py-3 text-sm text-black"
          >
            Torna ai clienti
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <Header
          title={`👤 ${customer.name || "Cliente"}`}
          subtitle="Scheda completa cliente, storico, coupon e valore CRM."
        />

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/clienti"
            className="rounded-full bg-white/10 px-5 py-3 text-sm text-white/70"
          >
            ← Torna ai clienti
          </Link>

          <a
            href={`tel:${customer.phone}`}
            className="rounded-full bg-blue-500/20 px-5 py-3 text-sm text-blue-300"
          >
            📞 Chiama
          </a>

          <a
            href={getWhatsAppLink(customer.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-500/20 px-5 py-3 text-sm text-green-300"
          >
            💬 WhatsApp
          </a>

          <button className="rounded-full bg-[#D2B07A]/20 px-5 py-3 text-sm text-[#D2B07A]">
            🎟 Invia coupon
          </button>
          <ResetCustomerButton customerId={customer.id} />
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Prenotazioni" value={reservations.length} />
        <StatCard label="Delivery" value={orders.length} />
        <StatCard label="Totale delivery" value={`€ ${deliveryTotal.toFixed(2)}`} />
        <StatCard label="Coupon attivi" value={activeCoupons.length} />
        <StatCard label="Coupon usati" value={usedCoupons.length} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Card>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Profilo cliente
                </p>

                <h2 className="mt-3 text-3xl text-white">
                  {customer.name || "-"}
                </h2>

                <p className="mt-2 text-white/55">📞 {customer.phone || "-"}</p>

                {customer.email && (
                  <p className="mt-1 text-white/40">✉️ {customer.email}</p>
                )}
              </div>

              <Badge variant="gold">{vipLabel}</Badge>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Cliente dal</p>
                <p className="mt-2 text-white">
                  {customer.created_at?.slice(0, 10) || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Ultima visita</p>
                <p className="mt-2 text-white">
                  {lastReservation?.reservation_date || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-white/45">Spesa media delivery</p>
                <p className="mt-2 text-[#D2B07A]">
                  €{" "}
                  {orders.length > 0
                    ? (deliveryTotal / orders.length).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="mb-5 text-2xl font-light text-[#D2B07A]">
              🎟 Coupon
            </h2>

            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-lg text-[#D2B07A]">
                        {coupon.code}
                      </p>

                      <p className="mt-1 text-sm text-white/40">
                        {coupon.type || "welcome"} ·{" "}
                        {coupon.discount_percent || 20}%
                      </p>
                    </div>

                    <Badge variant={coupon.used ? "red" : "green"}>
                      {coupon.used ? "Usato" : "Attivo"}
                    </Badge>
                  </div>
                </div>
              ))}

              {coupons.length === 0 && (
                <p className="text-white/45">Nessun coupon collegato.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-5 text-2xl font-light text-[#D2B07A]">
              📅 Storico prenotazioni
            </h2>

            <div className="space-y-3">
              {reservations.slice(0, 8).map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-white">
                        {reservation.reservation_date} ·{" "}
                        {reservation.reservation_time}
                      </p>

                      <p className="mt-1 text-sm text-white/45">
                        {reservation.people} persone
                      </p>
                    </div>

                    <Badge
                      variant={
                        reservation.status === "confirmed"
                          ? "green"
                          : reservation.status === "cancelled"
                          ? "red"
                          : "yellow"
                      }
                    >
                      {reservation.status}
                    </Badge>
                  </div>

                  {reservation.notes && (
                    <p className="mt-3 text-sm text-white/45">
                      📝 {reservation.notes}
                    </p>
                  )}
                </div>
              ))}

              {reservations.length === 0 && (
                <p className="text-white/45">Nessuna prenotazione.</p>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="mb-5 text-2xl font-light text-[#D2B07A]">
              🛵 Storico delivery
            </h2>

            <div className="space-y-3">
              {orders.slice(0, 8).map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white">
                        {order.created_at?.slice(0, 10)}
                      </p>

                      <p className="mt-1 text-sm text-white/45">
                        {order.status || "pending"}
                      </p>
                    </div>

                    <Badge variant="gold">
                      € {Number(order.total || 0).toFixed(2)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {order.order_items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="rounded-xl bg-white/[0.03] px-3 py-2 text-sm text-white/60"
                      >
                        {item.quantity}x {item.product_name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <p className="text-white/45">Nessun ordine delivery.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <h2 className="mb-5 text-2xl font-light text-[#D2B07A]">
          🧾 Timeline cliente
        </h2>

        <div className="space-y-3">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/25 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D2B07A]/15 text-lg">
                {item.badge}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/45">
                      {item.type} · {item.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-[#D2B07A]">{item.date}</p>
                </div>
              </div>
            </div>
          ))}

          {timeline.length === 0 && (
            <p className="text-white/45">Nessuna attività registrata.</p>
          )}
        </div>
      </Card>
    </div>
  );
}