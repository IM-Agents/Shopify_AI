---
description: Shopify collection filtering and sorting. Use when building filter UI (checkboxes, price range From/To, boolean), sort-by dropdowns, active filter chips, or AJAX-based filter updates via the Section Rendering API.
---

# /shopify-filter-sort

$ARGUMENTS

---

## Task

Read and follow the full skill at `.claude/skills/shopify-collection-filter-sort/SKILL.md`.

### Steps

1. **Search latest Shopify docs first**
   Run: `node .claude/skills/shopify-collection-filter-sort/scripts/search_docs.mjs "<feature-name>"`
   Search for: `collection filters`, `filter type price_range`, `filter active_values`, `collection sort_options`, `section rendering api`

2. **Apply the skill patterns**
   Follow every rule in `.claude/skills/shopify-collection-filter-sort/SKILL.md` — especially:
   - Use `collection.filters` — never build filter arrays manually
   - Price range display uses `floor` for min, `ceil` for max (never truncate)
   - Price inputs submit cents (`display × 100`) — never dollars
   - `data-range-min` / `data-range-max` always on container (future slider ready)
   - Sort uses `collection.sort_options` — never hardcoded option values
   - Filter changes use Section Rendering API AJAX — never full page reload
   - Price number inputs debounced at 400–500ms

3. **Validate before returning**
   Run: `node .claude/skills/shopify-collection-filter-sort/scripts/validate.mjs --filename <name.liquid> --filetype sections --code '...' --model YOUR_MODEL --client-name cursor --client-version 1.0 --artifact-id <uuid> --revision 1`

4. **Fix and re-validate if needed** (max 3 retries)

5. **Return code only after validation passes**

---

## Usage Examples

```
/shopify-filter-sort Add price range filter with From and To inputs
/shopify-filter-sort Build a full filter sidebar with checkboxes and sort dropdown
/shopify-filter-sort Add active filter chips with individual remove links
/shopify-filter-sort Create AJAX filter updates without page reload
```
