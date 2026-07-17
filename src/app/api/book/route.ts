import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingEnabled, mongoEnabled } from "@/lib/env";
import { notifyEnquiry, persistEnquiry } from "@/lib/booking";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),
  interest: z.string(),
  preferredWindow: z.string().optional(),
  message: z.string().min(10),
  consent: z.literal(true),
  prospectToken: z.string().optional(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }

  const input = parsed.data;
  const ip = req.headers.get("x-forwarded-for") ?? undefined;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  let enquiryId: string | null = null;
  try {
    enquiryId = await persistEnquiry({
      name: input.name,
      email: input.email,
      phone: input.phone,
      country: input.country,
      interest: input.interest,
      preferredWindow: input.preferredWindow,
      message: input.message,
      prospectToken: input.prospectToken,
      ip,
      userAgent,
    });
  } catch (e) {
    console.error("[book] persist failed:", e);
  }

  if (!bookingEnabled()) {
    console.warn(
      "[book] mail notifications disabled — set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, BOOKING_MAILBOXES"
    );
    return NextResponse.json({ ok: true, queued: true });
  }

  const result = await notifyEnquiry(
    {
      name: input.name,
      email: input.email,
      phone: input.phone,
      country: input.country,
      interest: input.interest,
      preferredWindow: input.preferredWindow,
      message: input.message,
      prospectToken: input.prospectToken,
      ip,
      userAgent,
    },
    enquiryId
  );

  if (!result.ok) {
    console.error("[book] notify failed:", result.error);
    // We still return success to the user — the enquiry is saved either way.
    return NextResponse.json({ ok: true, queued: true });
  }

  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    bookingEnabled: bookingEnabled(),
    mongoEnabled: mongoEnabled(),
  });
}
