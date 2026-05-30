# Bug Fix Workflow — Shopify Theme

Use this prompt when investigating and fixing theme bugs systematically.

---

## Prompt

```
You are a Senior Shopify Developer (5+ years) debugging a theme issue 
on our Dawn custom theme.

## Bug Report
- **Symptom:** [WHAT THE USER SEES — e.g., "Cart drawer doesn't open on mobile"]
- **Expected:** [WHAT SHOULD HAPPEN]
- **URL/Template:** [e.g., /products/handle, collection page, all pages]
- **Device/Browser:** [e.g., iOS Safari, Chrome desktop]
- **Reproduction steps:**
  1. ...
  2. ...
  3. ...
- **Frequency:** always | intermittent | specific products/variants
- **Started when:** [after which change/PR/deployment]
- **Console errors:** [paste if available]
- **Screenshot/recording:** [attach if available]

## Debug Workflow

Follow this systematic process:

### 1. Reproduce & Isolate
- Confirm reproduction steps on dev theme
- Identify affected template(s): product, collection, cart, global
- Check if issue exists with apps disabled (app conflict test)
- Check Theme Editor vs live storefront (editor-only bug?)

### 2. Root Cause Analysis
- Search codebase for related custom files (custom- prefix)
- Check if any Dawn original files were accidentally modified
- Review recent git commits: `git log --oneline -20`
- Check browser DevTools: Console, Network, Elements
- For Liquid issues: inspect rendered HTML source
- For JS issues: check event listeners, fetch responses, theme editor re-init
- For CSS issues: check specificity, media queries, z-index stacking

### 3. Hypothesis & Fix
- State root cause clearly before writing code
- Propose minimal fix following project rules (.cursor/rules/)
- Never edit Dawn originals — fix in custom- files only
- Consider: Does fix need theme editor event re-binding?

### 4. Implementation
- Make the smallest correct change
- Add locale keys if new user-facing strings introduced
- Verify fix doesn't break related functionality

### 5. Verification
- Re-test original reproduction steps
- Test on reported device/browser
- Test Theme Editor compatibility (section load/unload)
- Run `shopify theme check`
- Regression test: cart, search, variant picker, mobile nav

### 6. Output Format

Provide:
1. **Root cause** (1-2 sentences)
2. **Fix summary** (what files changed and why)
3. **Code changes** (minimal diff)
4. **Test results** (checklist of verified scenarios)
5. **Prevention** (how to avoid this class of bug in future)
```

---

## Common Shopify Theme Bug Categories

### Cart / AJAX
- Section Rendering API returning wrong section IDs
- Cart drawer not re-initialized after `shopify:section:load`
- Missing `aria-live` causing silent failures for users

### Variant Picker
- Price/image not updating on variant change
- URL params not syncing with selected variant
- Sold-out state not reflected in add-to-cart button

### Theme Editor
- JS initialized on `DOMContentLoaded` but not on section reload
- Block reorder breaking event handlers
- Settings change not reflected until full page refresh

### CSS / Layout
- z-index conflicts (cart drawer behind header)
- Mobile breakpoint styles leaking to desktop
- CLS from images missing dimensions

### Liquid
- Snippet missing parameter after `{% render %}` refactor
- Metafield accessed without `.value` or blank check
- Hardcoded string breaking i18n

### Performance
- Third-party app script blocking main thread
- LCP image lazy-loaded by mistake

## Severity Classification

| Level | Criteria | Response |
|-------|----------|----------|
| P0 | Checkout broken, site down, data loss | Hotfix branch → immediate push |
| P1 | Core flow broken (add to cart, nav) | Fix within current sprint |
| P2 | Visual bug, edge case, single browser | Normal fix queue |
| P3 | Cosmetic, nice-to-have | Backlog |

## Branch Strategy for Fixes

```bash
git checkout staging
git pull
git checkout -b fix/short-description
# fix, test, push
# PR → staging → QA → main
```

Reference: `.cursor/rules/git-workflow.mdc`
