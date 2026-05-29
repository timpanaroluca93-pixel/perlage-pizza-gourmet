"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);

  const [reservations, setReservations] = useState<any[]>([]);
  const [allReservations, setAllReservations] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

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
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
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

  const refreshAll = async () => {
    await loadReservations();
    await loadAllReservations();
    await loadCustomers();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    await refreshAll();
  };

  const deleteReservation = async (id: string) => {
    const ok = confirm("Eliminare prenotazione?");
    if (!ok) return;

    await supabase.from("reservations").delete().eq("id", id);
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
          .map((header) => {
            const value = row[header] ?? "";
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportCustomers = () => {
    const rows = customers.map((customer) => ({
      nome: customer.name,
      telefono: customer.phone,
      email: customer.email || "",
      creato_il: customer.created_at,
    }));

    exportCSV("clienti-perlage.csv", rows);
  };

  const exportReservations = () => {
    const rows = allReservations.map((reservation) => ({
      data: reservation.reservation_date,
      ora: reservation.reservation_time,
      cliente: reservation.customers?.name || "",
      telefono: reservation.customers?.phone || "",
      email: reservation.customers?.email || "",
      persone: reservation.people,
      stato: reservation.status,
      note: reservation.notes || "",
    }));

    exportCSV("prenotazioni-perlage.csv", rows);
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

  const getStatusColor = (people: number) => {
    if (people >= 60) return "border-red-500 bg-red-500/10";
    if (people >= 40) return "border-yellow-500 bg-yellow-500/10";
    return "border-green-500 bg-green-500/10";
  };

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return customers;

    const search = customerSearch.toLowerCase();

    return customers.filter((customer) => {
      return (
        customer.name?.toLowerCase().includes(search) ||
        customer.phone?.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search)
      );
    });
  }, [customers, customerSearch]);

  const getCustomerReservations = (customerId: string) => {
    return allReservations.filter(
      (reservation) => reservation.customer_id === customerId
    );
  };

  const totalHistoricalPeople = getTotalPeople(allReservations);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthReservations = allReservations.filter((reservation) =>
    reservation.reservation_date?.startsWith(currentMonth)
  );

  const monthPeople = getTotalPeople(monthReservations);

  const vipCustomers = customers.filter(
    (customer) => getCustomerReservations(customer.id).length >= 3
  );

  const mostRequestedTime = useMemo(() => {
    const map: Record<string, number> = {};

    allReservations.forEach((reservation) => {
      const time = reservation.reservation_time;
      map[time] = (map[time] || 0) + 1;
    });

    return (
      Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-"
    );
  }, [allReservations]);

  const strongestDay = useMemo(() => {
    const map: Record<string, number> = {};

    allReservations.forEach((reservation) => {
      const date = reservation.reservation_date;
      map[date] = (map[date] || 0) + Number(reservation.people || 0);
    });

    return (
      Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-"
    );
  }, [allReservations]);

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
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
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
              onChange={(e) => setSelectedDate(e.target.value)}
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

        <div className="mb-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Prenotazioni oggi</p>
            <p className="mt-2 text-4xl text-[#D2B07A]">
              {reservations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Coperti oggi</p>
            <p className="mt-2 text-4xl text-[#D2B07A]">
              {getTotalPeople(reservations)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Coperti mese</p>
            <p className="mt-2 text-4xl text-[#D2B07A]">
              {monthPeople}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Coperti storico</p>
            <p className="mt-2 text-4xl text-[#D2B07A]">
              {totalHistoricalPeople}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Clienti VIP</p>
            <p className="mt-2 text-4xl text-[#D2B07A]">
              {vipCustomers.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Orario top</p>
            <p className="mt-2 text-3xl text-[#D2B07A]">
              {mostRequestedTime}
            </p>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Giorno più forte</p>
          <p className="mt-2 text-2xl text-[#D2B07A]">{strongestDay}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedReservations).map(([time, items]) => {
            const totalPeople = getTotalPeople(items);

            return (
              <div
                key={time}
                className={`rounded-[2rem] border p-6 ${getStatusColor(
                  totalPeople
                )}`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-light text-[#D2B07A]">
                      {time}
                    </h2>

                    <p className="mt-1 text-white/60">
                      {items.length} prenotazioni · {totalPeople} coperti
                    </p>
                  </div>
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
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            reservation.status === "confirmed"
                              ? "bg-green-500/20 text-green-300"
                              : reservation.status === "cancelled"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
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
        </div>

        <section className="mt-16">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-light text-[#D2B07A]">
                CRM Clienti
              </h2>

              <p className="mt-2 text-white/50">
                Storico completo e ricerca clienti
              </p>
            </div>

            <input
              type="text"
              placeholder="Cerca cliente..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none md:max-w-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCustomers.map((customer) => {
              const customerReservations = getCustomerReservations(customer.id);

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

                    {customerReservations.length >= 3 && (
                      <div className="rounded-full bg-[#D2B07A]/20 px-3 py-1 text-xs text-[#D2B07A]">
                        VIP
                      </div>
                    )}
                  </div>

                  <div className="mb-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-white/50">
                      Prenotazioni totali
                    </p>

                    <p className="mt-2 text-3xl text-[#D2B07A]">
                      {customerReservations.length}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {customerReservations.slice(0, 5).map((reservation) => (
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