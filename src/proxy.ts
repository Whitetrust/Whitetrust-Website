import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export function proxy(req: NextRequest) {
  const user = process.env.DASHBOARD_BASIC_AUTH_USER ?? (process.env.NODE_ENV !== "production" ? "dev" : "");
  const pass = process.env.DASHBOARD_BASIC_AUTH_PASSWORD ?? (process.env.NODE_ENV !== "production" ? "dev" : "");

  if (!user || !pass) {
    return new NextResponse(
      "Dashboard auth not configured. Set DASHBOARD_BASIC_AUTH_USER and DASHBOARD_BASIC_AUTH_PASSWORD.",
      { status: 503 }
    );
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return require401();

  const decoded = atob(header.slice(6));
  const idx = decoded.indexOf(":");
  if (idx < 0) return require401();
  const u = decoded.slice(0, idx);
  const p = decoded.slice(idx + 1);
  if (u !== user || p !== pass) return require401();

  return NextResponse.next();
}

function require401() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="CAWT Dashboard", charset="UTF-8"',
    },
  });
}
