function get(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  azureTenantId: get("AZURE_TENANT_ID"),
  azureClientId: get("AZURE_CLIENT_ID"),
  azureClientSecret: get("AZURE_CLIENT_SECRET"),
  bookingMailboxes: (get("BOOKING_MAILBOXES") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  bookingTimezone: get("BOOKING_TIMEZONE") ?? "Asia/Kolkata",
  bookingWorkingHoursStart: Number(get("BOOKING_WORK_START") ?? "10"),
  bookingWorkingHoursEnd: Number(get("BOOKING_WORK_END") ?? "18"),
  bookingMeetingMinutes: Number(get("BOOKING_DURATION_MIN") ?? "30"),
  bookingLookaheadDays: Number(get("BOOKING_LOOKAHEAD_DAYS") ?? "7"),
  bookingNoticeMinutes: Number(get("BOOKING_NOTICE_MIN") ?? "60"),
  notificationFromMailbox:
    get("NOTIFICATION_FROM_MAILBOX") ?? get("BOOKING_MAILBOXES")?.split(",")[0]?.trim() ?? "",
  notificationCcRecipients: (get("NOTIFICATION_CC") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  mongoUri: get("MONGODB_URI"),
  mongoDb: get("MONGODB_DB") ?? "cawt",
  bookingsBusinessId: get("BOOKINGS_BUSINESS_ID") ?? "WhiteTrust@cawt.ai",
  cronSecret: get("CRON_SECRET"),
  isProd: process.env.NODE_ENV === "production",
};

export function bookingEnabled(): boolean {
  return Boolean(
    env.azureTenantId &&
      env.azureClientId &&
      env.azureClientSecret &&
      env.bookingMailboxes.length > 0 &&
      env.notificationFromMailbox
  );
}

export function mongoEnabled(): boolean {
  return Boolean(env.mongoUri);
}
