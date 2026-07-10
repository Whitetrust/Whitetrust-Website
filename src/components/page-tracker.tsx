"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "./consent-provider";

const SESSION_KEY = "cawt_sid";
const PROSPECT_COOKIE = "cawt_p";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return m ? decodeURIComponent(m.split("=").slice(1).join("=")) : null;
}

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2)) +
      "-" +
      Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function send(event: string, props: Record<string, unknown>) {
  const body = JSON.stringify({ event, ts: Date.now(), ...props });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function PageTracker() {
  const pathname = usePathname();
  const { state, regime } = useConsent();
  const enteredAt = useRef<number>(0);
  const maxScroll = useRef<number>(0);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) {
        maxScroll.current = 100;
        return;
      }
      const pct = Math.min(100, Math.round((window.scrollY / h) * 100));
      if (pct > maxScroll.current) maxScroll.current = pct;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function flushPrevious() {
      if (!lastPath.current) return;
      const dwell = Math.round((Date.now() - enteredAt.current) / 1000);
      const consented = state.analytics || state.marketing;
      const hasProspect = Boolean(readCookie(PROSPECT_COOKIE));
      // First-party prospect tracking always for tokenised visitors (legitimate-interest disclosed in privacy notice).
      // Otherwise gated by analytics consent.
      if (!consented && !hasProspect) return;
      send("page_view", {
        path: lastPath.current,
        dwell,
        scroll: maxScroll.current,
        sid: getSessionId(),
        prospect: readCookie(PROSPECT_COOKIE),
        regime,
        referrer: document.referrer || undefined,
      });
    }

    flushPrevious();
    lastPath.current = pathname;
    enteredAt.current = Date.now();
    maxScroll.current = 0;

    function onHide() {
      flushPrevious();
    }
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
