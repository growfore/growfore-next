import { Minus, Plus } from "lucide-react"

const faqs = [
  {
    q: "How long before SEO brings us traffic?",
    a: "Technical fixes and content structure show up in weeks. Meaningful volume takes four to six months, because Google has to re-crawl and re-rank a site that has usually never been optimised. We report on leads from month one, even when the ranking curve is still flat.",
  },
  {
    q: "What does a project cost?",
    a: "A site is a fixed quote after the audit — you see the number before you commit to anything. Retainers are monthly and sized to the work, not padded to look bigger. If the scope changes mid-build, you hear it before the work happens, not on the invoice.",
  },
  {
    q: "Do we own the site, the domain and the rankings?",
    a: "Yours, all three. Domain registered to you, code in your repository, hosting in your account. If you leave, you leave with everything working — we will hand over the credentials on a call, not fight over them.",
  },
  {
    q: "Why not just WordPress and a few plugins?",
    a: "For a brochure site, plugins are the right answer and we will tell you so. Once you need lead routing, per-trip pricing, ad tracking or a search footprint that compounds, the pile of plugins becomes the thing slowing the site down. That is when a purpose-built build pays for itself.",
  },
  {
    q: "Do you run ads as well as SEO?",
    a: "Yes, and we build them into the same account so the data agrees. Paid tells us what people want right now; SEO is what compounds. Running them separately is how businesses end up paying twice for the same insight.",
  },
  {
    q: "We are not in Nepal. Can you still work with us?",
    a: "Half our clients are outside Nepal. We work asynchronously, you get a shared channel and a weekly written update, and calls are scheduled around your day rather than ours.",
  },
  {
    q: "What happens after launch?",
    a: "The launch is the handover, not the finish line. You get a walkthrough, a recorded tour of how to edit it yourself, and thirty days of fixes included. After that it is month-to-month, and you can stop whenever you like.",
  },
  {
    q: "What if it is not working?",
    a: "Then you will have heard it from us first. Monthly reports call out the flat months, not just the wins. And because there is no lock-in, the honest answer to a retainer that stopped earning its keep is to stop it — we would rather lose the account than keep you paying for a report.",
  },
]

export default function FaqSection() {
  return (
    <section className="bg-background py-28 text-foreground md:py-36">
      <div className="container-page max-w-5xl">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          FAQ
        </p>
        <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-pretty">
          Frequently asked questions
        </h2>

        <div data-reveal className="mt-16">
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              open={index === 0}
              className="group border-b border-border last:border-b-0 open:mt-3 open:rounded-xl open:border open:border-border open:bg-muted"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 px-5 py-6 text-lg marker:hidden">
                {faq.q}
                <Plus className="size-5 shrink-0 transition-transform group-open:hidden" />
                <Minus className="hidden size-5 shrink-0 group-open:block" />
              </summary>
              <p className="px-5 pb-7 leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
