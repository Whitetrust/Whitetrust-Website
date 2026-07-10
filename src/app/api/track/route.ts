import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/mongo";
import { mongoEnabled } from "@/lib/env";

export const runtime = "nodejs";

const schema = z.object({
  event: z.string().min(1).max(64),
  ts: z.number().int().positive(),
  path: z.string().max(512).optional(),
  dwell: z.number().int().nonnegative().optional(),
  scroll: z.number().int().min(0).max(100).optional(),
  sid: z.string().max(128).optional(),
  prospect: z.string().max(64).nullable().optional(),
  regime: z.string().max(16).optional(),
  referrer: z.string().max(2048).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new NextResponse(null, { status: 204 });
  const evt = parsed.data;

  if (!mongoEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[track]", evt);
    }
    return new NextResponse(null, { status: 204 });
  }

  try {
    const d = await db();
    await d.collection("events").insertOne({
      ...evt,
      country: req.headers.get("x-vercel-ip-country") ?? null,
      city: req.headers.get("x-vercel-ip-city") ?? null,
      ip: req.headers.get("x-forwarded-for") ?? null,
      ua: req.headers.get("user-agent") ?? null,
      receivedAt: new Date(),
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[track] mongo write failed:", e);
    }
  }

  return new NextResponse(null, { status: 204 });
}
