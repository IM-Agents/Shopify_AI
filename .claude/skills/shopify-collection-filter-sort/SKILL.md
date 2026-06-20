# Skill: Shopify Collection Filtering & Sorting

**Trigger:** Use this skill whenever creating or editing:
- Collection page filtering (price range, tags, vendor, availability, etc.)
- Sort-by dropdowns on collection or search pages
- Active filter chips / "clear filters" UI
- AJAX-based filter updates (no full page reload)
- Any price range input (From/To fields or future slider)

---

## Required Tool Calls (do not skip)

You have a `bash` tool. Every response must use it — in this order:

1. Call `bash` with `scripts/search_docs.mjs "<query>"` — search latest Shopify docs before writing any code
   - For filter objects, search: `"collection filters"`, `"filter type price_range"`, `"filter active_values"`
   - For sort options, search: `"collection sort_options"`, `"sort_by parameter"`
   - For Section Rendering API, search: `"section rendering api sections parameter"`
2. Write the code using the search results combined with the patterns in this skill
3. Call `bash` with `scripts/validate.mjs --filename <name.liquid> --filetype <sections|snippets> --code '...' --model YOUR_MODEL_NAME --client-name YOUR_CLIENT_NAME --client-version YOUR_CLIENT_VERSION --artifact-id YOUR_ARTIFACT_ID --revision REVISION_NUMBER` — validate before returning
4. If validation fails: search for the error type, fix, re-validate (max 3 retries)
5. Return code only after validation passes

**You must run both `search_docs.mjs` and `validate.mjs` in every response. Do not return code without completing step 3.**

> **Note:** If `scripts/` dependencies are not installed, run `npm install` in this skill's directory first.

---

## What This Skill Covers (Gap from Shopify Toolkit)

The Shopify AI Toolkit covers Liquid array filters (`.where`, `.sort`) but covers **nothing** about Shopify's native storefront filtering system — the `collection.filters` object, URL-based filter params, the Section Rendering API for AJAX updates, or range filter architecture. This skill fills that entire gap.

---

## Core Shopify Filter Objects

### `collection.filters` — Array of Filter Objects

| Property | Type | Description |
|---|---|---|
| `filter.type` | string | `'list'`, `'price_range'`, or `'boolean'` |
| `filter.label` | string | Display label (e.g. "Brand", "Color", "Price") |
| `filter.param_name` | string | URL parameter name (e.g. `filter.p.vendor`) |
| `filter.values` | array | Available values — list filters only |
| `filter.active_values` | array | Currently applied values |
| `filter.min_value.value` | number | Applied min price (in cents) — price_range only |
| `filter.max_value.value` | number | Applied max price (in cents) — price_range only |
| `filter.range_min` | number | Absolute minimum across all products (in cents) |
| `filter.range_max` | number | Absolute maximum across all products (in cents) |

### `filter.values[]` — Individual Filter Value

| Property | Type | Description |
|---|---|---|
| `filter_value.label` | string | Display label |
| `filter_value.count` | number | Matching product count |
| `filter_value.active` | boolean | Is this filter currently applied |
| `filter_value.url_to_add` | string | Full URL to apply this filter |
| `filter_value.url_to_remove` | string | Full URL to remove this filter |
| `filter_value.param_name` | string | URL parameter name |
| `filter_value.value` | string | Raw value |

### `collection.sort_options` — Sort Options

| Property | Type | Description |
|---|---|---|
| `sort_option.name` | string | Display label |
| `sort_option.value` | string | URL value (e.g. `price-ascending`) |

### `collection.sort_by` — Current Sort Value
The currently active sort value. Defaults to `manual`.

---

## URL Parameter Structure

Shopify uses query-string parameters for all filter and sort state:

```
/collections/all?sort_by=price-ascending&filter.v.price.gte=1000&filter.v.price.lte=5000&filter.p.vendor=Nike
```

| Parameter | Example | Meaning |
|---|---|---|
| `sort_by` | `price-ascending` | Sort order |
| `filter.v.price.gte` | `1000` | Price min — in cents (100 = $1.00) |
| `filter.v.price.lte` | `5000` | Price max — in cents |
| `filter.p.vendor` | `Nike` | Product-level filter (vendor) |
| `filter.p.tag` | `sale` | Product tag filter |
| `filter.v.option.color` | `Red` | Variant option filter |
| `filter.p.m.*` | varies | Metafield-based filter |

