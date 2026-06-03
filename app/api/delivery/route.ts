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

    const { name, phone, email, address, notes, cart, total } = body;

    const cleanPhone = String(phone).replace(/\s+/g, "");

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
            name,
            phone: cleanPhone,
            email: email || null,
          },
        ])
        .select("id")
        .single();

      if (customerError) throw customerError;

      customerId = newCustomer.id;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id: customerId,
          order_type: "delivery",
          status: "pending",
          total,
          delivery_address: address,
          notes: notes || null,
        },
      ])
      .select("id")
      .single();

    if (orderError) throw orderError;

    const items = cart.map((item: any) => ({
      order_id: order.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes || null,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) throw itemsError;

    await resend.emails.send({
      from: fromEmail,
      to: process.env.ADMIN_EMAIL!,
      subject: `Nuovo ordine delivery - ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;color:#111">
          <h2>Nuovo ordine delivery Perlage</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Telefono:</strong> ${cleanPhone}</p>
          <p><strong>Indirizzo:</strong> ${address}</p>
          <p><strong>Totale:</strong> € ${total}</p>
          <p><strong>Note:</strong> ${notes || "-"}</p>

          <h3>Prodotti</h3>
          <ul>
            ${cart
              .map(
                (item: any) =>
                  `<li>${item.quantity}x ${item.name} - € ${
                    item.price * item.quantity
                  }</li>`
              )
              .join("")}
          </ul>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELIVERY ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Errore durante ordine delivery" },
      { status: 500 }
    );
  }
}
