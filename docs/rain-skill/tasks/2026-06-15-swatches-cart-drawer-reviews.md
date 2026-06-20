# Task: Variant swatches + AJAX cart drawer + Reviews setup

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Status:** COMPLETE — both gates passed, wiki filed.

## Scope note (honesty)
"Install a reviews app + create metafield definitions" is a **store-admin action** — not possible
from theme code with no authenticated store/CLI. Delivered instead: theme already supports reviews
(rating display + `@app` slot) + `docs/setup-reviews.md` (app install steps + runnable Admin GraphQL
to create `reviews.rating` / `reviews.rating_count` definitions). The two enhancements WERE coded.

## Implementation
- **Variant swatches** — `sections/custom-main-product.liquid`: replaced the `<select>` with
  per-option radio swatches from `product.options_with_values` (color via `value.swatch.color.rgb`,
  image via `value.swatch.image`, else text pill); hidden `name="id"`; JS resolves the variant from
  checked option values against `product.variants | json`, updates price/availability/ATC and
  `?variant=` (replaceState). Accessible (radios + focus-visible outline).
- **AJAX cart drawer** — `sections/custom-cart-drawer.liquid` (new): slide-in drawer rendering
  `cart.items` (qty +/- , remove, subtotal, checkout, view cart). JS uses the **Section Rendering
  API** — intercepts the product add-to-cart submit (scoped to `[data-custom-product]`), POSTs to
  `routes.cart_add_url` / `routes.cart_change_url` with `sections=custom-cart-drawer`, swaps the
  drawer body innerHTML (same-origin, server-escaped), updates `[data-cart-count]`, opens drawer.
  No-JS fallback: add-to-cart posts normally, header cart link → /cart page.
- **Wiring** — `layout/theme.liquid` renders `{% section 'custom-cart-drawer' %}`;
  `sections/custom-header.liquid` cart link gets `data-cart-toggle` + always-rendered count bubble
  (`data-cart-count`/`-bubble`, hidden at 0).
- **Locales** — `custom.cart.*` (storefront) + `custom.cart.name` (schema).
- **Reviews** — `docs/setup-reviews.md`.

## Validation
- `shopify theme check`: **0 offenses** in all changed files. Locale JSON parses clean.

## Security Gate
Status: PASSED (FEATURE; independent security-auditor — APPROVED, 0 BLOCKING)
- ✅ Cart AJAX is same-origin (routes.*); DOMParser doesn't execute scripts; Section Rendering
  output is server-escaped — no DOM-XSS.
- ✅ cart change line/quantity is session-scoped + server-validated (no IDOR).
- ✅ swatch CSS uses numeric color.rgb / image_url — no breakout; option values escaped.
- ✅ client variant resolution is cosmetic; Shopify validates variant/price server-side.
- ✅ checkout form platform-handled; no Liquid-in-JS; no secrets/external calls.
- 🟡→fixed: add-to-cart interception scoped to `[data-custom-product]` (won't hijack app forms).

Gate Status: PASSED

## Code Review
Status: APPROVED
- ✅ Swatches: correct per-option resolution, accessible, progressive (hidden id fallback).
- ✅ Cart drawer: Section Rendering pattern, optimistic open, count sync, no-JS fallback intact.
- ✅ DRY/architecture: reuses tokens, `custom-icon`, `.custom-btn`; theme.liquid mount is additive.
- ✅ i18n: all UI via `| t`; theme-check clean.
- 🟡 SUGGESTION: reviews require store-admin app install + metafields (see docs/setup-reviews.md);
  cart-drawer focus trap is minimal (Esc + initial focus) — full trap is a future polish.

Review Status: APPROVED
