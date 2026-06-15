# Task: Image Banner + Blog Posts + Footer (homepage completion)

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Figma:** file `cLfM2HHwBgVRITNEqCZZqa` — banner `35:711`, blog `2459:934`, footer `12:850`.
- **Status:** COMPLETE — both gates passed, wiki filed. Homepage section set complete.

## Brainstorm
Escape-hatch ("yes"/continue). Approach fixed: standalone custom-* sections, extend tokens,
live data, no invented copy.

## Design → mapping
- Banner (`35:711`): full-bleed decorative image → `custom-image-banner` (image + optional overlay/link).
- Blog (`2459:934`): 3 article cards + "VAI AL BLOG" → `custom-blog-posts` (Shopify blog → articles).
- Footer (`12:850`): logo, legal/contact text, link columns, newsletter, social → `custom-footer`.

## Implementation
- `sections/custom-image-banner.liquid` — image (desktop/mobile) + optional overlay heading/text/
  button + optional link wrap; full-width/contained; overlay; placeholder fallback.
- `sections/custom-blog-posts.liquid` — blog picker → article grid (article.image/title/url),
  heading + "VAI AL BLOG" link, columns, empty state.
- `sections/custom-footer.liquid` — standalone footer (enabled_on footer group): logo (+shop.name
  fallback), about/contact richtext, menu columns via blocks (heading + link_list), newsletter
  (`form 'customer'` + contact[tags]=newsletter, success/error), social icons from Dawn
  `settings.social_*_link`, copyright. Preset with 3 menu blocks.
- `snippets/custom-icon.liquid` — added facebook/instagram/tiktok/youtube/twitter/pinterest.
- Locales: `custom.blog.empty`, `custom.footer.email_label`/`newsletter_success` (storefront);
  `custom.banner.*`/`custom.blog.*`/`custom.footer.*` (schema).

## Validation
- `shopify theme check`: **0 offenses** in changed files. Both locale JSON files parse clean.

## Security Gate
Status: PASSED (FEATURE; independent security-auditor — 4 PASS, 0 BLOCKING / 0 WARNING)
- ✅ `{% form 'customer' %}` newsletter: CSRF platform-handled; error/`form.email` output is
  Shopify-generated / attribute-escaped (canonical Dawn pattern).
- ✅ href scheme XSS: social_*_link / article.url / link.url / banner link are url-type or
  platform-generated — no `javascript:`/`data:` vector.
- ✅ richtext (banner text, about/contact) unescaped is correct (sanitized type).
- ✅ block outputs escaped; `block.shopify_attributes` present; icon allow-list fail-closed.
- ✅ newsletter_button text setting now `| escape`d. No secrets/external/weakened controls.

Gate Status: PASSED

## Code Review
Status: APPROVED
- ✅ Correctness: banner (image + optional overlay/link), blog (article cards + VAI AL BLOG),
  footer (logo, legal/contact, menu columns, newsletter, social, copyright) match Figma.
- ✅ Edge cases: banner no-image→placeholder, no-link→div wrap; blog no-blog→empty, no-image→
  placeholder; footer no-logo→shop.name, no-blocks→no menus, newsletter/social gated & conditional.
- ✅ Perf: lazy images + responsive widths/sizes; bounded loops; aspect-ratio (no CLS).
- ✅ DRY/architecture: standalone `custom-*` sections; footer uses blocks + `enabled_on` footer
  group; reuses Phase 1 tokens, `.custom-btn`, and the `custom-icon` snippet.
- ✅ Docs/i18n: icon doc updated; all UI text via `| t`; theme-check clean.
- 🟡 SUGGESTION: footer social pulls from Theme settings → Social media (documented in info).
  "BLOG" section maps press-style cards to Shopify blog articles (merchant sets titles/images).

Review Status: APPROVED
