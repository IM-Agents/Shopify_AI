# Data Model

> Stub. Record data shapes as they are defined.

For this Shopify theme, track:
- **Metafields** — namespace, key, type, owner resource, used by which section/snippet.
- **Metaobjects** — definition, fields, where rendered (shared reusable content).
- **Theme settings** — global tokens in `settings_schema.json` (fonts, colors, spacing, radius, container, header behavior).
- **Section/block settings** — per-section schema settings and block types.

Document each as: name · type · source · consumers.

## Custom global theme settings (Phase 1, 2026-06-15)
Group: **Custom — Brand Foundations** (end of `config/settings_schema.json`). All consumed by
`snippets/custom-css-variables.liquid` → `:root --custom-*` → `assets/custom-base.css`.

| Setting ID | Type | Default | CSS variable |
|---|---|---|---|
| `custom_color_primary` | color | `#1a1a1a` | `--custom-color-primary` |
| `custom_color_secondary` | color | `#6b6b6b` | `--custom-color-secondary` |
| `custom_color_accent` | color | `#c89b3c` | `--custom-color-accent` |
| `custom_color_on_primary` | color | `#ffffff` | `--custom-color-on-primary` |
| `custom_letter_spacing_headings` | range px | 0 | `--custom-letter-spacing-headings` |
| `custom_letter_spacing_labels` | range px | 1 | `--custom-letter-spacing-labels` |
| `custom_display_size_min` | range px | 32 | `--custom-display-size-min` |
| `custom_display_size_max` | range px | 64 | `--custom-display-size-max` |
| `custom_space_unit` | range px | 8 | `--custom-space-unit` (scale 3xs–3xl derived) |
| `custom_container_narrow` | range px | 800 | `--custom-container-narrow` |
| `custom_radius_sm/md/lg` | range px | 4/8/16 | `--custom-radius-sm/md/lg` |

Defaults are neutral placeholders — real Figma values are set in Theme Editor.

## Custom header section settings (`sections/custom-header.liquid`, 2026-06-15)
`logo` (image_picker), `logo_width` (range), `menu` (link_list, default `main-menu`),
`show_search`/`show_account`/`show_cart`/`show_wishlist`/`show_language` (checkbox),
`wishlist_url` (url), `enable_sticky` (checkbox), `background_color`/`text_color` (color,
default #000/#fff). Inline CSS vars: `--ch-bg`, `--ch-fg`, `--ch-logo-w`.

## Custom hero section settings (`sections/custom-hero.liquid`, 2026-06-15)
Images: `image`, `image_mobile`, `background_image`, `decorative_band` (image_picker),
`image_max_width`/`min_height` (range), `full_width` (checkbox). Content: `eyebrow`/`heading`
(text), `subtext` (richtext), `content_color` (color), `content_alignment`/`content_position`
(select), `show_overlay` (checkbox), `overlay_opacity` (range). Buttons: `button_label`/
`button_2_label` (text), `button_link`/`button_2_link` (url). Inline vars: `--hero-max-w`,
`--hero-min-h`, `--hero-overlay`, `--hero-content-color`.

## Product metafield (2026-06-15)
- `custom.tagline` (single_line_text) — per-product short tagline shown on the product card
  (`snippets/custom-product-card.liquid`). Optional; card hides it when blank. Merchant must
  create this metafield definition in Admin → Settings → Custom data → Products.

## Custom featured-products + rich-text settings (2026-06-15)
- Featured (`custom-featured-products.liquid`): `heading`/`link_label` (text), `link_url` (url),
  `collection` (collection), `products_count`/`columns` (range), `image_ratio` (select),
  `show_price`/`show_tagline` (checkbox), `background_color`/`text_color` (color). Vars `--cf-bg/-fg/-cols`.
- Rich text (`custom-rich-text.liquid`): `eyebrow`/`heading` (text), `body` (richtext),
  `alignment` (select), `max_width` (range), `background_color`/`text_color` (color). Vars `--rt-bg/-fg/-max`.
