# MethodDka (200次対応 & 50桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[日本語](#-日本語概要) | [English](#-english-overview)

---

## 🇯🇵 日本語概要

**MethodDka** は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです。  
DKA法（Durand-Kerner 法）を採用し、`Decimal.js` による **50桁高精度演算**、**最大200次対応オートスケーリング処理**、**係数一括ペースト機能**、および **日本語 / English 瞬時言語切替機能** を統合したオールインワン版です。

### 📝 主な機能と特徴

1. **🌐 2か国語対応 (日本語 / English)**
   * 画面右上のボタンをワンクリックするだけで、UIテキスト・案内表示・結果出力表示を即座に日本語と英語に切り替えられます。
2. **📋 係数データの一括ペースト機能**
   * スペース、改行、カンマ区切りのテキスト（例: `1 -55 1320 -18150 ...`）を一括で貼り付けるだけで、全係数を各入力欄へ一発セットできます。
3. **⚡ 最大 200 次高次多項式 ＆ オートスケーリング（規格化）対応**
   * 高次計算時や巨大・極小な係数が混在する場合でも、自動スケーリング処理によってオーバーフロー・アンダーフローを防止し、安定して計算を実行します。
4. **🎯 50 桁高精度解表示 ＆ 因数分解モードの即時切替**
   * 単一画面上で「50桁高精度解表示」と「因数分解表示（小数第1位四捨五入）」をトグルスイッチ一つで即座に切り替え可能です（再計算なし）。
5. **💻 完全マルチプラットフォーム ＆ オフライン対応**
   * サーバー不要で単一の HTML ファイルとして動作するため、Windows, Mac, Linux, iOS, Android, ChromeOS 等のあらゆるブラウザでローカル・オフライン動作します。

---

## 🇬🇧 English Overview

**MethodDka** is a lightweight, ultra-fast, and high-precision web application designed for solving complex polynomials and performing factorization using pure HTML and JavaScript.  
Powered by the Durand-Kerner (DKA) algorithm and `Decimal.js` with **50-digit precision**, it features **auto-scaling normalization up to degree 200**, **bulk coefficient input**, and **instant bilingual language switching (English/Japanese)**.

### 🌟 Key Features

1. **🌐 Multilingual Support (English / Japanese)**
   * One-click language toggle in the top-right header switches the entire user interface, instructions, and result forms between English and Japanese dynamically.
2. **📋 Bulk Coefficient Input**
   * Paste space, comma, or line-separated values (e.g., `1 -55 1320 -18150 ...`) to fill all coefficient fields instantaneously.
3. **⚡ Auto-Scaling Normalization (Up to Degree 200)**
   * Prevents numerical underflow and overflow when handling high-degree polynomials or extreme variations in coefficient magnitudes.
4. **🎯 Instant Display Toggle (50-Digit Precision & Factored Form)**
   * Effortlessly switch between "50-digit high-precision roots with residuals" and "factored form (rounded display)" without recalculating.
5. **💻 Fully Cross-Platform & Offline Ready**
   * Runs locally on any modern browser (Chrome, Safari, Edge, Firefox, mobile browsers) with no server required.

---

## 🌐 公式ページ ＆ リポジトリ / Official Links

