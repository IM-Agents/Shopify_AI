# Task: Content pages — Mission, Che Storia, Contatti

- **Date:** 2026-06-15
- **Flow:** FEATURE (within NEW_PROJECT storefront build)
- **Figma:** Mission `35:787`, Che Storia `2462:1367`, Contatti `2396:684`.
- **Status:** COMPLETE — both gates passed, wiki filed.

## Brainstorm
Escape-hatch ("yes"/continue). Approach fixed. Pages are long content compositions of repeating
patterns → build the reusable pieces, compose via alternate page templates.

## Design → mapping
- Mission: hero → rich-text → stat cards → 3× alternating image+text (MEGLIO PER…) → testimonials.
- Che Storia: hero → intro → alternating image+text steps (COME LO FACCIAMO).
- Contatti: hero → CTA/intro → contact methods → addresses + contact form.

## Implementation
New reusable sections:
- `sections/custom-image-with-text.liquid` — alternating image/text (position left/right, ratio,
  eyebrow/heading/richtext/CTA, colors). Reused across Mission + Che Storia.
- `sections/custom-contact.liquid` — `{% form 'contact' %}` (name/email/phone/message) with
  success/error, escaped repopulation; heading + richtext intro.
Alternate page templates (composed from existing + new sections):
- `templates/page.mission.json` — image-banner, rich-text, icon-columns (stats), 3× image-with-text, icon-columns (testimonials).
- `templates/page.che-storia.json` — image-banner, rich-text, 3× image-with-text.
- `templates/page.contatti.json` — image-banner, rich-text, icon-columns (methods), contact.
Locales: `custom.image_with_text.*`, `custom.contact.*` (schema) + `custom.contact.*` (storefront).

## Validation
- `shopify theme check`: **0 offenses** in all changed files. All JSON parses clean.

## Security Gate
Status: PASSED (FEATURE; independent security-auditor — all PASS, 0 BLOCKING / 0 WARNING)
- ✅ `{% form 'contact' %}` CSRF platform-handled; `default_errors` is sanitized localized output.
- ✅ Reflected form values explicitly `| escape`d (name/email/phone/body) — no reflected XSS
  (Shopify Liquid does NOT auto-escape, so this is required, not just hardening).
- ✅ richtext unescaped (sanitized type), url-type href, closed-enum class interpolation safe.
- ✅ No secrets / external calls / weakened controls.

Gate Status: PASSED

## Code Review
Status: APPROVED
- ✅ Correctness: 3 page templates match the designs' structure via reusable + 2 new sections.
- ✅ Edge cases: image placeholder, disabled empty CTA, contact errors/success, blank guards.
- ✅ DRY: reuses image-banner/rich-text/icon-columns; image-with-text reused across 2 pages.
- ✅ Architecture: alternate `page.<suffix>.json` templates (assign in Admin); theme-check clean.
- 🟡 SUGGESTION: pages need the merchant to (a) create the Page in Admin + assign the template,
  (b) fill images/copy. Map embed + a dedicated testimonials/reviews section are future work
  (testimonials currently use icon-columns as placeholder).

Review Status: APPROVED
