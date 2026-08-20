# MethodDka (200次対応 & 最大200桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.xxxxxxx.svg)](https://doi.org/10.5281/zenodo.xxxxxxx)

[日本語](README.md) | [English](README.md#english-overview)

## 🇯🇵 日本語概要
*MethodDka* は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです[cite: 1]。
DKA法（Durand-Kerner 法）を採用し、 Decimal.js による *最大200桁の超高精度演算* 、 *再帰的初期値（小泉の初期値）による極限収束* 、 *最大200次対応オートスケーリング処理* 、 *複素数係数（i, j）の完全対応* 、 *係数一括ペースト機能* 、および *日本語 / English 瞬時言語切替機能* を統合したオールインワン版です[cite: 1]。

---

## 🎧 応用例: ハイレゾ対応オーディオ用デジタルチャンネルデバイダー (Audio DSP Application)

### 【New Application: High-Resolution Audio Digital Crossover & Minimum-Phase FIR Filter Design for SONY SS-CS5 Multi-Amp System】

3WAYスピーカー **SONY SS-CS5** の内蔵ネットワーク（コンデンサやコイル等による受動素子の挿入損失や位相歪み）を完全に排除し、極限の高音質化を達成するためのデジタルチャンネルデバイダーを本プロジェクト（MethodDka）の数学的エンジンを用いてオフライン設計します[cite: 1]。

7.1チャンネルHDMI接続ハイレゾ配信対応アンプが持つ7chアンプのうち6ch（中古保証付きアンプ）をマルチアンプ駆動へ転用し、デジタルプリアンプとパワーアンプの間に挿入する高精度デジタルフィルターの係数算出に応用します[cite: 1]。

### 🛠️ 開発設計の前提条件とスペック・ユースケース
* **OS環境:** Windows 11 Home (25H2)[cite: 1]
* **音源・サンプリング周波数:** Amazon Music Unlimited (ハイレゾ配信 24bit / 96kHz)[cite: 1]
* **ターゲットスピーカー:** SONY SS-CS5 (3WAYスピーカー・内蔵ネットワーク完全バイパス)[cite: 1]
* **ハードウェア構成:** 7.1ch HDMIアンプの6ch流用マルチアンプ駆動（デジタルプリアンプ ～ チャンネルデバイダー ～ パワーアンプ）[cite: 1]
* **クロスオーバー周波数 (3-WAY):**[cite: 1]
  * **Low / Mid (2.5kHz):** 200タップによる急峻な減衰と、位相のブレない自然な繋がり。[cite: 1]
  * **Mid / High (17kHz):** スーパートゥイーターを正確に駆動する高精度フィルタリング。[cite: 1]
* **最大のメリット:** パッシブネットワークを排除してアンプが直接ユニットを駆動するドライブ力の向上と、プレエコー（プリリンギング）を極限まで排除する「ミニマムフェーズ化」を、最高200桁の数学的精度でノーエラーで実行[cite: 1]。

---

## 📝 主な機能と特徴 (v3.0.0)

1. **🚀 「小泉の初期値」再帰的極限収束メソッド (Koizumi Scheme)**
   - 50桁 → 100桁 → 200桁へと段階的に解（複素数の根）を引き継ぐことで、20次ウィルキンソン多項式のような悪条件な難問でも、反復回数を劇的に削減し誤差半径 $10^{-180}$ オーダーの極限精度を達成。
2. **🌐 2か国語対応 (日本語 / English)**
   - 画面右上のボタンをワンクリックするだけで、UIテキスト・案内表示・結果出力表示を即座に日本語と英語に切り替えられます[cite: 1]。
3. **📋 係数データの一括ペースト機能（複素数 i, j 対応）**
   - スペース、改行、またはカンマ区切りのテキスト（例: `1, -5.5, 3-4j, 0, 1+2i`）を一括で貼り付けるだけで、実数だけでなく虚数単位 i や j を含む複素数係数も自動解析して全係数へ一発セットできます[cite: 1]。
4. **⚡ 最大 200 次高次多項式 ＆ オートスケーリング（規格化）対応**
   - 高次計算時や巨大・極小係数が混在する場合でも、自動スケーリング処理によってオーバーフロー・アンダーフローを防止し、安定して計算を実行します[cite: 1]。
5. **🎯 瞬時切替可能な表示モード**
   - 単一画面上で「高精度解表示（最大200桁）」と「因数分解表示（小数第1位四捨五入）」をトグルスイッチ一つで即座に切り替え可能です[cite: 1]。
6. **💻 完全マルチプラットフォーム ＆ オフライン対応**
   - サーバー不要で単一の HTML ファイルとして動作するため、Windows, Mac, Linux, iOS, Android, ChromeOS 等のあらゆるブラウザでローカル・オフライン動作します[cite: 1]。

---

## 🇬🇧 English Overview
*MethodDka* is a lightweight, ultra-fast, and high-precision web application designed for solving complex polynomials and performing factorization using pure HTML and JavaScript[cite: 1].
Powered by the Durand-Kerner (DKA) algorithm and Decimal.js with *selectable precision up to 200 digits*, *recursive initial values (Koizumi Scheme)*, *auto-scaling normalization up to degree 200*, *full support for complex coefficients using `i` or `j`*, *bulk coefficient input*, and *instant bilingual language switching (English/Japanese)*[cite: 1].

---

## 🌟 Key Features (v3.0.0)

1. **🚀 Recursive Extreme Convergence (Koizumi Scheme)**
   - Seamlessly passes roots across precision phases (50 to 100 to 200 digits), drastically reducing iterations and crushing residuals down to the $10^{-180}$ order even for ill-conditioned problems like Wilkinson's polynomial.
2. **🌐 Multilingual Support (English / Japanese)**
   - One-click language toggle in the top-right header switches the entire user interface, instructions, and result forms between English and Japanese dynamically[cite: 1].
3. **📋 Bulk Coefficient Input (with Complex i & j Support)**
   - Paste comma or space-separated values including complex numbers like `1+2i` or `3-4j` to fill all coefficient fields instantaneously[cite: 1].
4. **⚡ Auto-Scaling Normalization (Up to Degree 200)**
   - Prevents numerical underflow and overflow when handling high-degree polynomials or extreme variations in coefficient magnitudes[cite: 1].
5. **🎯 Instant Display Toggle**
   - Effortlessly switch between high-precision roots and factored form without recalculating[cite: 1].
6. **💻 Fully Cross-Platform & Offline Ready**
   - Runs locally on any modern browser (Chrome, Safari, Edge, Firefox, mobile browsers) with no server required[cite: 1].

---

## 🧪 ベンチマーク: 20次ウィルキンソン多項式 / Benchmark: 20th-Degree Wilkinson Polynomial

本アプリの DKA法の特性と「小泉の初期値（再帰的初期値ロード）」による極限収束性能を検証するためのテストケースとして、*20次のウィルキンソン多項式* $W_{20}(x) = \prod_{i=1}^{20} (x - i)$ の一括ロード機能を組み込みました[cite: 1]。

### テスト手順 (How to test):
1. ヘルプページ ([help.html](help.html)) または Calculator 画面のクイックテスト機能にアクセスします[cite: 1]。
2. 「20次ウィルキンソン係数を一発ロード」ボタンまたは一括ペーストを使用します[cite: 1]。
3. 50桁（第1フェーズ）→ 100桁（第2フェーズ）→ 200桁（第3フェーズ・限界突破）へと解を保存しながら再帰的に計算を実行し、誤差半径 $10^{-180}$ オーダーの完全収束を体験してください[cite: 1]。

---

## 🌐 公式ページ ＆ リポジトリ / Official Links

- **Web アプリ (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)[cite: 1]
- **GitHub リポジトリ (Repository):** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)[cite: 1]

---

## 📁 リポジトリの構成 / Repository Structure

```text
MethodDka/
├── help.html              # ヘルプと20次ウィルキンソン係数一括読み込み対応データ[cite: 1]
├── MethodDka.html         # 統合マスターコード（200次・200桁・再帰的初期値対応）[cite: 1]
├── index.html             # 公式ランディングページ (ベンチマーク生成機能付き)[cite: 1]
├── privacy.html           # プライバシーポリシー[cite: 1]
└── README.md              # 本ドキュメント / Documentation (v3.0.0)[cite: 1]