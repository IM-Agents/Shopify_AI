/**
 * custom-main.js
 * Global custom JavaScript for Dawn theme
 *
 * RULES:
 * - Vanilla JS only — no jQuery
 * - ES6+ syntax: const/let, arrow functions, classes
 * - Follow Dawn's Custom Elements pattern
 * - Always handle theme editor events (shopify:section:load)
 * - Never modify Dawn's original JS files
 */

'use strict';

/* ============================================
   DEBUG UTILITY
   ============================================ */

const CustomTheme = {
  debug: false,

  log(...args) {
    if (this.debug) console.log('[CustomTheme]', ...args);
  },

  init() {
    this.log('Custom theme JS initialized');
    this.registerThemeEditorEvents();
  },

  /**
   * Re-initialize custom components when theme editor
   * loads/reloads a section (live preview in editor)
   */
  registerThemeEditorEvents() {
    document.addEventListener('shopify:section:load', (event) => {
      this.log('Section loaded:', event.detail.sectionId);
      // Re-init any custom components in the reloaded section
    });

    document.addEventListener('shopify:section:unload', (event) => {
      this.log('Section unloaded:', event.detail.sectionId);
    });

    document.addEventListener('shopify:block:select', (event) => {
      this.log('Block selected:', event.detail.blockId);
    });
  }
};

/* ============================================
   CUSTOM COMPONENTS
   ============================================
   Add your Custom Elements below.
   Pattern: class CustomXxx extends HTMLElement {}
   Register: customElements.define('custom-xxx', CustomXxx);
   ============================================ */

/* ============================================
   INITIALIZE
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  CustomTheme.init();
});
