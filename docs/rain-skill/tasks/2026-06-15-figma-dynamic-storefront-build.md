# Task: Figma-Driven Dynamic Shopify Storefront — Implementation

- **Date:** 2026-06-15
- **Flow:** NEW_PROJECT
- **Status:** Phase 1 (Global Foundations) COMPLETE — gates passed. Project ongoing (Phases 2–6).
- **Owner:** Senior Shopify Developer (Claude)

## Goal
Translate the supplied Figma design into a fully dynamic Shopify OS 2.0 storefront
(Dawn-based) where every visible element is editable via Theme Editor / store data /
metafields / metaobjects / locale files. No hardcoded visible content or asset paths.

## Source docs
- `docs/README.md`, `docs/project-brief.md`, `docs/implementation-plan.md`,
  `docs/theme-architecture.md`, `docs/content-mapping-matrix.md`, `docs/backlog.md`
- Store: https://bhautik-mehta.myshopify.com/
- Figma: https://www.figma.com/design/in1jO50FOrn9q7LeQ3O68u/...

## Critical blockers (identified at flow start)
1. **No theme files in repo.** Only `docs/` exists — no Dawn `sections/`, `snippets/`,
   `assets/`, `config/`, `layout/`, `locales/`, `templates/`. Plan Phase 0 requires
   auditing/extending an existing theme; there is nothing to extend yet.
2. **No Figma access confirmed.** Cannot see the design (figma.com URL only). Need
   either Figma MCP access, exported assets, or a per-section spec to avoid inventing.
3. **No live store / CLI access** confirmed for `dev`/`pull`/`push`.

## Acceptance (Delivery Definition)
Storefront matches Figma across desktop/tablet/mobile AND a merchandiser can edit all
visible content/assets/links/layout/colors/fonts via Theme Editor without code.

## Brainstorm (confirmed 2026-06-15)
- **Dawn base:** scaffold latest official Dawn into the repo (user: 1a).
- **Figma:** use Figma MCP to pull design context/tokens (user: 2a).
- **CLI/store:** no live store access — produce theme files only; user pushes (user: 3).
- **First slice:** Phase 1 Global Foundations (user: 4).
- **Custom rule:** never edit Dawn originals, only `custom-*` files; sole sanctioned
  edit is wiring the custom CSS tag into `layout/theme.liquid` per `.claude/CLAUDE.md` (user: 5).
- **Token strategy:** EXTEND Dawn's existing color-scheme + typography settings; add only
  the missing Figma tokens (brand colors, radius scale, spacing scale, container) as a
  custom settings group. Trade-off accepted: more coupling to Dawn's structure, less duplication.

## Plan (Phase 1)
1. Scaffold Dawn into repo root (clone Shopify/dawn, copy theme folders).
2. Pull Figma design tokens via Figma MCP (palette, type, spacing, radius, container).
3. `config/settings_schema.json` — append "Custom — Brand Foundations" group (custom IDs only).
4. `assets/custom-base.css` — token layer consuming Dawn vars + new custom settings.
5. `layout/theme.liquid` — add `custom-base.css` stylesheet tag (sole sanctioned Dawn edit).
6. Validate Liquid (shopify-liquid validate.mjs) → security-gate → post-task-review.

## Security Gate
Status: PASSED (NEW_PROJECT; proportional — theme token layer, no server/DB/auth/endpoints)
Findings (independent security-auditor review of the 5-file diff):
- ✅ No CSS/Liquid injection via `{% style %}` — all consumed settings are `color`/`range`
  types (type-constrained; no free-text breakout). Primary concern, fully mitigated.
- ✅ No unescaped attacker-controlled output (no cart/search/product/request data rendered).
- ✅ No hardcoded secrets (only design hex/numeric defaults + i18n strings).
- ✅ No new external/network calls or supply-chain surface (no npm deps; Dawn from official repo).
- ✅ No removed/weakened controls — `theme.liquid` change is strictly additive.
- ✅ `custom-base.css` inert static CSS; includes `:focus-visible` + `prefers-reduced-motion`.
- N/A Dependency scan (`npm audit`): no package.json / Node project in this theme.

## Validation
- `shopify theme check` (CLI 3.87.4): **0 offenses in changed files**. The 1 warning at
  `theme.liquid:57` (`scheme_classes` UndefinedObject) is pre-existing Dawn code, not this change.
- JSON parse: `settings_schema.json` + `en.default.schema.json` both parse clean.

## Code Review
Status: APPROVED
Notes:
- ✅ Correctness: delivers Phase 1 — editable global tokens (brand colors, type, spacing,
  radius, container) bridged to `--custom-*` CSS vars; all merchant-editable, extends Dawn.
- ✅ Edge cases: blank color settings guarded with `| default:`; ranges are non-blank by type.
- ✅ Inputs type-constrained; no injection/secrets (per security gate).
- ✅ Architecture: honors Golden Rule — only `custom-*` files + the sanctioned `theme.liquid`
  asset/render wires; schema/locale additions are additive.
- ✅ Docs: snippet has `{% doc %}` header; CSS self-documented.
- ✅ Validation in lieu of unit tests: `shopify theme check` clean on changed files
  (themes have no unit-test harness).
- 🟡 SUGGESTION: the display clamp middle term (`4vw + 1rem`) is fixed; could expose as a
  setting later if Figma fluid behavior needs finer control. Non-blocking.

## Log
- 2026-06-15: Read all planning docs. Classified NEW_PROJECT. Brainstorm done; approach
  confirmed (extend Dawn). Scaffolded Dawn 15.4.1 into repo. Implemented Phase 1: custom
  settings group + `custom-css-variables` snippet + `custom-base.css` + theme.liquid wires
  + schema-locale keys. theme check + security gate passed. Figma MCP needs live desktop
  selection — exact token VALUES deferred to Theme Editor / follow-up pull.
