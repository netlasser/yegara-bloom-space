# Yegara Space Website — Full Status Report

> Generated: 2026-10-08 · Branch `main` · Vite dev server on `http://127.0.0.1:3000`

---

## 1. Executive Summary

The Yegara Space marketing site is **feature-complete and shipping-ready** for the two core
experiences:

1. **The homepage** — one anchor-navigated brand narrative (hero → about → spaces →
   community → amenities → visit), fully responsive, with scroll motion and the approved
   visual identity. **Unchanged in this work session** except a one-line SEO title fix.
2. **The Spaces experience** — a new editorial `/spaces` page listing all eight offerings with
   six distinct section layouts, plus **eight individual detail routes**, a shared inquiry
   flow (single modal provider), related-space cards, per-page SEO, and strict use of only
   the real uploaded Yegara photography.

All checks pass: `tsc` exit 0, `vite build` exit 0, all 10 real routes return 200 with one
`<main>`, one `<h1>`, unique titles, and every `<img>` carrying `alt`.

**One known gap:** the inquiry form has **no backend connected**. Nothing is transmitted
today; the UI is honest about that and the integration seam is marked clearly.

---

## 2. Technology Stack

| Layer | Choice | Version |
|---|---|---|
| Framework / SSR | TanStack Start (React) | `@tanstack/react-start` 1.168.60 |
| Router | TanStack Router | `@tanstack/react-router` 1.170.41 |
| React | React | 19.2.0 |
| Styling | Tailwind CSS v4 + `@theme` tokens | 4.2.1 |
| Build | Vite | 8.1.5 |
| Server | Nitro (Node output) | 3.0.260603-beta |
| Language | TypeScript | 5.8.3 |
| Lint / Format | ESLint 9 + Prettier | 9.32.0 / 3.7.3 |
| Icon library | lucide-react | 0.575.0 |
| UI primitives | Radix UI + shadcn-style wrappers | 46 components in `src/components/ui/` |

Key commands (`package.json`):

```json
"dev":       "vite dev --host 0.0.0.0 --port 3000"
"build":     "vite build"
"preview":   "vite preview"
"lint":      "eslint ."
"typecheck": "tsc --noEmit"
```

Also present (unused for runtime): `react-hook-form`, `zod`, `recharts`, `vaul`, `sonner` —
part of the scaffold's dependency set, not exercised by current pages.

---

## 3. Route Inventory

**11 file routes** defined by TanStack file routing (`src/routeTree.gen.ts` is generated).

| Route | File | Status | `<title>` |
|---|---|---|---|
| `/` | `src/routes/index.tsx` | ✅ 200 | Yegara Space — Premium Coworking in Addis Ababa |
| `/spaces` | `src/routes/spaces/index.tsx` | ✅ 200 | Spaces at Yegara Space — Find your workspace |
| `/spaces/private-offices` | `src/routes/spaces/private-offices.tsx` | ✅ 200 | Private Offices in Addis Ababa \| Yegara Space |
| `/spaces/dedicated-desks` | `src/routes/spaces/dedicated-desks.tsx` | ✅ 200 | Dedicated Desks in Addis Ababa \| Yegara Space |
| `/spaces/cubicles` | `src/routes/spaces/cubicles.tsx` | ✅ 200 | Cubicles in Addis Ababa \| Yegara Space |
| `/spaces/hot-desks` | `src/routes/spaces/hot-desks.tsx` | ✅ 200 | Hot Desks in Addis Ababa \| Yegara Space |
| `/spaces/phone-booths` | `src/routes/spaces/phone-booths.tsx` | ✅ 200 | Phone Booths in Addis Ababa \| Yegara Space |
| `/spaces/meeting-rooms` | `src/routes/spaces/meeting-rooms.tsx` | ✅ 200 | Meeting Rooms in Addis Ababa \| Yegara Space |
| `/spaces/boardroom` | `src/routes/spaces/boardroom.tsx` | ✅ 200 | Boardroom in Addis Ababa \| Yegara Space |
| `/spaces/cafe` | `src/routes/spaces/cafe.tsx` | ✅ 200 | In-house Café in Addis Ababa \| Yegara Space |
| *404* | root `notFoundComponent` | ✅ 404 with chrome | (root fallback) |

Every route verified by live SSR: **one** `<main>`, **one** `<h1>`, unique meta
`description`, `og:title`, `og:description`, `twitter:card`/`title`/`description`,
`og:image` on all space pages, and **zero** `<img>` without `alt`.

