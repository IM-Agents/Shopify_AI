# Dawn Theme — Project Rules (Always Active)

These rules apply to every task in this project without exception.

---

## Golden Rule
**NEVER modify Dawn's original files.** Always create new custom files prefixed with `custom-`.
If you need to change Dawn behavior, use CSS overrides in `assets/custom-base.css` or JS overrides in `assets/custom-main.js`.

---

## Folder Responsibilities

### `/assets/`
- Dawn originals: DO NOT TOUCH
- Custom CSS: `custom-base.css` (global), `custom-[feature].css` (scoped)
- Custom JS: `custom-main.js` (global), `custom-[feature].js` (scoped)
- Custom SVG icons: `custom-icon-[name].svg`
- Always load custom CSS/JS via `layout/theme.liquid` using asset filters

### `/config/`
- `settings_schema.json` — Add new custom settings groups at the END of the array
- `settings_data.json` — Managed by Shopify; do not hand-edit production values

### `/layout/`
- `theme.liquid` — Main layout; add custom asset tags here
- Load custom CSS: `{{ 'custom-base.css' | asset_url | stylesheet_tag }}`
- Load custom JS: `{{ 'custom-main.js' | asset_url | script_tag }}`

### `/locales/`
- Add translations to `en.default.json` (source of truth)
- Add schema translations to `en.default.schema.json`
- Never hardcode user-facing text in Liquid — always use `| t` filter

### `/sections/`
- Dawn originals: DO NOT TOUCH
- New sections: `custom-[name].liquid` prefix required
- Every section must have a `{% schema %}` block

### `/snippets/`
- Dawn originals: DO NOT TOUCH
- New snippets: `custom-[name].liquid` prefix required
- Snippets are stateless — receive all data via parameters
- No schema blocks in snippets (sections only)

### `/templates/`
- Use JSON templates for OS 2.0
- Alternative templates: `product.[name].json`, `page.[name].json`
- Do NOT add logic to JSON templates

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Custom Section | `custom-[feature].liquid` | `custom-hero-banner.liquid` |
| Custom Snippet | `custom-[name].liquid` | `custom-product-badge.liquid` |
| Custom CSS | `custom-[scope].css` | `custom-product-page.css` |
| Custom JS | `custom-[scope].js` | `custom-sticky-header.js` |
| Custom Icon SVG | `custom-icon-[name].svg` | `custom-icon-trust.svg` |

---

## What To Never Do

- NEVER edit `assets/base.css` — override in `assets/custom-base.css`
- NEVER edit `assets/global.js` — extend in `assets/custom-main.js`
- NEVER edit any existing Dawn section or snippet
- NEVER use inline styles — use CSS custom properties instead
- NEVER commit `config/settings_data.json` with production data to version control
- NEVER use `{% include %}` — always use `{% render %}`

---

## Available Skills (use `/skill-name` to invoke)

| Command | When to use |
|---|---|
| `/shopify-image-icon` | Any section/block with an image picker or icon |
| `/shopify-page-template` | Creating a new page or linking a template |
| `/shopify-filter-sort` | Collection filtering, sorting, price range inputs |
