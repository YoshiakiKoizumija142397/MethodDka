# MethodDka (200次対応 & 50桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.14920000.svg)](https://zenodo.org/badge/DOI/10.5281/zenodo.14920000.svg) | [日本語](#-日本語概要) | [English](#-english-overview)

## 🇯🇵 日本語概要

*MethodDka* は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです。
DKA法（Durand-Kerner 法）を採用し、 Decimal.js による **50桁高精度演算** 、 **最大200次対応オートスケーリング処理** 、 **実数・複素数係数の一括ペースト機能 (i, j 完全対応)** 、および **日本語 / English 瞬時言語切替機能** を統合したオールインワン版です。

## 📝 主な機能と特徴

1. **🌐 2か国語対応 (日本語 / English)**
   - 画面右上のボタンをワンクリックするだけで、UIテキスト・案内表示・結果出力表示を即座に日本語と英語に切り替えられます。
2. **📋 実数・複素数係数データの一括ペースト機能 (i, j 対応)**
   - スペース、改行、カンマ区切りのテキストを一括で貼り付けるだけで、全係数を各入力欄へ一発セットできます。
   - 実数だけでなく、虚数単位の i や電気工学で用いられる j を含む複素数係数（例: `1+2i` , `3-4j` , `-5j` など）の読み込みにも完全対応しています。
3. **⚡ 最大 200 次高次多項式 ＆ オートスケーリング（規格化）対応**
   - 高次計算時や巨大・極小な係数が混在する場合でも、自動スケーリング処理によってオーバーフロー・アンダーフローを防止し、安定して計算を実行します。
4. **🎯 50 桁高精度解表示 ＆ 因数分解モードの即時切替**
   - 単一画面上で「50桁高精度解表示」と「因数分解表示（小数第1位四捨五入）」をトグルスイッチ一つで即座に切り替え可能です（再計算なし）。
5. **💻 完全マルチプラットフォーム ＆ オフライン対応**
   - サーバー不要で単一の HTML ファイルとして動作するため、Windows, Mac, Linux, iOS, Android, ChromeOS 等のあらゆるブラウザでローカル・オフライン動作します。

## 🇬🇧 English Overview

*MethodDka* is a lightweight, ultra-fast, and high-precision web application designed for solving complex polynomials and performing factorization using pure HTML and JavaScript.
Powered by the Durand-Kerner (DKA) algorithm and Decimal.js with **50-digit precision** , it features **auto-scaling normalization up to degree 200** , **bulk real and complex coefficient input (fully supporting 'i' and 'j')** , and **instant bilingual language switching (English/Japanese)** .

## 🌟 Key Features

1. **🌐 Multilingual Support (English / Japanese)**
   - One-click language toggle in the top-right header switches the entire user interface, instructions, and result forms between English and Japanese dynamically.
2. **📋 Bulk Real & Complex Coefficient Input (Supports 'i' and 'j')**
   - Paste space, comma, or line-separated values to fill all coefficient fields instantaneously.
   - Fully supports complex numbers using either the mathematical imaginary unit i or the engineering unit j (e.g., `1+2i` , `3-4j` , `-5j` ).
3. **⚡ Auto-Scaling Normalization (Up to Degree 200)**
   - Prevents numerical underflow and overflow when handling high-degree polynomials or extreme variations in coefficient magnitudes.
4. **🎯 Instant Display Toggle (50-Digit Precision & Factored Form)**
   - Effortlessly switch between "50-digit high-precision roots with residuals" and "factored form (rounded display)" without recalculating.
5. **💻 Fully Cross-Platform & Offline Ready**
   - Runs locally on any modern browser (Chrome, Safari, Edge, Firefox, mobile browsers) with no server required.

## 🧪 ベンチマーク: 15次ウィルキンソン多項式 / Benchmark: 15th-Degree Wilkinson Polynomial

本アプリの DKA法の特性を検証するためのテストケースとして、以下の **15次のウィルキンソン多項式係数データ** をあらかじめ用意しています。

*テスト用係数データ (15th-Degree Wilkinson Coefficients):*
```text
1
-120
6440
-206140
4363680
-64335072
676646560
-5147814080
28359288160
-113400587520
324103138816
-646274431488
856515582720
-687258950400
300445555200
-1307674368000


テスト手順 (How to test):

ランディングページ (index.html) またはアプリ版 (MethodDka.html) にアクセスします。

上記の係数データをコピーするか、アプリ内の「15次ウィルキンソン係数を生成」ボタンを使用して計算を実行してください。

🌐 公式ページ ＆ リポジトリ / Official Links
Web アプリ (Live Demo): MethodDka Live Demo

GitHub リポジトリ (Repository): MethodDka Repository

📁 リポジトリの構成 / Repository Structure

MethodDka/
├── MethodDka.html         # 統合マスターコード / Multilingual master code
├── index.html             # 公式ランディングページ (ベンチマーク生成機能付き) / Official Landing Page
└── README.md              # 本ドキュメント / Documentation
