import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CircleCheck, LucideArrowRight } from "lucide-react"
import Aurora from "@/components/aurora/aurora"
import Testimonials from "@/components/testimonials"
import WhySection from "@/components/why-section"
import ProductSection from "@/components/product-section"
import CtaSection from "@/components/cta-section"
import FaqSection from "@/components/faq-section"
import PostsSection from "@/components/posts-section"

const clients: { src: string; alt: string }[] = [
  { src: "/clients/180_IntoNepal-e1575127488496.png", alt: "Into Nepal" },
  { src: "/clients/begnas_aqua_park.webp", alt: "Begnas Aqua Park" },
  { src: "/clients/blonde-me-black.webp", alt: "Blonde Me Black" },
  { src: "/clients/calmness-1.webp", alt: "Calmness" },
  { src: "/clients/camberly.webp", alt: "Camberly" },
  { src: "/clients/cropped-Bike-Rental-Logo-02-_1_.webp", alt: "Bike Rental" },
  {
    src: "/clients/cropped-Logo-One-1.webp",
    alt: "Fishtail IVF & Fertility Centre",
  },
  {
    src: "/clients/cropped-WhatsApp_Image_2024-08-23_at_12.01.08_9256e24a-removebg-preview.webp",
    alt: "Ayurveda Spa & Salon",
  },
  { src: "/clients/cropped-mardi_himal_logo.webp", alt: "Mardi Himal" },
  { src: "/clients/essence-treks-logo.webp", alt: "Essence Treks" },
  { src: "/clients/hinepal-logo.avif", alt: "Hinepal" },
  { src: "/clients/laltin.webp", alt: "Laltin" },
  {
    src: "/clients/limestone-treks-logo-transparent.webp",
    alt: "Limestone Treks",
  },
  { src: "/clients/lovely-trips-logo.webp", alt: "Lovely Trips" },
  { src: "/clients/roamers-inn.webp", alt: "Roamer's Inn" },
  {
    src: "/clients/semantics_education_consultancy.webp",
    alt: "Semantics Education Consultancy",
  },
  { src: "/clients/sgc-logo-final_web-3.svg", alt: "SGC" },
  { src: "/clients/silk-cosmetics.webp", alt: "Silk Cosmetics" },
  { src: "/clients/summit-luxury-logo-white.webp", alt: "Summit Luxury Treks" },
  { src: "/clients/suikhet-valley-resort.webp", alt: "Suikhet Valley Resort" },
  { src: "/clients/swift_academy_logo.webp", alt: "Swift Academy" },
  { src: "/clients/taj-chicken-biryani.webp", alt: "Taj Chicken Biryani" },
  { src: "/clients/tieUpOne-logo.webp", alt: "TieUpOne" },
  { src: "/clients/wow-fashion.webp", alt: "Wow Fashion" },
]

const services: {
  eyebrow: string
  title: string
  cta: string
  media?: string
}[] = [
  {
    eyebrow: "Web development",
    title: "A site built around your brand, not a template",
    cta: "Explore web development",
    media: "/mockups/web-development.png",
  },
  {
    eyebrow: "SEO",
    title: "Climb the ranks for the searches that convert",
    cta: "Explore SEO",
    media: "/mockups/seo.png",
  },
  {
    eyebrow: "WordPress + SEO",
    title: "Tailored to your brand, optimized for your audience",
    cta: "Explore WordPress + SEO",
    media: "/mockups/service-3-website-and-audience.png",
  },
  {
    eyebrow: "Ads management",
    title: "Turn clicks into revenue, not just impressions",
    cta: "Explore ads management",
    media: "/mockups/ads-management.png",
  },
]

