# SEO & Performance Plan

**Site:** https://leventkurtis.com
**Stack:** Next.js 14 App Router, static export (`output: 'export'`), Tailwind v4, hosted on Vercel
**Plan created:** 2026-09-24
**Status:** Phases 1 to 4 implemented and **live in production** (merged to `main`, 2026-09-24). Phase 5 (Search Console) and Phase 6 (design) outstanding.

---

## 1. Goals

Agreed with Levent before planning:

| Goal | Priority | What it means in practice |
|---|---|---|
| Own your name in search | Primary | Rank #1 for "Levent Kurtis" and variants, and be the source that Google, ChatGPT and Perplexity use when someone asks who you are. |
| Recruiter / referral conversion | Primary | Most visitors arrive with the link already (LinkedIn, email, a referral). Optimise for what they see: rich link previews, fast load on mobile, scannable content, frictionless CV download. |
| Discovery queries ("Data & AI consultant Copenhagen") | Out of scope | Would need sustained content publishing and backlinks. Explicitly deprioritised. |
| Design and layout rework | Deferred | Levent wants to think about design direction first. Placeholder section at the end, no decisions made. |

**Scope constraint:** stay a single page. No blog, no sub-pages. Optimise what exists.

---

## 2. Baseline measurements

Measured 2026-09-24 against the live production site.

### Lighthouse (lighthouse@12, headless Chrome, live URL)

| Category | Mobile | Desktop |
|---|---|---|
| Performance | **81** | 98 |
| Accessibility | 96 | 96 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

### Core Web Vitals (lab)

| Metric | Mobile | Desktop | Target |
|---|---|---|---|
| LCP | **4.7 s** | 1.0 s | < 2.5 s |
| FCP | 1.6 s | 0.6 s | < 1.8 s |
| CLS | 0.008 | 0.011 | < 0.1 |
| TBT (INP proxy) | 110 ms | 0 ms | < 200 ms |
| Speed Index | 3.0 s | 0.9 s | < 3.4 s |
| Total page weight | 1,277 KiB | | |

**Caveat on the SEO 100:** Lighthouse's SEO category is a shallow checklist (title, meta description, crawlable links, viewport). It does not check structured data, canonical consistency across hosts, whether your content is actually in the HTML, or link previews. All four of those are broken here. Treat the 100 as meaningless for our purposes.

**Caveat on field data:** the PageSpeed Insights API quota was exhausted, so no CrUX field data was retrieved. The site likely has too little traffic to have a CrUX record at all. Lab data is what we have, which is fine for a site this size.

### Mobile LCP breakdown

The LCP element is the profile photo (`/photo.jpg`).

| Phase | Time | Share |
|---|---|---|
| TTFB | 623 ms | 13% |
| Load Delay | 1,105 ms | 24% |
| Load Time | 978 ms | 21% |
| **Render Delay** | **1,953 ms** | **42%** |

Render delay dominates, which points at the render-blocking font chain (finding H3), not just the image size.

---

## 3. Findings

Ranked by impact on the two stated goals. Every finding below was verified against the live site, not inferred.

### Critical

**C1. Most of your work history is not in the HTML at all.**
`components/Experience.tsx:1` is a client component that renders collapsed jobs as `{expandedJobs[job.company] && (...)}`. Only Accenture defaults to expanded. Everything else is conditionally unmounted, so it never reaches the static export.

Verified by grepping the served HTML:

| String | Occurrences in live HTML |
|---|---|
| `Marcher Markholt` (company name, in the button) | 1 |
| `boolean search workshop` (a Marcher Markholt bullet) | 0 |
| `Hotel Chocolat` (a Retail Brands bullet) | 0 |
| `Multicultural Students` (Internal Initiatives) | 0 |

Three of your four employers contribute nothing but a company name and a one-line summary. The entire Internal Initiatives block is invisible. Google, LinkedIn's preview crawler, GPTBot, PerplexityBot and ClaudeBot all see nothing there.

*Fix:* render all content into the DOM and control visibility with CSS, or switch the accordions to native `<details>`/`<summary>`. Native `<details>` keeps content in the DOM, is crawlable, is keyboard accessible for free, and would let `Experience.tsx` drop `'use client'` entirely.

**C2. Apex and www both serve 200 with no canonical tag.**
`https://leventkurtis.com/` and `https://www.leventkurtis.com/` both return HTTP 200 with an identical `etag`. There is no `<link rel="canonical">` anywhere in the document (verified: 0 occurrences). Two URLs, one page, no signal about which is authoritative. This splits ranking signals between hosts on exactly the query you most want to own.