---

## Pattern 1 — Rendering All Filters (List + Price Range + Boolean)

```liquid
{%- if collection.filters.size > 0 -%}
  <form id="FacetFiltersForm" class="facets__form">

    {%- for filter in collection.filters -%}

      {%- case filter.type -%}

      {%- when 'list' -%}
        <details class="facets__item" id="Details-{{ filter.param_name | handleize }}">
          <summary class="facets__summary">
            <span>{{ filter.label | escape }}</span>
            {%- if filter.active_values.size > 0 -%}
              <span class="facets__active-count" aria-label="{{ filter.active_values.size }} {{ 'accessibility.filters_applied' | t }}">
                {{ filter.active_values.size }}
              </span>
            {%- endif -%}
          </summary>
          <ul class="facets__list" role="list">
            {%- for value in filter.values -%}
              <li class="facets__list-item">
                <label class="facets__label{% if value.count == 0 and value.active == false %} facets__label--disabled{% endif %}">
                  <input
                    type="checkbox"
                    name="{{ value.param_name }}"
                    value="{{ value.value | escape }}"
                    id="Filter-{{ value.param_name | handleize }}-{{ forloop.index }}"
                    {% if value.active %}checked{% endif %}
                    {% if value.count == 0 and value.active == false %}disabled{% endif %}
                  >
                  <span class="facets__label-text">{{ value.label | escape }}</span>
                  <span class="facets__count">({{ value.count }})</span>
                </label>
              </li>
            {%- endfor -%}
          </ul>
        </details>

      {%- when 'price_range' -%}
        {%- render 'custom-filter-price-range', filter: filter -%}

      {%- when 'boolean' -%}
        <div class="facets__item facets__item--boolean">
          <label class="facets__label facets__label--boolean">
            <input
              type="checkbox"
              name="{{ filter.param_name }}"
              value="1"
              {% if filter.active_values.size > 0 %}checked{% endif %}
            >
            <span class="facets__label-text">{{ filter.label | escape }}</span>
          </label>
        </div>

      {%- endcase -%}

    {%- endfor -%}

    <button type="submit" class="visually-hidden">{{ 'collections.sorting.apply' | t }}</button>
  </form>
{%- endif -%}
```

---

## Pattern 2 — Price Range Filter Snippet

Create `snippets/custom-filter-price-range.liquid`.

This snippet is designed to support both the current **From/To input** UI and a future **slider** — the range bounds are always stored in `data-*` attributes so any UI can read them.

