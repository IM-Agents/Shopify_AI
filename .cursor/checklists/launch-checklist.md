# Launch Checklist — Shopify Theme

Complete before publishing theme to production or handing off to merchant.
Every item should be checked — launches are hard to roll back cleanly.

---

## Pre-Launch — Development Complete

- [ ] All feature PRs merged to `staging` and QA signed off
- [ ] `shopify theme check` passes with zero errors
- [ ] No Dawn original files modified (verify with `git diff main --name-only`)
- [ ] All custom files follow `custom-` naming convention
- [ ] README updated with setup instructions and theme IDs
- [ ] `.shopify/metafields.json` reflects all custom metafield definitions

## Pre-Launch — Content & Configuration

- [ ] Theme settings configured in staging (colors, fonts, favicon)
- [ ] Header/footer navigation menus assigned in Admin
- [ ] Homepage sections configured with production content
- [ ] Collection templates assigned to key collections
- [ ] Product templates assigned where alternate templates exist
- [ ] 404, password, and policy pages reviewed
- [ ] Legal pages linked in footer (Privacy, Terms, Refund, Shipping)
- [ ] Social media links configured in theme settings
- [ ] Logo, favicon, and OG image uploaded

## Pre-Launch — SEO

- [ ] Page titles and meta descriptions set (not default Dawn placeholders)
- [ ] Product SEO fields populated for top SKUs
- [ ] Collection SEO titles/descriptions set
- [ ] Canonical URLs correct (no staging domain indexed)
- [ ] `robots.txt.liquid` allows crawling (if customized)
- [ ] Structured data valid (Google Rich Results Test on product page)
- [ ] XML sitemap accessible at `/sitemap.xml`
- [ ] 301 redirects configured for any URL changes (if replatforming)

## Pre-Launch — Performance

- [ ] Performance audit completed (see `performance-audit.md`)
- [ ] LCP < 2.5s on homepage and product page
- [ ] CLS < 0.1 on key templates
- [ ] Hero images optimized with correct loading attributes
- [ ] Third-party scripts audited and deferred

## Pre-Launch — Accessibility

- [ ] Keyboard navigation verified on all key flows
- [ ] Screen reader spot check (VoiceOver or NVDA)
- [ ] Color contrast verified on buttons and text
- [ ] All form fields labeled
- [ ] Skip link functional

## Pre-Launch — Commerce Flows

- [ ] Test order placed successfully on staging (full checkout)
- [ ] Payment provider active and tested (Shopify Payments / PayPal / etc.)
- [ ] Shipping rates configured and displaying correctly
- [ ] Tax settings verified for target markets
- [ ] Discount codes tested (if applicable)
- [ ] Inventory tracking verified
- [ ] Order confirmation email reviewed
- [ ] Abandoned checkout email active (if applicable)

## Pre-Launch — Apps & Integrations

- [ ] All required apps installed and configured
- [ ] App embed blocks enabled in Theme Editor → Theme settings → App embeds
- [ ] Reviews app displaying on product pages
- [ ] Analytics (GA4, Meta Pixel) firing correctly — verify in Tag Assistant
- [ ] Email marketing integration connected (Klaviyo, etc.)
- [ ] ERP/inventory sync verified (if applicable)

## Pre-Launch — International (if applicable)

- [ ] Markets configured in Shopify Admin
- [ ] Currency switcher functional
- [ ] Language translations complete in locale files
- [ ] Country-specific shipping and pricing tested
- [ ] GDPR/cookie consent implemented for EU traffic

## Launch Day — Deployment

- [ ] Backup current live theme (duplicate in Admin before publish)
- [ ] Final `shopify theme push --theme [LIVE_THEME_ID]` from `main` branch
- [ ] Publish theme in Shopify Admin → Online Store → Themes
- [ ] Verify live URL loads correctly (not preview URL)
- [ ] Remove or unpublish old theme after 24h stability window
- [ ] Disable staging preview links shared externally

## Launch Day — Smoke Test (Live)

- [ ] Homepage loads correctly
- [ ] Add to cart → checkout → confirmation (live payment test)
- [ ] Search returns results
- [ ] Account login/register works
- [ ] Mobile experience verified on real device
- [ ] Contact form submits successfully
- [ ] No console errors on key pages

## Post-Launch — Monitoring (First 48 Hours)

- [ ] Monitor Shopify Admin → Analytics for traffic anomalies
- [ ] Check Google Search Console for crawl errors
- [ ] Monitor Core Web Vitals in PageSpeed Insights
- [ ] Watch for customer support tickets about site issues
- [ ] Verify order flow end-to-end with real customer orders
- [ ] Confirm analytics data flowing to dashboards

## Post-Launch — Handoff (Agency → Merchant)

- [ ] Merchant trained on Theme Editor for section management
- [ ] Documentation for custom sections and metafields provided
- [ ] Admin access confirmed for merchant team
- [ ] Support SLA and contact defined
- [ ] Git repository access transferred (if applicable)
- [ ] `shopify.theme.toml` updated with production theme IDs

---

## Launch Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | | |
| QA | | | |
| Project Manager | | | |
| Merchant/Client | | | |

**Go-live time:** _______________ **Rollback theme ID (backup):** _______________