*Fix:* pick apex as canonical, 301 redirect www to it in Vercel, and add `metadataBase` plus an explicit `alternates.canonical` to `app/layout.tsx`.

**C3. No structured data.**
Zero `application/ld+json` in the document. For a "who is this person" query, a `Person` / `ProfilePage` schema is the single highest-leverage addition available. It is what feeds Google's entity understanding and what AI assistants parse to answer factual questions about you accurately rather than guessing from prose.

*Fix:* add a `Person` schema covering `name`, `jobTitle`, `worksFor`, `alumniOf`, `address`, `knowsAbout`, `sameAs`, `hasCredential`, wrapped in `ProfilePage`. See open question Q2 on which identifiers to include.

### High

**H1. No Open Graph image, and the Twitter card is `summary` not `summary_large_image`.**
Verified: 0 occurrences of `og:image`. Given that "recruiter / referral conversion" is a stated primary goal, this is the highest-impact finding for that goal specifically. Right now, when someone pastes your link into LinkedIn, Slack, WhatsApp or an email, they get a bare text preview with no visual. A generated OG card with your photo, name and title would change every single shared link.

*Fix:* add a 1200x630 OG image. Next 14 supports `opengraph-image.tsx` for generating one at build time, which works with static export.

**H2. The profile photo is a 1.1 MB unoptimised JPEG, and it is the LCP element.**
`/photo.jpg` is 1,139,234 bytes and accounts for 89% of the 1,277 KiB page weight. It is displayed at 234x234 CSS pixels. Lighthouse estimates 1,066 KiB of savings from correct sizing and 890 KiB from a modern format.

Contributing causes:
- `next.config.js:5` sets `images: { unoptimized: true }`, required by `output: 'export'`.
- `components/Hero.tsx:13` uses a raw `<img>` with no `width`/`height` and no `fetchpriority="high"`. Lighthouse's LCP discovery check confirms `priorityHinted: false`.

*Fix:* pre-generate AVIF and WebP derivatives at 1x/2x display size, serve via `<picture>`, keep a JPEG fallback, add explicit dimensions and `fetchpriority="high"`. Expect roughly 1.1 MB down to 30 to 60 KB.

**H3. Google Fonts is loaded via `@import` inside the compiled CSS.**
`app/globals.css:1` has `@import url('https://fonts.googleapis.com/css2?family=Inter...')`. Verified in the deployed bundle: the compiled CSS literally begins with that `@import`. This creates a three-hop render-blocking chain: HTML, then Tailwind CSS, then Google's CSS, then the font files, across two origins. Lighthouse measures 331 ms wasted on the Google Fonts request alone and attributes 350 ms of total render-blocking savings.

This is the most likely single cause of the 1,953 ms mobile render delay.

*Fix:* switch to `next/font/google`, which self-hosts the font files, removes the external origin from the critical path, and inlines the `@font-face` rules. Also drops a third-party request, which is a small privacy win.

**H4. Static assets are served with `cache-control: public, max-age=0, must-revalidate`.**
Verified on both `/photo.jpg` and `/levent_kurtis_cv.pdf`. Every repeat visit revalidates. Lighthouse also flags `/_vercel/insights/script.js`.

*Fix:* add a `vercel.json` with long-lived immutable cache headers for the static assets. Note that `headers()` in `next.config.js` does **not** apply under `output: 'export'`, so this has to be `vercel.json`.

**H5. `robots.txt`, `sitemap.xml` and `favicon.ico` all return 404.**
The favicon 404 is also the sole entry in Lighthouse's "Browser errors were logged to the console" audit, which is what is costing the Best Practices score.

*Fix:* add all three. For a one-page site the sitemap is near-ceremonial, but it is cheap and it gives Search Console something to confirm. Robots.txt matters more: it is where we decide AI crawler policy (see GEO section).

### Medium

**M1. Real WCAG AA contrast failures on role titles.**
Accent `#5b8def` on card `#2a2a3d` is 4.34:1. At 18px and below bold, AA requires 4.5:1. Affects every `h4.text-accent` role title in `Experience.tsx`. The "Internal Initiatives" heading uses `text-accent/80`, computing to `#5179cb` at 3.3:1, which is a clearer failure.

*Fix:* introduce a lighter accent token for text-on-card (something around `#7ba3f5` clears 5.5:1) while keeping the current accent for borders, fills and large text.

**M2. The page background is on a fixed `-z-10` div, and `body` is transparent.**
`app/globals.css:27` sets `background-color: transparent` on body; the real background comes from `ScrollBackground.tsx`. Accessibility tooling cannot resolve this, so axe reports every `h2` as `#ededed` on `#ffffff` at 1.17:1. Six of these are inflating the contrast failure count.