```liquid
{% doc %}
  Renders a price range filter with From/To inputs.
  Architected to support slider replacement: min/max bounds are always
  stored in data attributes and never computed inside the inputs themselves.

  @param {object} filter - The Shopify price_range filter object
{% enddoc %}

{%- liquid
  assign range_min_cents = filter.range_min
  assign range_max_cents = filter.range_max
  assign range_min_display = range_min_cents | divided_by: 100.0 | floor
  assign range_max_display = range_max_cents | divided_by: 100.0 | ceil

  assign applied_min_cents = filter.min_value.value | default: range_min_cents
  assign applied_max_cents = filter.max_value.value | default: range_max_cents
  assign applied_min_display = applied_min_cents | divided_by: 100.0 | floor
  assign applied_max_display = applied_max_cents | divided_by: 100.0 | ceil
-%}

<div
  class="facets__item facets__item--price-range"
  data-price-range-filter
  data-range-min="{{ range_min_cents }}"
  data-range-max="{{ range_max_cents }}"
  data-applied-min="{{ applied_min_cents }}"
  data-applied-max="{{ applied_max_cents }}"
>
  <details id="Details-{{ filter.param_name | handleize }}" open>
    <summary class="facets__summary">
      <span>{{ filter.label | escape }}</span>
      {%- if filter.min_value.value != blank or filter.max_value.value != blank -%}
        <span class="facets__active-count" aria-label="{{ 'accessibility.price_filter_applied' | t }}">1</span>
      {%- endif -%}
    </summary>

    <div class="price-range">

      {%- comment -%} FROM input {%- endcomment -%}
      <div class="price-range__field">
        <label class="price-range__label" for="Filter-Price-GTE">
          {{ 'collections.filters.from' | t }}
        </label>
        <div class="price-range__input-wrapper">
          <span class="price-range__currency">{{ cart.currency.symbol }}</span>
          <input
            class="price-range__input"
            type="number"
            id="Filter-Price-GTE"
            name="{{ filter.min_value.param_name }}"
            min="{{ range_min_display }}"
            max="{{ range_max_display }}"
            step="1"
            placeholder="{{ range_min_display }}"
            value="{{ applied_min_display }}"
            data-price-range-min
          >
        </div>
      </div>

      <span class="price-range__separator" aria-hidden="true">—</span>

      {%- comment -%} TO input {%- endcomment -%}
      <div class="price-range__field">
        <label class="price-range__label" for="Filter-Price-LTE">
          {{ 'collections.filters.to' | t }}
        </label>
        <div class="price-range__input-wrapper">
          <span class="price-range__currency">{{ cart.currency.symbol }}</span>
          <input
            class="price-range__input"
            type="number"
            id="Filter-Price-LTE"
            name="{{ filter.max_value.param_name }}"
            min="{{ range_min_display }}"
            max="{{ range_max_display }}"
            step="1"
            placeholder="{{ range_max_display }}"
            value="{{ applied_max_display }}"
            data-price-range-max
          >
        </div>
      </div>

      {%- comment -%}
        FUTURE SLIDER HOOK:
        Replace or augment the inputs above with a range slider element.
        The slider reads data-range-min / data-range-max from the parent
        [data-price-range-filter] container and drives the hidden inputs.
        The hidden input values (in cents) are what get submitted to Shopify.
        Example future hook:
          <price-range-slider
            data-min="{{ range_min_cents }}"
            data-max="{{ range_max_cents }}"
            data-value-min="{{ applied_min_cents }}"
            data-value-max="{{ applied_max_cents }}"
          ></price-range-slider>
      {%- endcomment -%}

    </div>
  </details>
</div>
```

---

## Pattern 3 — Sort By Dropdown

```liquid
<div class="facets__sort">
  <label class="facets__sort-label" for="SortBy">
    {{ 'collections.sorting.label' | t }}
  </label>
  <select
    name="sort_by"
    id="SortBy"
    class="facets__sort-select"
    aria-describedby="a11y-sort-announcement"
  >
    {%- for option in collection.sort_options -%}
      <option
        value="{{ option.value | escape }}"
        {% if option.value == collection.sort_by %}selected{% endif %}
      >
        {{ option.name | escape }}
      </option>
    {%- endfor -%}
  </select>
  <span id="a11y-sort-announcement" class="visually-hidden" aria-live="polite"></span>
</div>
```

---

## Pattern 4 — Active Filters / Clear Chips

Show what filters are currently applied with individual remove links:

```liquid
{%- assign has_active_filters = false -%}
{%- for filter in collection.filters -%}
  {%- if filter.active_values.size > 0 or filter.min_value.value != blank or filter.max_value.value != blank -%}
    {%- assign has_active_filters = true -%}
  {%- endif -%}
{%- endfor -%}

{%- if has_active_filters -%}
  <div class="active-filters" role="list" aria-label="{{ 'collections.filters.active_label' | t }}">

    {%- for filter in collection.filters -%}

      {%- if filter.type == 'price_range' -%}
        {%- if filter.min_value.value != blank or filter.max_value.value != blank -%}
          {%- assign price_min_display = filter.min_value.value | default: filter.range_min | divided_by: 100.0 | floor -%}
          {%- assign price_max_display = filter.max_value.value | default: filter.range_max | divided_by: 100.0 | ceil -%}
          <span class="active-filter" role="listitem">
            <span class="active-filter__label">
              {{ cart.currency.symbol }}{{ price_min_display }} – {{ cart.currency.symbol }}{{ price_max_display }}
            </span>
            <a
              href="{{ filter.url_to_remove }}"
              class="active-filter__remove"
              aria-label="{{ 'collections.filters.remove_filter' | t: filter: filter.label }}"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </a>
          </span>
        {%- endif -%}

      {%- else -%}
        {%- for active_value in filter.active_values -%}
          <span class="active-filter" role="listitem">
            <span class="active-filter__label">{{ active_value.label | escape }}</span>
            <a
              href="{{ active_value.url_to_remove }}"
              class="active-filter__remove"
              aria-label="{{ 'collections.filters.remove_filter' | t: filter: active_value.label }}"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </a>
          </span>
        {%- endfor -%}
      {%- endif -%}

    {%- endfor -%}

    <a href="{{ collection.url }}" class="active-filters__clear-all">
      {{ 'collections.filters.clear_all' | t }}
    </a>

  </div>
{%- endif -%}
```

