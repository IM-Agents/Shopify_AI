# Task: Reviews app-block + Map + Testimonials + QA/Handover

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Status:** COMPLETE — both gates passed, wiki filed.

## Brainstorm
Escape-hatch (explicit user direction). Approach fixed.

## Implementation
- **Reviews (app block):** `sections/custom-main-product.liquid` — added optional star rating from
  `product.metafields.reviews.rating.value` / `reviews.rating_count`, and an `@app` block slot
  (`{"type":"@app"}` + `{% render block %}`) so a review widget app block can be placed on the
  product page. (`@app` with no `name` is valid — theme-check clean; IDE lint false positive.)
- **Map:** `sections/custom-map.liquid` — heading + address (richtext) + Google Maps embed
  `<iframe src=url-setting>` (sandboxed) + directions link. Placeholder when no URL.
- **Testimonials:** `sections/custom-testimonials.liquid` — blocks (quote/author/rating ★/avatar),
  columns, colors. Replaces the icon-columns placeholder on Mission.
- **Wiring:** `page.contatti.json` (+map), `page.mission.json` (testimonials → custom-testimonials).
- **Locales:** `custom.map.*`, `custom.testimonials.*` (schema) + `custom.map.placeholder` (storefront).
- **QA/Handover:** `docs/handover-checklist.md` — one-time merchant setup, per-section controls,
  reviews app-block steps, full QA checklist (dynamic/responsive/functional/a11y/perf), go-live.

## Validation
- `shopify theme check`: **0 offenses** in all changed files. All JSON parses clean.

## Security Gate
Status: PASSED (FEATURE; independent security-auditor — all PASS, 0 BLOCKING / 0 WARNING)
- ✅ Map `<iframe src>` is a url-type setting (merchant-trust, scheme-constrained) — Dawn pattern;
  added `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"` as defense-in-depth.
- ✅ `@app` block render is the official Shopify pattern (merchant-installed, platform-constrained).
- ✅ reviews rating output is numeric/aria only; richtext sanitized; author escaped.
- ✅ No secrets / external calls (only the merchant map embed) / weakened controls.

Gate Status: PASSED

## Code Review
Status: APPROVED
- ✅ Correctness: reviews rating + app slot, map, testimonials match the designs; pages rewired;
  handover checklist delivered.
- ✅ Edge cases: rating guarded by metafield presence; map placeholder; testimonials/@app guarded.
- ✅ DRY/arch: reuses tokens/`.custom-btn`; alternate page templates updated; theme-check clean.
- ✅ i18n: all UI via `| t`.
- 🟡 SUGGESTION: reviews need an external app + `reviews.*` metafields; map needs a merchant embed
  URL (both documented in `docs/handover-checklist.md`).

Review Status: APPROVED
