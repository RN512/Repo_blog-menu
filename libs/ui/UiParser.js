class UiParser {

  // テキストを行ごとに分割
  static lines(element) {

    return element.textContent
      .trim()
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line);

  }


  // テキストをHTML要素に変換
  static create(text) {

    const [type, ...words] = text.trim().split(/\s+/);

    const label = words
      .filter(word => word !== '_blank')
      .join(' ');


    // #から始まる内部リンク
    if (type.startsWith('#')) {

      const a = document.createElement('a');

      a.href = type;
      a.textContent = label;

      if (words.includes('_blank')) {
        a.target = '_blank';
      }

      return a;

    }


    // 相対パス・絶対パスの内部リンク
    if (
      type.startsWith('./') ||
      type.startsWith('../')
    ) {

      const a = document.createElement('a');

      a.href = type;
      a.textContent = label;

      if (words.includes('_blank')) {
        a.target = '_blank';
      }

      return a;

    }


    // 外部リンク
    if (
      type.startsWith('http://') ||
      type.startsWith('https://')
    ) {

      const a = document.createElement('a');

      a.href = type;
      a.textContent = label;

      if (words.includes('_blank')) {
        a.target = '_blank';
      }

      return a;

    }


    // メールリンク
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(type)) {

      const a = document.createElement('a');

      a.href = `mailto:${type}`;
      a.textContent = label;

      return a;

    }


    // 通常のテキスト
    return document.createTextNode(text);

  }


  // HTMLを保持したままDDを生成
  static createHtml(line) {

    const template = document.createElement('template');

    template.innerHTML = line.trim();


    // 先頭のテキストノードからdtを取得
    const walker = document.createTreeWalker(
      template.content,
      NodeFilter.SHOW_TEXT
    );


    let node;
    let dtText = '';
    let remaining = '';


    while (node = walker.nextNode()) {

      const text = node.nodeValue;

      if (!dtText) {

        const match = text.match(/^\s*(\S+)\s*/);

        if (match) {

          dtText = match[1];

          const length = match[0].length;

          node.nodeValue = text.substring(length);

        }

      }

    }


    const _dt = document.createElement('dt');
    const _dd = document.createElement('dd');


    _dt.textContent = dtText;


    _dd.append(
      ...template.content.childNodes
    );


    return {
      dt: _dt,
      dd: _dd
    };

  }


  // イメージタグ
  static createImg(text) {

    const words = text.trim().split(/\s+/);


    // 画像URL
    const src = words.shift();


    let width = null;
    let height = null;

    const altWords = [];


    // w200 / h200 を解析
    words.forEach(word => {

      // width
      if (/^w\d+$/.test(word)) {

        width = word.substring(1);

      }

      // height
      else if (/^h\d+$/.test(word)) {

        height = word.substring(1);

      }

      // その他はalt
      else {

        altWords.push(word);

      }

    });


    // <img>要素を生成
    const img = document.createElement('img');


    // 属性の順番
    // src → width → height → alt
    img.setAttribute('src', src);


    if (width) {

      img.setAttribute('width', width);

    }


    if (height) {

      img.setAttribute('height', height);

    }


    img.setAttribute(
      'alt',
      altWords.join(' ')
    );


    return img;

  }

}