---
name: shopify-cart-ajax
description: >-
  Shopify cart AJAX patterns — Cart API, Section Rendering API, line item
  properties, and Dawn cart drawer integration. Use when building add-to-cart
  flows, cart updates, mini-cart, or custom checkout UX without page reloads.
---

# Cart & AJAX Patterns

## When to Use

- Add-to-cart without page navigation
- Cart drawer / mini-cart updates
- Quantity changes, line item properties, selling plans
- Dynamic cart count badges in header

## Cart API Endpoints

| Action | Method | Endpoint |
|--------|--------|----------|
| Get cart | GET | `/cart.js` |
| Add item | POST | `/cart/add.js` |
| Update quantities | POST | `/cart/update.js` |
| Change line item | POST | `/cart/change.js` |
| Clear cart | POST | `/cart/clear.js` |

Always send `Content-Type: application/json` and parse JSON responses.

## Add to Cart (Minimal)

```javascript
async function addToCart(variantId, quantity = 1) {
  const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ id: variantId, quantity }] })
  });
  if (!response.ok) throw new Error('Add to cart failed');
  return response.json();
}
```

## Section Rendering API (Preferred for UI Updates)

After cart mutation, fetch updated section HTML:

```javascript
const sections = 'cart-drawer,cart-icon-bubble';
const url = `${window.location.pathname}?sections=${sections}`;
const response = await fetch(url);
const html = await response.json();

// Replace section inner HTML from parsed response
Object.entries(html).forEach(([id, markup]) => {
  const el = document.getElementById(`shopify-section-${id}`);
  if (el) el.innerHTML = markup;
});
```

Pass section IDs that match your theme's section `{% schema %}` IDs.

## Line Item Properties

```javascript
body: JSON.stringify({
  items: [{
    id: variantId,
    quantity: 1,
    properties: {
      '_gift_message': 'Happy Birthday',
      'Engraving': 'ABC'
    }
  }]
})
```

Properties prefixed with `_` are hidden from customer-facing cart display.

## Dawn Integration Points

- Cart drawer: `sections/cart-drawer.liquid` (Dawn original — extend via `custom-` JS)
- Cart notification: listen for `cart:updated` custom events if Dawn publishes them
- Extend behavior in `assets/custom-main.js` — never edit `assets/global.js`

## Accessibility Requirements

```html
<span aria-live="polite" aria-atomic="true" class="cart-count">{{ cart.item_count }}</span>
```

- Announce cart updates to screen readers
- Manage focus when cart drawer opens/closes
- `role="alert"` for error messages (out of stock, etc.)

## Error Handling

Cart API returns structured errors:

```javascript
const data = await response.json();
if (data.status === 422) {
  // Show data.message or data.description to user
}
```

Common 422 causes: out of stock, quantity exceeds inventory, invalid variant.

## Selling Plans & Bundles

```javascript
{
  id: variantId,
  quantity: 1,
  selling_plan: sellingPlanId  // subscriptions
}
```

Verify selling plan availability on the variant before submit.

## Performance

- Debounce quantity input changes (300ms)
- Batch section fetches — request multiple sections in one call
- Avoid full `cart.js` fetch when Section Rendering API suffices

## Anti-Patterns

- Full page reload after add-to-cart (unless intentional)
- Parsing `document` from fetch response (use Section Rendering API)
- Editing Dawn's cart-drawer.liquid directly
- Synchronous XHR (blocks main thread, hurts INP)

## References

- `.cursor/rules/javascript.mdc`
- `.cursor/rules/accessibility.mdc`
- `.cursor/checklists/qa-checklist.md`
