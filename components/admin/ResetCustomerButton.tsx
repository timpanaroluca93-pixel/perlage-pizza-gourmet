"use client";

import { useRouter } from "next/navigation";

export default function ResetCustomerButton({
  customerId,
}: {
  customerId: string;
}) {
  const router = useRouter();

  const resetCustomer = async () => {
    if (
      !confirm(
        "Vuoi eliminare definitivamente questo cliente con prenotazioni, coupon, loyalty e ordini?"
      )
    ) {
      return;
    }

    const response = await fetch("/api/admin/reset-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId }),
    });

    if (!response.ok) {
      alert("Errore durante il reset cliente");
      return;
    }

    alert("Cliente eliminato correttamente");
    router.push("/admin/clienti");
  };

  return (
    <button
      onClick={resetCustomer}
      className="rounded-full bg-red-500/20 px-5 py-3 text-sm text-red-300"
    >
      🗑 Reset cliente
    </button>
  );
}