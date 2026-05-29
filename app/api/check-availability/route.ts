import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({
      reservations: [],
    });
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("people,reservation_time,status")
    .eq("reservation_date", date)
    .neq("status", "cancelled");

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    reservations: data || [],
  });
}
