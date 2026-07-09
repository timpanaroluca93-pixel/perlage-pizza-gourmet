"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminDeliveryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const today = new Date().toISOString().split("T")[0];

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*, customers(*), order_items(*)")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    await loadOrders();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const value = search.toLowerCase();

    return orders.filter((order) => {
      const customer = order.customers || {};

      const text = `${customer.name || ""} ${customer.phone || ""} ${
        order.delivery_address || ""
      } ${order.status || ""}`.toLowerCase();

      const matchSearch = text.includes(value);
      const matchStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const todayOrders = orders.filter((order) =>
    order.created_at?.startsWith(today)
  );

  const totalToday = todayOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const totalAll = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const preparing = orders.filter((order) => order.status === "preparing")
    .length;

  const delivering = orders.filter((order) => order.status === "delivering")
    .length;

  const completed = orders.filter((order) => order.status === "completed")
    .length;

  const cleanPhone = (phone?: string) => String(phone || "").replace(/\D/g, "");

  const getWhatsAppLink = (phone?: string) => {
    const cleaned = cleanPhone(phone);
    if (!cleaned) return "#";
    const international = cleaned.startsWith("39") ? cleaned : `39${cleaned}`;
    return `https://wa.me/${international}`;
  };

  const getStatusBadge = (status: string) => {
    if (status === "completed") return "green";
    if (status === "delivering") return "blue";
    if (status === "cancelled") return "red";
    if (status === "preparing") return "yellow";
    return "gray";
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <Header
          title="🛵 Delivery"
          subtitle="Gestione ordini, stati, clienti e incassi delivery."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:min-w-[620px]">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca cliente, telefono o indirizzo..."
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-[#D2B07A]"
          >
            <option value="all">Tutti</option>
            <option value="pending">In attesa</option>
            <option value="preparing">Preparazione</option>
            <option value="delivering">In consegna</option>
            <option value="completed">Consegnati</option>
            <option value="cancelled">Annullati</option>
          </select>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Ordini oggi" value={todayOrders.length} />
        <StatCard label="Incasso oggi" value={`€ ${totalToday.toFixed(2)}`} />
        <StatCard label="Preparazione" value={preparing} />
        <StatCard label="In consegna" value={delivering} />
        <StatCard label="Consegnati" value={completed} />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <StatCard label="Ordini totali" value={orders.length} />
        <StatCard label="Incasso totale" value={`€ ${totalAll.toFixed(2)}`} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {filteredOrders.map((order) => {
          const customer = order.customers || {};
          const phone = customer.phone || "";

          return (
            <Card key={order.id}>
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl text-white">
                    {customer.name || "Cliente"}
                  </h2>

                  <a
                    href={`tel:${phone}`}
                    className="mt-2 block text-sm text-white/55 hover:text-[#D2B07A]"
                  >
                    📞 {phone || "-"}
                  </a>

                  {customer.email && (
                    <p className="mt-1 text-sm text-white/35">
                      ✉️ {customer.email}
                    </p>
                  )}
                </div>

                <Badge variant={getStatusBadge(order.status) as any}>
                  {order.status || "pending"}
                </Badge>
              </div>

              <div className="mb-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                  Indirizzo
                </p>
                <p className="mt-2 text-white/70">
                  {order.delivery_address || "-"}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                {order.order_items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 p-3 text-sm"
                  >
                    <span className="text-white/70">
                      {item.quantity}x {item.product_name}
                    </span>

                    <span className="text-[#D2B07A]">€ {item.price}</span>
                  </div>
                ))}
              </div>

              {order.notes && (
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-white/60">📝 {order.notes}</p>
                </div>
              )}

              <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#D2B07A]/25 bg-[#D2B07A]/10 p-4">
                <p className="text-sm text-white/60">Totale ordine</p>
                <p className="text-2xl text-[#D2B07A]">
                  € {Number(order.total || 0).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${phone}`}
                  className="rounded-full bg-blue-500/20 px-5 py-3 text-sm text-blue-300"
                >
                  📞 Chiama
                </a>

                <a
                  href={getWhatsAppLink(phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-500/20 px-5 py-3 text-sm text-green-300"
                >
                  💬 WhatsApp
                </a>

                <Button
                  variant="warning"
                  onClick={() => updateOrderStatus(order.id, "preparing")}
                >
                  Preparazione
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => updateOrderStatus(order.id, "delivering")}
                >
                  In consegna
                </Button>

                <Button
                  variant="success"
                  onClick={() => updateOrderStatus(order.id, "completed")}
                >
                  Consegnato
                </Button>

                <Button
                  variant="danger"
                  onClick={() => updateOrderStatus(order.id, "cancelled")}
                >
                  Annulla
                </Button>
              </div>
            </Card>
          );
        })}

        {filteredOrders.length === 0 && (
          <Card>
            <p className="text-center text-white/50">
              Nessun ordine delivery trovato.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}