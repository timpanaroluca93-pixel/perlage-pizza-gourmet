import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const fromEmail =
  "Perlage Pizza & Restaurant <booking@mail.perlagepizzaerestaurant.it>";

const createCode = (prefix: string) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return `${prefix}-${code}`;
};

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const getUniqueCouponCode = async () => {
  let code = createCode("PLG");

  for (let i = 0; i < 10; i++) {
    const { data } = await supabase
      .from("coupons")
      .select("id")
      .eq("code", code)
      .maybeSingle();

    if (!data) return code;

    code = createCode("PLG");
  }

  return code;
};

const getUniqueCardNumber = async () => {
  let code = createCode("CARD");

  for (let i = 0; i < 10; i++) {
    const { data } = await supabase
      .from("loyalty_accounts")
      .select("id")
      .eq("card_number", code)
      .maybeSingle();

    if (!data) return code;

    code = createCode("CARD");
  }

  return code;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, telefono, email, data, ora, persone, note, coupon } = body;

    const cleanPhone = String(telefono).replace(/\s+/g, "");
    const cleanCoupon = coupon ? String(coupon).trim().toUpperCase() : null;

    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", cleanPhone)
      .maybeSingle();

    let customerId = existingCustomer?.id;
    let isNewCustomer = false;

    if (!customerId) {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert([
          {
            name: nome,
            phone: cleanPhone,
            email: email || null,
          },
        ])
        .select("id")
        .single();

      if (customerError) throw customerError;

      customerId = newCustomer.id;
      isNewCustomer = true;
    } else {
      await supabase
        .from("customers")
        .update({
          name: nome,
          email: email || null,
        })
        .eq("id", customerId);
    }

    const { count: previousReservations, error: countError } = await supabase
      .from("reservations")
      .select("id", { count: "exact", head: true })
      .eq("customer_id", customerId);

    if (countError) throw countError;

    const { data: existingLoyalty } = await supabase
      .from("loyalty_accounts")
      .select("*")
      .eq("customer_id", customerId)
      .maybeSingle();

    let loyaltyAccount = existingLoyalty;

    if (!loyaltyAccount) {
      const cardNumber = await getUniqueCardNumber();

      const { data: newLoyalty, error: loyaltyError } = await supabase
        .from("loyalty_accounts")
        .insert([
          {
            customer_id: customerId,
            card_number: cardNumber,
            points: 20,
            level: "bronze",
            wallet_active: false,
          },
        ])
        .select("*")
        .single();

      if (loyaltyError) throw loyaltyError;

      loyaltyAccount = newLoyalty;
    } else {
      const newPoints = Number(loyaltyAccount.points || 0) + 20;

      let newLevel = "bronze";
      if (newPoints >= 2000) newLevel = "platinum";
      else if (newPoints >= 800) newLevel = "gold";
      else if (newPoints >= 300) newLevel = "silver";

      const { data: updatedLoyalty } = await supabase
        .from("loyalty_accounts")
        .update({
          points: newPoints,
          level: newLevel,
          updated_at: new Date().toISOString(),
        })
        .eq("id", loyaltyAccount.id)
        .select("*")
        .single();

      loyaltyAccount = updatedLoyalty || loyaltyAccount;
    }

    let acceptedCoupon: string | null = null;
    let couponLabel = "-";
    let couponToMarkUsed: any = null;

    if (cleanCoupon) {
      const { data: foundCoupon } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", cleanCoupon)
        .maybeSingle();

      if (!foundCoupon) {
        return NextResponse.json(
          { error: "Codice promozionale non valido." },
          { status: 400 }
        );
      }

      if (foundCoupon.customer_id !== customerId) {
        return NextResponse.json(
          { error: "Questo coupon non è associato a questo cliente." },
          { status: 400 }
        );
      }

      if (foundCoupon.used) {
        return NextResponse.json(
          { error: "Questo coupon è già stato utilizzato." },
          { status: 400 }
        );
      }

      if (
        foundCoupon.expires_at &&
        new Date(foundCoupon.expires_at).getTime() < new Date().getTime()
      ) {
        return NextResponse.json(
          { error: "Questo coupon è scaduto." },
          { status: 400 }
        );
      }

      acceptedCoupon = foundCoupon.code;
      couponLabel = `${foundCoupon.code} - ${foundCoupon.discount_percent || 20}%`;
      couponToMarkUsed = foundCoupon;
    }

    const { data: newReservation, error: reservationError } = await supabase
      .from("reservations")
      .insert([
        {
          customer_id: customerId,
          reservation_date: data,
          reservation_time: ora,
          people: Number(persone),
          notes: note || null,
          coupon_code: acceptedCoupon,
          status: "pending",
        },
      ])
      .select("id")
      .single();

    if (reservationError) throw reservationError;

    if (couponToMarkUsed) {
      await supabase
        .from("coupons")
        .update({
          used: true,
          used_at: new Date().toISOString(),
          reservation_id: newReservation.id,
        })
        .eq("id", couponToMarkUsed.id);
    }

    let generatedWelcomeCoupon: string | null = null;
    let welcomeExpiresAt: string | null = null;

    const shouldCreateWelcomeCoupon =
      (previousReservations || 0) === 0 && !acceptedCoupon;

    if (shouldCreateWelcomeCoupon) {
      const code = await getUniqueCouponCode();
      welcomeExpiresAt = addDays(30);

      const { error: couponError } = await supabase.from("coupons").insert([
        {
          customer_id: customerId,
          reservation_id: null,
          code,
          discount_percent: 20,
          type: "welcome",
          used: false,
          used_at: null,
          expires_at: welcomeExpiresAt,
        },
      ]);

      if (!couponError) {
        generatedWelcomeCoupon = code;
      }
    }

    await resend.emails.send({
      from: fromEmail,
      to: process.env.ADMIN_EMAIL!,
      subject: `Nuova prenotazione - ${nome}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;background:#ffffff;color:#111">
          <h2>Nuova prenotazione Perlage</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Telefono:</strong> ${cleanPhone}</p>
          <p><strong>Email:</strong> ${email || "-"}</p>
          <p><strong>Data:</strong> ${data}</p>
          <p><strong>Ora:</strong> ${ora}</p>
          <p><strong>Persone:</strong> ${persone}</p>
          <p><strong>Coupon usato:</strong> ${couponLabel}</p>
          <p><strong>Nuovo coupon generato:</strong> ${generatedWelcomeCoupon || "-"}</p>
          <p><strong>Card fedeltà:</strong> ${loyaltyAccount?.card_number || "-"}</p>
          <p><strong>Punti:</strong> ${loyaltyAccount?.points || 0}</p>
          <p><strong>Livello:</strong> ${loyaltyAccount?.level || "bronze"}</p>
          <p><strong>Note:</strong> ${note || "-"}</p>
        </div>
      `,
    });

    if (email) {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Prenotazione Perlage - ${data} ${ora}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:32px;background:#ffffff;color:#111">
            <h1>Perlage Pizza & Restaurant</h1>

            <p>Ciao ${nome},</p>

            <p>abbiamo ricevuto la tua richiesta di prenotazione.</p>

            <div style="margin-top:28px;margin-bottom:28px;padding:20px;background:#f7f4ee;border-radius:16px">
              <p><strong>Data:</strong> ${data}</p>
              <p><strong>Ora:</strong> ${ora}</p>
              <p><strong>Persone:</strong> ${persone}</p>
              ${
                acceptedCoupon
                  ? `<p><strong>Coupon utilizzato:</strong> ${acceptedCoupon}</p>`
                  : ""
              }
            </div>

            <div style="margin-top:28px;margin-bottom:28px;padding:20px;background:#111;color:#fff;border-radius:16px">
              <h2 style="margin-top:0;color:#D2B07A">Perlage Loyalty</h2>
              <p><strong>Numero card:</strong> ${loyaltyAccount?.card_number || "-"}</p>
              <p><strong>Livello:</strong> ${(loyaltyAccount?.level || "bronze").toUpperCase()}</p>
              <p><strong>Punti:</strong> ${loyaltyAccount?.points || 0}</p>
            </div>

            ${
              generatedWelcomeCoupon
                ? `
                  <div style="margin-top:28px;margin-bottom:28px;padding:24px;background:#f7f4ee;border:1px solid #D2B07A;border-radius:16px;text-align:center">
                    <p style="margin:0 0 10px 0;text-transform:uppercase;letter-spacing:2px;color:#8a6a33;font-size:12px">
                      Il tuo coupon personale
                    </p>
                    <h2 style="margin:0;color:#111;font-size:32px;letter-spacing:2px">
                      ${generatedWelcomeCoupon}
                    </h2>
                    <p style="margin-top:14px">
                      20% di sconto sulla tua prossima prenotazione.
                    </p>
                    <p style="font-size:13px;color:#555">
                      Valido fino al ${welcomeExpiresAt?.slice(0, 10)}
                    </p>
                  </div>
                `
                : ""
            }

            <p>Per eventuali modifiche puoi contattarci direttamente.</p>

            <p style="margin-top:40px">
              Perlage Pizza & Restaurant<br />
              Via Asiago 20, Catania
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      loyalty: loyaltyAccount,
      generated_coupon: generatedWelcomeCoupon,
      used_coupon: acceptedCoupon,
    });
  } catch (error: any) {
    console.error("PRENOTAZIONE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Errore durante la prenotazione" },
      { status: 500 }
    );
  }
}