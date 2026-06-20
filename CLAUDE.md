# Project: Shopify_AI — Figma-Driven Dynamic Dawn Storefront

## Rain-Skill Setup

This project uses rain-skill for workflow management.

- Task records: `docs/rain-skill/tasks/`
- Project wiki: `docs/rain-skill/wiki/` (index at `wiki/wiki/INDEX.md`, schema at `wiki/schema.md`)
- Run `/start` at the beginning of each session
- Run `/wiki-update lint` periodically to keep the wiki healthy

## Tech Stack
<auto-detected 2026-06-15>
- Shopify Online Store 2.0 theme, based on **Dawn**
- Liquid templates + JSON templates, section/block schemas
- Global tokens via `config/settings_schema.json`
- Dynamic content via metafields, metaobjects, Theme settings, and locale files
- Assets in Content > Files; collection filtering via Search & Discovery + Section Rendering API
- Status: planning/docs phase — Dawn theme folders not yet added (only `docs/` present)

## Key conventions
The authoritative project rules live in [.claude/CLAUDE.md](.claude/CLAUDE.md). In short:
- **Golden Rule:** never modify Dawn originals — create `custom-*` files; override in
  `assets/custom-base.css` / `assets/custom-main.js`.
- All user-facing text via the `| t` filter; no hardcoded strings.
- Use `{% render %}` (never `{% include %}`); no inline styles — use CSS custom properties.
- See `docs/theme-architecture.md` for the canonical implementation spec.
