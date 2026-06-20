# Architecture

## As-found summary (seeded by /project-init, 2026-06-15)

This repository is a **Shopify Online Store 2.0 theme** project based on **Dawn 15.4.1**
(scaffolded into the repo 2026-06-15 from the official `Shopify/dawn` repo). The standard
theme folders are now present: `assets/`, `config/`, `layout/`, `locales/`, `sections/`,
`snippets/`, `templates/`. Custom work is layered on top via `custom-*` files only.

**Phase 1 (Global Foundations) — DONE 2026-06-15.** A merchant-editable global token layer
extends Dawn's existing color-scheme + typography settings:
- `config/settings_schema.json` → appended "Custom — Brand Foundations" group (custom IDs:
  `custom_color_primary/secondary/accent/on_primary`, `custom_letter_spacing_*`,
  `custom_display_size_min/max`, `custom_space_unit`, `custom_container_narrow`, `custom_radius_sm/md/lg`).
- `snippets/custom-css-variables.liquid` → bridges those settings into `:root --custom-*`
  CSS variables (a static CSS asset can't read Liquid, hence the snippet).
- `assets/custom-base.css` → derives spacing scale + fluid display clamp, exposes `.custom-*`
  utility classes (container, display, buttons, radius, focus states).
- `layout/theme.liquid` → sole sanctioned Dawn edit: renders the snippet + loads `custom-base.css`
  right after `base.css`.
- `locales/en.default.schema.json` → `custom.brand_foundations.*` schema labels.

Exact Figma token VALUES are entered in Theme Editor (or via a follow-up Figma pull) — the
Figma MCP here is desktop-selection-based and needs a frame selected to extract variables.

**Header (FEATURE) — DONE 2026-06-15.** Standalone `sections/custom-header.liquid` built from
scratch to the Figma header (file `cLfM2HHwBgVRITNEqCZZqa`, node `2347:1133`): black bar,
centered image-picker logo, centered nav from a `link_list`, top-right search/wishlist/account/
cart icons + optional language selector; sticky toggle; editable bg/text colors. Helpers:
`snippets/custom-header-menu.liquid` (nav from linklist, 1 dropdown level) and
`snippets/custom-icon.liquid` (inline SVG icons). Mobile uses a `<details>` drawer; desktop
shows the nav row (≥990px). Added to the header group via `enabled_on`. See [[decisions]] (ADR-0006),
[[api-contracts]], [[data-model]].

**Hero (FEATURE) — DONE 2026-06-15.** `sections/custom-hero.liquid`, built to Figma node
`301:441` — an image-led hero: main image (+ mobile art-direction), optional background and
decorative bottom band, plus optional overlay content (eyebrow/heading/richtext/2 CTAs),
alignment/position/darken controls, contained vs full-width. No JS. Reuses Phase 1 `.custom-*`
utilities/tokens. Next homepage sections (from Figma map): intro text → 2× "shop" product
sections → "rectangle" banner → "BLOG" → "FOOTER_2".

**Intro rich-text + Featured products + Product card (FEATURE) — DONE 2026-06-15.**
- `sections/custom-rich-text.liquid` (Figma `2347:1698`) — eyebrow/heading/richtext body (default =
  supplied Italian copy), alignment, max-width, colors.
- `sections/custom-featured-products.liquid` (Figma `2347:1322`, "shop") — collection picker →
  product grid via the card snippet; heading + "VAI ALLO SHOP" CTA (design defaults), columns/
  ratio/count toggles, empty state.
- `snippets/custom-product-card.liquid` — reusable card: live image/title/price/compare/availability;
  tagline from `custom.tagline` metafield (escaped); placeholder fallback; image ratios. Reused later
  for collection pages. Remaining homepage: "rectangle" banner → "BLOG" → "FOOTER_2".

**Banner + Blog + Footer (FEATURE) — DONE 2026-06-15. Homepage section set COMPLETE.**
- `sections/custom-image-banner.liquid` (Figma `35:711`) — full-bleed image (desktop/mobile) +
  optional overlay heading/text/button + optional link wrap; full-width/contained; overlay.
- `sections/custom-blog-posts.liquid` (Figma `2459:934`) — blog picker → article grid
  (image/title/url) + "VAI AL BLOG" link; columns; empty state.
- `sections/custom-footer.liquid` (Figma `12:850`) — standalone footer (`enabled_on` footer group):
  logo (+shop.name fallback), about/contact richtext, menu columns via BLOCKS (heading + link_list),
  newsletter via `{% form 'customer' %}` (tags=newsletter, success/error), social icons from Dawn
  `settings.social_*_link`, copyright. Preset = 3 menu blocks.
- `snippets/custom-icon.liquid` — added facebook/instagram/tiktok/youtube/twitter/pinterest.

**Homepage sections done:** header, hero, rich-text, featured-products (+product-card snippet),
image-banner, blog-posts, footer.

**Homepage WIRED (2026-06-15):** `templates/index.json` composes custom-hero → custom-rich-text
→ custom-featured-products (collection "all") → custom-image-banner → custom-blog-posts.
`sections/header-group.json` → `custom-header` (keeps Dawn announcement-bar); `footer-group.json`
→ `custom-footer` (3 menu blocks). Dawn's `header.liquid`/`footer.liquid`/stock index sections
left in place but unreferenced (reversible in Theme Editor).

**Collection & Product templates DONE + WIRED (2026-06-15):**
- `templates/collection.json` → `sections/custom-main-collection.liquid` — banner + `collection.filters`
  facets (list + price_range via `money_without_currency`) + `collection.sort_options` + active chips +
  card grid + `paginate`. **Phase 4 real-time filtering** via Section Rendering API AJAX (fetch
  `?section_id`, replace inner, pushState) with no-JS fallback.
- `templates/product.json` → `custom-main-product` (gallery, feature blocks, variant `<select name=id>`
  + JS price update from `product.variants | json`, `{% form 'product' %}` add-to-cart, collapsible
  blocks) + `custom-icon-columns` (trust row) + `custom-product-recommendations` (recommendations API).

**Content pages DONE (2026-06-15):** alternate page templates `page.mission.json`,
`page.che-storia.json`, `page.contatti.json` compose reusable sections + 2 new ones:
- `sections/custom-image-with-text.liquid` — alternating image/text (left/right), reused across Mission & Che Storia.
- `sections/custom-contact.liquid` — `{% form 'contact' %}` (name/email/phone/message), escaped repopulation.
Merchant must create each Page in Admin and assign its template (page.mission / page.che-storia / page.contatti).

**Reusable section inventory:** custom-header, custom-footer, custom-hero, custom-rich-text,
custom-featured-products, custom-image-banner, custom-blog-posts, custom-image-with-text,
custom-icon-columns, custom-contact, custom-main-collection, custom-main-product,
custom-product-recommendations. Snippets: custom-product-card, custom-header-menu, custom-icon,
custom-css-variables.

**Reviews + Map + Testimonials + QA (DONE 2026-06-15):**
- `custom-main-product.liquid` — optional star rating from `product.metafields.reviews.rating` +
  `@app` block slot for a review-widget app block.
- `sections/custom-map.liquid` — address + sandboxed Google Maps embed (url setting) + directions.
- `sections/custom-testimonials.liquid` — quote/author/rating/avatar blocks (replaces icon-columns
  placeholder on Mission). Wired into `page.contatti.json` (map) and `page.mission.json` (testimonials).
- **QA/Handover deliverable:** `docs/handover-checklist.md` (merchant setup, per-section controls,
  reviews app-block steps, full QA checklist, go-live).

**Enhancements DONE (2026-06-15):**
- **Variant swatches** — `custom-main-product.liquid` product picker is now per-option radio
  swatches (`options_with_values`, color/image swatch) with client variant resolution from
  `product.variants | json` (cosmetic; server validates on add).
- **AJAX cart drawer** — `sections/custom-cart-drawer.liquid` (mounted in `theme.liquid`); uses
  the Section Rendering API (`routes.cart_add_url`/`cart_change_url` + `sections=`), opens on add,
  qty/remove, count sync via `data-cart-count`; header cart link is `data-cart-toggle`. No-JS
  fallback preserved (native POST + /cart page).
- **Reviews** — theme supports `reviews.rating` display + `@app` slot; store-admin setup
  documented in `docs/setup-reviews.md` (app install + Admin GraphQL for metafield definitions).
  App install itself requires store access (not doable from theme code).

**Storefront build + enhancements COMPLETE.** Remaining is operational: live `shopify theme push`,
visual QA pass, and the merchant-side reviews app install. See `docs/handover-checklist.md`.

**Goal:** convert a provided Figma design into a fully dynamic, data-driven
Shopify storefront for store `bhautik-mehta.myshopify.com`, where *every* visible
element is editable via Theme Editor, store objects, metafields, metaobjects, or
locale files.

**Stack:** Shopify OS 2.0 · Liquid · JSON templates · section/block schemas ·
`settings_schema.json` global tokens · metafields/metaobjects · Content > Files assets.

**Core conventions (from `.claude/CLAUDE.md` — Golden Rule):**
- Never modify Dawn originals; create `custom-*` files instead.
- Override via `assets/custom-base.css` / `assets/custom-main.js`, loaded from `layout/theme.liquid`.
- All user-facing text through the `| t` filter; no hardcoded strings.
- Use `{% render %}`, never `{% include %}`; no inline styles (use CSS custom properties).

**Key reference docs:** `docs/theme-architecture.md` (canonical spec),
`docs/project-brief.md`, `docs/implementation-plan.md`, `docs/content-mapping-matrix.md`.

## Dynamic content model

Per `docs/theme-architecture.md`: JSON templates compose pages; sections give
merchant-controlled layout; blocks/metaobjects hold repeatable content; theme
settings hold global visual tokens (fonts, colors, radius, spacing, container).
Collection filtering uses Search & Discovery facets + the Section Rendering API
with shareable URL state and a no-JS fallback.

> Ingest more detail with `/wiki-update ingest docs/<file>.md`.
