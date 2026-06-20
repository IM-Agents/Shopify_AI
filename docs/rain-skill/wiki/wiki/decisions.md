# Decisions

> Stub. Record significant decisions ADR-style: Context → Decision → Consequences.

Pre-existing project decisions (from `.claude/CLAUDE.md` and `docs/`):
- **ADR-0001 — Never modify Dawn originals.** All customization via `custom-*` files
  and CSS/JS overrides. Rationale: clean upgrade path for Dawn. Consequence: every
  new section/snippet/asset uses the `custom-` prefix.
- **ADR-0002 — Everything editable.** All visible content must be Theme-Editor /
  metafield / metaobject / locale driven; no literal copy in templates.

- **ADR-0003 — Scaffold official Dawn 15.4.1 as the base (2026-06-15).** Cloned
  `Shopify/dawn` into the repo so there is a concrete theme to extend. Consequence:
  Dawn originals are the baseline; all customization is additive `custom-*`.
- **ADR-0004 — Extend Dawn's token system, don't parallel it (2026-06-15).** Phase 1
  reuses Dawn's color-scheme + typography settings and adds only the missing Figma tokens
  (brand colors, spacing scale, radius scale, narrow container, letter-spacing, fluid display)
  as a "Custom — Brand Foundations" group. Rationale: less duplication than a fully parallel
  token layer. Trade-off: more coupling to Dawn's settings structure. See [[architecture]].
- **ADR-0005 — Settings→CSS bridge via a snippet (2026-06-15).** A static `assets/*.css`
  file cannot read `{{ settings }}`, so `snippets/custom-css-variables.liquid` emits a
  `{% style %} :root {...}` block; `custom-base.css` consumes the resulting `var(--custom-*)`.

- **ADR-0006 — Header built as a standalone from-scratch section (2026-06-15).** Per user
  choice, `sections/custom-header.liquid` is a new section (not a restyle of Dawn's
  `header.liquid`), giving full control to match the Figma header. Trade-off accepted:
  re-implements nav/drawer/icons/localization and must be maintained independently of Dawn's
  tested header. Nav comes from a `link_list` setting; logo from `image_picker`; icons via
  Shopify routes; language via the `localization` form. See [[architecture]], [[api-contracts]].

- **ADR-0007 — Wire the storefront via templates/section-groups, keep Dawn originals (2026-06-15).**
  `templates/index.json`, `collection.json`, `product.json` and the header/footer section groups
  now reference the `custom-*` sections. Dawn's stock sections/`header.liquid`/`footer.liquid` are
  left in place but unreferenced — reversible in the Theme Editor, no Dawn liquid edited.
- **ADR-0008 — Price filter uses `money_without_currency`, not cents (2026-06-15).** The
  filter-sort skill says "submit cents"; Dawn's authoritative `snippets/price-facet.liquid` uses
  `filter.min_value.value | money_without_currency` (major units). We follow Dawn. See [[api-contracts]].
- **ADR-0009 — Real-time filtering & recommendations via Section Rendering API (2026-06-15).**
  Collection facets/sort and product recommendations fetch `?section_id=` and swap innerHTML
  (same-origin, server-escaped) with `history.pushState`; collection has a no-JS form fallback.

Add new decisions below as they are made.
