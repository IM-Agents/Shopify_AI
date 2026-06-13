class CustomDesignInquiry extends HTMLElement {
  connectedCallback() {
    this.uploadArea = this.querySelector('[data-upload-area]');
    this.uploadInput = this.querySelector('[data-upload-input]');
    this.uploadTitle = this.querySelector('[data-upload-title]');
    this.heroButton = document.querySelector('[data-scroll-to-inquiry]');

    if (this.uploadArea && this.uploadInput) {
      this.uploadArea.addEventListener('click', () => this.uploadInput.click());
      this.uploadArea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.uploadInput.click();
        }
      });
      this.uploadInput.addEventListener('change', () => this.updateUploadLabel());
    }

    if (this.heroButton) {
      this.heroButton.addEventListener('click', (event) => {
        const target = document.getElementById('CustomDesignInquiry');
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  updateUploadLabel() {
    if (!this.uploadTitle || !this.uploadInput) return;
    const file = this.uploadInput.files && this.uploadInput.files[0];
    this.uploadTitle.textContent = file ? file.name : this.uploadTitle.dataset.defaultLabel || 'Upload Inspiration Images';
  }
}

if (!customElements.get('custom-design-inquiry')) {
  customElements.define('custom-design-inquiry', CustomDesignInquiry);
}
