---
name: shopify-performance
description: >-
  Shopify theme performance optimization — Core Web Vitals (LCP, CLS, INP),
  asset loading, image strategy, and third-party script management. Use when
  auditing speed, fixing layout shift, or optimizing above-the-fold rendering.
---

# Shopify Theme Performance

## When to Use

- Core Web Vitals failing in PageSpeed Insights or Search Console
- Hero images loading slowly (LCP)
- Layout jumping on load (CLS)
- Sluggish interactions (INP)
- Pre-launch performance audit

## Targets

| Metric | Good | Needs Work |
|--------|------|------------|
| LCP | < 2.5s | > 4.0s |
| CLS | < 0.1 | > 0.25 |
| INP | < 200ms | > 500ms |

## LCP Optimization

Hero/banner images — always eager + high priority:

```liquid
{{ image
  | image_url: width: 1500
  | image_tag:
    loading: 'eager',
    fetchpriority: 'high',
    widths: '750, 1100, 1500',
    sizes: '100vw',
    alt: image.alt
}}
```

Below-fold images — always lazy:

```liquid
{{ image | image_url: width: 800 | image_tag: loading: 'lazy', alt: image.alt }}
```

Preload critical assets in `layout/theme.liquid`:

```liquid
<link rel="preload" href="{{ 'font-name.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
{{ 'custom-base.css' | asset_url | preload_tag: as: 'style' }}
```

## CLS Prevention

- Set explicit `width`/`height` on images OR use `aspect-ratio` CSS
- Reserve space for lazy content with `min-height` or skeletons
- `font-display: swap` on all `@font-face` declarations
- Never inject banners/notices above existing content after load

## INP / JavaScript

- Debounce search/filter inputs (300ms)
- Use `requestIdleCallback` for non-critical init
- Avoid long synchronous tasks on click/tap handlers
- Load third-party scripts with `defer` or after first interaction:

```javascript
document.addEventListener('scroll', loadAnalytics, { once: true, passive: true });
```

## CSS Loading Strategy

Scope template-specific CSS:

```liquid
{% if template == 'product' %}
  {{ 'custom-product-page.css' | asset_url | stylesheet_tag }}
{% endif %}
```

- Global overrides only in `custom-base.css`
- Inline critical CSS when < 4KB and above-the-fold

## Image Srcset

```liquid
srcset="
  {{ image | image_url: width: 400 }} 400w,
  {{ image | image_url: width: 800 }} 800w,
  {{ image | image_url: width: 1200 }} 1200w
"
```

Let Shopify CDN handle format negotiation (WebP/AVIF).

## Third-Party Scripts

Priority order for loading:
1. Theme critical JS (defer)
2. App scripts required for conversion (defer, bottom of body)
3. Analytics/chat (after interaction or idle)

Never load GTM/GA synchronously in `<head>`.

## Liquid Performance

- Reduce section count per page (blocks > sections)
- Paginate collections — don't render 50+ products server-side
- Minimize logic in `layout/theme.liquid`

## Measurement Tools

```bash
shopify theme check                    # Theme Check linter
```

- Chrome DevTools → Lighthouse (mobile, throttled)
- PageSpeed Insights (field + lab data)
- Shopify Admin → Online Store → Themes → View performance (if available)

## Audit Workflow

1. Run Lighthouse on homepage, collection, product, cart
2. Identify LCP element — usually hero image or product image
3. Check CLS culprits in DevTools → Performance → Layout shifts
4. Review Network tab for render-blocking resources
5. Document fixes in PR with before/after scores

## References

- `.cursor/rules/performance.mdc`
- `.cursor/checklists/performance-audit.md`
