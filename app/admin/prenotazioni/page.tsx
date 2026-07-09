"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPrenotazioniPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*, customers(*)")
      .eq("reservation_date", selectedDate)
      .order("reservation_time", { ascending: true });

    setReservations(data || []);
  };

  const updateStatus = async (
    id: string,
    status: "confirmed" | "cancelled" | "pending"
  ) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    await loadReservations();
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Eliminare la prenotazione?")) return;
    await supabase.from("reservations").delete().eq("id", id);
    await loadReservations();
  };

  useEffect(() => {
    loadReservations();
  }, [selectedDate]);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const customer = reservation.customers || {};
      const text = `${customer.name || ""} ${customer.phone || ""} ${
        customer.email || ""
      }`.toLowerCase();

      const matchSearch = text.includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || reservation.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [reservations, search, statusFilter]);

  const groupedReservations = useMemo(() => {
    const groups: Record<string, any[]> = {};

    filteredReservations.forEach((reservation) => {
      const time = reservation.reservation_time || "Senza orario";
      if (!groups[time]) groups[time] = [];
      groups[time].push(reservation);
    });

    return groups;
  }, [filteredReservations]);

  const totalPeople = filteredReservations.reduce(
    (sum, reservation) => sum + Number(reservation.people || 0),
    0
  );

  const cleanPhone = (phone?: string) => {
    return String(phone || "").replace(/\D/g, "");
  };

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
            🍽 Prenotazioni
          </h1>

          <p className="mt-2 text-white/50">
            Planner sala, clienti, coupon e gestione servizio.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:min-w-[720px]">
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
          />

          <input
            type="text"
            placeholder="Cerca cliente..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/35 focus:border-[#D2B07A]"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
          >
            <option value="all">Tutti gli stati</option>
            <option value="pending">In attesa</option>
            <option value="confirmed">Confermate</option>
            <option value="cancelled">Annullate</option>
          </select>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Prenotazioni</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">
            {filteredReservations.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Coperti</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">{totalPeople}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Fasce orarie</p>
          <p className="mt-2 text-3xl text-[#D2B07A]">
            {Object.keys(groupedReservations).length}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedReservations).map(([time, items]) => {
          const people = items.reduce(
            (sum, reservation) => sum + Number(reservation.people || 0),
            0
          );

          return (
            <section
              key={time}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-light text-[#D2B07A]">
                    🕒 {time}
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    {items.length} prenotazioni · {people} coperti
                  </p>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {items.map((reservation) => {
                  const customer = reservation.customers || {};
                  const phone = customer.phone || "";

                  return (
                    <div
                      key={reservation.id}
                      className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5"
                    >
                      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-2xl text-white">
                            {customer.name || "Cliente"}
                          </h3>

                          <a
                            href={`tel:${phone}`}
                            className="mt-2 block text-sm text-white/55 hover:text-[#D2B07A]"
                          >
                            {phone || "-"}
                          </a>

                          {customer.email && (
                            <a
                              href={`mailto:${customer.email}`}
                              className="mt-1 block text-sm text-white/35 hover:text-[#D2B07A]"
                            >
                              {customer.email}
                            </a>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/75">
                            👥 {reservation.people} pax
                          </span>

                          <span
                            className={`rounded-full px-4 py-2 text-sm ${
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
                      </div>

                      {reservation.notes && (
                        <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-sm leading-6 text-white/60">
                            📝 {reservation.notes}
                          </p>
                        </div>
                      )}

                      {reservation.coupon_code && (
                        <div className="mb-4 rounded-2xl border border-[#D2B07A]/30 bg-[#D2B07A]/10 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-[#D2B07A]">
                            Coupon utilizzato
                          </p>
                          <p className="mt-2 font-mono text-lg text-white">
                            {reservation.coupon_code}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`tel:${phone}`}
                          className="rounded-full bg-blue-500/20 px-4 py-2 text-xs text-blue-300"
                        >
                          📞 Chiama
                        </a>

                        <a
                          href={getWhatsAppLink(phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-green-500/20 px-4 py-2 text-xs text-green-300"
                        >
                          💬 WhatsApp
                        </a>

                        <button
                          onClick={() =>
                            updateStatus(reservation.id, "confirmed")
                          }
                          className="rounded-full bg-green-600/20 px-4 py-2 text-xs text-green-300"
                        >
                          ✅ Conferma
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(reservation.id, "cancelled")
                          }
                          className="rounded-full bg-yellow-500/20 px-4 py-2 text-xs text-yellow-300"
                        >
                          ❌ Annulla
                        </button>

                        <button
                          onClick={() => deleteReservation(reservation.id)}
                          className="rounded-full bg-red-500/20 px-4 py-2 text-xs text-red-300"
                        >
                          🗑 Elimina
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filteredReservations.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-lg text-white/60">
              Nessuna prenotazione trovata per questa data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}