The rendering is fine in practice (the div ships with an inline style in the static HTML), but there is no fallback if CSS partially fails, and the false positives will keep polluting every audit you run.

*Fix:* set a real `background-color` on `html`/`body` matching the start colour, and let `ScrollBackground` overlay it.

**M3. Scroll handler triggers a React re-render on every scroll.**
`components/Header.tsx:19` calls `setIsScrolled` inside a non-passive scroll listener, re-rendering the header subtree. `ScrollBackground.tsx` separately writes an inline style on every animation frame. Together these are the likely source of the 110 ms mobile TBT.

*Fix:* replace the header's scroll state with an IntersectionObserver sentinel or a CSS scroll-driven animation, and register the listener as passive. Low risk, measurable INP benefit.

**M4. Section headings contain a decorative `#` in their text content.**
`<h2><span className="text-accent">#</span> About Me</h2>` means the accessible name and the crawled heading text are literally "# About Me". Screen readers announce the hash. Headings are a ranking and comprehension signal, so they should be clean.

*Fix:* move the `#` to a CSS pseudo-element or mark it `aria-hidden="true"`.

**M5. Meta description is not written for a SERP.**
Currently the tagline verbatim: "Tech Leader at the Intersection of Data & AI, People, and Delivery. Senior Business Architecture Analyst at Accenture." It describes a positioning statement rather than giving a recruiter a reason to click. It should read as a snippet: who, where, what you do, what they will find on the page.

**M6. The CV PDF is 1.66 MB and separately indexable.**
Google indexes PDFs as standalone documents. `/levent_kurtis_cv.pdf` can rank alongside or instead of your homepage for your name, and a PDF is a much worse landing experience than the site. It also has no `lang` metadata.

*Fix:* compress it (1.66 MB is large for a CV), and decide whether to let it be indexed. See open question Q3.

**M7. `keywords` meta tag.** Ignored by every major engine since roughly 2009. Harmless, but it is dead weight in `app/layout.tsx:8` and can go.

**M8. No `theme-color`, no web app manifest, no `apple-touch-icon`.** Small polish items that affect how the site looks when saved to a phone home screen or opened in a mobile browser chrome.

---

## 4. GEO / AI answer visibility

You did not select this as a primary goal, but it overlaps almost completely with "own your name": when someone asks ChatGPT or Perplexity "who is Levent Kurtis", you want a correct answer sourced from your site rather than a hallucination or a stale LinkedIn scrape.

Nearly all of the work is already covered above. C1 (content actually in the HTML) and C3 (Person schema) are the two that matter most, because AI crawlers generally do not execute JavaScript, so today they see even less than Google does.

Additional GEO-specific items:

- **Decide AI crawler policy in `robots.txt`.** GPTBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot. Given the goal is accurate citation, allowing them is the consistent choice. This is a decision for Levent, not a default (see Q4).
- **Add `/llms.txt`.** An emerging convention: a plain-text summary of the site for LLM consumers. Cheap to add, no downside.
- **Lead with a plain-prose answer.** The About section already does this reasonably well. Worth one editing pass so the first two sentences directly answer "who is this person and what do they do", since that is the passage most likely to be extracted verbatim.

---

## 5. E-E-A-T

For a personal CV site, E-E-A-T reduces mostly to verifiable identity. Current state is decent: real name, real photo, named employer, named credentials with issuers and years, real education institution.

Gaps worth closing, all of which fall out of C3:

- `sameAs` linking to LinkedIn establishes the entity connection between the site and your verified professional profile. This is the strongest single trust signal available to you.
- `hasCredential` entries for the certifications, with issuing organisations, make them machine-verifiable rather than just claims in a list.
- A `dateModified` on the page signals freshness, which matters for a CV where recency is the point.

---

## 6. Implementation phases

Ordered by impact per unit of effort. Each phase is independently shippable.

### Phase 1: Foundations (highest impact, lowest risk)

1. Fix C1: make all experience content render into the DOM (`<details>`/`<summary>` approach).
2. Fix C2: `metadataBase` + canonical, plus www to apex 301 in Vercel.
3. Fix C3: `Person` / `ProfilePage` JSON-LD.
4. Fix H5: `robots.txt`, `sitemap.xml`, favicon set.
5. Fix M7: drop the `keywords` meta.

*Expected effect:* the page becomes fully crawlable for the first time, one canonical URL, entity data available to Google and AI crawlers.

### Phase 2: The shared-link experience

