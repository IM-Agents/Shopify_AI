# Dawn Custom Theme — bhautik-mehta.myshopify.com

Shopify Dawn theme customization workspace. Built following OS 2.0 best practices.

---

## 🚀 Getting Started

### Prerequisites
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) installed
- [Cursor](https://cursor.sh/) IDE (for AI-assisted development with rules)
- Authenticated to your Shopify store

### 1. Authenticate with Shopify
```bash
shopify auth login --store bhautik-mehta.myshopify.com
```

### 2. Get your Theme IDs
```bash
shopify theme list
```
Copy the theme IDs and add them to `shopify.theme.toml`.

### 3. Start Development Server
```bash
shopify theme dev --store bhautik-mehta.myshopify.com
```
Opens a live preview URL at `http://127.0.0.1:9292` with hot reload.

---

## 📁 Project Structure

```
dawn-custom/
├── .cursor/
│   └── rules/                        ← Cursor AI rules (auto-loaded)
│       ├── shopify-liquid.mdc        ← Liquid coding standards
│       ├── theme-structure.mdc       ← File organization rules
│       ├── javascript.mdc            ← JS standards
│       ├── performance.mdc           ← Core Web Vitals rules
│       ├── accessibility.mdc         ← WCAG 2.1 AA rules
│       └── git-workflow.mdc          ← Branch & commit standards
│
├── .shopify/
│   └── metafields.json               ← Custom metafield reference
│
├── assets/
│   ├── custom-base.css               ← ✏️ YOUR global CSS overrides
│   ├── custom-main.js                ← ✏️ YOUR global JS
│   └── [Dawn's original assets...]   ← 🔒 DO NOT TOUCH
│
├── config/
│   ├── settings_schema.json          ← Add custom settings at end
│   └── settings_data.json            ← 🔒 Managed by Shopify
│
├── layout/
│   ├── theme.liquid                  ← Load custom assets here
│   └── password.liquid               ← 🔒 DO NOT TOUCH
│
├── locales/
│   ├── en.default.json               ← Add new translation keys here
│   └── [other locales...]
│
├── sections/
│   ├── custom-hero-banner.liquid     ← ✏️ Example custom section
│   └── [Dawn's original sections...] ← 🔒 DO NOT TOUCH
│
├── snippets/
│   ├── custom-product-badge.liquid   ← ✏️ Example custom snippet
│   └── [Dawn's original snippets...] ← 🔒 DO NOT TOUCH
│
├── templates/                        ← 🔒 DO NOT TOUCH (use JSON templates)
│
├── .gitignore
├── .shopifyignore
├── shopify.theme.toml                ← Environment config
└── README.md
```

---

## 🛠️ Common Commands

| Command | Description |
|---------|-------------|
| `shopify theme dev` | Start dev server with hot reload |
| `shopify theme push` | Push to default theme |
| `shopify theme push --environment staging` | Push to staging theme |
| `shopify theme pull` | Pull latest from Shopify |
| `shopify theme list` | List all themes with IDs |
| `shopify theme check` | Lint Liquid code |
| `shopify theme package` | Create `.zip` for download |

---

## ✏️ Adding Custom Files

### New Section
1. Create `sections/custom-[name].liquid`
2. Add `{% schema %}` block with presets
3. Section appears in Theme Editor → Add section

### New Snippet
1. Create `snippets/custom-[name].liquid`
2. Use with `{% render 'custom-[name]', param: value %}`

### New CSS
1. Create `assets/custom-[name].css`
2. Load in `layout/theme.liquid` (scoped) or `custom-base.css` (global)

### New JS
1. Create `assets/custom-[name].js`
2. Load in `layout/theme.liquid` with `{{ 'custom-[name].js' | asset_url | script_tag }}`

---

## 🔒 Golden Rules

1. **Never edit Dawn's original files** — always create `custom-` prefixed files
2. **Never hardcode text** — use `{{ 'key' | t }}` and `en.default.json`
3. **Never use `{% include %}`** — always use `{% render %}`
4. **Never commit `settings_data.json`** — it's in `.gitignore`
5. **Always test in theme editor** — sections must work with Shopify's live editor

---

## 📚 Resources

- [Shopify Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Dawn Theme GitHub](https://github.com/Shopify/dawn)
- [Shopify Theme Architecture](https://shopify.dev/docs/themes/architecture)
- [Online Store 2.0](https://shopify.dev/docs/themes/os20)
- [Theme Check (Linter)](https://shopify.dev/docs/themes/tools/theme-check)
- [Shopify CLI Docs](https://shopify.dev/docs/themes/tools/cli)
