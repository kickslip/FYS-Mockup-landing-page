# Feel Your Soul — "Buy 3, Get 1 Free" Footsouls bundle page

Concept mockup for the Feel Your Soul Shopify Developer Assessment. Static HTML/CSS/JS,
no build step, hosted on GitHub Pages.

**Live:** https://kickslip.github.io/fys-bundle-page/

> Not the live Feel Your Soul store. Brand assets and photography belong to Feel Your Soul and are
> used here only to make the mockup read as a realistic in-brand page.

---

## The goal

Lift AOV from ~$35 to ~$60. At a $34.95 unit price, that means the page's only real job is to move
the default purchase from **1 pair to 2+ pairs**. Every decision below serves that.

The 3+1 tier lands at **$104.85** and the 2-pack at **$64.95** — either one clears the $60 target,
so the page is designed to make "1 pair" feel like the odd choice rather than the default.

## 1. Making the mechanic instantly clear

- **`1 · 2 · 3 + FREE` visual** sits directly under the H1, above the tier selector. The offer is
  understood before any price is read.
- **"No code needed"** stated twice (mechanic block, step 2). Codes are a drop-off point — the
  discount applies itself in cart.
- **Tier cards show three numbers each**: was-price, now-price, and **price per pair**. Per-pair
  price is the unit that makes 3+1 obviously better ($26.21 vs $34.95).
- **Free pair is a visible line item**, not a footnote: the 4th size slot renders in a dashed yellow
  row marked "Added at $0.00 — pick any size". The customer *sees* what they're getting.

## 2. Driving the 4th item instead of stopping at 1

This is the core of the page. The friction isn't price, it's the belief that one pair is enough.

- **"One pair of Footsouls per pair of shoes."** The product is trimmed to fit and lives in one
  shoe — it can't be swapped around. That single fact reframes the purchase from "an insole" to
  "coverage for the shoes I own", and it's carried by a section showing four real shoe types
  (Chucks / slip-ons / Old Skools / the free 4th).
- **Progress bar to the free pair.** Pick a lower tier and it reads *"You're 2 pairs away from a
  free pair (worth $34.95)"*. Loss aversion — the free pair is framed as something already on the
  table that you're leaving behind.
- **3+1 is pre-selected** and visually dominant (black border, drop shadow, "MOST POPULAR · 68%
  choose this"). Defaults do most of the work; social proof justifies the default.
- **Anchoring with a 4th tier.** The 6+2 pack exists mainly to make 3+1 read as moderate.
- **Free shipping at $40** sits just above the single-pair price, so 1 pair is the only tier that
  pays shipping — the micro-copy under the CTA changes to say so.
- **Gifting permission.** "Gift it, keep it as a spare" removes the *"I don't need four"* objection
  without needing four shoes.

## 3. Layout, urgency, social proof

- **Above the fold on desktop**: gallery, rating, offer, tier selector, size slots, total and CTA.
  No scrolling required to buy. The gallery is sticky so imagery stays while the buy box scrolls.
- **Urgency is honest and soft**: a midnight countdown in the announcement bar and a "bundles left
  at this price today" counter. No fake 3-minute timers — they burn trust with a repeat-purchase
  community brand.
- **Social proof at three depths**: aggregate (4.8 / 3,412), specific reviews written to handle
  objections (one review literally says *"I was going to buy one…"*), and the real
  `#feelyoursoulclub` UGC grid the brand already runs.
- **Comparison table** does the arithmetic for people who need it in writing.
- **30-day guarantee incl. the bundle** — the biggest perceived risk of a 4-pack is being stuck with
  four of something you don't like.
- **Sticky add-to-cart bar** appears once the main CTA scrolls out, with live total and savings.
  Mobile-first: everything is single-column and thumb-reachable under 560px.

## Instrumentation / what I'd test first

The page is built so each lever is independently testable:

1. Default tier: 3+1 pre-selected vs. nothing pre-selected.
2. Progress bar copy: "2 pairs away from a free pair" vs. "$34.95 of free product away".
3. Per-pair pricing shown vs. hidden on tier cards.
4. "One pair per pair of shoes" section above vs. below the fold on mobile.

Primary metric AOV, guardrail metrics CVR and 30-day refund rate — a bundle that lifts AOV while
pushing returns up isn't a win.

## How this maps to Shopify

- Tiers → a single product with a bundle **Cart Transform / Product Discount Function** that zeroes
  the cheapest line once quantity ≥ 3 (no discount code, works with Shop Pay).
- Size slots → line-item properties / variants per slot, so the free pair is its own line at $0.00.
- Tier selector, progress bar and sticky bar → a `bundle-builder` section with schema settings for
  tiers, thresholds and badge copy, so Jacob can change the offer without a developer.
- Reviews block → Judge.me / Okendo app block; UGC grid → the existing feed app.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

```
index.html    markup
styles.css    styles (no framework)
script.js     tier logic, pricing, progress, countdown, sticky bar
assets/       product + UGC imagery
```
