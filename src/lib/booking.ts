import { graph } from "./graph";
import { container } from "./cosmos";
import { randomUUID } from "crypto";
import { env } from "./env";

export type BookingInput = {
  name: string;
  email: string;
  phone?: string;
  country: string;
  interest: string;
  preferredWindow?: string;
  message: string;
  prospectToken?: string;
  ip?: string;
  userAgent?: string;
};

export type NotifyResult = { ok: true } | { ok: false; error: string };

export async function persistEnquiry(
  input: BookingInput
): Promise<string | null> {
  try {
    const id = randomUUID();

    await container.items.create({
      id,
      ...input,
      status: "received",
      ts: new Date().toISOString(),
    });

    return id;
  } catch (err) {
    console.error("Cosmos DB Error:", err);
    return null;
  }
}

async function sendMail({
  to,
  cc,
  subject,
  bodyHtml,
}: {
  to: string[];
  cc?: string[];
  subject: string;
  bodyHtml: string;
}) {
  const client = graph();
  await client.api(`/users/${env.notificationFromMailbox}/sendMail`).post({
    message: {
      subject,
      body: { contentType: "HTML", content: bodyHtml },
      toRecipients: to.map((a) => ({ emailAddress: { address: a } })),
      ccRecipients: (cc ?? []).map((a) => ({ emailAddress: { address: a } })),
    },
    saveToSentItems: true,
  });
}

async function updateEnquiryStatus(
  enquiryId: string,
  input: BookingInput,
  status: "notified" | "notify-failed",
  errorMessage?: string
) {
  try {
    await container.items.upsert({
      id: enquiryId,
      ...input,
      status,
      ...(errorMessage ? { errorMessage } : {}),
      ts: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[book] Cosmos status update failed:", err);
  }
}

export async function notifyEnquiry(
  input: BookingInput,
  enquiryId: string | null
): Promise<NotifyResult> {
  try {
    await sendMail({
      to: [input.email],
      subject: "Thank you for contacting Cap Alpha WhiteTrust",
      bodyHtml: `
        <p>Dear ${escapeHtml(input.name)},</p>
        <p>Thank you for reaching out to Cap Alpha WhiteTrust Global Private Limited
        regarding <strong>${escapeHtml(input.interest)}</strong>.</p>
        <p>We have received your enquiry and one of our founders will be in touch
        within one business day.</p>
        <p>If your matter is time-sensitive, you are welcome to book a slot directly
        on our calendar:
        <a href="https://outlook.office.com/book/WhiteTrust@cawt.ai/?ismsaljsauthenabled">Book an appointment</a>.</p>
        <p>— Cap Alpha WhiteTrust<br>
        contact@cawt.ai · www.cawt.ai</p>
      `,
    });

    await sendMail({
      to: env.bookingMailboxes,
      cc: env.notificationCcRecipients,
      subject: `New enquiry — ${input.name} (${input.interest})`,
      bodyHtml: `
        <p>New contact form submission${enquiryId ? ` (ref: ${escapeHtml(enquiryId)})` : ""}:</p>
        <table cellpadding="4">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(input.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(input.email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(input.phone ?? "—")}</td></tr>
          <tr><td><strong>Country</strong></td><td>${escapeHtml(input.country)}</td></tr>
          <tr><td><strong>Interest</strong></td><td>${escapeHtml(input.interest)}</td></tr>
          <tr><td><strong>Preferred window</strong></td><td>${escapeHtml(input.preferredWindow ?? "—")}</td></tr>
          <tr><td><strong>Message</strong></td><td>${escapeHtml(input.message)}</td></tr>
        </table>
      `,
    });

    if (enquiryId) await updateEnquiryStatus(enquiryId, input, "notified");

    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[book] notify failed:", msg);

    if (enquiryId) await updateEnquiryStatus(enquiryId, input, "notify-failed", msg);

    return { ok: false, error: msg };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
