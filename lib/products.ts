// Growfore's own products. Copy mirrors the live product site (tripeleven.com) — keep in sync with it.

export const tripeleven = {
  name: "TripEleven",
  slug: "tripeleven",
  url: "https://tripeleven.com",
  signup: "https://app.tripeleven.com/signup",
  pricing: "https://tripeleven.com/pricing",
  tagline: "The website and booking platform for tour & trekking operators.",
  summary:
    "Build your trip catalog, publish a full branded website, and collect trip inquiries — no code, no developers. From trekking agencies to DMCs, the platform for real operators.",
  pillars: [
    { title: "Trip management", body: "Create and manage every trip in one structured catalog." },
    { title: "Branded website", body: "Publish a full site on your own domain with your logo, colours and fonts." },
    { title: "Inquiries & bookings", body: "Take inquiries by email or WhatsApp and turn interest into revenue." },
    { title: "AI itinerary builder", body: "Draft day-by-day itineraries with AI, then edit them in the trip builder." },
  ],
  builder: [
    "Drag-and-drop itinerary days",
    "Altitude charts",
    "FAQ groups",
    "Pricing tiers",
    "Inclusions & exclusions",
    "Capacity & difficulty",
  ],
  workspace: [
    { title: "One media library", body: "Upload trek photos once and reuse them across trips, pages and posts." },
    { title: "Info pages", body: "Visa guides, festival calendars, activities and your about page — grouped by category." },
    { title: "Travel guides", body: "Write trek guides and articles, file them by category, credit each to an author." },
    { title: "Your team", body: "Show the guides and staff behind every trip, with photos and roles." },
    { title: "Trust signals", body: "Reviews, credentials and associations that make travellers confident to book." },
    { title: "Your brand everywhere", body: "Logo, colours and fonts across every trip, page and post — not a template look." },
    { title: "Navigation that builds itself", body: "Auto-generate menus from trips and pages, or arrange nested items yourself." },
    { title: "Featured trips", body: "Put your best-selling trips first so travellers find them." },
  ],
  extras: ["Catalog", "Add-on extras", "Tags", "Custom domain", "Stripe payments", "Staff seats"],
  sites: [
    { name: "Walkthrough Nepal", url: "https://walkthroughnepal.com", shot: "walkthrough-nepal" },
    { name: "Lovely Trips", url: "https://lovelytrips.com.np", shot: "lovely-trips" },
    { name: "Summit Luxury Treks", url: "https://summitluxurytreks.com", shot: "summit-luxury-treks" },
    { name: "Essence Treks", url: "https://essencetreksnepal.com", shot: "essence-treks" },
    { name: "Hi Nepal Treks", url: "https://hinepaltreks.com", shot: "hi-nepal-treks" },
    { name: "Into Nepal Treks", url: "https://new.intonepaltreks.com", shot: "into-nepal-treks" },
    { name: "Limestone Treks", url: "https://limestonetreks.com", shot: "limestone-treks" },
  ],
} as const;

export const siteShot = (shot: string) => `/products/tripeleven/sites/${shot}.jpg`;
export const hostOf = (url: string) => new URL(url).host.replace(/^(www|new)\./, "");
