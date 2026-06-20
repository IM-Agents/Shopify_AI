# Bugs Fixed

> Stub. The BUG_FIX flow files entries here automatically.

Format per entry:
- **[YYYY-MM-DD] Title** — Symptom · Root cause · Fix · Files touched · Test added.

- **[2026-06-15] Theme failed to upload to store (range schema rules)** — Symptom: `shopify theme
  push` returned "Invalid schema" errors and cascading "Section type 'custom-image-banner' does not
  refer to an existing section file"; the section silently failed to create, breaking every template
  that referenced it. Root cause: two Shopify range-setting rules that **`shopify theme check` does
  NOT catch** — (1) range `step` must have ≤1 decimal digit (`overlay_opacity` had `step: 0.05` in
  `custom-hero.liquid` + `custom-image-banner.liquid`); (2) a range `default` must land exactly on a
  step (`custom-image-banner` `max_width` default `1444` with min 800/step 20 is off-step). Fix:
  step `0.05`→`0.1`; default `1444`→`1440`. Files: `sections/custom-hero.liquid`,
  `sections/custom-image-banner.liquid`. Verified by a clean `shopify theme push` (no errors) +
  `shopify theme dev` serving home/collection/product at HTTP 200. **Lesson: theme-check is
  necessary but not sufficient — a real `theme push` is the authoritative validator.**
