class UiImg extends HTMLElement {
  connectedCallback() {
    const line = this.textContent.trim();
    const _img = UiParser.createImg(line);

    if (_img) {
      this.replaceWith(_img);
    }
  }
}

customElements.define('ui-img', UiImg);