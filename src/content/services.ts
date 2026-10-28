// Outcome first, technology second. `evidence` names work on this site that shows it.
export const services = [
  {
    id: "saas",
    name: "SaaS & MVP development",
    outcome: "From a validated idea to paying users — without rebuilding it at your first hundred customers.",
    points: ["Multi-tenant architecture and data isolation", "Auth, roles, billing and admin from day one", "Installable web apps and native mobile"],
    evidence: ["Nutrition Simplified", "RythmnAi", "EduBoard"],
  },
  {
    id: "ai",
    name: "AI integrations, LLM apps & RAG",
    outcome: "AI features that are grounded, metered and reviewable — so they survive contact with real customers.",
    points: ["LLM features over your own data (RAG)", "Agents and workflow automation with a human in the loop", "Cost tracking per run, per customer"],
    evidence: ["RythmnAi", "astroapp", "preflight"],
  },
  {
    id: "product",
    name: "Python, Django, FastAPI & React",
    outcome: "Product engineering on the stack most teams already run — clean APIs, fast interfaces, tests that mean something.",
    points: ["Django & DRF, FastAPI, async Python", "React, Next.js and TypeScript front ends", "PostgreSQL design and performance work"],
    evidence: ["The House of Mush", "Thaper Dental Clinic", "astroapp"],
  },
  {
    id: "cloud",
    name: "Cloud, DevOps & modernisation",
    outcome: "Infrastructure that is cheap to run, boring to operate, and easy to hand over.",
    points: ["Docker, CI/CD and performance budgets in CI", "Cloudflare, AWS and DigitalOcean deployments", "Rebuilding legacy sites and apps without losing search traffic"],
    evidence: ["Shared client infrastructure", "Thaper Dental Clinic"],
  },
  {
    id: "partner",
    name: "Dedicated & white-label engineering",
    outcome: "A dedicated team that works inside your process, under your brand, so your agency can say yes to more.",
    points: ["Your repos, your tools, your client calls", "Same engineers sprint after sprint", "Happy to work under your NDA"],
    evidence: [],
  },
];

// From the engagement models on rythmnai.com/pricing.
export const engagements = [
  {
    name: "Project build",
    tag: "Fixed scope",
    desc: "A defined outcome — a site, an app, a platform, an AI system — with a fixed scope, timeline and price.",
    items: ["Written scope and estimate up front", "Weekly demos on staging", "Handover with docs and access", "30 days of post-launch cover"],
    price: "Fixed written quote after a free scoping call",
  },
  {
    name: "Dedicated pod",
    tag: "For startups & agencies",
    desc: "A cross-functional team — product, design, engineering, DevOps — reserved for you month to month, white-label if you need it.",
    items: ["Your roadmap, your priorities", "Same people, sprint after sprint", "Scale the pod up or down monthly", "Direct access, no account layer"],
    price: "Monthly, priced by pod size",
  },
  {
    name: "Support & retainer",
    tag: "Keep it running",
    desc: "We take on an existing application — ours or someone else’s — and keep it healthy, current and moving.",
    items: ["Response and fix SLAs", "Monitoring, backups and patching", "Monthly enhancement budget", "Quarterly architecture review"],
    price: "Monthly retainer, sized to your SLA",
  },
];

export const process = [
  { n: "01", name: "Scoping call", text: "A free call to understand the problem, the users and the constraints — not to sell you a stack." },
  { n: "02", name: "Written scope", text: "A plain-language scope, timeline and fixed quote you can hold us to." },
  { n: "03", name: "Weekly demos", text: "Working software on staging every week. You see progress, not status reports." },
  { n: "04", name: "Handover", text: "Documentation, access and 30 days of post-launch cover. You own everything." },
];
