"use client";

import { useActionState } from "react";
import { cx } from "@/components/ui";
import { submitProposal } from "./actions";

export function ProposalForm() {
  const [state, action, pending] = useActionState(submitProposal, null);

  if (state?.ok) {
    return (
      <div role="status" className="flex min-h-80 flex-col justify-center bg-card p-8">
        <p className="font-serif text-h3 text-ink">Proposal received.</p>
        <p className="mt-3 max-w-md text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="bg-card p-6 lg:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" error={state?.errors?.name} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={state?.errors?.email} />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
        <Field label="Company" name="company" autoComplete="organization" />
        <Field label="Website" name="website" type="url" placeholder="https://" autoComplete="url" />
        <Field label="Project budget" name="budget" placeholder="Optional" />
        <label className="grid gap-1.5 sm:col-span-2">
          <span className="text-[0.8125rem] text-muted">What do you need?</span>
          <textarea
            name="message"
            rows={5}
            placeholder="A new website, better rankings, more calls from Google Ads…"
            className="rounded-md bg-paper px-3 py-2.5 text-[0.9375rem] text-ink ring-1 ring-line ring-inset placeholder:text-faint focus:ring-2 focus:ring-brand focus:outline-none"
          />
        </label>
        {/* honeypot */}
        <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={cx("text-[0.875rem]", state && !state.ok ? "text-[#b42318]" : "text-faint")}>
          {state?.message ?? "We reply within one working day."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#333] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit proposal"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  ...props
}: { label: string; name: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.8125rem] text-muted">
        {label}
        {required && <span className="text-brand-ink"> *</span>}
      </span>
      <input
        name={name}
        required={required}
        aria-invalid={!!error}
        className={cx(
          "h-11 rounded-md bg-paper px-3 text-[0.9375rem] text-ink ring-1 ring-inset placeholder:text-faint focus:ring-2 focus:ring-brand focus:outline-none",
          error ? "ring-[#b42318]" : "ring-line",
        )}
        {...props}
      />
      {error && <span className="text-[0.8125rem] text-[#b42318]">{error}</span>}
    </label>
  );
}
