// Case studies. Sources: each project's own README/config and its live site (captured 2026-10-28).
// Screenshots and recordings in /public/work are real captures of the live sites; on the wedding
// site the parents' names and phone numbers were hidden before capture.

export type Shot = { src: string; alt: string; mobile?: boolean };

export type Project = {
  slug: string;
  name: string;
  kind: "Client" | "Our product" | "Celebration";
  sector: string;
  url: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  engineering: string[];
  stack: string[];
  hero: Shot;
  mobile: Shot;
  shots: Shot[];
  video: { src: string; poster: string };
  og: string;
  accent: string;
};

const W = (slug: string, file: string, alt: string, mobile = false): Shot => ({
  src: `/work/${slug}/${file}.webp`,
  alt,
  mobile,
});

export const projects: Project[] = [
  {
    slug: "thaper-dental",
    name: "Thaper Dental Clinic",
    kind: "Client",
    sector: "Healthcare · Jaipur · since 1958",
    url: "https://thaperdental.com",
    title: "A four-branch dental clinic, rebuilt for speed, search and WhatsApp bookings.",
    summary:
      "A Next.js rebuild for a third-generation Jaipur practice: every treatment, branch and the dental-tourism page generated from one catalogue, and no enquiry lost between a form and a phone call.",
    challenge:
      "A trusted practice with four branches was represented online by a slow static site — one generic page per treatment, no per-branch presence for Google, and enquiries that could go missing between a form and a phone call.",
    solution:
      "We rebuilt it in Next.js with every treatment, branch and the dental-tourism page generated from one catalogue, Dentist and FAQ structured data for each branch, an open-source Payload CMS for the blog, and a contact flow that saves every lead before handing the patient to WhatsApp with their details pre-filled.",
    outcomes: [
      "Lighthouse 100 on desktop and 95 on mobile, enforced in CI on every change",
      "Nine treatment pages, a dental-tourism page and four branch pages, each with its own schema",
      "No lost enquiries: every lead is stored first, then routed to reception on WhatsApp",
    ],
    engineering: [
      "One content catalogue drives pages, navigation, sitemap and structured data",
      "Leads persisted to PostgreSQL before the WhatsApp hand-off",
      "Self-hosted on shared infrastructure we run: Caddy, PostgreSQL, uptime monitoring",
    ],
    stack: ["Next.js", "React", "TypeScript", "Payload CMS", "PostgreSQL", "Cloudflare R2"],
    hero: W("thaper", "thaper-hero", "Thaper Dental Clinic home page: 'Jaipur's most trusted smiles, three generations in the making' with a live clinic snapshot card"),
    mobile: W("thaper", "thaper-mobile", "Thaper Dental Clinic home page on a phone", true),
    shots: [
      W("thaper", "thaper-s1", "Treatment catalogue: complete dental care under one roof"),
      W("thaper", "thaper-s2", "Why Thaper: three generations of trust, with clinic facts"),
      W("thaper", "thaper-s3", "The technology behind your care: equipment in every treatment room"),
    ],
    video: { src: "/work/thaper/demo.webm", poster: "/work/thaper/poster.webp" },
    og: "/og/thaper.jpg",
    accent: "#B5326E",
  },
  {
    slug: "nutrition-simplified",
    name: "Nutrition Simplified",
    kind: "Client",
    sector: "Health & wellness · Dietitian practice",
    url: "https://divyanutritionsimplified.com",
    title: "A nutrition practice with its own branded app — meal plans, blood reports and bookings in one place.",
    summary:
      "A multi-coach platform the practice owns outright: a coach dashboard, a branded installable client app, blood-report tracking with optional AI extraction, and a public site with online booking.",
    challenge:
      "An independent dietitian was paying for a per-seat wellness platform that carried someone else’s brand, while client notes, blood reports and meal plans still lived across WhatsApp chats and spreadsheets.",
    solution:
      "A multi-coach platform the practice owns: a coach dashboard for clients, recipes, meal and workout plans; a branded, installable client app in the practice’s own name and colours; blood-report tracking with optional AI extraction; and a public site with 14 programmes and online booking.",
    outcomes: [
      "Branded client app on the web, iOS and Android — with full parity between them",
      "Blood-report values charted over time against reference ranges",
      "Meal plans that scale calories and macros automatically, built from the practice’s own recipe library",
    ],
    engineering: [
      "Multi-tenant by design: every query is scoped to its coach, so one coach can never read another’s data",
      "A per-coach web-app manifest, so “Add to Home Screen” installs the coach’s app, not ours",
      "argon2id passwords and hashed, httpOnly session tokens; Razorpay-funded AI wallet",
    ],
    stack: ["Next.js", "React Native", "PostgreSQL", "Drizzle", "Razorpay", "OpenAI"],
    hero: W("nutrition", "nutrition-hero", "Nutrition Simplified home page: 'Nutrition that evolves with you' beside a figure made of data points"),
    mobile: W("nutrition", "nutrition-mobile", "Nutrition Simplified home page on a phone", true),
    shots: [
      W("nutrition", "nutrition-s2", "'A diet plan is only the beginning' — meals, measurements, blood reports and follow-ups"),
      W("nutrition", "nutrition-s3", "How the practice’s plans, tracking and follow-ups connect"),
    ],
    video: { src: "/work/nutrition/demo.webm", poster: "/work/nutrition/poster.webp" },
    og: "/og/nutrition.jpg",
    accent: "#E8831A",
  },
  {
    slug: "rythmnai-social",
    name: "RythmnAi",
    kind: "Our product",
    sector: "AI marketing · SaaS",
    url: "https://rythmn.in",
    title: "Brief it once, get a week of posts — written, art-directed and scheduled by AI, approved by a human.",
    summary:
      "Our own SaaS for small businesses: one brief becomes seven posts with images, captions, hashtags and times, published to Facebook Pages and Instagram only after the owner approves.",
    challenge:
      "Small businesses know they should post every day and rarely do. Generic AI tools produce seven posts that look alike, and nothing connects a post to the visits and calls it brings in.",
    solution:
      "A Next.js and FastAPI product where a brief becomes a week of varied, art-directed drafts. Owners edit or regenerate, approve, and a background worker publishes on schedule — to a Facebook Page, or to Instagram through either of Meta’s two login routes.",
    outcomes: [
      "Live product with self-serve sign-up and free starting credits",
      "Publishes to Facebook Pages and Instagram business accounts",
      "Nothing publishes itself: every post waits as a draft until approved",
    ],
    engineering: [
      "ARQ + Redis jobs for image generation, scheduled publishing and email, with every attempt recorded",
      "Per-run AI token usage priced and totalled, so margins are visible per customer",
      "Revocable JWT sessions: log out everywhere, and password resets end every other session",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis / ARQ", "Cloudflare R2", "OpenAI"],
    hero: W("social", "social-hero", "RythmnAi landing page: 'Brief it once. Get a week of posts that don’t look alike.' with a phone mock of a scheduled post"),
    mobile: W("social", "social-mobile", "RythmnAi landing page on a phone", true),
    shots: [
      W("social", "social-s1", "An example week: seven posts, each with a different art direction"),
      W("social", "social-s2", "What it does: everything between an idea and a published post"),
      W("social", "social-s3", "Website visits and calls traced back to individual posts"),
    ],
    video: { src: "/work/social/demo.webm", poster: "/work/social/poster.webp" },
    og: "/og/social.jpg",
    accent: "#147C8A",
  },
  {
    slug: "astro",
    name: "Astro",
    kind: "Our product",
    sector: "Vedic astrology · AI · English & Hindi",
    url: "https://astro.rythmn.in",
    title: "A Vedic astrology app that shows its working — every reading cites the chart factors behind it.",
    summary:
      "Our own bilingual product: a calculation engine for kundali, dashas and panchang, rule-based readings that explain themselves, and an AI chat that answers only from facts the engine has already computed.",
    challenge:
      "Most astrology apps hand people a verdict with no reasoning, and AI chatbots will happily invent planetary positions. We wanted readings people could check: grounded in real astronomical calculation, consistent from one chart to the next, and honest about uncertainty.",
    solution:
      "A Python engine computes positions from the Swiss Ephemeris and builds the birth, marriage (D9) and career (D10) charts, dasha periods and a daily panchang. Readings come from a written set of traditional rules, and each one shows the factors that help, the ones that pull the other way, and how much weight to give it. Ask Astro works out which part of life and which time span a question is about, gathers the matching chart factors, and only then has the model write an answer that cites them.",
    outcomes: [
      "Live in English and Hindi, with a free kundali from date, time and place of birth",
      "Every reading lists the chart factors it rests on — and the ones that weigh against it",
      "The AI never calculates a position: it writes only from facts the engine has computed",
    ],
    engineering: [
      "Swiss Ephemeris positions in the sidereal zodiac, with five ayanamsa options and mean or true nodes",
      "Birth-time sensitivity flagged: parts that depend on an exact time are marked when it is unknown or near a change",
      "Questions are classified by topic, intent and time span before any model call; the model is sent the computed chart facts and the conversation, never asked to calculate",
      "Razorpay billing reconciled against a read-only ledger, with every admin change recorded in an audit log",
    ],
    stack: ["Python", "FastAPI", "Swiss Ephemeris", "OpenAI", "Razorpay", "Vanilla JS"],
    hero: W("astro", "astro-hero", "Astro home page: 'Your Kundali. Explained in a way that makes sense.' beside a North Indian birth chart"),
    mobile: W("astro", "astro-mobile", "A calculated birth chart in Astro on a phone", true),
    shots: [
      W("astro", "astro-kundali", "The birth chart (D1) for a made-up sample birth, with tabs for the marriage and career charts and a birth-time reliability note"),
      W("astro", "astro-why", "‘Why is Saturn read as Mostly helpful?’ — the factors that help, the ones that weigh against, and how sure to be"),
      W("astro", "astro-sky", "Your sky at birth: an interactive ring of the zodiac you can turn and tap"),
      W("astro", "astro-planets", "Every planet in plain words, filterable by career, money, marriage, health and more"),
      W("astro", "astro-ask", "Ask Astro: the question, the ranked chart factors, then an answer that cites them"),
      W("astro", "astro-panchang", "A monthly panchang with tithi, nakshatra and festivals for any city"),
      W("astro", "astro-hindi", "The same app in Hindi"),
    ],
    video: { src: "/work/astro/demo.webm", poster: "/work/astro/poster.webp" },
    og: "/og/astro.jpg",
    accent: "#D4A657",
  },
  {
    slug: "romit-ayushi-wedding",
    name: "Romit & Ayushi · #ROHI",
    kind: "Celebration",
    sector: "Wedding website · Alwar",
    url: "https://romitayushi.in",
    title: "A two-day Rajasthani wedding, told ceremony by ceremony — with the couple illustrated in every scene.",
    summary:
      "An invitation that opens like a card, then becomes a full wedding site: seven ceremonies with their own illustrations, a countdown to the pheras, venue directions, travel notes and music.",
    challenge:
      "Guests travelling to Alwar needed one place for seven ceremonies across two days, the venue, travel and stay — and the couple wanted something that felt like their wedding, not a template.",
    solution:
      "A static Next.js site served from Cloudflare’s edge. It opens on a Ganesh invocation and an invitation card, then each ceremony — Haldi, Bhat, Sangeet, Lagan, Ghudchadi, Phere, Reception — gets its own illustrated card with time, venue and add-to-calendar.",
    outcomes: [
      "Live at its own domain, romitayushi.in, and shared over WhatsApp with a custom link preview",
      "Seven ceremonies, each with a custom illustration of the couple",
      "Countdown to the pheras, embedded map and one-tap directions to the resort",
    ],
    engineering: [
      "Every guest-facing detail lives in one config file, so the family can change it without touching code",
      "Static export on Cloudflare Workers, with a rate-limited visit counter and private stats page on D1",
      "A music button plays the couple’s chosen song, skipping straight past its instrumental intro",
    ],
    stack: ["Next.js", "TypeScript", "Cloudflare Workers", "Cloudflare D1"],
    hero: W("wedding", "wedding-hero", "Romit & Ayushi wedding site: illustrated couple either side of the names under a marigold garland"),
    mobile: W("wedding", "wedding-mobile-intro", "The invitation card on a phone, with the Ganesh invocation", true),
    shots: [
      W("wedding", "wedding-intro", "The opening invitation: Ganesh invocation, the couple, date and the #ROHI hashtag (family names hidden for privacy)"),
      W("wedding", "wedding-s2", "Ceremony cards for Haldi, Bhat and Sangeet, each with its own illustration"),
      W("wedding", "wedding-s3", "Lagan and Ghudchadi ceremony cards"),
      W("wedding", "wedding-s4", "Reception card with time, venue and add-to-calendar"),
      W("wedding", "wedding-s5", "Venue & travel: map and directions to the resort"),
    ],
    video: { src: "/work/wedding/demo.webm", poster: "/work/wedding/poster.webp" },
    og: "/og/wedding.jpg",
    accent: "#7A1630",
  },
  {
    slug: "bro-exe",
    name: "BRO.exe",
    kind: "Celebration",
    sector: "Birthday microsite",
    url: "https://bro-exe.pages.dev",
    title: "A birthday wish disguised as an operating system that crashes — then reboots into a celebration.",
    summary:
      "A 60–90 second interactive surprise: a retro terminal ‘diagnoses’ a friend, crashes with ERROR 404: ANOTHER YEAR OF YOUR LIFE NOT FOUND, and reboots into a black-and-gold party.",
    challenge:
      "A birthday message that a close friend would actually remember — funny first, sincere at the end, and opened from a WhatsApp link on a phone.",
    solution:
      "A React microsite that plays out like a story: boot sequence, ‘friendship diagnostics’, a staged system crash, then a gold celebration with a roast generator, a (fake) future forecast, a digital gift card and a sincere closing message.",
    outcomes: [
      "Live and shareable as a single link, with a personalised WhatsApp preview",
      "Four acts: boot, crash, celebration and a sincere close",
      "Personalised from one config file — names, roasts, predictions, gift and message",
    ],
    engineering: [
      "No backend, no APIs, no tracking and no external requests — fonts are bundled",
      "WhatsApp link-preview title and description generated from the names at build time",
      "Hosted on Cloudflare Pages",
    ],
    stack: ["React", "Vite", "TypeScript", "Cloudflare Pages"],
    hero: W("birthday", "birthday-crash5", "BRO.exe celebration screen: 'Happy birthday, you absolute LEGEND!' in gold, with confetti"),
    mobile: W("birthday", "birthday-mobile", "BRO.exe boot screen on a phone", true),
    shots: [
      W("birthday", "birthday-step1", "Act one: the boot sequence scans the friendship database"),
      W("birthday", "birthday-step2", "Friendship diagnostics: brain.exe occasionally responsive, maturity.dll missing"),
      W("birthday", "birthday-crash", "The crash: CRITICAL SYSTEM ERROR — another year of your life not found"),
      W("birthday", "birthday-step3", "Celebration mode: the LEGEND reveal, with a personal diagnosis for the friend"),
      W("birthday", "birthday-party", "The birthday control panel: roast me back, predict my future, unlock my gift"),
    ],
    video: { src: "/work/birthday/demo.webm", poster: "/work/birthday/poster.webp" },
    og: "/og/birthday.jpg",
    accent: "#C9A24A",
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// Builds we can walk through on a call but that have no public URL to link to.
export type LabItem = { name: string; status: string; what: string; proof: string; stack: string[] };

export const lab: LabItem[] = [
  {
    name: "EduBoard",
    status: "In development",
    what: "A multi-tenant ERP for universities, schools and coaching institutes: admissions, academics, exams, finance, HR and more.",
    proof: "Schema-per-tenant PostgreSQL isolation, with separate React consoles for institutions and for the platform operator.",
    stack: ["Django", "DRF", "django-tenants", "React", "PostgreSQL"],
  },
  {
    name: "preflight",
    status: "Experimental",
    what: "An autonomous application tester: point it at a project and it inspects, starts and tests it, then writes an evidence-backed report.",
    proof: "Runs the project’s own tests, generated API tests and Playwright browser checks; collects traces, screenshots and video. It diagnoses — it never edits your code.",
    stack: ["Python", "Playwright", "Docker", "Claude (optional)"],
  },
  {
    name: "The House of Mush",
    status: "Private build",
    what: "An e-commerce store for jewellery and gifting, with guest checkout, coupons and Google sign-in.",
    proof: "Server-rendered Django with HTMX for a fast, light storefront; Razorpay payments; Redis caching.",
    stack: ["Django", "HTMX", "Tailwind CSS", "PostgreSQL", "Razorpay"],
  },
  {
    name: "Shared client infrastructure",
    status: "In production",
    what: "One hardened server running several client apps, including thaperdental.com and divyanutritionsimplified.com.",
    proof: "Caddy for automatic TLS, one PostgreSQL server with a database per app, uptime monitoring, and each app in its own Compose project.",
    stack: ["Docker Compose", "Caddy", "PostgreSQL 16", "Uptime Kuma"],
  },
];