Homepage anchor IDs preserved for nav: `#about`, `#spaces`, `#community`, `#amenities`,
`#visit`, `#top`.

---

## 4. The Homepage (`/`)

One `<main id="top">` with a continuous brand narrative. **Visually unchanged this session.**

| Order | Section | Anchor | Treatment |
|---|---|---|---|
| 1 | Hero | — | `Hero.tsx`: full-viewport video (`yegara-hero.mp4`), ink overlay, "ONE SPACE. MANY POSSIBILITIES.", eyebrow row, dual CTA (Book a visit → `#visit`, Explore spaces → `#spaces`) |
| 2 | About | `#about` | orange band, "Yegara means ours", arch motif + sun mark |
| 3 | Spaces / Find your space | `#spaces` | image-led cards (Private Offices, Dedicated Desks, Hot Desks, Meeting Rooms) — **intentionally non-linking** |
| 4 | Work. Connect. Create. | — | community/photo-led asymmetric composition |
| 5 | Community | `#community` | ink band (`bg-ink`) |
| 6 | Amenities | `#amenities` | no invented numerical claims (Wifi, Coffee, Sparkles, Users icons) |
| 7 | Marquee | — | orange band, scrolling "Ideas need room to grow ·" |
| 8 | Visit | `#visit` | ink band, "YOUR NEXT WORKDAY STARTS HERE.", Bloom Tower / Kazanchis, Instagram |

---

## 5. The Spaces Experience (`/spaces` + 8 detail pages)

### 5.1 Navigation
`SiteHeader` (fixed, glass ink) uses a **route-aware nav**:
- **Spaces** → real route `/spaces` (highlighted while active)
- **Amenities**, **Community**, **About** → homepage anchors via `SectionLink`, which behaves
  natively on `/` and routes home + scrolls from any other page
- **Book a visit** (desktop + mobile) → opens the shared inquiry modal
- Mobile: hamburger → `#mobile-navigation` with same items + full-width CTA

### 5.2 `/spaces` page — editorial composition
Six layout variants in `src/components/space/features.tsx`, all sharing the homepage
vocabulary (oversized display numerals, hairline rules, uppercase headings, `.reveal`, and
the same `scale-[1.05]` / `1000ms` photo hover):

| # | Offering | Variant | Crop |
|---|---|---|---|
| 01 | Private Offices | `FeatureSplit` + inset (second real photo) | 5:4 |
| 02 | Dedicated Desks | `FeatureSplit` reversed | 4:5, capped 420px |
| 03 | Cubicles | `FeatureFull` | 21:9 band |
| 04 | Hot Desks | `FeatureGraphic` — **orange typographic band, arch motif, no photo** | — |
| 05 | Phone Booths | `FeatureCompact` | 1:1 square |
| 06 | Meeting Rooms | `FeatureFull` | 3:2 |
| 07 | Boardroom | `FeatureFormal` (ink background) | 21:9 |
| 08 | In-house Café | `FeatureLifestyle` (two real photos) | 3:4 pair |

Hero: full-bleed video with `min-h-[86svh] md:min-h-[92svh]` (content-safe, verified no
clipping at 390→1920px), hairline eyebrow row, `display-title-compact`, paragraph + CTA
side-by-side on desktop.

### 5.3 Detail pages — one shared template
`SpaceDetailPage` (`src/components/space/SpaceDetailPage.tsx`) — every route file is ~12 lines
(data + `spaceHead`). Anatomy per page: back link → eyebrow + name + descriptor →
**"Talk to us about availability."** → dual CTA → hero image → gallery **only where a second
real photo exists** (Private Offices: office-one; Café: cafe-bar) → 3 related-space cards
("Explore more spaces").

### 5.4 The inquiry flow
- `InquiryProvider` / `useInquiry` (`src/components/inquiry/InquiryProvider.tsx`) — mounted
  once in `__root.tsx`; **any** CTA anywhere opens one modal.
- `InquiryModal` (`src/components/InquiryModal.tsx`) — Radix Dialog, labeled fields (Name,
  Company, Email, Phone, Space select from live data, Preferred visit date ≥ today, Message),
  sending/error states, honest success state.
- `submitInquiry` (`src/lib/inquiry.ts`) — **the single integration seam**. Currently returns
  `{ delivered: false }`; the success screen therefore says "nothing has been sent, DM us on
  Instagram" rather than faking a confirmation. Flip `inquiryBackendConfigured = true` and
  implement the fetch when a backend exists.