---

## Pattern 5 — AJAX Filter Updates via Section Rendering API

Never reload the full page when a filter changes. Use the Section Rendering API:

```javascript
class FacetFilters extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('#FacetFiltersForm');
    this.sortSelect = this.querySelector('#SortBy');
    this.resultsSection = document.getElementById('ProductGrid');
    this.activeFiltersSection = document.getElementById('ActiveFilters');
    this.liveRegion = document.getElementById('a11y-filter-announcement');

    this.bindEvents();
  }

  bindEvents() {
    this.form?.addEventListener('change', (e) => {
      if (e.target.type === 'number') return;
      this.submitFilters();
    });

    this.sortSelect?.addEventListener('change', () => this.submitFilters());

    this.form?.addEventListener('input', (e) => {
      if (e.target.type !== 'number') return;
      clearTimeout(this._priceDebounce);
      this._priceDebounce = setTimeout(() => this.submitFilters(), 500);
    });
  }

  submitFilters() {
    const formData = new FormData(this.form);
    const searchParams = this.buildSearchParams(formData);
    this.renderFilters(searchParams);
    this.updateURL(searchParams);
  }

  buildSearchParams(formData) {
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (value === '') continue;

      if (key === 'filter.v.price.gte' || key === 'filter.v.price.lte') {
        const cents = Math.round(parseFloat(value) * 100);
        if (!isNaN(cents)) params.append(key, cents);
      } else {
        params.append(key, value);
      }
    }

    return params;
  }

  renderFilters(searchParams) {
    const sectionIds = ['product-grid', 'active-filters'].join(',');
    const url = `${window.location.pathname}?${searchParams.toString()}&sections=${sectionIds}`;

    this.setLoadingState(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data['product-grid']) {
          this.resultsSection.innerHTML = this.extractSectionHTML(data['product-grid'], '#ProductGrid');
        }
        if (data['active-filters'] && this.activeFiltersSection) {
          this.activeFiltersSection.innerHTML = this.extractSectionHTML(data['active-filters'], '#ActiveFilters');
        }
        this.announceResults();
      })
      .catch(console.error)
      .finally(() => this.setLoadingState(false));
  }

  extractSectionHTML(sectionHTML, selector) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sectionHTML, 'text/html');
    return doc.querySelector(selector)?.innerHTML ?? '';
  }

  updateURL(searchParams) {
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    history.pushState({ path: newUrl }, '', newUrl);
  }

  setLoadingState(loading) {
    this.resultsSection?.setAttribute('aria-busy', String(loading));
    this.resultsSection?.classList.toggle('is-loading', loading);
  }

  announceResults() {
    const count = this.resultsSection?.querySelectorAll('[data-product-card]').length ?? 0;
    if (this.liveRegion) {
      this.liveRegion.textContent = `${count} ${count === 1 ? 'product' : 'products'} found`;
    }
  }
}

if (!customElements.get('facet-filters')) {
  customElements.define('facet-filters', FacetFilters);
}
```

**Section IDs required in Liquid** (add to your section wrappers):
```liquid
<div id="ProductGrid" data-section-id="{{ section.id }}" aria-busy="false">
  ...products grid...
</div>

<div id="ActiveFilters">
  ...active filter chips...
</div>

<span id="a11y-filter-announcement" class="visually-hidden" aria-live="polite" aria-atomic="true"></span>
```

---

## Price Range: Cents ↔ Display Conversion Rules

**Critical:** Shopify stores and receives price range filter values in **cents** (integers). Always convert correctly.

| Direction | Formula | Example |
|---|---|---|
| Cents → Display | `value \| divided_by: 100.0 \| floor` | `1999` → `19` (floor for min) |
| Cents → Display max | `value \| divided_by: 100.0 \| ceil` | `1999` → `20` (ceil for max) |
| Display → Cents (JS) | `Math.round(parseFloat(value) * 100)` | `"19.99"` → `1999` |
| Display → Cents (Liquid) | `value \| times: 100 \| round` | `20` → `2000` |

