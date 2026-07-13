"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const weekSlots = [
  "19:00", "19:30", "20:00", "20:30", "21:00",
  "21:30", "22:00", "22:30", "23:00", "23:30",
];

const saturdaySlots = [
  "19:00", "19:30", "20:00", "20:30",
  "21:45", "22:00", "22:30", "23:00", "23:30",
];

export default function PrenotazioniPage() {
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    email: "",
    data: "",
    ora: "",
    persone: 2,
    note: "",
    coupon: "",
  });
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const noteFromUrl = params.get("note");

  if (noteFromUrl) {
    setForm((prev) => ({
      ...prev,
      note: noteFromUrl,
    }));
  }
}, []);

  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>(weekSlots);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getBaseSlots = () => {
    if (!form.data) return weekSlots;
    const day = new Date(form.data).getDay();
    if (day === 6) return saturdaySlots;
    return weekSlots;
  };

  const getTurnPeople = (reservations: any[], slot: string) => {
    const day = new Date(form.data).getDay();
    let totalPeople = 0;

    reservations.forEach((reservation) => {
      const reservationTime = reservation.reservation_time;

      if (day === 5 || day === 0) {
        if (slot <= "21:00" && reservationTime <= "21:00") {
          totalPeople += Number(reservation.people || 0);
        }

        if (slot >= "22:00" && reservationTime >= "22:00") {
          totalPeople += Number(reservation.people || 0);
        }
      } else if (day === 6) {
        if (slot <= "20:30" && reservationTime <= "20:30") {
          totalPeople += Number(reservation.people || 0);
        }

        if (slot >= "21:45" && reservationTime >= "21:45") {
          totalPeople += Number(reservation.people || 0);
        }
      } else {
        if (reservationTime === slot) {
          totalPeople += Number(reservation.people || 0);
        }
      }
    });

    return totalPeople;
  };

  const getCapacity = () => {
    if (!form.data) return 30;
    const day = new Date(form.data).getDay();
    if (day === 5 || day === 0 || day === 6) return 60;
    return 30;
  };

  const loadAvailableSlots = async () => {
    const slots = getBaseSlots();

    if (!form.data) {
      setAvailableSlots(slots);
      return;
    }

    try {
      const response = await fetch(`/api/check-availability?date=${form.data}`);
      const result = await response.json();

      const reservations = result.reservations || [];
      const maxCapacity = getCapacity();
      const requestedPeople = Number(form.persone || 1);

      const filteredSlots = slots.filter((slot) => {
        const bookedPeople = getTurnPeople(reservations, slot);
        return bookedPeople + requestedPeople <= maxCapacity;
      });

      setAvailableSlots(filteredSlots);

      if (form.ora && !filteredSlots.includes(form.ora)) {
        setForm((prev) => ({
          ...prev,
          ora: "",
        }));
      }
    } catch (error) {
      console.error(error);
      setAvailableSlots(slots);
    }
  };

  useEffect(() => {
    loadAvailableSlots();
  }, [form.data, form.persone]);

  const checkAvailability = async () => {
    if (!form.data || !form.ora) return true;

    const response = await fetch(`/api/check-availability?date=${form.data}`);
    const result = await response.json();

    const reservations = result.reservations || [];
    const bookedPeople = getTurnPeople(reservations, form.ora);
    const maxCapacity = getCapacity();
    const requestedPeople = Number(form.persone || 1);

    return bookedPeople + requestedPeople <= maxCapacity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const available = await checkAvailability();

      if (!available) {
        alert("Orario non disponibile. Capacità massima raggiunta.");
        setLoading(false);
        await loadAvailableSlots();
        return;
      }

      const response = await fetch("/api/prenotazioni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          coupon: form.coupon.trim().toUpperCase(),
        }),
      });

      const result = await response.json();

 if (!response.ok) {
  throw new Error(result.error || "Errore durante la prenotazione");
}

const gtag = (
  window as typeof window & {
    gtag?: (
      command: string,
      eventName: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
).gtag;

if (typeof gtag === "function") {
  gtag("event", "conversion", {
    send_to: "AW-11408136524/8DVbCK2W5M8cEMyy6b8q",
    value: 1,
    currency: "EUR",
    transaction_id: String(result.reservation_id),
  });
}

alert("Prenotazione inviata con successo!");
      setForm({
        nome: "",
        telefono: "",
        email: "",
        data: "",
        ora: "",
        persone: 2,
        note: "",
        coupon: "",
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Errore durante la prenotazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 z-0">
        <Image
          src="/eventi-bg.jpg"
          alt="Prenotazioni Perlage Pizza & Restaurant"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,176,122,0.18),transparent_40%)]" />
      </div>

      <section className="relative z-10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
              Perlage Pizza & Restaurant
            </p>

            <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-light leading-[1.05] md:text-7xl">
              Prenota il tuo
              <span className="block italic text-[#D2B07A] [font-family:var(--font-playfair)]">
                tavolo
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Prenota la tua esperienza da Perlage Pizza & Restaurant.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D2B07A]/40 bg-black/55 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-10">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome"
                required
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/40 focus:border-[#D2B07A]"
              />

              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Telefono"
                required
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/40 focus:border-[#D2B07A]"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/40 focus:border-[#D2B07A]"
              />

              <div className="grid gap-4 md:grid-cols-3">
                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  required
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
                />

                <select
                  name="ora"
                  value={form.ora}
                  required
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
                >
                  <option value="">
                    {availableSlots.length === 0
                      ? "Nessun orario disponibile"
                      : "Orario"}
                  </option>

                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="persone"
                  value={form.persone}
                  min="1"
                  max="20"
                  required
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
                />
              </div>

              <div className="rounded-2xl border border-[#D2B07A]/25 bg-[#D2B07A]/[0.06] p-4">
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#D2B07A]">
                  Codice promozionale
                </label>

                <input
                  type="text"
                  name="coupon"
                  value={form.coupon}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      coupon: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="Es. PERLAGE20"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/40 focus:border-[#D2B07A]"
                />

                <p className="mt-2 text-xs leading-5 text-white/45">
                  Se hai ricevuto un codice sconto, inseriscilo prima di
                  completare la prenotazione.
                </p>
              </div>

              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Note, allergie o richieste particolari"
                className="min-h-[140px] rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-white/40 focus:border-[#D2B07A]"
              />

              <button
                type="submit"
                disabled={loading || availableSlots.length === 0}
                className="mt-4 rounded-full bg-[#D2B07A] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E7C48B] disabled:opacity-50"
              >
                {loading ? "Controllo disponibilità..." : "Prenota ora"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}