// ponytail: quotes below are placeholders — real ones need written approval
// from each person named here. Swap before launch.
const testimonials = [
  {
    quote:
      "We came in with a site we couldn't update ourselves. Now the team publishes in an afternoon, and it still looks like us.",
    name: "Arjun",
    role: "Founder",
    company: "Into Nepal Treks",
    image: "/testimonials/Arjun_IntoNepal.png",
  },
  {
    quote:
      "Six months in, our booking page is the first result for the searches that actually make us money.",
    name: "Gobinda",
    role: "Founder",
    company: "Summit Luxury Treks",
    image: "/testimonials/gobinda-subedi-trekking-guide.webp",
  },
  {
    quote:
      "One team built it and ranked it. Nothing got handed off and then forgotten about.",
    name: "Yam",
    role: "Founder",
    company: "Limestone Treks",
    image: "/testimonials/yam-prasad-poudel.webp",
  },
  {
    quote:
      "We were burning budget on clicks that never showed up. Now we know which ones actually work.",
    name: "Mohan",
    role: "Founder",
    company: "HiNepal Travel and Treks",
    image: "/testimonials/mohan-prasad-subedi.avif",
  },
  {
    quote: "It's the first agency that tells us what we're not getting, too.",
    name: "Kumar",
    role: "Founder",
    company: "Lovely Trips",
    image: "/testimonials/lovely-trips.jpg",
  },
]

const why = [
  {
    title: "We report revenue, not rankings",
    body: "A position you never convert from is decoration. We track what your rankings turn into — calls, bookings, enquiries — and tell you plainly when a month is flat.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    title: "One team, not a relay",
    body: "The people who build your site are the ones who rank it, in-house and in your timezone. Nothing gets passed around and quietly dropped.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
  {
    title: "We research first, then build",
    body: "No guessing. We read your market, your competitors and what people actually search for, then build to what the findings point at.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  },
  {
    title: "We work like it's our own",
    body: "Whether you're a single operator or scaling a team, your goals become the brief. Every page, keyword and ad is argued for on cost and return.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    title: "Month-to-month, no lock-in",
    body: "If we're not earning the retainer, you'd know. We'd rather say that than have you quietly wondering.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
  },
]

export default function Page() {
  return (
    <>
      <div className="-mt-20 flex min-h-[calc(100svh-5rem)] flex-col bg-background text-foreground">
        <section className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">
          <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)] opacity-70 [-webkit-mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]">
            <Aurora
              colorStops={["#1C1C1C", "#2E3B52", "#3D2C4A"]}
              lightColorStops={["#FFFFFF", "#D7E6F7", "#F7FAFD"]}
              blend={0.6}
              amplitude={1.0}
              speed={1}
            />
          </div>

          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2rem,3.75vw,3.375rem)] leading-[1.05] font-normal tracking-tight text-pretty">
              <span className="block text-muted-foreground">
                A complete system for
              </span>
              <span className="block">search and content</span>
              <span className="block text-muted-foreground">
                that actually compounds
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground">
              Growfore pairs web development, SEO, and ads into one system — so
              every campaign makes the next one cheaper to run.
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button className="p-4 px-6" size="lg">
                Get Started
              </Button>
              <Button className="p-4 px-6" variant="outline" size="lg">
                Book a Meeting
              </Button>
            </div>

            <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground">
              <CircleCheck className="size-4 text-foreground" />
              Free strategy audit. Month-to-month, no lock-in.
            </p>
          </div>
        </section>

        <section className="overflow-hidden px-6 pb-12">
          <div data-reveal className="container-page">
            <p className="mb-10 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Trusted by 100+ Clients
            </p>
            <ul className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:grid-cols-6">
              {clients.map((client) => (
                <li
                  key={client.src}
                  className="flex h-32 items-center justify-center border-r border-b border-border p-8"
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={160}
                    height={56}
                    className="h-12 w-auto object-contain md:h-14"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="bg-background py-28 text-foreground md:py-36">
        <div className="container-page">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-pretty">
            Everything your site needs to be found, and to convert.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            One team across web development, SEO, and ads — so your site
            isn&apos;t built in one place and optimized in another.
          </p>

          <div className="mt-20 grid grid-cols-1 border-t border-l border-border md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="lift flex flex-col border-r border-b border-border p-8"
              >
                <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {service.eyebrow}
                </p>
                <h3 className="mt-4 max-w-xs text-xl leading-snug text-balance">
                  {service.title}
                </h3>

                {service.media && (
                  <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={service.media}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 90vw, 28vw"
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="mt-auto flex justify-end pt-8">
                  <button
                    type="button"
                    className="group flex items-center gap-2 rounded-sm border border-border bg-muted px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background motion-reduce:transition-none"
                  >
                    {service.cta}
                    <LucideArrowRight className="size-3 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductSection />
      <Testimonials items={testimonials} />
      <WhySection items={why} />
      <FaqSection />
      <PostsSection />
      <CtaSection />
    </>
  )
}
