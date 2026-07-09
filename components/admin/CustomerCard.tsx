type CustomerCardProps = {
  customer: any;
  reservations: number;
  orders: number;
  deliveryTotal: number;
  activeCoupons: number;
  vip: string;
};

export default function CustomerCard({
  customer,
  reservations,
  orders,
  deliveryTotal,
  activeCoupons,
  vip,
}: CustomerCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 hover:border-[#D2B07A]/30 transition">

      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-2xl text-white">
            {customer.name}
          </h2>

          <p className="mt-2 text-white/60">
            📞 {customer.phone}
          </p>

          {customer.email && (
            <p className="text-sm text-white/40">
              ✉️ {customer.email}
            </p>
          )}
        </div>

        <span className="rounded-full bg-[#D2B07A]/20 px-4 py-2 text-xs text-[#D2B07A]">
          {vip}
        </span>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-black/20 p-4">
          <p className="text-xs text-white/40">
            Prenotazioni
          </p>

          <p className="mt-2 text-2xl text-[#D2B07A]">
            {reservations}
          </p>
        </div>

        <div className="rounded-xl bg-black/20 p-4">
          <p className="text-xs text-white/40">
            Delivery
          </p>

          <p className="mt-2 text-2xl text-[#D2B07A]">
            {orders}
          </p>
        </div>

        <div className="rounded-xl bg-black/20 p-4">
          <p className="text-xs text-white/40">
            Spesa
          </p>

          <p className="mt-2 text-xl text-[#D2B07A]">
            € {deliveryTotal.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl bg-black/20 p-4">
          <p className="text-xs text-white/40">
            Coupon
          </p>

          <p className="mt-2 text-2xl text-[#D2B07A]">
            {activeCoupons}
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
          href={`https://wa.me/39${String(customer.phone).replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-green-500/20 px-4 py-2 text-xs text-green-300"
        >
          💬 WhatsApp
        </a>

        <button
          className="rounded-full bg-[#D2B07A]/20 px-4 py-2 text-xs text-[#D2B07A]"
        >
          🎟 Coupon
        </button>

        <button
          className="rounded-full bg-white/10 px-4 py-2 text-xs text-white"
        >
          👁 Scheda
        </button>

      </div>

    </div>
  );
}