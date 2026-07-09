"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function AdminDashboardPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);

  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  const loadData = async () => {
    const { data: reservationsData } = await supabase
      .from("reservations")
      .select("*, customers(*)")
      .order("reservation_date", { ascending: false })
      .order("reservation_time", { ascending: false });

    const { data: customersData } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, customers(*)")
      .order("created_at", { ascending: false });

    const { data: couponsData } = await supabase
      .from("coupons")
      .select("*, customers(*)")
      .order("created_at", { ascending: false });

    setReservations(reservationsData || []);
    setCustomers(customersData || []);
    setOrders(ordersData || []);
    setCoupons(couponsData || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayReservations = reservations.filter(
    (reservation) => reservation.reservation_date === today
  );

  const todayPeople = todayReservations.reduce(
    (sum, reservation) => sum + Number(reservation.people || 0),
    0
  );

  const monthReservations = reservations.filter((reservation) =>
    reservation.reservation_date?.startsWith(currentMonth)
  );

  const monthPeople = monthReservations.reduce(
    (sum, reservation) => sum + Number(reservation.people || 0),
    0
  );

  const newCustomersMonth = customers.filter((customer) =>
    customer.created_at?.startsWith(currentMonth)
  ).length;

  const activeCoupons = coupons.filter((coupon) => !coupon.used).length;
  const usedCoupons = coupons.filter((coupon) => coupon.used).length;

  const todayOrders = orders.filter((order) =>
    order.created_at?.startsWith(today)
  );

  const todayDeliveryTotal = todayOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const monthDeliveryTotal = orders
    .filter((order) => order.created_at?.startsWith(currentMonth))
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === "pending"
  ).length;

  const topCustomers = useMemo(() => {
    return customers
      .map((customer) => {
        const customerOrders = orders.filter(
          (order) => order.customer_id === customer.id
        );

        const total = customerOrders.reduce(
          (sum, order) => sum + Number(order.total || 0),
          0
        );

        const visits = reservations.filter(
          (reservation) => reservation.customer_id === customer.id
        ).length;

        return {
          ...customer,
          total,
          visits,
        };
      })
      .sort((a, b) => b.total + b.visits * 25 - (a.total + a.visits * 25))
      .slice(0, 5);
  }, [customers, orders, reservations]);

  const latestReservations = reservations.slice(0, 6);
  const latestOrders = orders.slice(0, 5);

  const quickLinks = [
    {
      title: "Prenotazioni",
      href: "/admin/prenotazioni",
      icon: "🍽",
      text: "Gestisci sala e clienti",
    },
    {
      title: "CRM Clienti",
      href: "/admin/clienti",
      icon: "👥",
      text: "Archivio e storico clienti",
    },
    {
      title: "Coupon",
      href: "/admin/coupon",
      icon: "🎟",
      text: "Codici e fidelizzazione",
    },
    {
      title: "Delivery",
      href: "/admin/delivery",
      icon: "🛵",
      text: "Ordini e incassi",
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: "📈",
      text: "Statistiche e report",
    },
    {
      title: "Impostazioni",
      href: "/admin/impostazioni",
      icon: "⚙️",
      text: "Configurazione sistema",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <Header
          title="📊 Dashboard"
          subtitle="La centrale operativa di Perlage OS."
        />

        <div className="rounded-2xl border border-[#D2B07A]/30 bg-[#D2B07A]/10 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D2B07A]">
            Oggi
          </p>
          <p className="mt-1 text-white">{today}</p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Prenotazioni oggi" value={todayReservations.length} />
        <StatCard label="Coperti oggi" value={todayPeople} />
        <StatCard label="Coperti mese" value={monthPeople} />
        <StatCard label="Clienti totali" value={customers.length} />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Nuovi clienti mese" value={newCustomersMonth} />
        <StatCard label="Prenotazioni in attesa" value={pendingReservations} />
        <StatCard label="Coupon attivi" value={activeCoupons} />
        <StatCard label="Coupon usati" value={usedCoupons} />
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <StatCard
          label="Delivery oggi"
          value={`€ ${todayDeliveryTotal.toFixed(2)}`}
          subtitle={`${todayOrders.length} ordini`}
        />

        <StatCard
          label="Delivery mese"
          value={`€ ${monthDeliveryTotal.toFixed(2)}`}
          subtitle="Incasso delivery mensile"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-light text-[#D2B07A]">
              🍽 Ultime prenotazioni
            </h2>

            <Link
              href="/admin/prenotazioni"
              className="text-sm text-white/45 hover:text-[#D2B07A]"
            >
              Vedi tutte
            </Link>
          </div>

          <div className="space-y-3">
            {latestReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg text-white">
                      {reservation.customers?.name || "Cliente"}
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      {reservation.reservation_date} ·{" "}
                      {reservation.reservation_time}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="gold">
                      {reservation.people} pax
                    </Badge>

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
                </div>
              </div>
            ))}

            {latestReservations.length === 0 && (
              <p className="text-white/45">Nessuna prenotazione.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-2xl font-light text-[#D2B07A]">
            ⚡ Accesso rapido
          </h2>

          <div className="grid gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-[#D2B07A]/40 hover:bg-[#D2B07A]/10"
              >
                <p className="text-lg text-white">
                  {link.icon} {link.title}
                </p>

                <p className="mt-1 text-sm text-white/45">{link.text}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-light text-[#D2B07A]">
              🛵 Ultimi ordini
            </h2>

            <Link
              href="/admin/delivery"
              className="text-sm text-white/45 hover:text-[#D2B07A]"
            >
              Vedi delivery
            </Link>
          </div>

          <div className="space-y-3">
            {latestOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white">
                      {order.customers?.name || "Cliente"}
                    </p>

                    <p className="mt-1 text-sm text-white/45">
                      {order.created_at?.slice(0, 10)}
                    </p>
                  </div>

                  <Badge variant="gold">
                    € {Number(order.total || 0).toFixed(2)}
                  </Badge>
                </div>
              </div>
            ))}

            {latestOrders.length === 0 && (
              <p className="text-white/45">Nessun ordine delivery.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-2xl font-light text-[#D2B07A]">
            👑 Top clienti
          </h2>

          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div
                key={customer.id}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white">{customer.name}</p>

                    <p className="mt-1 text-sm text-white/45">
                      {customer.visits} prenotazioni
                    </p>
                  </div>

                  <Badge variant="gold">
                    € {Number(customer.total || 0).toFixed(2)}
                  </Badge>
                </div>
              </div>
            ))}

            {topCustomers.length === 0 && (
              <p className="text-white/45">Nessun cliente disponibile.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}