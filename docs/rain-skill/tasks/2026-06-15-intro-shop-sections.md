# Task: Intro Rich-Text + Featured Products ("shop") + Product Card

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Figma:** file `cLfM2HHwBgVRITNEqCZZqa` — intro `2347:1698`, shop `2347:1322`.
- **Status:** COMPLETE — both gates passed, wiki filed. (Live preview pending store push.)

## Brainstorm
Escape-hatch ("yes"/continue → use judgement). Approach fixed: standalone custom-* sections,
extend Phase 1 tokens, live product data, no invented copy.

## Design
- Intro (`2347:1698`): centered Italian body paragraph on black → reusable rich-text section.
- Shop (`2347:1322`): heading "Inizia ad assaggiare questi" + "VAI ALLO SHOP" link + 3 product
  cards (image, title, tagline, price) → featured-products section from a collection + card snippet.

## Implementation
- `snippets/custom-product-card.liquid` — live product (image/title/price/compare/availability);
  tagline from `custom.tagline` metafield (escaped); placeholder fallback; image ratios; scoped CSS.
- `sections/custom-featured-products.liquid` — collection picker → product grid via the card snippet;
  heading + CTA link (design defaults), columns/ratio/count/show toggles, editable colors; empty state.
- `sections/custom-rich-text.liquid` — eyebrow/heading/richtext body (default = Figma copy), alignment,
  max width, colors. Uses Phase 1 `.custom-display`/`.custom-eyebrow`/tokens.
- Locales: `custom.product.*` + `custom.featured.empty` (storefront); `custom.rich_text.*` +
  `custom.featured.*` (schema).

## Validation
- `shopify theme check`: **0 offenses** in changed files. Both locale JSON files parse clean.

## Security Gate
Status: PASSED (FEATURE; independent security-auditor — all PASS, 0 BLOCKING / 0 WARNING)
- ✅ NEW sink `custom.tagline` metafield output is `| escape`d → no XSS even for plain-text metafields.
- ✅ product.url/title/money/image_tag/placeholder all safe; loop bounded by range (no DoS).
- ✅ featured: escaped text + url-type link + escaped style vars; `{% render %}` (not include).
- ✅ rich-text: richtext body unescaped is correct (platform-sanitized); escaped text + style vars.
- ℹ️ Informational: `{{ s.alignment }}`/`{{ ratio }}` interpolated in class are closed selects
  (constrained) — left as-is, no action required.

Gate Status: PASSED

## Code Review
Status: APPROVED
- ✅ Correctness: intro rich-text + featured "shop" (heading, CTA link, 3 product cards) match Figma.
- ✅ Edge cases: no collection → empty state; no image → placeholder; optional tagline; sold-out
  badge; compare-at price handling.
- ✅ Perf: card images lazy + responsive widths/sizes; `aspect-ratio` prevents CLS; product loop limited.
- ✅ DRY/architecture: reusable `custom-product-card` snippet (matches matrix's "reusable card
  snippet", reused later for collections); standalone `custom-*` sections + presets; Phase 1 tokens.
- ✅ Docs: snippet `{% doc %}`; theme-check clean.
- 🟡 SUGGESTION: per-product tagline requires a `custom.tagline` metafield (documented in the
  setting info); without it, taglines simply don't render. Non-blocking.

Review Status: APPROVED
