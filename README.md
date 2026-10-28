# Rythmn AI — portfolio site

Portfolio and lead-generation site for Rythmn AI Digital Private Limited: B2B software services, five live
case studies, and two personal-experience offerings (wedding websites, birthday microsites).

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion · fully static output.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Company facts, email, contact channels | `src/content/site.ts` |
| Case studies and “workbench” projects | `src/content/projects.ts` |
| Services, engagement models, process | `src/content/services.ts` |
| Home page | `src/app/page.tsx` |
| Case study template | `src/app/work/[slug]/page.tsx` |
| Wedding / birthday landing pages | `src/app/weddings/`, `src/app/birthdays/` |
| Design tokens and utilities | `src/app/globals.css` |
| Outreach messages (LinkedIn, email, WhatsApp) | `OUTREACH.md` |

**Turning on WhatsApp or a booking link:** set `whatsapp` (digits with country code) or `calendar` in
`src/content/site.ts`. The contact forms show a WhatsApp button automatically once it’s set.

**Contact forms** have no backend: submitting opens the visitor’s email app with a pre-filled message to
`hello@rythmnai.com`. To collect submissions server-side instead, point `ContactForm` at a form service.

## Media

Everything in `public/work/` was captured from the live sites on 2026-10-28 with Playwright — desktop
(1440×900) and mobile (390×844) screenshots, plus muted VP9 screen recordings. On the wedding site the
parents’ names and phone numbers were hidden before capture. Wedding ceremony illustrations in
`public/weddings/` come from the Romit & Ayushi project.

To add a project: capture screenshots into `public/work/<slug>/`, add an entry to `projects` in
`src/content/projects.ts`, and it appears on the home page list, gets a case-study page, and is added to
the sitemap.

## Content rules

- Only verified facts: no invented clients, testimonials or metrics. Every outcome on the site comes from the
  project’s own code, configuration or live site.
- Demos are labelled as demos (the wedding invitation preview and the birthday tone picker).
- Keep personal data of celebration clients out of screenshots and recordings.
