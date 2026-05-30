---
name: shopify-deployment
description: >-
  Shopify theme deployment workflow — CLI commands, environment strategy,
  theme push/pull, GitHub integration, and pre-launch validation. Use when
  pushing themes, setting up dev/staging/production, or preparing a go-live.
---

# Shopify Theme Deployment

## When to Use

- Setting up dev/staging/production theme environments
- Pushing or pulling theme changes
- Preparing for merchant launch or theme handoff
- Troubleshooting CLI auth or sync issues

## Environment Strategy (This Project)

```
main      → Live (published) theme
staging   → QA theme (unpublished)
feature/* → Development theme (unpublished)
```

Configure theme IDs in `shopify.theme.toml`.

## Essential CLI Commands

```bash
# Authenticate
shopify auth login --store your-store.myshopify.com

# List themes and IDs
shopify theme list

# Local dev with hot reload
shopify theme dev --store your-store.myshopify.com

# Push to specific theme
shopify theme push --theme [THEME_ID]

# Push using environment from shopify.theme.toml
shopify theme push --environment staging

# Pull remote changes
shopify theme pull --theme [THEME_ID]

# Lint theme
shopify theme check

# Package for download
shopify theme package
```

## Safe Push Practices

- **Always specify `--theme`** on main branch — never accidental live push
- Push feature branches to dev themes only
- PR to `staging` first — QA before `main`
- Never commit `config/settings_data.json` (merchant-specific values)

## Pull Before Push (Team Workflow)

```bash
git pull origin staging
shopify theme pull --theme [STAGING_ID] --only config/settings_data.json  # if needed locally
# Make changes
shopify theme check
shopify theme push --theme [DEV_ID]
```

## Pre-Push Checklist

- [ ] `shopify theme check` passes with no errors
- [ ] Tested in Theme Editor (sections add/remove/reorder)
- [ ] Mobile + desktop verified
- [ ] No Dawn original files modified
- [ ] New strings added to `locales/en.default.json`
- [ ] Custom assets loaded in `layout/theme.liquid`

## Launch Sequence

1. Final QA on staging theme (see `.cursor/checklists/launch-checklist.md`)
2. Merge PR: `staging` → `main`
3. Push main to live theme ID
4. Publish theme in Admin (if pushing to unpublished copy)
5. Smoke test live store (checkout, cart, key pages)
6. Monitor Core Web Vitals for 48 hours post-launch

## Handoff Deliverables

- README with store URL and theme IDs
- `.shopify/metafields.json` with all custom definitions
- List of apps requiring theme app blocks or script tags
- Merchant documentation for custom section settings

## Common Issues

| Issue | Fix |
|-------|-----|
| Auth expired | `shopify auth logout` then `shopify auth login` |
| Push rejected | Check Theme Check errors; validate JSON templates |
| Settings lost | Don't overwrite `settings_data.json` on pull without backup |
| Section not in editor | Add `"presets"` to section schema |

## Git Integration

- Branch naming: `feature/`, `fix/`, `hotfix/`
- Conventional commits: `feat:`, `fix:`, `perf:`, `a11y:`
- PR includes theme preview URL and screenshots

## References

- `.cursor/rules/git-workflow.mdc`
- `shopify.theme.toml`
- `.cursor/checklists/launch-checklist.md`
