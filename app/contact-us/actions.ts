"use server";

export type ProposalState = { ok: boolean; message: string; errors?: Partial<Record<"name" | "email", string>> } | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Proposal form handler. Delivery goes to CONTACT_WEBHOOK_URL (Formspree, Make, Zapier, Slack, a
 * Cloudflare Worker…) as JSON. Until that's configured the form fails loudly with the email fallback,
 * so no enquiry is silently dropped.
 */
export async function submitProposal(_prev: ProposalState, form: FormData): Promise<ProposalState> {
  const field = (k: string) => String(form.get(k) ?? "").trim().slice(0, 4000);
  if (field("company_url")) return { ok: true, message: "Thanks — we'll be in touch." }; // honeypot

  const data = {
    name: field("name"),
    email: field("email"),
    website: field("website"),
    phone: field("phone"),
    company: field("company"),
    budget: field("budget"),
    message: field("message"),
  };

  const errors: NonNullable<ProposalState>["errors"] = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; proposal not delivered", { email: data.email });
    return { ok: false, message: "Our form is temporarily unavailable. Please email info@growfore.com or call +977 9856085151." };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ ...data, source: "growfore.com/contact-us", submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return { ok: false, message: "Something went wrong sending your proposal. Please email info@growfore.com." };
  }

  return { ok: true, message: "Thanks — your proposal is in. A strategist will reply within one working day." };
}
