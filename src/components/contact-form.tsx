"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  country: z.string().min(2, "Please enter your country"),
  interest: z.enum([
    "wills-execution",
    "family-trust",
    "business-holding-trust",
    "family-constitution-council",
    "cross-border-structuring",
    "citizenship-residency",
    "wealth-protection",
    "gift-city-platform",
    "gift-city-fund-setup",
    "singapore-vcc",
    "fund-accounting-administration",
    "india-entry-strategy",
    "setup-of-entity",
    "annual-administration-compliance",
    "directorship-services",
    "registered-office-services",
    "other",
  ]),
  preferredWindow: z.string().optional(),
  message: z.string().min(10, "Please share a sentence or two of context"),
  consent: z.literal(true, {
    message: "Please accept the privacy notice",
  }),
});

type FormValues = z.infer<typeof schema>;

const interestOptions = [
  { value: "wills-execution", label: "Wills & Execution" },
  { value: "family-trust", label: "Family Trust" },
  { value: "business-holding-trust", label: "Business Holding Trust" },
  { value: "family-constitution-council", label: "Family Constitution & Council" },
  { value: "cross-border-structuring", label: "Cross Border Structuring Solutions" },
  { value: "citizenship-residency", label: "Citizenship & Residency" },
  { value: "wealth-protection", label: "Wealth Protection Structures" },
  { value: "gift-city-platform", label: "GIFT City Platform Services" },
  { value: "gift-city-fund-setup", label: "GIFT City Fund Setup" },
  { value: "singapore-vcc", label: "Global Fund Structures & Solutions" },
  { value: "fund-accounting-administration", label: "Fund Accounting & Administration" },
  { value: "india-entry-strategy", label: "India Entry Strategy" },
  { value: "setup-of-entity", label: "Setup Of Entity" },
  { value: "annual-administration-compliance", label: "Annual Administration & Compliance" },
  { value: "directorship-services", label: "Directorship Services" },
  { value: "registered-office-services", label: "Registered Office Services" },
  { value: "other", label: "Other / General enquiry" },
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-bronze/40 bg-bronze/5 p-8 text-center">
        <div className="font-display text-2xl text-ink">
          Thank you — we&apos;ll be in touch.
        </div>
        <p className="mt-3 text-sm text-muted">
          One of our founders will respond within one business day with a
          confirmed time on your timezone.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputCls}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputCls}
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputCls}
          />
        </Field>
        <Field label="Country / city" error={errors.country?.message}>
          <input
            type="text"
            {...register("country")}
            className={inputCls}
            placeholder="e.g. Mumbai, India · Dubai, UAE · London, UK"
          />
        </Field>
      </div>

      <Field label="What can we help with?" error={errors.interest?.message}>
        <select {...register("interest")} className={cn(inputCls, "appearance-none")}>
          <option value="">Select an area…</option>
          {interestOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Preferred time window (optional)"
        error={errors.preferredWindow?.message}
      >
        <input
          type="text"
          {...register("preferredWindow")}
          className={inputCls}
          placeholder="e.g. Weekday mornings IST · Tuesday afternoon GMT"
        />
      </Field>

      <Field label="A brief note" error={errors.message?.message}>
        <textarea
          rows={4}
          {...register("message")}
          className={cn(inputCls, "resize-none")}
          placeholder="A sentence or two about your situation — held in strict confidence."
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 accent-bronze"
        />
        <span>
          I have read the{" "}
          <a href="/privacy" className="underline hover:text-bronze">
            privacy notice
          </a>{" "}
          and consent to CAWT contacting me about this enquiry.
        </span>
      </label>
      {errors.consent && (
        <div className="text-xs text-red-700">{errors.consent.message}</div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center bg-ink text-ivory px-8 py-3 hover:bg-ink-2 disabled:opacity-50 transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Submit Form"}
      </button>

      {status === "error" && (
        <div className="text-sm text-red-700">{errorMsg}</div>
      )}
    </form>
  );
}

const inputCls =
  "w-full bg-ivory border border-line px-4 py-3 text-ink text-sm focus:outline-none focus:border-bronze transition-colors";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted block mb-2">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}
