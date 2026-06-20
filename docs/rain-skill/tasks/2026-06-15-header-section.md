# Task: Header Section

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Status:** COMPLETE — both gates passed, wiki filed. (Live preview pending store push.)
- **Depends on:** Phase 1 Global Foundations (done) — uses `--custom-*` tokens.

## Goal
Implement the storefront header to match the Figma design, fully dynamic (Shopify menus,
image-picker logo, locale labels), responsive (mobile drawer / desktop nav), honoring the
Golden Rule (custom-* files; no edits to Dawn originals beyond sanctioned theme.liquid).

## Known constraints
- Dawn already ships a feature-rich `sections/header.liquid` (menu, mega-menu, logo, sticky,
  search, cart drawer, localization, mobile drawer). Brief says extend, don't rebuild.
- Figma header design not yet readable (Figma MCP needs a desktop frame selection).

## Brainstorm (confirmed 2026-06-15)
- Build approach: **(b) standalone `sections/custom-header.liquid` from scratch** (user choice).
- Figma source: **(a)** Header frame implemented from Figma file `cLfM2HHwBgVRITNEqCZZqa`,
  node `2347:1133` (pulled via Figma MCP get_design_context — black bar, centered
  "Il Cashewficio" logo, centered nav SHOP/MISSION/CHE STORIA/CONTATTI, top-right
  search/wishlist/account/cart icons + EN locale). Italian store.

## Implementation
- `sections/custom-header.liquid` — section: image_picker logo (+ shop.name fallback),
  nav from `link_list` setting, search/account/cart/wishlist icon links (Shopify routes),
  optional localization (language) form, sticky toggle, editable bg/text colors via inline
  CSS vars; scoped {% stylesheet %} (3-col grid, mobile <details> drawer, desktop nav row)
  + minimal {% javascript %} (locale auto-submit, Esc closes drawer). enabled_on header group + preset.
- `snippets/custom-header-menu.liquid` — renders nav <ul> from a linklist, 1 dropdown level.
- `snippets/custom-icon.liquid` — inline SVG icon set (search/heart/user/cart/menu/close/chevron/globe).
- `locales/en.default.json` — `custom.header.*` storefront strings (incl. pluralized cart_count).
- `locales/en.default.schema.json` — `custom.header.*` Theme-Editor labels.

## Validation
- `shopify theme check`: **0 offenses** in all changed files (incl. valid `enabled_on` groups).
- Both locale JSON files parse clean.

## Security Gate
Status: PASSED (FEATURE — 7-point integration check + independent security-auditor)
- ✅ Menu titles escaped; aria/alt contexts safe (`| t` / `image_tag` / shop.name).
- ✅ Inline JS has no unsafe DOM sink (only `form.submit()` + `details.open`); IIFE-scoped.
- ✅ Localization form uses correct `name="locale_code"`; option values are platform iso codes; noscript fallback.
- ✅ Icon snippet is a fixed allow-list `case` (fail-closed); no secrets, no external calls.
- 🟡→fixed: added `| escape` to color/range vars in the inline `style` (W2 hardening).
- 🟡→documented: URL hrefs (link.url/child.url/wishlist_url) rely on Shopify URL typing — added
  a security note in the menu snippet so the source is never downgraded to free text (W1).
- N/A npm cooldown (no Node project).

Gate Status: PASSED

## Code Review
Status: APPROVED
Notes:
- ✅ Correctness: matches the Figma header structure (black bar, centered logo, centered
  nav SHOP/MISSION/CHE STORIA/CONTATTI, right-side search/wishlist/account/cart + EN).
- ✅ Edge cases: no-logo → shop.name text; empty/blank menu → renders nothing; cart bubble
  only when item_count > 0; language form only when >1 language; wishlist only when enabled + URL set.
- ✅ Input sanitized / no XSS (per security gate); localization CSRF handled by Shopify form.
- ✅ Perf: loops bounded by menu size; logo eager + responsive widths/sizes; no N+1.
- ✅ Architecture: standalone `custom-*` section (Golden Rule); `enabled_on` header group;
  consumes Phase 1 `--custom-*` tokens; menu factored into a reusable snippet (DRY).
- ✅ Docs: both snippets carry `{% doc %}` headers.
- ✅ Validation in lieu of unit tests: `shopify theme check` clean (themes have no unit harness).
- 🟡 SUGGESTION: `globe` icon in `custom-icon.liquid` is currently unused (kept for future
  language affordance). Non-blocking.
- 🟡 SUGGESTION: search icon links to `/search` (no predictive-search drawer yet) — fine for
  first pass; candidate enhancement later.

Review Status: APPROVED
