import { addDays, addMinutes, isAfter, isWeekend, set, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { graph } from "./graph";
import { db, type EnquiryDoc } from "./mongo";
import { container } from "./cosmos";
import { randomUUID } from "crypto";
import { env, mongoEnabled } from "./env";

const ROUND_ROBIN_KEY = "round-robin-cursor";

async function nextMailbox(): Promise<string> {
  const mailboxes = env.bookingMailboxes;
  if (mailboxes.length === 0) throw new Error("No booking mailboxes configured");
  if (!mongoEnabled() || mailboxes.length === 1) return mailboxes[0];

  const d = await db();
  const col = d.collection<{ _id: string; cursor: number }>("state");
  const res = await col.findOneAndUpdate(
    { _id: ROUND_ROBIN_KEY },
    { $inc: { cursor: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  const idx = ((res?.cursor ?? 1) - 1) % mailboxes.length;
  return mailboxes[(idx + mailboxes.length) % mailboxes.length];
}

type GraphScheduleResponse = {
  value: Array<{
    scheduleId: string;
    scheduleItems?: Array<{
      status: string;
      start: { dateTime: string; timeZone: string };
      end: { dateTime: string; timeZone: string };
    }>;
  }>;
};

async function getBusyBlocks(
  mailbox: string,
  fromIso: string,
  toIso: string
): Promise<Array<{ start: Date; end: Date }>> {
  const client = graph();
  const res: GraphScheduleResponse = await client
    .api(`/users/${mailbox}/calendar/getSchedule`)
    .post({
      schedules: [mailbox],
      startTime: { dateTime: fromIso, timeZone: "UTC" },
      endTime: { dateTime: toIso, timeZone: "UTC" },
      availabilityViewInterval: 30,
    });
  const items = res.value?.[0]?.scheduleItems ?? [];
  return items
    .filter((i) => i.status === "busy" || i.status === "tentative" || i.status === "oof")
    .map((i) => ({
      start: new Date(`${i.start.dateTime}Z`),
      end: new Date(`${i.end.dateTime}Z`),
    }));
}

export function pickFirstSlot({
  busy,
  earliest,
  latest,
  duration,
  workStart,
  workEnd,
  tz,
}: {
  busy: Array<{ start: Date; end: Date }>;
  earliest: Date;
  latest: Date;
  duration: number;
  workStart: number;
  workEnd: number;
  tz: string;
}): { start: Date; end: Date } | null {
  let cursor = earliest;
  while (isAfter(latest, cursor)) {
    const local = toZonedTime(cursor, tz);
    const localStartOfDay = startOfDay(local);
    const workStartLocal = set(localStartOfDay, { hours: workStart, minutes: 0, seconds: 0, milliseconds: 0 });
    const workEndLocal = set(localStartOfDay, { hours: workEnd, minutes: 0, seconds: 0, milliseconds: 0 });

    if (isWeekend(local)) {
      cursor = fromZonedTime(addDays(workStartLocal, 1), tz);
      continue;
    }
    if (local < workStartLocal) {
      cursor = fromZonedTime(workStartLocal, tz);
      continue;
    }
    if (addMinutes(local, duration) > workEndLocal) {
      const nextDayLocalStart = addDays(workStartLocal, 1);
      cursor = fromZonedTime(nextDayLocalStart, tz);
      continue;
    }

    const slotStart = cursor;
    const slotEnd = addMinutes(slotStart, duration);
    const overlap = busy.find((b) => b.start < slotEnd && b.end > slotStart);
    if (overlap) {
      cursor = overlap.end;
      continue;
    }
    return { start: slotStart, end: slotEnd };
  }
  return null;
}

type CreateEventResult = {
  id: string;
  webLink?: string;
  onlineMeetingUrl?: string;
};

async function createEvent({
  mailbox,
  subject,
  bodyHtml,
  start,
  end,
  attendeeName,
  attendeeEmail,
  ccMailboxes,
}: {
  mailbox: string;
  subject: string;
  bodyHtml: string;
  start: Date;
  end: Date;
  attendeeName: string;
  attendeeEmail: string;
  ccMailboxes: string[];
}): Promise<CreateEventResult> {
  const client = graph();
  const created = await client.api(`/users/${mailbox}/events`).post({
    subject,
    body: { contentType: "HTML", content: bodyHtml },
    start: { dateTime: start.toISOString(), timeZone: "UTC" },
    end: { dateTime: end.toISOString(), timeZone: "UTC" },
    attendees: [
      {
        type: "required",
        emailAddress: { address: attendeeEmail, name: attendeeName },
      },
      ...ccMailboxes.map((m) => ({
        type: "optional" as const,
        emailAddress: { address: m, name: m },
      })),
    ],
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
    allowNewTimeProposals: true,
  });
  return {
    id: created.id,
    webLink: created.webLink,
    onlineMeetingUrl: created.onlineMeeting?.joinUrl,
  };
}

async function sendConfirmationEmail({
  to,
  subject,
  bodyHtml,
}: {
  to: string;
  subject: string;
  bodyHtml: string;
}) {
  const client = graph();
  await client.api(`/users/${env.notificationFromMailbox}/sendMail`).post({
    message: {
      subject,
      body: { contentType: "HTML", content: bodyHtml },
      toRecipients: [{ emailAddress: { address: to } }],
      ccRecipients: env.notificationCcRecipients.map((a) => ({
        emailAddress: { address: a },
      })),
    },
    saveToSentItems: true,
  });
}

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

export type BookingResult =
  | { ok: true; bookedFor: string; mailbox: string }
  | { ok: true; queued: true }
  | { ok: false; error: string };

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

export async function attemptBooking(
  input: BookingInput,
  enquiryId: string | null
): Promise<BookingResult> {
  const mailbox = await nextMailbox();
  const now = new Date();
  const earliest = addMinutes(now, env.bookingNoticeMinutes);
  const latest = addDays(now, env.bookingLookaheadDays);

  try {
    const busy = await getBusyBlocks(mailbox, earliest.toISOString(), latest.toISOString());
    const slot = pickFirstSlot({
      busy,
      earliest,
      latest,
      duration: env.bookingMeetingMinutes,
      workStart: env.bookingWorkingHoursStart,
      workEnd: env.bookingWorkingHoursEnd,
      tz: env.bookingTimezone,
    });
    if (!slot) {
      return { ok: true, queued: true };
    }

    const event = await createEvent({
      mailbox,
      subject: `CAWT × ${input.name} — Private conversation`,
      bodyHtml: `
        <p>Thank you for reaching out to Cap Alpha WhiteTrust Global Private Limited.</p>
        <p>This is a 30-minute private conversation to discuss your interest in <strong>${input.interest}</strong>.</p>
        <p><strong>Your note:</strong><br>${escapeHtml(input.message)}</p>
        <p>If this time does not work, please reply and we will propose alternatives.</p>
        <p>— The CAWT team</p>
      `,
      start: slot.start,
      end: slot.end,
      attendeeName: input.name,
      attendeeEmail: input.email,
      ccMailboxes: env.notificationCcRecipients,
    });

    await sendConfirmationEmail({
      to: input.email,
      subject: "CAWT — Your conversation is confirmed",
      bodyHtml: `
        <p>Dear ${escapeHtml(input.name)},</p>
        <p>Your private conversation with Cap Alpha WhiteTrust is confirmed.</p>
        <p><strong>When:</strong> ${slot.start.toUTCString()} (UTC) — 30 minutes<br>
        <strong>Join:</strong> ${event.onlineMeetingUrl ?? "Calendar invite sent separately"}</p>
        <p>A calendar invite has been sent to ${escapeHtml(input.email)}. If you need to reschedule, simply reply to that invite.</p>
        <p>We look forward to speaking with you.</p>
        <p>— Cap Alpha WhiteTrust<br>
        contact@cawt.ai · www.cawt.ai</p>
      `,
    });

    if (enquiryId) {
  await container.item(enquiryId, enquiryId).replace({
    id: enquiryId,
    ...input,
    status: "booked",
    ts: new Date().toISOString(),
    booking: {
      mailbox,
      start: slot.start.toISOString(),
      end: slot.end.toISOString(),
      eventId: event.id,
      teamsUrl: event.onlineMeetingUrl,
    },
  });
}

    return { ok: true, bookedFor: slot.start.toISOString(), mailbox };
    } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";

    if (enquiryId) {
      await container.item(enquiryId, enquiryId).replace({
        id: enquiryId,
        ...input,
        status: "failed-booking",
        errorMessage: msg,
        ts: new Date().toISOString(),
      });
    }

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
