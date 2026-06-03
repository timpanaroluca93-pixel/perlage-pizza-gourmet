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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, telefono, email, data, ora, persone, note } = body;

    const cleanPhone = String(telefono).replace(/\s+/g, "");

    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", cleanPhone)
      .maybeSingle();

    let customerId = existingCustomer?.id;

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
    } else {
      await supabase
        .from("customers")
        .update({
          name: nome,
          email: email || null,
        })
        .eq("id", customerId);
    }

    const { error: reservationError } = await supabase
      .from("reservations")
      .insert([
        {
          customer_id: customerId,
          reservation_date: data,
          reservation_time: ora,
          people: Number(persone),
          notes: note || null,
          status: "pending",
        },
      ]);

    if (reservationError) throw reservationError;

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
            </div>
            <p>Per eventuali modifiche puoi contattarci direttamente.</p>
            <p style="margin-top:40px">
              Perlage Pizza & Restaurant<br />
              Via Asiago 20, Catania
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PRENOTAZIONE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Errore durante la prenotazione" },
      { status: 500 }
    );
  }
}