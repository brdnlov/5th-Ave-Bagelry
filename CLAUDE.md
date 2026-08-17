@AGENTS.md

# Project Plan: 5th Ave Bagelry Redesign

## Context

The current site (`index.html`, `style.css`, `app.js` — now removed) was Brandon's first-ever web project, built for a local business, hosted on AWS, and taken down due to cost. He's rebuilding it from scratch to redeploy on Vercel, and is treating this as a learning project — building section by section with guidance, rather than having the whole site generated at once.

**Collaboration style:** Brandon wants to type/run commands and write code himself, with Claude explaining concepts and giving exact steps rather than executing the implementation directly. Claude should still do read-only investigation freely (Read/Grep/Glob, checking bundled docs, verifying state) and can run verification commands, but should default to teaching mode for this project unless told otherwise.

Decisions made:
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Design direction:** Light & airy bakery feel — warm cream backgrounds with charcoal and a burnt-red accent (nav, headings, buttons, hovers), not as dominant backgrounds. (Accent color deliberately shifted from the logo's literal sampled orange to a bolder burnt red — see Color Palette below.)
- **Signature interactive element:** "Bite" hover interaction — buttons and cards get a small bite-shaped notch cut into a corner on hover, a literal nod to the bitten bagel in the logo. Reused across CTA buttons, order cards, and menu cards rather than scattering generic effects.
- **Scope:** Rebuild the same core sections (Navbar, Hero, Order/Delivery, Menu, Location, Footer) with new code/structure — no new content sections for v1.
- **Repo:** Rebuilt in place in this same repo, replacing the old static files. Git history (up to commit `56e7a28`) keeps the old version accessible.
- **Industry-standard practices built in from the start:** `generateMetadata` for SEO instead of hardcoded `<title>` tags, `next/image` for every photo instead of plain `<img>`, `loading.tsx`/`error.tsx` boundaries on routes that fetch data.

## Framework version note

This project was scaffolded with Next.js 16.3.1 / React 19.2.8 / **Tailwind v4**. Tailwind v4 configures itself in CSS via an `@theme` block in `app/globals.css` — there is no `tailwind.config.ts` file, unlike older Tailwind versions. Always check `node_modules/next/dist/docs/` (bundled, version-matched docs) before assuming an API from training data, per `AGENTS.md` above.

## Color Palette (from the logo)

Dark charcoal circular badge, burnt-orange bagel illustration, cream lettering, warm golden-tan highlight on the bagel. The primary accent was intentionally moved off the literal logo-sampled orange to a brighter, more red-shifted "burnt red" (CSS var `--color-brand-red` in `app/globals.css`) — everything else below is still sampled from the logo.

| Role | Color | Hex |
|---|---|---|
| Primary accent (brand) | Burnt Red | `#C1442D` (custom, not logo-sampled) |
| Secondary accent | Golden Tan | `#D99B5A` (sampled) |
| Background (light) | Warm Cream | `#F3E8D7` (sampled) |
| Ink / text / dark sections | Charcoal | `#211C19` (sampled) |
| Body text on cream | Deep Brown | `#3A2B22` (sampled) |

## How We'll Build It (section by section)

Each step is a short working session: explain the concept, write it together, see it running locally before moving on.

1. **Environment setup** — Next.js scaffold (TypeScript, Tailwind v4, App Router, no `src/` dir). `npm run dev` running locally, understand `app/layout.tsx` vs `app/page.tsx`, deploy a placeholder to Vercel early.
2. **Design system** — drop the logo into `public/`, extract accurate hex values, wire the palette + fonts (Kumbh Sans / Lobster, matching the original) into the `@theme` block in `app/globals.css`. Build the reusable "bite" hover notch (clip-path/mask utility) here since Navbar, Order, and Menu sections all reuse it.
3. **Layout & Navbar** — shared layout + responsive Navbar. Contrast old vs new: the old `app.js` toggled a `.active` class by hand; React uses `useState` for the mobile menu. Nav CTA gets the bite-hover treatment first.
4. **Hero section** — rebuild the slideshow as a small React component (`useState`/`useEffect`) instead of the old pure-CSS radio-button hack.
5. **Order/Delivery section** — UberEats + DoorDash cards, same links as before, styled with the new palette.
6. **Menu section** — links out to the menu PDF (same as current), redesigned card layout.
7. **Location section** — address + embedded Google Map, redesigned to match.
8. **Footer** — contact info, social links.
9. **Responsive + accessibility pass** — all breakpoints, color contrast (orange/tan accents on cream need checking), alt text on images.
10. **Deploy** — connect the repo to Vercel for real, confirm production build, custom domain if applicable.

## Files/assets to carry over
- `images/` — reuse existing food/store photos (`food1.jpg`, `store_front.jpg`, `store_inside.jpg`, etc.) rather than sourcing new photography, unless swapped intentionally when we reach that section.
- Content facts to preserve: address (247 Pine Ave, Long Beach, CA 90802), phone `(562) 499-6889`, UberEats/DoorDash links, Yelp/Instagram links, menu PDF link.

## Verification
- After step 1: `npm run dev` serves the scaffold locally, placeholder live on a Vercel preview URL.
- After each subsequent section: visually check the section in the browser at desktop + mobile widths before moving on.
- Before final deploy: run `npm run build` locally to catch build errors, then confirm the Vercel production deployment matches.

## Session summaries

Detailed per-session handoff notes (exact bugs found/fixed, current blockers, file-by-file state) live in `session-summaries/` (also gitignored, local-only). Check the most recent dated file there for the full blow-by-blow before resuming work — this section only tracks high-level progress.

## Current Progress

- [x] Step 1: Environment setup — Next.js 16 (TypeScript, Tailwind v4, App Router) scaffolded in place at repo root.
- [x] Step 2: Design system — palette/fonts wired in. Bite-hover utility now working (CSS mask technique, corner notch) — see latest file in `session-summaries/` for the debugging story and current tuning values.
- [x] Step 3: Layout & Navbar — built, nav href bug fixed (`#delivery` → `#order`).
- [x] Step 4: Hero section — built (crossfade slideshow + swipe support + headline/CTA overlay).
- [x] Step 5: Order/Delivery section — built; `pc-4` typo fixed, bite-hover working.
- [ ] Step 6: Menu section
- [ ] Step 7: Location section
- [ ] Step 8: Footer
- [ ] Step 9: Responsive + accessibility pass
- [ ] Step 10: Deploy

Keep this checklist updated as steps complete, so any new session can pick up exactly where the last one left off.