### 5.5 Single source of truth
`src/data/spaces.ts` — the eight offerings with verbatim copy, `.asset.json`-resolved image
URLs, alt text, crop positions, related slugs, and meta descriptions. Slugs are typed as a
literal union feeding `spaceHref()` so links type-check against the real route tree.

---

## 6. Design System (`src/styles.css`)

Colors (oklch, centralized in `:root`):
`--ink` (deep navy), `--cream` (warm white), `--orange` + `--orange-soft` (accent),
`--stone`. Semantic mappings: `primary` = orange, `foreground` = ink, `background` = cream,
`secondary` = ink, `muted-foreground` = muted ink, `ring` = orange.

Typography (no webfont; system narrow-caps editorial style):
- `--font-heading: "Arial Narrow", "Helvetica Neue", sans-serif` (uses `font-stretch: condensed`)
- `--font-body: "Helvetica Neue", Helvetica, Arial, sans-serif`

Custom utilities (`@utility`):
- `section-shell` — `min(100% - 2rem, 86rem)` centered
- `display-title` — `clamp(2.9rem, 9vw, 8.5rem)`, uppercase, `lh 0.84`
- `display-title-compact` — `clamp(2rem, 6.6vw, 5.75rem)` (added for the 3-line `/spaces` hero)
- `eyebrow` — 0.68rem, 0.18em tracking, uppercase

Motion:
- `.reveal` — scroll-driven `yegara-reveal` via `animation-timeline: view()` (respects
  `prefers-reduced-motion`)
- `.sun-turn` — 30s linear rotation
- Photo hover — `scale-[1.05]` / `duration-1000 ease-out` in `SpacePhoto` (matches homepage)

---

## 7. Asset Inventory (`src/assets/`)

All nine real photos are ~**778×464** (1.667 landscape) and power the whole site. Each has a
matching `.asset.json` and a binary copied to `public/__l5e/assets-v1/<id>/` by
`scripts/copy-assets-to-public.cjs`.

| Asset | Dims | Size | Used as |
|---|---|---|---|
| `yegara-office-exec.jpg` | 778×464 | 229 KB | Private Offices hero / homepage card |
| `yegara-office-one.jpg` | 778×464 | 318 KB | Private Offices gallery inset |
| `yegara-desks.jpg` | 778×464 | 405 KB | Dedicated Desks / homepage card |
| `yegara-cubicles.jpg` | 772×463 | 401 KB | Cubicles |
| `yegara-phone-booths.jpg` | 772×463 | 308 KB | Phone Booths |
| `yegara-lounge.jpg` | 777×466 | 356 KB | Meeting Rooms / hero poster |
| `yegara-boardroom.jpg` | 778×464 | 324 KB | Boardroom |
| `yegara-cafe.jpg` | 778×464 | 360 KB | In-house Café hero |
| `yegara-cafe-bar.jpg` | 778×464 | 349 KB | Café gallery / lifestyle pairing |
| `yegara-arch-motif.png` | 707×376 | 116 KB | Hot Desks typographic section |
| `yegara-hero.mp4` | video | 3.5 MB | Home + Spaces hero video |

**Deleted this session** (no refs remaining): the AI-generated image
`Gemini_Generated_Image_gtk4zlgtk4zlgtk4.jpeg` and nine byte-identical
`Screenshot*.png` duplicates of the JPGs.

**Unreferenced leftovers** (safe to delete, kept because not in the approved deletion list):
`k.mp4`, `Screen recording 2026-10-01 3.08.13 PM.webm`, `yegaralogo.svg`,
«🪑 Private Offices —…pdf» (original product brief).

---

## 8. Source Structure (new this session)

```
src/data/spaces.ts                    # single source of truth (8 offerings)
src/lib/inquiry.ts                    # submitInquiry integration seam
src/lib/spaceHead.ts                  # per-space SEO head factory
src/components/inquiry/InquiryProvider.tsx
src/components/InquiryModal.tsx       # rewired to provider
src/components/space/
  SpacePhoto.tsx                      # shared photo treatment (matches homepage)
  SpaceParts.tsx                      # SpaceEyebrow / SpaceNumber / SpaceHeading / SpaceActions
  features.tsx                        # 6 editorial section variants
  SpaceCard.tsx                       # related-space card
  SpaceDetailPage.tsx                 # shared detail template
src/routes/spaces/*.tsx               # /spaces + 8 thin detail routes
```

Shared chrome extracted to `SunMark`, `SectionLink`, `SiteLogo`, `SiteHeader`, `SiteFooter`,
mounted once in `__root.tsx` around `<Outlet />`.