* **Web アプリ (Live Demo):** [https://YoshiakiKoizumija142397.github.io/MethodDka/MethodDka.html](https://YoshiakiKoizumija142397.github.io/MethodDka/MethodDka.html)
* **GitHub リポジトリ (Repository):** [https://github.com/YoshiakiKoizumija142397/MethodDka](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📁 リポジトリの構成 / Repository Structure

MethodDka/
├── MethodDka.html         # 統合マスターコード / Multilingual master code
├── index.html             # 公式ランディングページ / Official Landing Page
└── README.md              # 本ドキュメント / Documentation

現在の `README.md` の内容を共有していただき、ありがとうございます！

先ほど作成した統合版アプリ（日本語/英語切り替え対応）の仕様に合わせて、この `README.md` も2か国語対応（マルチバイリンガル仕様）へ更新した決定版を作成いたしました。
---

```markdown
# MethodDka (200次対応 & 50桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[日本語](#-日本語概要) | [English](#-english-overview)

---

## 🇯🇵 日本語概要

**MethodDka** は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです。  
DKA法（Durand-Kerner 法）を採用し、`Decimal.js` による **50桁高精度演算**、**最大200次対応オートスケーリング処理**、**係数一括ペースト機能**、および **日本語 / English 瞬時言語切替機能** を統合したオールインワン版です。

### 📝 主な機能と特徴

1. **🌐 2か国語対応 (日本語 / English)**
   * 画面右上のボタンをワンクリックするだけで、UIテキスト・案内表示・結果出力表示を即座に日本語と英語に切り替えられます。
2. **📋 係数データの一括ペースト機能**
   * スペース、改行、カンマ区切りのテキスト（例: `1 -55 1320 -18150 ...`）を一括で貼り付けるだけで、全係数を各入力欄へ一発セットできます。
3. **⚡ 最大 200 次高次多項式 ＆ オートスケーリング（規格化）対応**
   * 高次計算時や巨大・極小な係数が混在する場合でも、自動スケーリング処理によってオーバーフロー・アンダーフローを防止し、安定して計算を実行します。
4. **🎯 50 桁高精度解表示 ＆ 因数分解モードの即時切替**
   * 単一画面上で「50桁高精度解表示」と「因数分解表示（小数第1位四捨五入）」をトグルスイッチ一つで即座に切り替え可能です（再計算なし）。
5. **💻 完全マルチプラットフォーム ＆ オフライン対応**
   * サーバー不要で単一の HTML ファイルとして動作するため、Windows, Mac, Linux, iOS, Android, ChromeOS 等のあらゆるブラウザでローカル・オフライン動作します。

---

## 🇬🇧 English Overview

**MethodDka** is a lightweight, ultra-fast, and high-precision web application designed for solving complex polynomials and performing factorization using pure HTML and JavaScript.  
Powered by the Durand-Kerner (DKA) algorithm and `Decimal.js` with **50-digit precision**, it features **auto-scaling normalization up to degree 200**, **bulk coefficient input**, and **instant bilingual language switching (English/Japanese)**.

### 🌟 Key Features

1. **🌐 Multilingual Support (English / Japanese)**
   * One-click language toggle in the top-right header switches the entire user interface, instructions, and result forms between English and Japanese dynamically.
2. **📋 Bulk Coefficient Input**
   * Paste space, comma, or line-separated values (e.g., `1 -55 1320 -18150 ...`) to fill all coefficient fields instantaneously.
3. **⚡ Auto-Scaling Normalization (Up to Degree 200)**
   * Prevents numerical underflow and overflow when handling high-degree polynomials or extreme variations in coefficient magnitudes.
4. **🎯 Instant Display Toggle (50-Digit Precision & Factored Form)**
   * Effortlessly switch between "50-digit high-precision roots with residuals" and "factored form (rounded display)" without recalculating.
5. **💻 Fully Cross-Platform & Offline Ready**
   * Runs locally on any modern browser (Chrome, Safari, Edge, Firefox, mobile browsers) with no server required.

---

## 🌐 公式ページ ＆ リポジトリ / Official Links

* **Web アプリ (Live Demo):** [https://YoshiakiKoizumija142397.github.io/MethodDka/MethodDka.html](https://YoshiakiKoizumija142397.github.io/MethodDka/MethodDka.html)
* **GitHub リポジトリ (Repository):** [https://github.com/YoshiakiKoizumija142397/MethodDka](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📁 リポジトリの構成 / Repository Structure


```

MethodDka/
├── MethodDka.html         # 統合マスターコード / Multilingual master code
├── index.html             # 公式ランディングページ / Official Landing Page
└── README.md              # 本ドキュメント / Documentation

```

---

## 🛠️ 使い方 / How to Use

1. `MethodDka.html` を Web ブラウザで開きます。（必要に応じて右上のボタンで言語を切り替えます）
2. **最高次数**（例: `10`）を入力し、**「生成 / Generate Fields」** ボタンを押します。
3. 係数を手入力するか、**「一括ペースト / Bulk Input」** エリアにテキストを貼り付けて **「一括反映 / Apply Bulk Input」** を押します。
4. **「計算開始 / Calculate Roots」** ボタンを押すと、数秒〜数ミリ秒で全複素数解および誤差半径・反復回数が出力されます。
5. モード切替トグルを操作することで、いつでも因数分解表示へ切り替えられます。

---

## 💡 技術仕様 ＆ 学術注記 / Technical Specifications

* **アルゴリズム (Algorithm):** DKA法（Durand-Kerner 法）による並列収束探索
* **高精度計算エンジン (Engine):** `Decimal.js` (precision: 50)
* **スケーリング手法 (Scaling):** 係数の幾何平均スケール因子 $S = |a_n / a_0|^{(1/n)}$ による多項式規格化処理

> 💡 **補足 / Note (悪条件多項式について / Ill-conditioned polynomials):**  
> 本アプリはオートスケーリング処理により最大200次までの計算に対応していますが、ウィルキンソン多項式のように「根が実軸上に極めて密集して並ぶ悪条件多項式（Ill-conditioned polynomials）」では、並列円周初期値を用いる DKA 法の性質上、高次（15次以上）で複素数領域の鞍点へ引き込まれる（偽収束する）場合があります。通常分散された多項式では高次まで正常に動作します。

---

## 📄 ライセンス ＆ 開発者 / License & Author

* **ライセンス (License):** MIT License
* **開発者 (Developer):** Yoshiaki Koizumi ([YoshiakiKoizumija142397](https://github.com/YoshiakiKoizumija142397))

```
