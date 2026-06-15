# Task: Hero Section

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Depends on:** Phase 1 tokens; follows header. Figma file `cLfM2HHwBgVRITNEqCZZqa`, node `301:441`.
- **Status:** COMPLETE — both gates passed, wiki filed. (Live preview pending store push.)

## Brainstorm
Escape-hatch: user said "continue the section" → use judgement. Next homepage section after
the header is the Hero (`301:441`). Build approach already fixed: standalone `custom-*` section,
extend Phase 1 tokens. No new questions needed.

## Design (from Figma get_design_context, node 301:441)
Image-led hero: centered cheese-board photo (`image 11`, ~1300×520), an optional background
image behind (`2 1`), and a decorative patterned bottom band (`Risorsa 3 1`, full-width strip).
No heading/CTA present in the frame — but content-mapping-matrix requires editable
heading/subtext/CTA/overlay/alignment, so those are provided and default to off/blank.

## Plan
1. `sections/custom-hero.liquid` — dynamic images (main desktop + optional mobile + optional
   background + optional decorative bottom band), optional overlay content (eyebrow, heading,
   richtext, two CTAs), alignment + position + dark-overlay controls, uses `--custom-*` tokens.
   image_picker fallbacks via placeholder_svg_tag. Preset + addable anywhere.
2. `locales/en.default.schema.json` — `custom.hero.*` editor labels.
3. Validate (theme check) → security-gate → post-task-review → wiki.

## Implementation
- `sections/custom-hero.liquid` — dynamic images (main + mobile art-direction + background +
  decorative bottom band) via image_url/image_tag with `lifestyle-1` placeholder fallback;
  optional overlay content (eyebrow → `.custom-eyebrow`, heading → `.custom-display`, richtext,
  two CTAs → `.custom-btn`); alignment + vertical position + darken-overlay controls; contained
  vs full-width; min-height; all consuming Phase 1 `--custom-*` tokens. Preset; no JS.
- `locales/en.default.schema.json` — `custom.hero.*` editor labels.

## Validation
- `shopify theme check`: **0 offenses** in changed files. schema-locale JSON parses clean.
- Confirmed `lifestyle-1` is a valid Shopify placeholder (used by Dawn) — not a guess.

## Security Gate
Status: PASSED (FEATURE; independent security-auditor — all PASS, 0 BLOCKING / 0 WARNING)
- ✅ richtext (subtext) output unescaped is correct (platform-sanitized tag whitelist).
- ✅ button hrefs are `url`-type (platform-constrained); empty → `href="#"` + aria-disabled.
- ✅ inline style vars are range/color types + `| escape` — no breakout.
- ✅ eyebrow/heading/labels escaped; image alt via image_tag; decorative imgs alt="" + aria-hidden.
- ✅ no JS, no secrets, no external calls, no weakened controls.

Gate Status: PASSED

## Code Review
Status: APPROVED
- ✅ Correctness: image-led hero matching Figma (centered image, optional bg + decorative band)
  with optional editable overlay content per the content-mapping matrix.
- ✅ Edge cases: no image → placeholder; content hidden when all fields blank; mobile swap;
  empty CTA link → disabled.
- ✅ Perf: main image eager + fetchpriority=high (above-fold); bg/band lazy; responsive widths/sizes.
- ✅ DRY: reuses `.custom-btn` / `.custom-display` / `.custom-eyebrow` / `.custom-container` tokens.
- ✅ Architecture: standalone `custom-*` section + preset; theme-check clean.
- 🟡 SUGGESTION: mobile/desktop image swap uses CSS `:has()` (evergreen only); fine per the
  brief's modern-browser target. Non-blocking.

Review Status: APPROVED
