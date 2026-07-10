"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ACCEPT_ALL,
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  DEFAULT_CONSENT,
  REJECT_ALL,
  parseConsentCookie,
  serializeConsent,
  type ConsentState,
  type Regime,
} from "@/lib/consent";

type Ctx = {
  state: ConsentState;
  regime: Regime;
  decided: boolean;
  setState: (next: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  settingsOpen: boolean;
  closeSettings: () => void;
};

const ConsentCtx = createContext<Ctx | null>(null);

function readCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!m) return null;
  return parseConsentCookie(m.split("=").slice(1).join("="));
}

function writeCookie(state: ConsentState) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${serializeConsent(state)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function ConsentProvider({
  children,
  regime,
}: {
  children: React.ReactNode;
  regime: Regime;
}) {
  const [state, setStateInner] = useState<ConsentState>(DEFAULT_CONSENT);
  const [decided, setDecided] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const fromCookie = readCookie();
    if (fromCookie && fromCookie.decidedAt) {
      // Initialise from the persisted consent cookie after hydration. Reading
      // the cookie in a lazy initializer would desync SSR (no cookie) vs CSR.
      /* eslint-disable react-hooks/set-state-in-effect */
      setStateInner(fromCookie);
      setDecided(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setStateInner(next);
    setDecided(Boolean(next.decidedAt));
    writeCookie(next);
    window.dispatchEvent(new CustomEvent("cawt:consent", { detail: next }));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      state,
      regime,
      decided,
      setState: persist,
      acceptAll: () => persist({ ...ACCEPT_ALL }),
      rejectAll: () => persist({ ...REJECT_ALL }),
      openSettings: () => setSettingsOpen(true),
      settingsOpen,
      closeSettings: () => setSettingsOpen(false),
    }),
    [state, decided, persist, regime, settingsOpen]
  );

  return <ConsentCtx.Provider value={value}>{children}</ConsentCtx.Provider>;
}

export function useConsent() {
  const v = useContext(ConsentCtx);
  if (!v) throw new Error("useConsent outside provider");
  return v;
}
