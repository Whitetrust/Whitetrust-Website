import { graph } from "./graph";
import { bookingsContainer, ensureBookingsContainer } from "./cosmos";
import { env, bookingEnabled } from "./env";

const SYNC_WINDOW_PAST_DAYS = 30;
const SYNC_WINDOW_FUTURE_DAYS = 365;

type GraphDateTimeTimeZone = { dateTime: string; timeZone: string };

type GraphBookingAppointment = {
  id: string;
  serviceId?: string;
  serviceName?: string;
  staffMemberIds?: string[];
  customerName?: string;
  customerEmailAddress?: string;
  customerPhone?: string;
  customerNotes?: string;
  start: GraphDateTimeTimeZone;
  end: GraphDateTimeTimeZone;
  isLocationOnline?: boolean;
  joinWebUrl?: string;
  anonymousJoinWebUrl?: string;
};

type GraphStaffMember = { id: string; displayName?: string };

function bookingSyncEnabled(): boolean {
  return bookingEnabled() && Boolean(env.bookingsBusinessId);
}

async function listStaffMemberNames(): Promise<Map<string, string>> {
  const client = graph();
  const res: { value: GraphStaffMember[] } = await client
    .api(`/solutions/bookingBusinesses/${env.bookingsBusinessId}/staffMembers`)
    .get();
  return new Map((res.value ?? []).map((s) => [s.id, s.displayName ?? s.id]));
}

async function listAppointments(): Promise<GraphBookingAppointment[]> {
  const client = graph();
  const start = new Date(
    Date.now() - SYNC_WINDOW_PAST_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();
  const end = new Date(
    Date.now() + SYNC_WINDOW_FUTURE_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const appointments: GraphBookingAppointment[] = [];
  let url =
    `/solutions/bookingBusinesses/${env.bookingsBusinessId}/calendarView` +
    `?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

  while (url) {
    const res: { value: GraphBookingAppointment[]; "@odata.nextLink"?: string } =
      await client.api(url).get();
    appointments.push(...(res.value ?? []));
    url = res["@odata.nextLink"] ?? "";
  }
  return appointments;
}

export type SyncResult = { ok: true; synced: number } | { ok: false; error: string };

export async function syncBookings(): Promise<SyncResult> {
  if (!bookingSyncEnabled()) {
    return { ok: false, error: "Booking sync not configured" };
  }

  try {
    await ensureBookingsContainer();
    const [staffNames, appointments] = await Promise.all([
      listStaffMemberNames(),
      listAppointments(),
    ]);

    for (const appt of appointments) {
      await bookingsContainer.items.upsert({
        id: appt.id,
        serviceId: appt.serviceId ?? null,
        serviceName: appt.serviceName ?? null,
        staffMemberIds: appt.staffMemberIds ?? [],
        staffMemberNames: (appt.staffMemberIds ?? []).map(
          (id) => staffNames.get(id) ?? id
        ),
        customerName: appt.customerName ?? null,
        customerEmail: appt.customerEmailAddress ?? null,
        customerPhone: appt.customerPhone ?? null,
        customerNotes: appt.customerNotes ?? null,
        start: appt.start,
        end: appt.end,
        isLocationOnline: appt.isLocationOnline ?? null,
        joinWebUrl: appt.joinWebUrl ?? appt.anonymousJoinWebUrl ?? null,
        syncedAt: new Date().toISOString(),
      });
    }

    return { ok: true, synced: appointments.length };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[booking-sync] failed:", msg);
    return { ok: false, error: msg };
  }
}
