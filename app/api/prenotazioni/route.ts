import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const fromEmail =
  "Perlage Pizza & Restaurant <booking@mail.perlagepizzaerestaurant.it>";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nome,
      telefono,
      email,
      data,
      ora,
      persone,
      note,
    } = body;

    // CREA CLIENTE
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert([
        {
          name: nome,
          phone: telefono,
          email: email || null,
        },
      ])
      .select("id")
      .single();

    if (customerError) {
      throw customerError;
    }

    // CREA PRENOTAZIONE
    const { error: reservationError } = await supabase
      .from("reservations")
      .insert([
        {
          customer_id: customer.id,
          reservation_date: data,
          reservation_time: ora,
          people: Number(persone),
          notes: note || null,
          status: "pending",
        },
      ]);

    if (reservationError) {
      throw reservationError;
    }

    // EMAIL ADMIN
    const adminEmail = await resend.emails.send({
      from: fromEmail,
      to: process.env.ADMIN_EMAIL!,
      subject: `Nuova prenotazione - ${nome}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;background:#ffffff;color:#111">
          <h2 style="margin-bottom:20px">
            Nuova prenotazione Perlage
          </h2>

          <div style="line-height:1.8">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Telefono:</strong> ${telefono}</p>
            <p><strong>Email:</strong> ${email || "-"}</p>
            <p><strong>Data:</strong> ${data}</p>
            <p><strong>Ora:</strong> ${ora}</p>
            <p><strong>Persone:</strong> ${persone}</p>
            <p><strong>Note:</strong> ${note || "-"}</p>
          </div>
        </div>
      `,
    });

    // EMAIL CLIENTE
    let customerEmail = null;

    if (email) {
      customerEmail = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Prenotazione Perlage - ${data} ${ora}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:32px;background:#ffffff;color:#111">
            <h1 style="font-size:28px;margin-bottom:24px">
              Perlage Pizza & Restaurant
            </h1>

            <p style="font-size:16px">
              Ciao ${nome},
            </p>

            <p style="margin-top:16px;line-height:1.8">
              abbiamo ricevuto la tua richiesta di prenotazione.
            </p>

            <div
              style="
                margin-top:28px;
                margin-bottom:28px;
                padding:20px;
                background:#f7f4ee;
                border-radius:16px;
              "
            >
              <p><strong>Data:</strong> ${data}</p>
              <p><strong>Ora:</strong> ${ora}</p>
              <p><strong>Persone:</strong> ${persone}</p>
            </div>

            ${
              note
                ? `
              <p>
                <strong>Note:</strong> ${note}
              </p>
            `
                : ""
            }

            <p style="margin-top:24px;line-height:1.8">
              Per eventuali modifiche puoi contattarci direttamente.
            </p>

            <p style="margin-top:40px;line-height:1.8">
              Perlage Pizza & Restaurant<br />
              Via Asiago 20, Catania
            </p>
          </div>
        `,
      });
    }

    console.log("ADMIN EMAIL:", adminEmail);
    console.log("CUSTOMER EMAIL:", customerEmail);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("PRENOTAZIONE ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Errore durante la prenotazione",
      },
      {
        status: 500,
      }
    );
  }
}