---

## 9. Verification Results (live, current)

| Check | Result |
|---|---|
| `npm run typecheck` (`tsc --noEmit`) | ✅ exit 0 |
| `npm run build` (`vite build`) | ✅ exit 0 (server + client, ~6s) |
| Route sweep (all 10 real routes + 404) | ✅ 200/200/404, one `<main>`, one `<h1>` per page |
| Unique `<title>` on every page | ✅ (bug fixed, see §10) |
| Meta description uniqueness | ✅ |
| `og:` / `twitter:` meta | ✅ on all space pages |
| Images without `alt` | ✅ 0 across all routes |
| New/edit lint (this session's files) | ✅ 0 errors (1 expected `react-refresh` warning) |
| Repo-wide lint | ⚠️ 225 problems — **all pre-existing** (see §12) |

---

## 10. Bugs Found & Fixed This Session

1. **Site-wide missing `<title>` (pre-existing, now fixed).** In
   `@tanstack/react-router@1.170.41` a top-level `head.title` is silently dropped
   (`match.meta = head?.meta`); `<title>` must be a `{ title }` **meta descriptor**. Every
   route's `head()` was already declaring `title`, so **no page had a title tag**. Fixed
   across `__root`, `/`, `/spaces`, and all 8 detail routes via `spaceHead`. Verified in SSR.
2. **`/spaces` hero clipping its own content.** Fixed `h-[60svh]` (clipped 160–300px on
   common laptop sizes) → `min-h-[86svh] md:min-h-[92svh]` + flex column align end. Budget
   verified programmatically at 390→1920px: no clip anywhere.
3. **`/spaces` hero headline overflowed on mobile.** `display-title`'s `9vw` ramp against a
   3-line headline overflowed the shell at 390px (worse with the non-Arial-Narrow font
   fallback). Added `display-title-compact` utility (`clamp(2rem, 6.6vw, 5.75rem)`), leaving
   the homepage's `display-title` untouched. Longest line fits at 390px even with the wide
   fallback.
4. **Orange-on-orange CTA.** The primary button would have been invisible on the Hot Desks
   orange band; `SpaceActions` now takes `tone="orange"` and inverts to the ink/cream
   `secondary` pairing.

---

## 11. Known Issues & Follow-ups

| Area | Issue |
|---|---|
| **Inquiry backend** | `submitInquiry` does not transmit. Needs a Server Function, email service (Resend/Postmark), or Supabase Edge Function, then flip `inquiryBackendConfigured`. |
| **`vite preview`** | Pre-existing: broken Nitro path (`dist/server/server.js` vs `.output/`). Use `npm run dev`. |
| **Homepage lint** | `src/routes/index.tsx` has 154 pre-existing prettier/`any` issues (touched only for the title fix, per instruction not to redesign the homepage). |
| **Hero video** | WebM fallback not bundled in `src/assets` (only `public/__l5e`, mp4-only source); non-mp4 browsers may rely on poster. |
| **Unused assets** | `k.mp4`, `Screen recording …webm`, `yegaralogo.svg` unreferenced. |
| **Visual QA** | No browser here — responsive + photographic art direction should be eyeballed at 390 / 768 / 1440 (esp. portrait crops and the 08 café pairing). |
| **`vite-tsconfig-paths`** | Deprecation notice in dev log (Vite 8 natively resolves tsconfig paths); removable, cosmetic. |

---

## 12. Git State

- Branch: `main` (no force pushes; AGENTS.md forbids rewriting published history).
- **6 modified, 33 untracked** files. Prominent modified: `package.json`, `vite.config.ts`,
  `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routeTree.gen.ts`.
- `src/assets/`, `scripts/`, `public/__l5e/`, `package-lock.json` are untracked.
- **Nothing has been committed this session.** Recommend a review + commit, e.g.
  `git add -A && git commit -m "feat(spaces): editorial offerings page, detail routes, shared inquiry flow"`.

### `git status --short` breakdown

```
M  package.json                     M  src/routeTree.gen.ts
M  src/routes/__root.tsx            M  src/routes/index.tsx
M  vite.config.ts
?? package-lock.json                ?? public/__l5e/          ?? scripts/
?? src/assets/* (all media)         ?? src/components/* (new) ?? src/data/ src/lib/
```

---

## 13. How to Run

```bash
npm install
npm run typecheck        # exit 0 expected
npm run lint             # pre-existing homepage issues only
npm run build            # exit 0 expected
npm run dev              # http://127.0.0.1:3000
```
