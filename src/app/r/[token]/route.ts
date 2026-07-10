import { NextResponse } from "next/server";
import { db } from "@/lib/mongo";
import { mongoEnabled } from "@/lib/env";

export const runtime = "nodejs";

const PROSPECT_COOKIE = "cawt_p";
const PROSPECT_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const cleanToken = token.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);

  const url = new URL(req.url);
  const target = url.searchParams.get("to") ?? "/";
  const safeTarget = target.startsWith("/") && !target.startsWith("//") ? target : "/";

  const redirectUrl = new URL(safeTarget, url.origin);

  const res = NextResponse.redirect(redirectUrl, 302);
  if (cleanToken) {
    res.cookies.set(PROSPECT_COOKIE, cleanToken, {
      maxAge: PROSPECT_MAX_AGE,
      path: "/",
      sameSite: "lax",
      httpOnly: false, // client-side reads it for tracking
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (mongoEnabled() && cleanToken) {
    try {
      const d = await db();
      await d.collection("prospect_visits").insertOne({
        prospect: cleanToken,
        landed: safeTarget,
        country: req.headers.get("x-vercel-ip-country") ?? null,
        city: req.headers.get("x-vercel-ip-city") ?? null,
        ip: req.headers.get("x-forwarded-for") ?? null,
        ua: req.headers.get("user-agent") ?? null,
        referrer: req.headers.get("referer") ?? null,
        ts: new Date(),
      });
    } catch {
      // ignore — we don't want to fail the redirect
    }
  }

  return res;
}
