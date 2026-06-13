class CustomTabs extends HTMLElement {
  connectedCallback() {
    this.tabs = Array.from(this.querySelectorAll('[data-tab-trigger]'));
    this.panels = Array.from(this.querySelectorAll('[data-tab-panel]'));
    this.tabs.forEach((tab) => tab.addEventListener('click', this.onTabClick.bind(this)));
    this.tabs.forEach((tab) => tab.addEventListener('keydown', this.onKeyDown.bind(this)));
  }

  onTabClick(event) {
    this.activateTab(event.currentTarget);
  }

  onKeyDown(event) {
    const index = this.tabs.indexOf(event.currentTarget);
    let nextIndex = index;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % this.tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + this.tabs.length) % this.tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.activateTab(this.tabs[nextIndex]);
    this.tabs[nextIndex].focus();
  }

  activateTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    const panel = this.querySelector(`#${panelId}`);

    this.tabs.forEach((item) => {
      item.classList.remove('custom-tabs__tab--active');
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('tabindex', '-1');
    });

    this.panels.forEach((item) => {
      item.classList.remove('custom-tabs__panel--active');
      item.hidden = true;
    });

    tab.classList.add('custom-tabs__tab--active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');

    if (panel) {
      panel.classList.add('custom-tabs__panel--active');
      panel.hidden = false;
    }
  }
}

customElements.define('custom-tabs', CustomTabs);
