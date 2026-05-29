"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [allReservations, setAllReservations] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [customerSearch, setCustomerSearch] = useState("");
  const [toast, setToast] = useState("");

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const login = () => {
    if (password === adminPassword) {
      setLogged(true);
      localStorage.setItem("adminLogged", "true");
    } else {
      alert("Password errata");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    try {
      new Audio("/notification.mp3").play().catch(() => {});
    } catch {}
    setTimeout(() => setToast(""), 4000);
  };

  const loadReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*, customers(*)")
      .eq("reservation_date", selectedDate)
      .order("reservation_time", { ascending: true });

    setReservations(data || []);
  };

  const loadAllReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*, customers(*)")
      .order("reservation_date", { ascending: false })
      .order("reservation_time", { ascending: false });

    setAllReservations(data || []);
  };

  const loadCustomers = async () => {
    const { data } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    setCustomers(data || []);
  };

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*, customers(*), order_items(*)")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  const refreshAll = async () => {
    await loadReservations();
    await loadAllReservations();
    await loadCustomers();
    await loadOrders();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    await refreshAll();
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Eliminare prenotazione?")) return;
    await supabase.from("reservations").delete().eq("id", id);
    await refreshAll();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    await refreshAll();
  };

  const exportCSV = (filename: string, rows: any[]) => {
    if (rows.length === 0) {
      alert("Nessun dato da esportare");
      return;
    }

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportCustomers = () => {
    exportCSV(
      "clienti-perlage.csv",
      customers.map((customer) => ({
        nome: customer.name,
        telefono: customer.phone,
        email: customer.email || "",
        creato_il: customer.created_at,
      }))
    );
  };

  const exportReservations = () => {
    exportCSV(
      "prenotazioni-perlage.csv",
      allReservations.map((reservation) => ({
        data: reservation.reservation_date,
        ora: reservation.reservation_time,
        cliente: reservation.customers?.name || "",
        telefono: reservation.customers?.phone || "",
        email: reservation.customers?.email || "",
        persone: reservation.people,
        stato: reservation.status,
        note: reservation.notes || "",
      }))
    );
  };

  useEffect(() => {
    if (localStorage.getItem("adminLogged") === "true") {
      setLogged(true);
    }
  }, []);

  useEffect(() => {
    if (!logged) return;

    refreshAll();

    const channel = supabase
      .channel("reservations-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reservations",
        },
        async (payload) => {
          await refreshAll();

          if (payload.eventType === "INSERT") {
            showToast("🔔 Nuova prenotazione ricevuta");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [logged, selectedDate]);

  const groupedReservations = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    reservations.forEach((reservation) => {
      const time = reservation.reservation_time;

      if (!grouped[time]) grouped[time] = [];

      grouped[time].push(reservation);
    });

    return grouped;
  }, [reservations]);

  const getTotalPeople = (items: any[]) => {
    return items.reduce((sum, item) => sum + Number(item.people || 0), 0);
  };

  const getCustomerReservations = (customerId: string) => {
    return allReservations.filter(
      (reservation) => reservation.customer_id === customerId
    );
  };

  const getCustomerOrders = (customerId: string) => {
    return orders.filter((order) => order.customer_id === customerId);
  };

  const getCustomerDeliveryTotal = (customerId: string) => {
    return getCustomerOrders(customerId).reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );
  };

  const getVipLabel = (amount: number) => {
    if (amount >= 300) return "VIP GOLD";
    if (amount >= 150) return "VIP SILVER";
    if (amount >= 50) return "VIP BRONZE";
    return "";
  };

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthPeople = getTotalPeople(
    allReservations.filter((reservation) =>
      reservation.reservation_date?.startsWith(currentMonth)
    )
  );

  const deliveryTotal = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const deliveryMonthTotal = orders
    .filter((order) => order.created_at?.startsWith(currentMonth))
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const vipCustomers = customers.filter((customer) => {
    const reservationsCount = getCustomerReservations(customer.id).length;
    const deliveryAmount = getCustomerDeliveryTotal(customer.id);

    return reservationsCount >= 3 || deliveryAmount >= 50;
  });

  const mostRequestedTime = useMemo(() => {
    const map: Record<string, number> = {};

    allReservations.forEach((reservation) => {
      const time = reservation.reservation_time;
      if (!time) return;
      map[time] = (map[time] || 0) + 1;
    });

    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  }, [allReservations]);

  const strongestDay = useMemo(() => {
    const map: Record<string, number> = {};

    allReservations.forEach((reservation) => {
      const date = reservation.reservation_date;
      if (!date) return;
      map[date] = (map[date] || 0) + Number(reservation.people || 0);
    });

    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  }, [allReservations]);

  const topProduct = useMemo(() => {
    const map: Record<string, number> = {};

    orders.forEach((order) => {
      order.order_items?.forEach((item: any) => {
        map[item.product_name] =
          (map[item.product_name] || 0) + Number(item.quantity || 0);
      });
    });

    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  }, [orders]);

  const topSpender = useMemo(() => {
    const list = customers
      .map((customer) => ({
        name: customer.name,
        total: getCustomerDeliveryTotal(customer.id),
      }))
      .sort((a, b) => b.total - a.total);

    if (!list[0] || list[0].total <= 0) return "-";

    return `${list[0].name} · € ${list[0].total.toFixed(2)}`;
  }, [customers, orders]);

  const monthlyReservations = useMemo(() => {
    const map: Record<string, number> = {};

    allReservations.forEach((reservation) => {
      const month = reservation.reservation_date?.slice(0, 7);
      if (!month) return;
      map[month] = (map[month] || 0) + Number(reservation.people || 0);
    });

    return Object.entries(map).map(([month, people]) => ({
      month,
      people,
    }));
  }, [allReservations]);

  const monthlyDelivery = useMemo(() => {
    const map: Record<string, number> = {};

    orders.forEach((order) => {
      const month = order.created_at?.slice(0, 7);
      if (!month) return;
      map[month] = (map[month] || 0) + Number(order.total || 0);
    });

    return Object.entries(map).map(([month, total]) => ({
      month,
      total,
    }));
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    const search = customerSearch.toLowerCase();
    if (!search) return customers;

    return customers.filter((customer) => {
      return (
        customer.name?.toLowerCase().includes(search) ||
        customer.phone?.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search)
      );
    });
  }, [customers, customerSearch]);

  if (!logged) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-[#D2B07A]/40 bg-black/70 p-8 shadow-2xl">
          <h1 className="mb-2 text-3xl font-light text-[#D2B07A]">
            Admin Perlage
          </h1>

          <p className="mb-6 text-sm text-white/50">Accesso riservato</p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") login();
            }}
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <button
            onClick={login}
            className="w-full rounded-full bg-[#D2B07A] px-6 py-4 font-semibold text-black"
          >
            Entra
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black p-6 text-white">
      {toast && (
        <div className="fixed right-5 top-5 z-[9999] rounded-full bg-[#D2B07A] px-6 py-4 font-semibold text-black shadow-2xl">
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-light text-[#D2B07A]">
              Dashboard Perlage
            </h1>

            <p className="mt-2 text-white/50">
              {format(new Date(selectedDate), "EEEE d MMMM yyyy", {
                locale: it,
              })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none"
            />

            <button
              onClick={exportReservations}
              className="rounded-full border border-[#D2B07A]/50 px-5 py-3 text-sm text-[#D2B07A]"
            >
              Export prenotazioni
            </button>

            <button
              onClick={exportCustomers}
              className="rounded-full border border-[#D2B07A]/50 px-5 py-3 text-sm text-[#D2B07A]"
            >
              Export clienti
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("adminLogged");
                setLogged(false);
              }}
              className="rounded-full border border-white/20 px-5 py-3 text-sm"
            >
              Esci
            </button>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-light text-[#D2B07A]">
            🍽️ Sala & Prenotazioni
          </h2>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["Prenotazioni oggi", reservations.length],
              ["Coperti oggi", getTotalPeople(reservations)],
              ["Coperti mese", monthPeople],
              ["Coperti storico", getTotalPeople(allReservations)],
              ["Clienti VIP", vipCustomers.length],
              ["Orario top", mostRequestedTime],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm text-white/50">{label}</p>

                <p className="mt-2 text-3xl text-[#D2B07A]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Giorno più forte</p>
            <p className="mt-2 text-2xl text-[#D2B07A]">{strongestDay}</p>
          </div>
        </section>

        <section className="space-y-6">
          {Object.entries(groupedReservations).map(([time, items]) => {
            const totalPeople = getTotalPeople(items);

            return (
              <div
                key={time}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-light text-[#D2B07A]">
                    {time}
                  </h2>

                  <p className="mt-1 text-white/60">
                    {items.length} prenotazioni · {totalPeople} coperti
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="rounded-2xl border border-white/10 bg-black/40 p-5"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-xl text-white">
                            {reservation.customers?.name}
                          </h3>

                          <a
                            href={`tel:${reservation.customers?.phone}`}
                            className="mt-1 block text-sm text-white/50"
                          >
                            {reservation.customers?.phone}
                          </a>
                        </div>

                        <div className="rounded-full bg-[#D2B07A]/20 px-3 py-1 text-sm text-[#D2B07A]">
                          {reservation.people} pax
                        </div>
                      </div>

                      {reservation.notes && (
                        <p className="mb-5 text-sm text-white/60">
                          {reservation.notes}
                        </p>
                      )}

                      <div className="mb-4">
                        <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                          {reservation.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            updateStatus(reservation.id, "confirmed")
                          }
                          className="rounded-full bg-green-500/20 px-4 py-2 text-xs text-green-300"
                        >
                          Conferma
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(reservation.id, "cancelled")
                          }
                          className="rounded-full bg-yellow-500/20 px-4 py-2 text-xs text-yellow-300"
                        >
                          Annulla
                        </button>

                        <button
                          onClick={() => deleteReservation(reservation.id)}
                          className="rounded-full bg-red-500/20 px-4 py-2 text-xs text-red-300"
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {reservations.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/50">
              Nessuna prenotazione per questa data.
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-light text-[#D2B07A]">
            📈 Analytics Sala
          </h2>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h3 className="mb-6 text-xl text-white">Coperti per mese</h3>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReservations}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="people" fill="#D2B07A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h3 className="mb-6 text-xl text-white">
                Fatturato delivery per mese
              </h3>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyDelivery}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#D2B07A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-light text-[#D2B07A]">
            🛵 Delivery & Asporto
          </h2>

          <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Ordini delivery</p>
              <p className="mt-2 text-3xl text-[#D2B07A]">{orders.length}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Incasso totale</p>
              <p className="mt-2 text-3xl text-[#D2B07A]">
                € {deliveryTotal.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Incasso mese</p>
              <p className="mt-2 text-3xl text-[#D2B07A]">
                € {deliveryMonthTotal.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Prodotto top</p>
              <p className="mt-2 text-2xl text-[#D2B07A]">{topProduct}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Top spender</p>
              <p className="mt-2 text-xl text-[#D2B07A]">{topSpender}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl text-white">
                      {order.customers?.name}
                    </h3>

                    <a
                      href={`tel:${order.customers?.phone}`}
                      className="mt-1 block text-sm text-white/50"
                    >
                      {order.customers?.phone}
                    </a>
                  </div>

                  <div className="rounded-full bg-[#D2B07A]/20 px-3 py-1 text-sm text-[#D2B07A]">
                    € {Number(order.total || 0).toFixed(2)}
                  </div>
                </div>

                <p className="mb-4 text-sm text-white/60">
                  {order.delivery_address}
                </p>

                <div className="mb-4 space-y-2">
                  {order.order_items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm"
                    >
                      {item.quantity}x {item.product_name} · € {item.price}
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="mb-4 text-sm text-white/50">
                    Note: {order.notes}
                  </p>
                )}

                <div className="mb-4">
                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateOrderStatus(order.id, "preparing")}
                    className="rounded-full bg-yellow-500/20 px-4 py-2 text-xs text-yellow-300"
                  >
                    Preparazione
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "delivering")}
                    className="rounded-full bg-blue-500/20 px-4 py-2 text-xs text-blue-300"
                  >
                    In consegna
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "completed")}
                    className="rounded-full bg-green-500/20 px-4 py-2 text-xs text-green-300"
                  >
                    Consegnato
                  </button>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/50">
                Nessun ordine delivery.
              </div>
            )}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-light text-[#D2B07A]">
                👑 CRM Clienti
              </h2>

              <p className="mt-2 text-white/50">
                Storico completo, ordini e valore cliente
              </p>
            </div>

            <input
              type="text"
              placeholder="Cerca cliente..."
              value={customerSearch}
              onChange={(event) => setCustomerSearch(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none md:max-w-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCustomers.map((customer) => {
              const customerReservations = getCustomerReservations(customer.id);
              const customerOrders = getCustomerOrders(customer.id);
              const customerDeliveryTotal = getCustomerDeliveryTotal(
                customer.id
              );
              const vipLabel = getVipLabel(customerDeliveryTotal);

              return (
                <div
                  key={customer.id}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl text-white">{customer.name}</h3>

                      <a
                        href={`tel:${customer.phone}`}
                        className="mt-2 block text-white/60"
                      >
                        {customer.phone}
                      </a>

                      {customer.email && (
                        <a
                          href={`mailto:${customer.email}`}
                          className="mt-1 block text-sm text-white/40"
                        >
                          {customer.email}
                        </a>
                      )}
                    </div>

                    {vipLabel && (
                      <div className="rounded-full bg-[#D2B07A]/20 px-3 py-1 text-xs text-[#D2B07A]">
                        {vipLabel}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/50">
                        Prenotazioni totali
                      </p>

                      <p className="mt-2 text-3xl text-[#D2B07A]">
                        {customerReservations.length}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/50">Ordini delivery</p>

                      <p className="mt-2 text-3xl text-[#D2B07A]">
                        {customerOrders.length}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/50">Spesa delivery</p>

                      <p className="mt-2 text-3xl text-[#D2B07A]">
                        € {customerDeliveryTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {customerReservations.slice(0, 3).map((reservation) => (
                      <div
                        key={reservation.id}
                        className="rounded-xl border border-white/10 bg-black/20 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white">
                            {reservation.reservation_date}
                          </p>

                          <p className="text-sm text-[#D2B07A]">
                            {reservation.reservation_time}
                          </p>
                        </div>

                        <p className="mt-1 text-xs text-white/50">
                          {reservation.people} persone · {reservation.status}
                        </p>
                      </div>
                    ))}

                    {customerReservations.length === 0 && (
                      <p className="text-sm text-white/40">
                        Nessuna prenotazione nello storico.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}