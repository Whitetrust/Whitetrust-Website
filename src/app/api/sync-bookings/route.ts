import { NextResponse } from "next/server";
import { syncBookings } from "@/lib/booking-sync";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (env.cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${env.cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await syncBookings();
  if (!result.ok) {
    console.error("[sync-bookings] failed:", result.error);
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result);
}
