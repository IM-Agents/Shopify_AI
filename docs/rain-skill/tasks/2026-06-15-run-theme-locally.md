# Task: Run the theme locally (shopify theme dev) + theme editor

- **Date:** 2026-06-15
- **Flow:** SMALL_TASK (operational; included 2 trivial schema-value bug fixes)
- **Status:** COMPLETE — local dev server running, gates passed.

## Reality
A Shopify theme can't run on a generic local server, and the Theme Editor is hosted by Shopify.
The local workflow is `shopify theme dev`, which serves a local preview (hot reload) and provides a
Customize/editor URL bound to a dev theme. It requires a CLI session for the store (one already
existed for `bhautik-mehta.myshopify.com`).

## What happened
1. `shopify theme dev` first reused dev theme #150622830769 which was **polluted with files from a
   prior build**; the delete-reconcile failed and the initial sync aborted on an Admin API 500.
2. Pushed to a **fresh unpublished theme** instead → surfaced real schema errors theme-check missed
   (see bugs-fixed: range step decimals + off-step default). Fixed both.
3. Clean push to theme **#150735880369 "CashewFicio Custom (dev)"** → no errors.
4. `shopify theme dev --theme 150735880369` → running.

## Evidence
- Clean `shopify theme push` (no errors/warnings).
- `curl http://127.0.0.1:9292/` → HTTP 200 (192 KB), HTML contains custom-header/hero/featured/
  footer/cart-drawer; `/collections/all` → 200; `/products/asd` → 200.

## URLs (dev theme #150735880369)
- Local preview: http://127.0.0.1:9292
- Theme editor (hot-reload bound): https://bhautik-mehta.myshopify.com/admin/themes/150735880369/editor?hr=9292
- Shareable preview: https://bhautik-mehta.myshopify.com/?preview_theme_id=150735880369

## Security Gate (SMALL_TASK 3-point)
PASSED — schema-value edits only (range step/default); no secrets, no injection, no control changed.

## Code Review (5-point)
APPROVED — defaults now valid steps; verified by clean push + dev server 200s; code clean; no dead code.

## Note
The `shopify theme dev` process runs in the background (CLI must stay open to keep the local server
and hot reload alive). Stopping it ends the local preview; the unpublished theme remains on the store.
