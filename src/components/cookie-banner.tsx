"use client";

import { useState } from "react";
import Link from "next/link";
import { useConsent } from "./consent-provider";

export function CookieBanner() {
  const { decided, acceptAll, rejectAll, regime, state, setState, settingsOpen, openSettings, closeSettings } = useConsent();
  const [draft, setDraft] = useState({
    analytics: state.analytics,
    marketing: state.marketing,
  });

  if (settingsOpen) {
    return (
      <div className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6">
        <div className="bg-ivory text-ink w-full max-w-2xl border border-line p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.15em] text-bronze">
            Cookie preferences
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
            Manage your cookie settings
          </h2>
          <p className="mt-4 text-sm text-muted leading-relaxed">
            We use a small number of cookies. You can choose which categories
            to allow. Strictly necessary cookies cannot be turned off as the
            site will not function without them.
          </p>

          <div className="mt-8 space-y-5">
            <Toggle label="Strictly necessary" on disabled body="Required for the site to function — including security, form submission and your cookie-preference itself." />
            <Toggle
              label="Analytics"
              on={draft.analytics}
              onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              body="Microsoft Clarity (heatmaps and session-quality analytics) and Google Analytics 4 (aggregate audience reporting). Helps us improve content."
            />
            <Toggle
              label="Personalisation / Marketing"
              on={draft.marketing}
              onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
              body="Enables tokenised tracking of pages of interest when you arrive from a referenced link (e.g. a wealth-manager introduction). Reset at any time."
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-end">
            <button
              type="button"
              onClick={closeSettings}
              className="px-5 py-2.5 text-sm text-muted hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setState({
                  necessary: true,
                  analytics: draft.analytics,
                  marketing: draft.marketing,
                  decidedAt: Date.now(),
                });
                closeSettings();
              }}
              className="px-6 py-2.5 text-sm bg-ink text-ivory hover:bg-ink-2"
            >
              Save preferences
            </button>
          </div>
          <p className="mt-6 text-[11px] text-muted">
            See our <Link href="/privacy" className="underline">privacy notice</Link> for full details.
          </p>
        </div>
      </div>
    );
  }

  if (decided) return null;

  const headline =
    regime === "strict"
      ? "We use cookies to improve your experience"
      : "Cookies & privacy notice";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-ink text-ivory border-t border-bronze/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1">
          <div className="font-display text-lg text-ivory">{headline}</div>
          <p className="mt-1.5 text-sm text-ivory/70 leading-relaxed max-w-3xl">
            We use a minimum set of cookies to operate this site. Analytics
            (Microsoft Clarity, GA4) and personalised tracking are off by
            default. See our{" "}
            <Link href="/privacy" className="underline hover:text-bronze">
              privacy notice
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
          <button
            type="button"
            onClick={openSettings}
            className="px-4 py-2 text-sm border border-ivory/30 text-ivory hover:border-bronze hover:text-bronze"
          >
            Customise
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="px-4 py-2 text-sm border border-ivory/30 text-ivory hover:border-bronze hover:text-bronze"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="px-5 py-2 text-sm bg-bronze text-ivory hover:bg-bronze-3"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  body,
  on,
  disabled,
  onChange,
}: {
  label: string;
  body: string;
  on: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-line pt-5">
      <div className="flex-1">
        <div className="font-display text-lg text-ink">{label}</div>
        <p className="mt-1 text-xs text-muted leading-relaxed">{body}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange?.(!on)}
        disabled={disabled}
        aria-pressed={on}
        className={`relative inline-flex h-6 w-12 items-center transition-colors ${
          on ? "bg-bronze" : "bg-line"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-5 w-5 bg-ivory transition-transform ${
            on ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
