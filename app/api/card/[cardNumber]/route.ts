import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ cardNumber: string }> }
) {
  try {
    const { cardNumber } = await params;
    const normalizedCardNumber = decodeURIComponent(cardNumber)
      .trim()
      .toUpperCase();

    if (!normalizedCardNumber) {
      return NextResponse.json(
        { error: "Numero card mancante." },
        { status: 400 }
      );
    }

    const { data: loyaltyAccount, error: loyaltyError } = await supabaseAdmin
      .from("loyalty_accounts")
      .select(
        "id, customer_id, card_number, points, level, wallet_active, created_at, updated_at"
      )
      .eq("card_number", normalizedCardNumber)
      .maybeSingle();

    if (loyaltyError) throw loyaltyError;

    if (!loyaltyAccount) {
      return NextResponse.json(
        { error: "Card non trovata." },
        { status: 404 }
      );
    }

    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .select("id, name, created_at")
      .eq("id", loyaltyAccount.customer_id)
      .maybeSingle();

    if (customerError) throw customerError;

    if (!customer) {
      return NextResponse.json(
        { error: "Cliente non trovato." },
        { status: 404 }
      );
    }

    const { data: coupons, error: couponsError } = await supabaseAdmin
      .from("coupons")
      .select(
        "id, code, discount_percent, type, used, expires_at, created_at"
      )
      .eq("customer_id", loyaltyAccount.customer_id)
      .eq("used", false)
      .order("created_at", { ascending: false });

    if (couponsError) throw couponsError;

    const activeCoupons = (coupons || []).filter((coupon) => {
      if (!coupon.expires_at) return true;

      return new Date(coupon.expires_at).getTime() >= Date.now();
    });

    return NextResponse.json({
      success: true,
      loyaltyAccount,
      customer,
      activeCoupons,
    });
  } catch (error: unknown) {
    console.error("PUBLIC CARD API ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Errore durante il caricamento della card.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}