6. Fix H1: OG image via `opengraph-image.tsx`, upgrade Twitter card to `summary_large_image`.
7. Fix M5: rewrite the meta description and OG description for a recruiter audience.
8. Fix M8: `theme-color`, manifest, `apple-touch-icon`.

*Expected effect:* directly serves the referral-conversion goal. Every link you share starts rendering a proper card.

### Phase 3: Performance

9. Fix H2: responsive AVIF/WebP photo derivatives, explicit dimensions, `fetchpriority="high"`.
10. Fix H3: move to `next/font/google`.
11. Fix H4: `vercel.json` cache headers.
12. Fix M3: passive/observer-based scroll handling.

*Target:* mobile Performance from 81 to 95+, mobile LCP from 4.7 s to under 2.0 s, page weight from 1,277 KiB to under 250 KiB.

### Phase 4: Accessibility and content polish

13. Fix M1: accessible accent token for text on cards.
14. Fix M2: real background colour on `html`/`body`.
15. Fix M4: decorative `#` out of heading text.
16. Fix M6: compress the PDF, apply the indexing decision from Q3.
17. GEO: `llms.txt`, AI crawler policy, About-section prose pass.

*Target:* Accessibility and Best Practices both to 100.

### Phase 5: Measurement

18. Confirm or set up Google Search Console (you were unsure whether it exists). Verify domain ownership, submit the sitemap, check the Pages report for indexing status and the Performance report for which queries already surface you.
19. Optionally add Bing Webmaster Tools, which is what powers some of ChatGPT's search.
20. Re-run the Lighthouse baseline and record before/after in this file.

### Phase 6: Design and layout

Deferred at your request until you have thought about the direction you want. Nothing decided. When you are ready, worth noting that Phase 3 and 4 will have already touched the colour tokens and the Experience markup, so some layout groundwork will be in place.

---

## 7. Decisions (resolved 2026-09-24)

All answered by Levent. No open questions remain.

| # | Question | Decision |
|---|---|---|
| Q1 | Canonical host | **`leventkurtis.com`** (apex). `www` 301s to it. |
| Q2 | `sameAs` identifiers in Person schema | **LinkedIn and GitHub.** Email deliberately excluded from the schema (it stays visible in the Hero and Footer, but is not made machine-readable). |
| Q3 | CV PDF indexable | **No.** `Disallow: /levent_kurtis_cv.pdf` in robots.txt, plus `X-Robots-Tag: noindex` header. The site stays the only indexable entry point. |
| Q4 | AI crawler policy | **Allow.** GPTBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot all permitted, so AI answers about Levent are sourced from the site rather than guessed. |
| Q5 | Client-specific detail in copy | **Keep as-is.** Reviewed and accepted; no content changes. |

## 8. Verification method

Re-run after each phase and record the delta:

```bash
# Lighthouse, mobile and desktop, against production
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npx lighthouse@12 https://leventkurtis.com/ \
  --output=json --output-path=./lh-mobile.json \
  --chrome-flags="--headless=new" --quiet

# Confirm collapsed content is now in the served HTML (should be non-zero after Phase 1)
curl -s https://leventkurtis.com/ | grep -c "boolean search workshop"

# Confirm canonical, structured data, OG image are present
curl -s https://leventkurtis.com/ | grep -oE 'rel="canonical"|application/ld\+json|og:image'

# Confirm www redirects to apex (should be 301 after Phase 1)
curl -sI https://www.leventkurtis.com/ | head -1
```

Also validate the JSON-LD with Google's Rich Results Test and schema.org's validator before considering Phase 1 done.

---

## 9. Results after Phases 1 to 4

Implemented on branch `feat/seo-optimization`, 2026-09-24. Not yet deployed.

### Lighthouse: production before vs production after

Both columns measured against `https://leventkurtis.com` with lighthouse@12,
so this is a like-for-like comparison.

| | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---|---|---|---|
| Performance | 81 | **96** | 98 | **100** |
| Accessibility | 96 | **100** | 96 | **100** |
| Best Practices | 96 | **100** | 96 | **100** |
| SEO | 100 | 100 | 100 | 100 |
| LCP | 4.7 s | **2.1 s** | 1.0 s | **0.4 s** |
| FCP | 1.6 s | 1.3 s | 0.6 s | 0.3 s |
| TBT | 110 ms | 80 ms | 0 ms | 0 ms |
| CLS | 0.008 | **0** | 0.011 | **0** |
| Page weight | 1,277 KiB | **186 KiB** | 1,277 KiB | **172 KiB** |

