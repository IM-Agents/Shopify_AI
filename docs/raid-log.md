# RAID Log

## Risks

| ID | Risk | Impact | Mitigation | Status |
|---|---|---|---|---|
| R1 | Figma access may not include inspect/export permissions. | Asset inventory and fidelity work may be delayed. | Confirm permissions before Phase 0 completion. | Open |
| R2 | Existing theme may have limited OS 2.0 support or conflicting architecture. | More refactoring may be required. | Audit first and extend current conventions where possible. | Open |
| R3 | Required fonts may not be available in Shopify font picker. | Typography fidelity may be affected. | Use uploaded font files from Content > Files with dynamic references where required. | Open |
| R4 | Search & Discovery facets may not be configured for all required metafields. | Filtering scope may be incomplete. | Define metafield filters during Phase 4 and configure app facets. | Open |
| R5 | Figma content may include imagery/copy not present in Shopify data. | Build may be tempted to hardcode placeholders. | Keep placeholders as Theme Editor settings or store data only; do not invent domain facts. | Open |
| R6 | Pixel fidelity may conflict with existing theme CSS. | Additional CSS cleanup may be needed. | Scope CSS tokens carefully and isolate section styles. | Open |

## Assumptions

| ID | Assumption | Validation |
|---|---|---|
| A1 | Shopify admin/theme access will be available. | Confirm before development begins. |
| A2 | Development will occur on a duplicated/unpublished theme. | Confirm in Shopify admin workflow. |
| A3 | Final copy, products, prices, images, and domain facts will come from Shopify data or client-approved Theme Editor inputs. | Validate during content mapping. |
| A4 | The supplied store URL and Figma URL are the authoritative references. | Confirm during project kickoff. |
| A5 | Mobile, tablet, and desktop Figma frames are available or can be inferred with stakeholder approval. | Validate during Figma inventory. |

## Issues

| ID | Issue | Owner | Resolution | Status |
|---|---|---|---|---|
| I1 | No implementation signoff has been recorded yet for the completed node-level mapping matrix. | Project DRI | Complete matrix against actual Figma node tree and obtain signoff before build per section. | Open |

## Dependencies

| ID | Dependency | Needed for | Status |
|---|---|---|---|
| D1 | Figma inspect/export access | Asset inventory and fidelity mapping | Open |
| D2 | Shopify admin access | Theme duplication, asset upload, Search & Discovery config | Open |
| D3 | Existing theme source access | Audit and implementation | Open |
| D4 | Client approval of mapping matrix | Section build sequencing | Open |
| D5 | Product/collection/metafield data readiness | Dynamic product, collection, badge, swatch, and filter rendering | Open |
