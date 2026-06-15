# Task: Wire homepage template (part 1) + Collection/Product templates (part 2)

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Status:** PART 1 COMPLETE · PART 2 pending Figma frames

## Part 1 — Wire the homepage (DONE)
Composed the custom sections so the storefront renders our build:
- `templates/index.json` — order: custom-hero → custom-rich-text → custom-featured-products
  (collection "all") → custom-image-banner → custom-blog-posts.
- `sections/header-group.json` — keeps Dawn announcement-bar; swaps header → `custom-header`
  (menu main-menu, sticky, icons on, black/white).
- `sections/footer-group.json` — swaps footer → `custom-footer` with 3 menu blocks (Shop/About/
  Conditions, menu "footer"), newsletter + social on.
- Note: Dawn's `header.liquid`/`footer.liquid` are untouched (just unreferenced) — fully reversible
  in the Theme Editor.

### Validation (part 1)
- `shopify theme check`: **0 offenses** — template + group JSON validate against the section
  schemas (section types exist, settings/blocks valid). JSON parses clean.

### Security Gate (part 1)
Status: PASSED (FEATURE; proportional — static JSON composition, no code/inputs)
- ✅ No code/logic, no inputs, no secrets — only references to already-audited custom sections.
- ✅ No new attack surface; section groups are config (the editable layer); Dawn liquid untouched.
Gate Status: PASSED

### Code Review (part 1)
Status: APPROVED
- ✅ Correct section types + valid settings/blocks (theme-check verified).
- ✅ Order matches Figma homepage; header/footer placed in their groups.
- ✅ Non-destructive (Dawn originals unreferenced, not deleted); reversible.

## Part 2 — Collection & Product templates (DONE)
Figma: SHOP `331:1475`, PAGINA PRODOTTO `340:786` (pulled via MCP screenshots).

### Files
- `sections/custom-main-collection.liquid` + `templates/collection.json` — banner (collection
  title/description/image), facets from `collection.filters` (list checkboxes + price_range
  From/To), sort from `collection.sort_options`, active chips, grid via `custom-product-card`,
  `paginate` + `default_pagination`, empty state. **Real-time filtering (Phase 4) implemented**:
  Section Rendering API AJAX (fetch `?section_id`, replace `[data-collection-inner]`,
  `history.pushState`, popstate) with no-JS form fallback.
- `sections/custom-main-product.liquid` + `templates/product.json` — gallery (thumb swap),
  feature badges (blocks), title/price, variant `<select name="id">` with JS price/availability
  update from `{{ product.variants | json }}`, quantity, `{% form 'product' %}` add-to-cart,
  collapsible accordions (blocks).
- `sections/custom-icon-columns.liquid` — reusable trust/USP row (icon blocks). On product page = the 4 trust badges.
- `sections/custom-product-recommendations.liquid` — Shopify recommendations via
  `routes.product_recommendations_url` + Section Rendering (JS fetch), reuses the card.
- Locales: `custom.collection.*`, `custom.product.*`, `custom.icon_columns.*`,
  `custom.recommendations.*` (schema) + storefront strings.

### Fix applied
- Price filter inputs now use Dawn's authoritative `money_without_currency` (major units), not
  `cents/100|floor` — overrides the filter-sort skill's "submit cents" rule based on Dawn's real
  `snippets/price-facet.liquid` convention. Verified against Dawn.

### Validation (part 2)
- `shopify theme check`: **0 offenses** in all changed files. All JSON parses clean.

### Security Gate (part 2)
Status: PASSED (FEATURE; independent security-auditor — all PASS, 0 BLOCKING / 0 WARNING)
- ✅ Same-origin Section Rendering innerHTML (collection AJAX + recommendations) — DOMParser
  doesn't execute scripts; content is server-escaped. No DOM-XSS.
- ✅ `product.variants | json` in typed `<script>` — safe serialization (no `</script>` breakout).
- ✅ `{% form 'product' %}` add-to-cart platform-handled; variant id server-validated.
- ✅ Facet/sort/chip outputs escaped or platform-generated URLs; no scheme injection.
- ✅ No Liquid inside `{% javascript %}` (all dynamic values via data-* attributes).
- ✅ No secrets / external calls / weakened controls.

### Code Review (part 2)
Status: APPROVED
- ✅ Correctness: collection (banner/facets/sort/grid/pagination/chips) and product
  (gallery/features/price/variant/ATC/accordions) + trust row + recommendations match Figma.
- ✅ Edge cases: empty states, filter guards, single-variant hidden id, image placeholders,
  recommendations hidden when none.
- ✅ Perf: `paginate` (no >50 loop), lazy images, AJAX avoids full reload, eager product hero image.
- ✅ DRY: `custom-product-card` reused across featured/collection/recommendations; Phase 1 tokens.
- ✅ i18n: all UI via `| t`; schema labels localized; theme-check clean.
- 🟡 SUGGESTION: variant picker is `<select>` (functional) not per-option swatches; reviews
  section not built (needs a review app block); cart add is native POST (AJAX drawer = enhancement).

Review Status: APPROVED

## Status: COMPLETE (both parts). Homepage + collection + product templates wired & gated.
