class UiDl extends HTMLElement {

  connectedCallback() {

    const _dl = document.createElement('dl');


    // class / id を引き継ぐ
    if (this.hasAttribute('class')) {

      _dl.setAttribute(
        'class',
        this.getAttribute('class')
      );

    }


    if (this.hasAttribute('id')) {

      _dl.setAttribute(
        'id',
        this.getAttribute('id')
      );

    }


    const lines = this.innerHTML
      .trim()
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line);


    lines.forEach(line => {

      const _div = document.createElement('div');

      const { dt, dd } = UiParser.createHtml(line);

      _div.append(dt, dd);

      _dl.append(_div);

    });


    this.replaceWith(_dl);

  }

}


customElements.define('ui-dl', UiDl);