# Code Review Checklist — Shopify Theme

Use this checklist when reviewing PRs or self-reviewing before merge.
Reference project rules in `.cursor/rules/` for detailed standards.

---

## Scope & Architecture

- [ ] Only `custom-` prefixed files added/modified — no Dawn originals touched
- [ ] New sections have `{% schema %}` with presets (if editor-addable)
- [ ] Snippets receive all data via `{% render %}` parameters (isolated scope)
- [ ] JSON templates contain no Liquid logic
- [ ] Alternate templates used only when page layout genuinely differs
- [ ] Section count per template reasonable (< 15 preferred)

## Liquid Quality

- [ ] `{% render %}` used instead of deprecated `{% include %}`
- [ ] User-facing strings use `{{ 'key' | t }}` — no hardcoded English
- [ ] New translation keys added to `locales/en.default.json`
- [ ] Schema labels use `t:namespace.key` in `en.default.schema.json`
- [ ] Metafields checked with `!= blank` before render
- [ ] Metafield access uses `.value` (not REST Admin syntax)
- [ ] Images use `image_url` + `image_tag` (not deprecated filters)
- [ ] Dynamic strings escaped with `| escape` in HTML attributes
- [ ] No business logic duplicated across sections — extracted to snippets

## JavaScript

- [ ] Custom JS in `assets/custom-*.js` — not editing `global.js`
- [ ] Theme editor events handled (`shopify:section:load`, etc.)
- [ ] No reliance on `DOMContentLoaded` alone for editor compatibility
- [ ] Fetch/AJAX uses Cart API or Section Rendering API correctly
- [ ] Event listeners debounced where appropriate (search, quantity)
- [ ] No synchronous third-party script loading

## CSS

- [ ] Overrides in `custom-base.css` or scoped `custom-[feature].css`
- [ ] No inline styles — CSS custom properties for dynamic values
- [ ] Template-scoped CSS loaded conditionally (not global bloat)
- [ ] No `outline: none` without visible focus replacement
- [ ] Responsive breakpoints tested at 375px, 768px, 990px, 1440px

## Accessibility

- [ ] All images have meaningful `alt` (or `alt=""` + `aria-hidden` if decorative)
- [ ] Icon-only buttons have `aria-label` or visually hidden text
- [ ] Forms have proper `<label>` associations
- [ ] Dynamic updates use `aria-live` regions (cart count, search results)
- [ ] Modals/drawers manage focus on open/close
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 normal, 3:1 large text)
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Keyboard navigation works for all interactive elements

## Performance

- [ ] Hero/LCP images: `loading="eager"` + `fetchpriority="high"`
- [ ] Below-fold images: `loading="lazy"`
- [ ] Images have explicit dimensions or `aspect-ratio` (CLS prevention)
- [ ] No unnecessary global CSS/JS added to every page
- [ ] Third-party scripts deferred or interaction-gated

## Git & Deployment

- [ ] Commit messages follow conventional format (`feat:`, `fix:`, etc.)
- [ ] PR targets `staging` (not direct to `main`)
- [ ] `config/settings_data.json` not committed
- [ ] PR includes theme preview URL
- [ ] Visual changes include before/after screenshots
- [ ] `shopify theme check` passes

## Review Severity Guide

When leaving feedback, classify issues:

| Level | Label | Action |
|-------|-------|--------|
| Critical | 🔴 | Must fix before merge — bugs, a11y blockers, Dawn file edits |
| Suggestion | 🟡 | Should fix — performance, maintainability, missing i18n |
| Optional | 🟢 | Nice to have — naming, minor refactors |

---

**Reviewer sign-off:** _______________ **Date:** _______________
