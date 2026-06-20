# API Contracts

> Record Shopify APIs, Liquid filters, and integration contracts here as they are used.

Candidates for this project (from `docs/theme-architecture.md`):
- **Section Rendering API** — real-time collection filter/sort updates.
- **Image filters** — `image_url`, `image_tag` with width candidates + `sizes`.
- **Search & Discovery** — facet/filter configuration source.
- Shopify objects — `product`, `collection`, menus/linklists, forms.

Document each as: endpoint/filter · inputs · outputs · where used · gotchas.

## In use (2026-06-15) — Header
- `linklists[handle]` / `link_list` setting → nav items (`link.title`, `link.url`, `link.current`,
  `link.links` for 1 dropdown level; max 3 menu levels). Used in `snippets/custom-header-menu.liquid`.
- `routes.root_url` / `routes.search_url` / `routes.account_url` / `routes.cart_url` → header links.
- `cart.item_count` → cart count bubble (render only when > 0).
- `{% form 'localization' %}` with `<select name="locale_code">` + `localization.available_languages`
  (`language.iso_code`, `language.endonym_name`) → language selector. Field name is `locale_code` (not `language_code`).
- `image_url` + `image_tag` (widths/sizes/loading) → responsive logo from `image_picker`.
- Section schema `"enabled_on": { "groups": ["header"] }` → makes the section addable to the
  Dawn header group via Theme Editor (validated by `shopify theme check`).
