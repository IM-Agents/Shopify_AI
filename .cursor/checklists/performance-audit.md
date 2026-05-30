# Performance Audit Checklist — Shopify Theme

Run before launch and after major feature releases.
Document scores in PR or ticket for regression tracking.

---

## Measurement Setup

- [ ] Test on **mobile** Lighthouse (throttled 4G, Moto G Power emulation)
- [ ] Test pages: Homepage, Collection, Product (best seller), Cart
- [ ] Run PageSpeed Insights for field data (if site has traffic)
- [ ] Run `shopify theme check` for performance-related offenses
- [ ] Test with apps enabled (apps often cause regressions)

## LCP (Largest Contentful Paint) — Target < 2.5s

- [ ] Identify LCP element on each key template (usually hero or product image)
- [ ] LCP image uses `loading="eager"` and `fetchpriority="high"`
- [ ] LCP image preloaded if discovered late in HTML parse
- [ ] LCP image served at appropriate width (not oversized)
- [ ] Web fonts preloaded if they affect LCP text rendering
- [ ] Server response time (TTFB) acceptable — check Shopify status if slow
- [ ] No render-blocking CSS/JS delaying LCP paint

### LCP Score Log

| Page | LCP (s) | LCP Element | Pass? |
|------|---------|-------------|-------|
| Homepage | | | ☐ |
| Collection | | | ☐ |
| Product | | | ☐ |

## CLS (Cumulative Layout Shift) — Target < 0.1

- [ ] All images have explicit width/height or CSS `aspect-ratio`
- [ ] Web fonts use `font-display: swap`
- [ ] Ad/banner slots reserve space before content loads
- [ ] Lazy-loaded sections don't push content down unexpectedly
- [ ] Cookie/consent banners don't shift page content after load
- [ ] Product variant switch doesn't cause gallery height jump
- [ ] Cart drawer animation doesn't shift page layout

### CLS Score Log

| Page | CLS | Top Shift Culprit | Pass? |
|------|-----|-------------------|-------|
| Homepage | | | ☐ |
| Collection | | | ☐ |
| Product | | | ☐ |

## INP (Interaction to Next Paint) — Target < 200ms

- [ ] Add-to-cart responds within 200ms (perceived — show loading state)
- [ ] Mobile menu toggle is instant
- [ ] Search input debounced (300ms) — not firing on every keystroke
- [ ] No long tasks (> 50ms) on main thread during interactions
- [ ] Third-party scripts not blocking input handlers
- [ ] Variant picker doesn't trigger excessive re-renders

## Asset Audit

### CSS
- [ ] Total CSS per page < 100KB uncompressed (guideline)
- [ ] Template-specific CSS scoped — not all CSS on all pages
- [ ] Unused Dawn CSS not duplicated in custom files
- [ ] Critical above-fold CSS inlined if < 4KB

### JavaScript
- [ ] Theme JS loaded with `defer`
- [ ] No duplicate library loads (jQuery, etc.)
- [ ] Custom JS split by feature where possible
- [ ] `requestIdleCallback` used for non-critical init

### Images
- [ ] All product images use responsive `srcset` / `widths`
- [ ] SVG icons used for UI elements (not PNG icons)
- [ ] No full-resolution images displayed at thumbnail size
- [ ] Lazy loading on all below-fold images

## Third-Party Scripts

- [ ] Inventory all scripts: apps, analytics, chat, reviews, pixels
- [ ] Each script loads async or defer
- [ ] Non-critical scripts delayed until scroll/click/idle
- [ ] No synchronous GTM/GA in `<head>`
- [ ] App embed blocks reviewed for render impact

| Script/App | Load Method | Blocks Render? | Action Needed |
|------------|-------------|----------------|---------------|
| | | | |

## Liquid / Server Performance

- [ ] Section count per template ≤ 15 (ideal)
- [ ] No nested loops over large collections without pagination
- [ ] Minimal logic in `layout/theme.liquid`
- [ ] Metafield checks use `!= blank` before expensive renders

## Network Waterfall Review

- [ ] Total page weight < 3MB on homepage (guideline)
- [ ] Request count reasonable (< 80 on initial load)
- [ ] No 404 asset requests
- [ ] Fonts limited to 2 families / 4 files max

## Recommendations Template

After audit, document findings:

```markdown
## Performance Audit — [Date]

### Summary
- Homepage: LCP __s | CLS __ | INP __ms
- Product: LCP __s | CLS __ | INP __ms

### Critical Fixes (before launch)
1. ...

### Improvements (post-launch)
1. ...

### Monitoring
- Set up Search Console CWV report
- Re-audit in 30 days
```

---

**Auditor:** _______________ **Date:** _______________