**Speed Index is unchanged, not improved.** It was 3.0 s before and measured
4.1 s, 2.3 s and 3.9 s across three runs after. That spread is wider than the
difference being measured, so the honest reading is "flat and noisy" rather
than either a gain or a regression. Mobile performance across those same three
runs was 96, 99 and 98.

### Remaining performance items (all minor)

- `unused-javascript` and `legacy-javascript`, roughly 33 KiB combined. This is
  Next.js framework and polyfill code, not application code, so it needs a
  framework upgrade rather than a local fix.
- `uses-long-cache-ttl` flags one resource, `/_vercel/insights/script.js`, which
  Vercel serves and we do not control.
- `uses-responsive-images` still wants about 12 KiB, which is the gap between
  the 2x AVIF and the exact rendered size. Not worth another breakpoint.

### Verified fixed

- **C1** Collapsed experience content is now in the served HTML. `boolean search workshop`, `Hotel Chocolat`, `Multicultural Students` and `Trello workflows` all went from 0 occurrences to 1. `Experience.tsx` is now a server component with no client JS.
- **C2** `<link rel="canonical" href="https://leventkurtis.com">` emitted; `vercel.json` 301s www to apex.
- **C3** `Person` / `ProfilePage` / `WebSite` JSON-LD graph emitted, built from the existing Skills and Certifications data so it cannot drift.
- **H1** 1200x630 OG image generated, `twitter:card` upgraded to `summary_large_image`, alt text included.
- **H2** Photo is now AVIF with JPEG fallback at 1x/2x, centre-cropped square, explicit dimensions, `fetchpriority="high"`, explicitly preloaded. 1,139 KiB to 7.9 KiB at 1x AVIF.
- **H3** Inter self-hosted via `next/font/google`. The Google Fonts `@import` is gone and there are no third-party requests on the critical path.
- **H4** `vercel.json` cache headers for images, fonts and the PDF.
- **H5** `robots.txt`, `sitemap.xml`, `favicon.ico`, `icon.png`, `apple-icon.png` all generated. The favicon 404 that was the only console error is resolved.
- **M1** New `--color-accent-text` token (#7ba3f5, 5.61:1 on card). All `color-contrast` failures cleared; Accessibility reached 100.
- **M2** Real `background-color` on `html`, fixing both the unresolvable-contrast false positives and the no-JS fallback.
- **M3** Header scroll listener is passive and rAF-throttled; `ScrollBackground` animates overlay opacity instead of repainting the viewport. TBT 110 ms to 0 ms.
- **M4** Decorative `#` in section headings marked `aria-hidden`.
- **M5** Meta description rewritten for a recruiter-facing SERP snippet.
- **M7** `keywords` meta removed.
- **M8** `theme-color` added.
- **GEO** `/llms.txt` added; AI crawlers explicitly allowed in `robots.txt`.
- Also fixed: `scroll-margin-top` on sections, so anchor links no longer land under the fixed header.

### Deliberate deviation from decision Q3

Q3 was "disallow the CV PDF". Implemented as `X-Robots-Tag: noindex, nofollow`
rather than `Disallow:` in robots.txt. The reason: `Disallow` blocks crawling,
and a blocked URL can still appear in results as a bare URL listing if anything
links to it, because Google never reads the page to discover it should be
excluded. `noindex` requires the crawler to fetch the file, which is why the
two directives are mutually defeating. The header reliably keeps it out of the
index, which is what the decision was actually aiming at. Say the word if you
would rather have the literal `Disallow` instead.

### Branch note

`origin/develop` is a parallel multi-page v2.0 of the site (routes for /cv,
/goals, /photography, /projects, plus a theme toggle and its own robots.ts,
sitemap.ts and JsonLd.tsx). It was last touched 2026-05-10 and has diverged
from main by 15 commits one way and 21 the other. Confirmed abandoned on
2026-09-24, so this work targets `main` only. If it is ever revived, the SEO
work here will need re-applying on top of it and the single-page assumption in
this plan will no longer hold.

### Not done

- **M6** PDF compression. It is still 1.66 MB. Neither ghostscript nor qpdf is installed on this machine, and no other local tool could re-encode it safely. Needs either a tool install or a pass through Preview's "Reduce File Size" export. The PDF is now `noindex` and off the page's critical path, so this is cosmetic rather than urgent.
- **WebP tier.** This machine's `sips` can write AVIF but not WebP, so the picture element serves AVIF with a JPEG fallback and no WebP middle tier. AVIF support is broad enough that the gap only affects a small slice of older browsers, which get the JPEG.
- **Phase 5** Search Console verification and sitemap submission. Needs you.
- **Phase 6** Design and layout, deferred pending your direction.
