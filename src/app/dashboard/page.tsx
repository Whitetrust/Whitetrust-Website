import { db } from "@/lib/mongo";
import { mongoEnabled } from "@/lib/env";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type ProspectRow = {
  _id: string;
  visits: number;
  totalDwell: number;
  lastSeen: number;
  paths: string[];
};

type PageRow = {
  _id: string;
  views: number;
  avgDwell: number;
  avgScroll: number;
};

type EnquiryRow = {
  _id: unknown;
  ts: Date;
  name: string;
  email: string;
  country: string;
  interest: string;
  status: string;
  prospectToken?: string;
};

export default async function DashboardHome() {
  if (!mongoEnabled()) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-8">
        <h1 className="font-display text-4xl text-ink">Dashboard</h1>
        <p className="mt-4 text-muted">
          MongoDB is not configured. Set <code>MONGODB_URI</code> in your
          environment to enable analytics + prospect tracking.
        </p>
      </div>
    );
  }

  const d = await db();
  // eslint-disable-next-line react-hooks/purity -- server component; evaluated once per request
  const since = Date.now() - SEVEN_DAYS_MS;

  const prospects = (await d
    .collection("events")
    .aggregate([
      { $match: { prospect: { $ne: null }, ts: { $gte: since } } },
      {
        $group: {
          _id: "$prospect",
          visits: { $sum: 1 },
          totalDwell: { $sum: { $ifNull: ["$dwell", 0] } },
          lastSeen: { $max: "$ts" },
          paths: { $addToSet: "$path" },
        },
      },
      { $sort: { lastSeen: -1 } },
      { $limit: 30 },
    ])
    .toArray()) as unknown as ProspectRow[];

  const pages = (await d
    .collection("events")
    .aggregate([
      { $match: { event: "page_view", ts: { $gte: since } } },
      {
        $group: {
          _id: "$path",
          views: { $sum: 1 },
          avgDwell: { $avg: { $ifNull: ["$dwell", 0] } },
          avgScroll: { $avg: { $ifNull: ["$scroll", 0] } },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 20 },
    ])
    .toArray()) as unknown as PageRow[];

  const enquiries = (await d
    .collection("enquiries")
    .find({})
    .sort({ ts: -1 })
    .limit(30)
    .toArray()) as unknown as EnquiryRow[];

  const totalViews = pages.reduce((a, p) => a + p.views, 0);
  const totalProspects = prospects.length;
  const totalEnquiries = enquiries.length;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 md:px-10">
      <div className="flex items-end justify-between flex-wrap gap-4 border-b border-line pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-bronze">
            Internal · 7-day window
          </div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl text-ink">
            CAWT Dashboard
          </h1>
        </div>
        <Link href="/" className="text-sm text-bronze underline">
          ← Back to site
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-px bg-line mt-8 border border-line">
        <Stat value={totalProspects.toString()} label="Active prospects (7d)" />
        <Stat value={totalViews.toString()} label="Page views (7d)" />
        <Stat value={totalEnquiries.toString()} label="Recent enquiries" />
      </div>

      <SectionTitle title="Active prospects" subtitle="Visitors carrying a wealth-manager token" />
      {prospects.length === 0 ? (
        <Empty message="No prospect visits yet. Share a tokenised link like cawt.ai/r/AB12CD to start tracking." />
      ) : (
        <div className="border border-line bg-ivory">
          <Row head cols={["Prospect", "Visits", "Dwell", "Last seen", "Pages of interest"]} />
          {prospects.map((p) => (
            <Row
              key={p._id}
              cols={[
                <Link key="t" href={`/dashboard/prospect/${p._id}`} className="text-bronze underline">
                  {p._id}
                </Link>,
                String(p.visits),
                fmtDwell(p.totalDwell),
                fmtTime(p.lastSeen),
                topPaths(p.paths),
              ]}
            />
          ))}
        </div>
      )}

      <SectionTitle title="Top pages" subtitle="By view count over the last 7 days" />
      {pages.length === 0 ? (
        <Empty message="No page-view events yet. Accept the cookie banner or share a tokenised link to begin tracking." />
      ) : (
        <div className="border border-line bg-ivory">
          <Row head cols={["Page", "Views", "Avg dwell", "Avg scroll"]} />
          {pages.map((p) => (
            <Row
              key={p._id}
              cols={[
                <code key="c" className="text-sm">
                  {p._id}
                </code>,
                String(p.views),
                fmtDwell(Math.round(p.avgDwell)),
                `${Math.round(p.avgScroll)}%`,
              ]}
            />
          ))}
        </div>
      )}

      <SectionTitle title="Recent enquiries" subtitle="Contact form submissions" />
      {enquiries.length === 0 ? (
        <Empty message="No enquiries yet." />
      ) : (
        <div className="border border-line bg-ivory">
          <Row
            head
            cols={["When", "Name", "Country", "Interest", "Status", "Prospect"]}
          />
          {enquiries.map((e) => (
            <Row
              key={String(e._id)}
              cols={[
                fmtTime(e.ts instanceof Date ? e.ts.getTime() : Number(e.ts)),
                <div key="n">
                  <div className="text-ink">{e.name}</div>
                  <div className="text-xs text-muted">{e.email}</div>
                </div>,
                e.country,
                e.interest,
                <span
                  key="s"
                  className={`text-xs uppercase tracking-[0.1em] ${
                    e.status === "booked"
                      ? "text-green-700"
                      : e.status === "failed-booking"
                      ? "text-red-700"
                      : "text-muted"
                  }`}
                >
                  {e.status}
                </span>,
                e.prospectToken ?? "—",
              ]}
            />
          ))}
        </div>
      )}

      <p className="mt-12 text-xs text-muted">
        Heatmaps, scroll-maps and full session replays available in Microsoft
        Clarity. The token visible above lets you correlate this
        first-party data with a wealth manager&apos;s outreach.
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-ivory p-6">
      <div className="font-display text-4xl text-bronze">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mt-12 mb-4">
      <div className="text-xs uppercase tracking-[0.15em] text-bronze">
        {subtitle}
      </div>
      <h2 className="mt-2 font-display text-2xl text-ink">{title}</h2>
    </div>
  );
}

function Row({
  cols,
  head,
}: {
  cols: React.ReactNode[];
  head?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-${Math.min(cols.length, 6)} gap-4 px-6 py-3 ${
        head ? "bg-ivory-2 border-b border-line text-xs uppercase tracking-[0.15em] text-muted" : "border-b border-line text-sm text-ink"
      }`}
      style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}
    >
      {cols.map((c, i) => (
        <div key={i} className="truncate">
          {c}
        </div>
      ))}
    </div>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <div className="border border-line bg-ivory-2 p-6 text-sm text-muted">
      {message}
    </div>
  );
}

function fmtDwell(seconds: number): string {
  if (!seconds || seconds < 0) return "—";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function fmtTime(ms: number | null | undefined): string {
  if (!ms) return "—";
  try {
    return formatDistanceToNow(new Date(ms), { addSuffix: true });
  } catch {
    return "—";
  }
}

function topPaths(paths: string[] | undefined): string {
  if (!paths || paths.length === 0) return "—";
  return paths.slice(0, 3).join(" · ") + (paths.length > 3 ? ` +${paths.length - 3}` : "");
}
