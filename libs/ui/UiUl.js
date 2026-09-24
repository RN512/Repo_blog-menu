class UiUl extends HTMLElement {

  connectedCallback() {

    const _ul = document.createElement('ul');


    // class / id を引き継ぐ
    if (this.hasAttribute('class')) {

      _ul.setAttribute(
        'class',
        this.getAttribute('class')
      );

    }


    if (this.hasAttribute('id')) {

      _ul.setAttribute(
        'id',
        this.getAttribute('id')
      );

    }


    // 子要素を順番に処理
    Array.from(this.childNodes).forEach(node => {

      // 空白や改行は無視
      if (
        node.nodeType === Node.TEXT_NODE &&
        !node.textContent.trim()
      ) {
        return;
      }


      // ui-img の場合
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'ui-img'
      ) {

        const _li = document.createElement('li');

        const _img = UiParser.createImg(
          node.textContent
        );

        _li.append(_img);
        _ul.append(_li);

        return;
      }


      // 通常のテキスト
      if (node.nodeType === Node.TEXT_NODE) {

        const lines = node.textContent
          .trim()
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(line => line);


        lines.forEach(line => {

          const _li = document.createElement('li');

          _li.append(
            UiParser.create(line)
          );

          _ul.append(_li);

        });

      }

    });


    this.replaceWith(_ul);

  }

}

customElements.define('ui-ul', UiUl);