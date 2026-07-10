export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  necessary: true;
  decidedAt: number | null;
};

export const COOKIE_NAME = "cawt_consent";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export const DEFAULT_CONSENT: ConsentState = {
  analytics: false,
  marketing: false,
  necessary: true,
  decidedAt: null,
};

export const ACCEPT_ALL: ConsentState = {
  analytics: true,
  marketing: true,
  necessary: true,
  decidedAt: Date.now(),
};

export const REJECT_ALL: ConsentState = {
  analytics: false,
  marketing: false,
  necessary: true,
  decidedAt: Date.now(),
};

const STRICT_REGIONS = new Set([
  // EEA + UK + Switzerland: GDPR / UK GDPR — opt-in required
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","CH","GB",
]);

const NOTICE_AND_CHOICE_REGIONS = new Set([
  // Opt-out / notice-and-choice (US CCPA-style, India DPDP, Singapore, UAE, Australia, Brazil-LGPD…)
  "US","IN","SG","AE","SA","AU","BR","CA","JP","ZA","NZ",
]);

export type Regime = "strict" | "notice" | "open";

export function regimeForCountry(country: string | null | undefined): Regime {
  if (!country) return "strict"; // safer default when unknown
  const c = country.toUpperCase();
  if (STRICT_REGIONS.has(c)) return "strict";
  if (NOTICE_AND_CHOICE_REGIONS.has(c)) return "notice";
  return "open";
}

export function defaultConsentForRegime(regime: Regime): ConsentState {
  if (regime === "strict") return { ...DEFAULT_CONSENT };
  return { ...DEFAULT_CONSENT, analytics: false }; // still off until explicit choice
}

export function parseConsentCookie(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (typeof v !== "object" || v === null) return null;
    return {
      analytics: Boolean(v.analytics),
      marketing: Boolean(v.marketing),
      necessary: true,
      decidedAt: typeof v.decidedAt === "number" ? v.decidedAt : null,
    };
  } catch {
    return null;
  }
}

export function serializeConsent(state: ConsentState): string {
  return encodeURIComponent(JSON.stringify(state));
}
