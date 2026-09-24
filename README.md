# UI コンポーネント


## HTML ファイル上で、以下の記法で各 UI コンポーネントを利用できます

**記述方**
----- ----- ----- ----- ----- ----- ----- ----- ----- -----

<!-- リンク -->
カスタムタグ:
https://example.com テキスト [_blank]
生成タグ:
<a href="http://example.com" target="_blank">テキスト</a>

<!-- メールリンク -->
カスタムタグ:
info@example.jp テキスト
生成タグ:
<a href="mailto:info@example.jp">テキスト</a>

<!-- イメージ -->
カスタムタグ:
画像URL [w 幅] [h 高さ] [alt 文字列]
<ui-img>./images/main-sp.jpg w200 h300 文字列</ui-img>
生成タグ:
<img src="./images/example.jpg" width="幅" height="高さ" alt="文字列">

<!-- ボタン -->
カスタムタグ:
<ui-submit>テキスト</ui-submit>
生成タグ:
<button type="submit">テキスト</button>



(コンテナタグ一覧)

<!-- UL -->
カスタムタグ: (ID、クラス名の指定可能)
<ui-ul id="xxx" class="xxx">
  テキスト
  ...
</ui-ul>
生成タグ:
<ul>
  <li>テキスト</li>
  ...
</ul>

<!-- DL -->
カスタムタグ: (ID、クラス名の指定可能)
<ui-dl>
  テキスト テキストテキスト
  ...
</ui-dl>
生成タグ:
<dl id="xxx" class="xxx">
  <dt>テキスト</dt>
  <dd>テキストテキスト</dd>
  ...
</dl>