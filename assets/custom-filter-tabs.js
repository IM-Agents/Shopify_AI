/**
 * Pill-style filter tabs for Diamondrensu homepage sections.
 */
class CustomFilterTabs extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const triggers = this.querySelectorAll('[data-filter-trigger]');
    const panels = this.querySelectorAll('[data-filter-panel]');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const target = trigger.dataset.filterTarget;

        triggers.forEach((tab) => {
          const isActive = tab === trigger;
          tab.classList.toggle('custom-dr-pill--active', isActive);
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        panels.forEach((panel) => {
          const isActive = panel.dataset.filterPanel === target;
          panel.classList.toggle('custom-dr-filter-panel--active', isActive);
          panel.hidden = !isActive;
        });
      });
    });
  }
}

if (!customElements.get('custom-filter-tabs')) {
  customElements.define('custom-filter-tabs', CustomFilterTabs);
}
