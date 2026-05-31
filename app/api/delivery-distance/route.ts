import { NextResponse } from "next/server";

const ORIGIN = "Via Asiago 20, Catania, Italia";
const MAX_DISTANCE_KM = 18;

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!address) {
      return NextResponse.json({ error: "Indirizzo mancante" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: "Chiave Google Maps mancante" }, { status: 500 });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");

    url.searchParams.set("origins", ORIGIN);
    url.searchParams.set("destinations", address);
    url.searchParams.set("mode", "driving");
    url.searchParams.set("units", "metric");
    url.searchParams.set("language", "it");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();

    const element = data?.rows?.[0]?.elements?.[0];

    if (!element || element.status !== "OK") {
      return NextResponse.json(
        { error: "Indirizzo non verificabile" },
        { status: 400 }
      );
    }

    const distanceKm = element.distance.value / 1000;

    return NextResponse.json({
      success: true,
      distanceKm,
      distanceText: element.distance.text,
      durationText: element.duration.text,
      allowed: distanceKm <= MAX_DISTANCE_KM,
      maxDistanceKm: MAX_DISTANCE_KM,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Errore verifica distanza" },
      { status: 500 }
    );
  }
}
