import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID mancante" },
        { status: 400 }
      );
    }

    const { data: orders } = await supabase
      .from("orders")
      .select("id")
      .eq("customer_id", customerId);

    const orderIds = orders?.map((order) => order.id) || [];

    if (orderIds.length > 0) {
      await supabase.from("order_items").delete().in("order_id", orderIds);
      await supabase.from("orders").delete().eq("customer_id", customerId);
    }

    await supabase.from("coupons").delete().eq("customer_id", customerId);
    await supabase.from("loyalty_accounts").delete().eq("customer_id", customerId);
    await supabase.from("reservations").delete().eq("customer_id", customerId);
    await supabase.from("customers").delete().eq("id", customerId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("RESET CUSTOMER ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Errore reset cliente" },
      { status: 500 }
    );
  }
}