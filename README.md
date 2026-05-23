<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>MethodDka 公式ページ</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
    font-family: "Segoe UI", sans-serif;
    line-height: 1.7;
    margin: 20px;
    max-width: 900px;
}
h1, h2, h3 {
    color: #004080;
}
.button {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 18px;
    margin: 6px 0;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
}
.button:hover {
    background-color: #0056b3;
}
.section {
    margin-bottom: 40px;
}
code {
    white-space: pre-wrap;
    display: block;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 0.9em;
}
hr {
    margin: 30px 0;
}
</style>
</head>
<body>

<h1>MethodDka<br>因数分解・高次代数方程式を解くプログラム（高精度 50桁対応）</h1>

<div class="section">
  <h2>📌 MethodDka の 5 種類のバージョン</h2>

  <h3>1. 因数分解専用版（HTML / オフライン）</h3>
  <ul>
    <li>ダウンロード不要</li>
    <li>ブラウザで即動作</li>
    <li>Windows / Android / iOS / Mac / Linux / ChromeOS 対応</li>
  </ul>
  <a class="button" href="https://yoshiakikoizumija142397.github.io/MethodDka/factorization/MethodDka.html">
    👉 因数分解専用版（HTML / オフライン）を開く
  </a>

  <h3>2. 高精度版（HTML / 50桁 / オフライン）</h3>
  <ul>
    <li>50桁の高精度計算に対応</li>
    <li>ブラウザで動作</li>
    <li>インストール不要</li>
  </ul>
  <a class="button" href="https://yoshiakikoizumija142397.github.io/MethodDka/main/MethodDka.html">
    👉 高精度版（HTML / 50桁 / オフライン）を開く
  </a>

  <h3>3. GitHub Pages 版：因数分解専用版（オンライン）</h3>
  <ul>
    <li>オンラインで即動作</li>
    <li>追加インストール不要</li>
  </ul>
  <a class="button" href="https://yoshiakikoizumija142397.github.io/MethodDka/">
    👉 オンライン版（因数分解専用）
  </a>

  <h3>4. GitHub Pages 版：高精度版（オンライン）</h3>
  <ul>
    <li>オンラインで 50桁計算</li>
    <li>追加インストール不要</li>
  </ul>
  <a class="button" href="https://yoshiakikoizumija142397.github.io/MethodDka/">
    👉 オンライン版（高精度）
  </a>

  <h3>5. Windows 11 高精度版（インストーラ版 / オフライン）</h3>
  <ul>
    <li>Windows 11 Home 25H2 対応</li>
    <li>インストールして使用</li>
    <li>オフライン動作可能</li>
  </ul>
  <a class="button" href="https://github.com/YoshiakiKoizumija142397/MethodDkaWIN11/releases/download/V1.0.0/MethodDka.1.0.0.msi">
    👉 MSI インストーラ（Windows 11）
  </a>
  <br>
  <a class="button" href="https://github.com/YoshiakiKoizumija142397/MethodDkaWIN11/releases/download/V1.0.0/MethodDka.1.0.0.appx">
    👉 APPX パッケージ（Microsoft Store 互換）
  </a>
</div>

<hr>

<div class="section">
  <h2>📘 MethodDka とは</h2>
  <p>
    MethodDka は、<strong>因数分解</strong>および
    <strong>高次代数方程式の全解（複素数を含む）を求めるプログラム</strong>です。
  </p>
  <ul>
    <li>HTML / JavaScript で動作</li>
    <li>オフライン版はダウンロードして使用可能</li>
    <li>オンライン版はブラウザだけで動作</li>
    <li>高精度版は約 50 桁の計算に対応</li>
  </ul>
</div>

<hr>

<div class="section">
  <h2>🔢 MethodDka の特徴</h2>
  <ul>
    <li>最大 <strong>1000 次</strong>の多項式に対応</li>
    <li><strong>複素数の全解</strong>を求められる</li>
    <li><strong>初期値不要</strong>で収束（DKA 法）</li>
    <li>ブラウザで動作（HTML / JavaScript）</li>
    <li>高精度版は <strong>50 桁</strong>の計算に対応</li>
    <li>Windows 版は MSI / APPX によるインストール形式</li>
  </ul>
</div>

<hr>

<div class="section">
  <h2>🧮 使い方（概要）</h2>
  <ol>
    <li>次数を入力</li>
    <li>係数を入力</li>
    <li>「計算開始」ボタンを押す</li>
    <li>結果が画面に表示されます</li>
  </ol>
</div>

<hr>

<div class="section">
  <h2>⚠ 注意事項</h2>
  <ul>
    <li>本プログラムは試作評価版です。</li>
    <li>計算結果の正確性を保証するものではありません。</li>
    <li>自己責任で使用してください。</li>
  </ul>
</div>

<hr>

<div class="section">
  <h2>👤 作者情報</h2>
  <p>作者：小泉 嘉章</p>
  <p>メール：ja142397@s6.dion.ne.jp</p>
</div>

<hr>

<div class="section">
  <h2>📄 ライセンス（MIT License）</h2>
  <code>
MIT License

Copyright (c) 2024 小泉 嘉章

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
  </code>
</div>

<hr>

<div class="section">
  <h2>🌐 公式ページ（GitHub Pages）</h2>
  <a class="button" href="https://yoshiakikoizumija142397.github.io/MethodDka/">
    👉 MethodDka 公式ページ（トップ）
  </a>
</div>

</body>
</html>
