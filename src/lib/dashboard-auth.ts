import { headers } from "next/headers";
import { env } from "./env";

export async function checkDashboardAuth(): Promise<
  { ok: true } | { ok: false; response: Response }
> {
  const user = env.isProd
    ? process.env.DASHBOARD_BASIC_AUTH_USER
    : process.env.DASHBOARD_BASIC_AUTH_USER ?? "dev";
  const pass = env.isProd
    ? process.env.DASHBOARD_BASIC_AUTH_PASSWORD
    : process.env.DASHBOARD_BASIC_AUTH_PASSWORD ?? "dev";

  if (env.isProd && (!user || !pass)) {
    return {
      ok: false,
      response: new Response(
        "Dashboard auth not configured. Set DASHBOARD_BASIC_AUTH_USER and DASHBOARD_BASIC_AUTH_PASSWORD.",
        { status: 503 }
      ),
    };
  }

  const h = await headers();
  const auth = h.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return { ok: false, response: requireAuth() };
  }
  const decoded = Buffer.from(auth.slice("Basic ".length), "base64").toString("utf8");
  const idx = decoded.indexOf(":");
  if (idx < 0) return { ok: false, response: requireAuth() };
  const u = decoded.slice(0, idx);
  const p = decoded.slice(idx + 1);
  if (u !== user || p !== pass) {
    return { ok: false, response: requireAuth() };
  }
  return { ok: true };
}

function requireAuth(): Response {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="CAWT Dashboard", charset="UTF-8"',
    },
  });
}
