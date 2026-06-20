# Open Questions

> Stub. Track unresolved questions that block or shape work.

Format: **Q:** question · **Why it matters** · **Owner** · **Status**.

Resolved:
- ~~**Q:** When will the Dawn theme base files be added to the repo?~~ · **RESOLVED
  2026-06-15** — Dawn 15.4.1 scaffolded into the repo. See [[architecture]].

Open:
- **Q:** How will exact Figma token values (palette, type scale, spacing) be captured? ·
  *The connected Figma MCP is desktop-selection-based — `get_variable_defs`/`get_design_context`
  require a frame selected in the Figma desktop app; remote calls to page `0:1` return empty.* ·
  *Blocks 1:1 visual fidelity; does NOT block building editable structure.* ·
  Options: (a) user selects frames in Figma desktop so MCP can extract; (b) values entered
  directly in Theme Editor; (c) export specs into the repo. · Status: open.
- **Q:** No live Shopify store / CLI push access in this environment — who runs
  `shopify theme push` to `bhautik-mehta.myshopify.com`? · Status: open (user pushes).