**Rule:** Always `floor` the minimum and `ceil` the maximum for display, so the displayed range never excludes products that fall within the actual filter bounds.

---

## Future Slider Architecture (Pre-wired)

The price range snippet above is already prepared for slider replacement. The contract between Liquid and a future slider component:

```
data-price-range-filter        Parent container — slider reads bounds from here
data-range-min="[cents]"       Absolute minimum across all products
data-range-max="[cents]"       Absolute maximum across all products
data-applied-min="[cents]"     Currently applied min (for slider initial position)
data-applied-max="[cents]"     Currently applied max (for slider initial position)

[data-price-range-min]         Hidden/visible input — slider writes cents value here
[data-price-range-max]         Hidden/visible input — slider writes cents value here
```

To add a slider later, create a `<price-range-slider>` custom element that:
1. Reads `data-range-min` / `data-range-max` from the parent for track bounds
2. Reads `data-applied-min` / `data-applied-max` for initial thumb positions
3. On drag end, writes cents values to `[data-price-range-min]` and `[data-price-range-max]` inputs
4. Dispatches a `change` event on those inputs to trigger `FacetFilters.submitFilters()`

The existing From/To inputs can remain visible alongside the slider (showing exact values) or be replaced entirely — the `FacetFilters` JS does not care which UI element drives the inputs, only that the input values are in the correct cents format.

---

## Schema Settings for Filter Section

```json
{
  "name": "t:sections.collection_filters.name",
  "settings": [
    {
      "type": "checkbox",
      "id": "enable_filtering",
      "label": "t:settings.enable_filtering.label",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_sorting",
      "label": "t:settings.enable_sorting.label",
      "default": true
    },
    {
      "type": "select",
      "id": "filter_layout",
      "label": "t:settings.filter_layout.label",
      "options": [
        { "value": "sidebar", "label": "t:options.filter_layout.sidebar" },
        { "value": "horizontal", "label": "t:options.filter_layout.horizontal" },
        { "value": "drawer", "label": "t:options.filter_layout.drawer" }
      ],
      "default": "sidebar"
    },
    {
      "type": "checkbox",
      "id": "show_filter_counts",
      "label": "t:settings.show_filter_counts.label",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "collapse_filters",
      "label": "t:settings.collapse_filters.label",
      "default": false
    }
  ]
}
```

---

## Quick Reference Checklist

When building any filter/sort feature:

- [ ] Uses `collection.filters` — never manually builds filter arrays
- [ ] List filters rendered with checkboxes pointing to `value.param_name` / `value.value`
- [ ] Active state uses `value.active` (not URL comparison)
- [ ] Price range inputs use `filter.min_value.param_name` and `filter.max_value.param_name` as `name` attributes
- [ ] Price min/max **display** values use `floor` for min, `ceil` for max
- [ ] Price input → URL submission converts display dollars to cents (`* 100`)
- [ ] `data-range-min` / `data-range-max` / `data-applied-min` / `data-applied-max` always present on price filter container (slider-ready)
- [ ] Sort uses `collection.sort_options` — never hardcoded option values
- [ ] Active filters show `active_value.url_to_remove` links
- [ ] Price range "clear" uses `filter.url_to_remove`
- [ ] AJAX updates use Section Rendering API (`?sections=id1,id2`)
- [ ] Price range inputs are debounced (min 400–500ms) before firing AJAX request
- [ ] `aria-live="polite"` region announces product count after filter change
- [ ] Loading state uses `aria-busy="true"` on the results container

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Price input `value` set to cents | Always divide by 100 for display — inputs show dollars |
| Price URL param sent as dollars | Always multiply by 100 before adding to URL params |
| Using `filter.values` for price_range | Price range has no `.values` — use `.min_value` / `.max_value` / `.range_min` / `.range_max` |
| Hardcoded `min="0"` on price input | Use `filter.range_min \| divided_by: 100.0 \| floor` |
| No debounce on price number inputs | Add 400–500ms debounce — fires on every keystroke otherwise |
| Full page reload on filter change | Use Section Rendering API AJAX pattern |
| `option.value` not matching `collection.sort_by` | Always use `==` not `contains` for sort selected state |
| Filters disappear after AJAX update | Re-render both product grid AND filter form sections |
