import Link from "next/link";
import { notFound } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { db } from "@/lib/mongo";
import { mongoEnabled } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Visit = {
  ts: number;
  path?: string;
  dwell?: number;
  scroll?: number;
  sid?: string;
  referrer?: string;
  country?: string | null;
  city?: string | null;
};

export default async function ProspectDetail({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!mongoEnabled()) notFound();
  const d = await db();
  const events = (await d
    .collection("events")
    .find({ prospect: token, event: "page_view" })
    .sort({ ts: -1 })
    .limit(500)
    .toArray()) as unknown as Visit[];
  if (events.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="font-display text-3xl text-ink">No activity</h1>
        <p className="mt-3 text-muted">
          No tracked page views found for prospect token{" "}
          <code>{token}</code>.
        </p>
        <Link href="/dashboard" className="mt-6 inline-block text-bronze underline">
          ← Dashboard
        </Link>
      </div>
    );
  }

  const totalViews = events.length;
  const totalDwell = events.reduce((a, e) => a + (e.dwell ?? 0), 0);
  const firstSeen = events[events.length - 1].ts;
  const lastSeen = events[0].ts;
  const country = events.find((e) => e.country)?.country ?? null;

  const byPath = new Map<string, { views: number; dwell: number; scroll: number }>();
  for (const e of events) {
    const path = e.path ?? "(unknown)";
    const x = byPath.get(path) ?? { views: 0, dwell: 0, scroll: 0 };
    x.views += 1;
    x.dwell += e.dwell ?? 0;
    x.scroll = Math.max(x.scroll, e.scroll ?? 0);
    byPath.set(path, x);
  }
  const pathRows = [...byPath.entries()]
    .map(([path, v]) => ({ path, ...v }))
    .sort((a, b) => b.views - a.views);

  const sessions = new Map<string, Visit[]>();
  for (const e of events) {
    const sid = e.sid ?? "anonymous";
    const arr = sessions.get(sid) ?? [];
    arr.push(e);
    sessions.set(sid, arr);
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 md:px-10">
      <div className="flex items-end justify-between flex-wrap gap-4 border-b border-line pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-bronze">
            Prospect activity
          </div>
          <h1 className="mt-2 font-display text-4xl text-ink">{token}</h1>
        </div>
        <Link href="/dashboard" className="text-sm text-bronze underline">
          ← Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line mt-8 border border-line">
        <Stat value={String(totalViews)} label="Page views" />
        <Stat
          value={Math.round(totalDwell / 60).toString() + "m"}
          label="Total dwell"
        />
        <Stat
          value={formatDistanceToNow(new Date(firstSeen), { addSuffix: false })}
          label="Engagement span"
          sub={`Since ${format(new Date(firstSeen), "MMM d")}`}
        />
        <Stat
          value={country ?? "—"}
          label="Country (last seen)"
          sub={formatDistanceToNow(new Date(lastSeen), { addSuffix: true })}
        />
      </div>

      <h2 className="mt-12 mb-3 font-display text-2xl text-ink">Pages of interest</h2>
      <div className="border border-line bg-ivory">
        <Row head cols={["Page", "Views", "Total dwell", "Max scroll"]} />
        {pathRows.map((r) => (
          <Row
            key={r.path}
            cols={[
              <code key="c" className="text-sm">
                {r.path}
              </code>,
              String(r.views),
              `${Math.round(r.dwell / 60)}m ${r.dwell % 60}s`,
              `${r.scroll}%`,
            ]}
          />
        ))}
      </div>

      <h2 className="mt-12 mb-3 font-display text-2xl text-ink">
        Sessions ({sessions.size})
      </h2>
      <div className="space-y-6">
        {[...sessions.entries()].map(([sid, evts]) => {
          const sorted = [...evts].sort((a, b) => a.ts - b.ts);
          const start = sorted[0].ts;
          const end = sorted[sorted.length - 1].ts;
          return (
            <div key={sid} className="border border-line bg-ivory p-6">
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-bronze">
                    Session {sid.slice(0, 12)}
                  </div>
                  <div className="text-sm text-ink">
                    {format(new Date(start), "PPpp")} —{" "}
                    {Math.round((end - start) / 1000 / 60)} min
                  </div>
                </div>
                <div className="text-xs text-muted">
                  {sorted.length} page view{sorted.length === 1 ? "" : "s"}
                </div>
              </div>
              <ol className="border-l border-line pl-4 space-y-2">
                {sorted.map((e, i) => (
                  <li key={i} className="text-sm">
                    <code className="text-ink">{e.path}</code>{" "}
                    <span className="text-muted">
                      · {format(new Date(e.ts), "HH:mm:ss")}
                      {e.dwell ? ` · ${e.dwell}s` : ""}
                      {e.scroll ? ` · ${e.scroll}% scroll` : ""}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="bg-ivory p-6">
      <div className="font-display text-3xl text-bronze">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}

function Row({ cols, head }: { cols: React.ReactNode[]; head?: boolean }) {
  return (
    <div
      className={`grid gap-4 px-6 py-3 ${
        head
          ? "bg-ivory-2 border-b border-line text-xs uppercase tracking-[0.15em] text-muted"
          : "border-b border-line text-sm text-ink"
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
