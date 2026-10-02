---

# MethodDka (200次対応 & 最大200桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[日本語](https://www.google.com/search?q=README.md) | [English](https://www.google.com/search?q=%23-english-overview)

---

## 🇯🇵 日本語概要

*MethodDka* は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです。

DKA法（Durand-Kerner-Aberth 法）を採用し、`Decimal.js` による **ダイレクト200桁極限高精度演算** を完全統合しました。最新の **v3.3.0** では、新たに **「320桁階層型自動GCD前処理エンジン（平方無因子分解・多項式長除法・動的ユークリッド互除法）」** を実装。従来、重根や多重根を持つ多項式で発生しがちであった数値不安定性、次数不整合、見落としを完全に克服しました。前処理フェーズでは内部精度を320桁（$\epsilon = 10^{-220}$）に引き上げて厳密な最大公約多項式 $G(x) = \gcd(P, P')$ を算出し、動的長除法による縮約多項式 $Q(x) = P(x) / G(x)$ の抽出と重複度 $m$ の自動特定を実行します。さらに、構造上の不一致や混在重根に対しては厳格なセーフティガードが自動で検知し、安全に単根モード（パススルー）へフォールバックするロバスト性を備えています。これにより、ダイレクト200桁評価エンジンと相まって、単純な単根から、重根、ウィルキンソン多項式に至るあらゆる悪条件多項式を極限精度で完全攻略します。

---

## 📋 システム仕様 (Technical Specifications - v3.3.0)

| 項目 | 詳細仕様 (v3.3.0 拡張) |
| --- | --- |
| **コア解法** | DKA法 (Durand-Kerner-Aberth Simultaneous Root-Finding Method) |
| **演算精度階層** | **階層型マルチプレシジョン設計**<br>

<br>・前処理フェーズ: **320桁固定精度** ($\epsilon = 10^{-220}$)<br>

<br>・後工程ソルバー: **230桁内部精度 / 200桁極限出力** ($\epsilon = 10^{-170}$) |
| **自動前処理 (GCD)** | **平方無因子分解 (Square-free Decomposition)**<br>

<br>・微分多項式 $P'(x)$ とのユークリッド互除法による $\gcd(P, P')$ の厳密算出<br>

<br>・動的トラッキング型多項式長除法 (`polyDivide`) による安全な縮約式 $Q(x)$ の抽出<br>

<br>・重複度 $m$ の自動計算と結果の展開処理 |
| **セーフティガード機構** | 縮約次数の整除関係検証（`origDeg % redDeg === 0`）および余りゼロの厳格検証。構造不一致や混在重根を検知した場合、即座に単根モード（パススルー）へ安全にフォールバック。 |
| **数値安定化** | **オートスケーリング処理** (最高次係数 $a_n$ による正規化でオーバーフロー・アンダーフローを自動防止) |
| **初期値配置** | Aberth 初期配置 (円周上の非等間隔複素配置) |
| **対応最高次数** | 最高 200 次 ($n \le 200$) |
| **多項式評価** | ホーナー法 (Horner's Method) による高精度多項式直評価 |
| **セーフティロック** | **最大 20,000 回ループ制限** (無駄なループやブラウザフリーズを徹底排除し、到達時点の解と各誤差半径を安全に確実出力) |
| **結果処理** | 実部昇順ソート、複素数表記 ($a + bi$)、重複度表示、誤差半径トラッキング |
| **動作環境** | 完全クライアントサイド（HTML5 / JavaScript ES6+） |

---

## 🚀 主な機能と特徴 (v3.3.0)

1. **320桁階層型自動GCD前処理エンジン**:
* 後工程の解精度（200桁）を凌駕する320桁の超高精度・極限ノイズ吸収閾値（$\epsilon = 10^{-220}$）により、ユークリッド互除法の累次除算で蓄積する丸め誤差を完全に遮断。重根構造を数学的かつ決定論的に検出します。


2. **動的トラッキング型多項式長除法**:
* 歯抜けの多項式や次数が激しく変動する演算過程においても、常に最高次数を監視し次数差 (`shift`) を動的に計算して商の正しい位置に係数を書き込む最強の除算アルゴリズムを実装。インデックスのズレを永久に追放。


3. **インテリジェント・セーフティガード**:
* 重複度が混在する多項式や非定型な構造に対しては、数学的矛盾（整除不成立や余り残留）をガード機構が瞬時に検知。エラーを起こすことなく安全に単根モード（パススルー）へ切り替え、DKA本体の200桁反復計算で確実に解き切ります。


4. **ダイレクト 200 桁演算エンジン ＆ オートスケーリング**:
* 最初から 200 桁固定精度で直接評価を実施。オートスケーリング処理により桁落ちやオーバーフロー・アンダーフローを防ぎます。


5. **Pro デバッグアナライザ (内部可視化モード)**:
* 前処理の全ステップ（入力 $P(x)$、微分 $P'(x)$、GCD $G(x)$、縮約式 $Q(x)$、余り最大値、重複度判定）を画面上の専用黒背景パネルにリアルタイムダンプし、開発・検証を強力にサポート。


6. **リアルタイム進捗 ＆ タイマー UI**:
* 反復ループ進捗率（%）、経過時間（`hh:mm:ss`）、推定残り時間、完全収束数をリアルタイムに画面描画。


7. **柔軟な一括ペースト機能 ＆ 多言語対応**:
* 降順（$a_n \dots a_0$）係数のカンマ・空白区切り一括ペースト、および日本語 / English の瞬時言語切替に対応。


8. **完全オフライン対応・プライバシー保護**:
* サーバー不要、外部送信なし、単一 HTML で全ブラウザ動作。



---

## ⏱ 動作パフォーマンス ＆ 推奨動作環境（実測値）

**【PC環境（Windows 11 Home / 第8世代 Intel Core i7 / 16GB RAM）】**

* **重根テストケース $(x^2+1)^2 = 0$ ($x^4 + 2x^2 + 1 = 0$)**:
* **前処理**: 320桁精度により一瞬で GCD = $x^2+1$、重複度 2 を検出。
* **総計算時間**: **< 0.01 秒 (一瞬)**
* **結果**: 4つの解（$+i, +i, -i, -i$）が誤差半径 $0$ または極限精度で完全一致・完全収束。


* **20次ウィルキンソン多項式 $W_{20}(x) = \prod_{i=1}^{20} (x - i)**:
* **総計算時間**: **00:00:01 (わずか 1 秒)**
* **総反復回数**: **32 回**
* **最悪誤差半径**: **$2.532316 \times 10^{-186}$ (186桁の極限精度)**
* **結果**: 全20解が100桁以上の表示桁すべてで完全一致・完全収束。



---

## 🎧 応用例: ハイレゾ対応オーディオ用デジタルチャンネルデバイダー

本アプリの数学的エンジンは、3WAYスピーカー **SONY SS-CS5** のネットワークを完全バイパスし、マルチアンプ駆動へ転用するための高精度FIRフィルター設計に応用されています。最高200桁の数学的精度により、位相歪みを排除したプレエコーのない「ミニマムフェーズ化」をノーエラーで実行可能です。

---

## 🧪 テスト手順

1. [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/) にアクセス。
2. 重根テスト用係数（例: `1, 0, 2, 0, 1`）やウィルキンソン係数を「係数一括ペースト」欄へ貼り付けて「一括反映」をクリック。
3. 「🚀 200桁高精度計算開始！」ボタンを押下し、Proアナライザのログと計算結果を確認。

---

---

# 📄 ソフトウェア開発要求仕様書 (SRS: Software Requirements Specification)

**プロジェクト名**: MethodDka (v3.3.0)
**文書種別**: システム要件定義・設計仕様書

## 1. 概要と開発目的

本仕様書は、Webブラウザ上で動作する最高200次・最大200桁極限高精度多項式解法システム *MethodDka* v3.3.0 の機能要件、非機能要件、およびアーキテクチャ設計を定義するものである。v3.3.0 では、浮動小数点演算における丸め誤差に起因する重根検出の破綻を根絶するため、**「320桁階層型自動GCD前処理モジュール」** および **「動的トラッキング型多項式長除法」** を新規に導入する。

## 2. システムアーキテクチャ ＆ 精度階層設計

本システムは、前処理と後工程の間で明確な精度ギャップ（Precision Hierarchy）を設けた2段階パイプライン構造を採用する。

1. **前処理フェーズ (Pre-processing Pipeline)**
* **演算精度**: `Decimal.set({ precision: 320 })`
* **閾値仕様**: $\epsilon = 10^{-220}$（320桁における極限ノイズ吸収値）
* **主要機能**:
* 微分多項式生成 (`derivativePoly`)
* ユークリッド互除法による最大公約多項式算出 (`polyGCD`)
* 動的トラッキング型多項式除算 (`polyDivide`) による縮約式 $Q(x)$ の抽出
* 重複度 $m$ の算定と安全性検証




2. **後工程ソルバーフェーズ (DKA Engine Pipeline)**
* **演算精度**: `Decimal.set({ precision: 230 })` (出力目標 200桁)
* **閾値仕様**: $\epsilon = 10^{-170}$
* **主要機能**: 縮約多項式またはパススルーされた元多項式に対し、Aberth初期配置に基づく Durand-Kerner-Aberth法を適用し、すべての根を並行・高精度収束させる。



## 3. 前処理モジュール詳細設計

### 3.1 動的トラッキング型多項式長除法 (`polyDivide`)

* 降順配列 `[a_n, ..., a_0]` において、次数差 `degA - degB` に基づき、除算の各ステップで正確に商の係数配列 `Q` の正しいインデックス位置へ係数を書き込む。
* 途中で係数が 0 に収束するケースでも、配列の破綻を防ぐために `trimLeadingZeros` による動的トリミングを常時実行する。

### 3.2 堅牢なユークリッド互除法 (`polyGCD`)

* 割る数 $B_{curr}$ の次数が 0 になるか、または余りの最大絶対値が $\epsilon = 10^{-220}$ 以下に達するまでループを実行。
* 割り切れた瞬間の「割る数（$B_{curr}$）」を真の最大公約多項式 $G(x)$ として厳密に返却する。

### 3.3 セーフティガードとフォールバック機構

* 縮約多項式 $Q(x)$ の次数 $redDeg$ に対し、元の次数 $origDeg$ が整除関係を満たさない場合（`origDeg % redDeg !== 0`）、または余りがゼロ許容値を超過した場合は、構造上の不一致（混在重根など）と見なす。
* 即座に重根フラグを解除し、安全な単根モード（パススルー）として元多項式を DKA エンジンへ引き渡す。

## 4. ユーザーインターフェース (UI) 要件

* **Pro デバッグアナライザ**: 内部処理の各ステップ（入力、微分、GCD、縮約式、余り、重複度）を構造化テキストとして画面上にトグル表示。
* **リアルタイム進捗パネル**: 反復ループ回数、経過時間、進捗率プログレスバーを動的描画。
* **多言語対応**: 日本語および英語の瞬時切替機能。

---

## 🇬🇧 English Overview (v3.3.0)

*MethodDka* is a lightweight, ultra-fast, and high-precision web application for solving high-degree polynomials and performing polynomial factorization using the Durand-Kerner-Aberth (DKA) method powered by `Decimal.js`. Version 3.3.0 introduces a **320-Digit Hierarchical Auto-GCD Preprocessing Engine** featuring square-free decomposition, dynamic polynomial long division, and robust safety guard mechanisms. This ensures absolute numerical stability and extreme precision ($10^{-150} \sim 10^{-186}$ orders) across simple roots, multiple roots, and ill-conditioned Wilkinson polynomials.

---

## 🌐 公式ページ ＆ リポジトリ

* **Web アプリ (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
* **GitHub リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---
## 📜 ライセンス ＆ 開発者情報

* **開発者**: 小泉嘉章 (Yoshiaki Koizumi)
* **バージョン**: v3.3.0
* **ライセンス**: MIT License

  
# MethodDka (Up to 200th Degree & Max 200-Digit High-Precision Polynomial Solver & Factorization Web App / Multilingual Polynomial Solver)

[日本語](https://www.google.com/search?q=README.md) | [English](https://www.google.com/search?q=%23-english-overview)

---

## 🇯🇵 Japanese Overview

*MethodDka* is a lightweight, high-speed, and ultra-high-precision polynomial solver and factorization web application operating entirely on HTML and JavaScript.

By adopting the DKA method (Durand-Kerner-Aberth Simultaneous Root-Finding Method), it fully integrates **direct 200-digit extreme-precision arithmetic** powered by `Decimal.js`. The latest **v3.3.0** newly introduces the **"320-Digit Hierarchical Automatic GCD Preprocessing Engine (Square-free Decomposition, Polynomial Long Division, Dynamic Euclidean Algorithm)."** This completely overcomes numerical instability, degree inconsistencies, and oversights that traditionally tended to occur in polynomials with multiple or repeated roots. In the preprocessing phase, internal precision is elevated to 320 digits ($\epsilon = 10^{-220}$) to compute the rigorous greatest common divisor polynomial $G(x) = \gcd(P, P')$, extract the reduced polynomial $Q(x) = P(x) / G(x)$ via dynamic long division, and automatically identify the multiplicity $m$. Furthermore, it features a robust safety guard that automatically detects structural mismatches or mixed multiple roots, securely falling back to single-root mode (pass-through). Combined with the direct 200-digit evaluation engine, this completely conquers all ill-conditioned polynomials—ranging from simple single roots to multiple roots and Wilkinson polynomials—with extreme precision.

---

## 📋 System Specifications (Technical Specifications - v3.3.0)

| Item | Detailed Specifications (v3.3.0 Expansion) |
| --- | --- |
| **Core Solver** | DKA Method (Durand-Kerner-Aberth Simultaneous Root-Finding Method) |
| **Arithmetic Precision Hierarchy** | **Hierarchical Multi-precision Design**<br>

<br>

<br>・ Preprocessing Phase: **Fixed 320-digit precision** ($\epsilon = 10^{-220}$)<br>

<br>

<br>・ Post-process Solver: **230-digit internal precision / 200-digit extreme output** ($\epsilon = 10^{-170}$) |
| **Automatic Preprocessing (GCD)** | **Square-free Decomposition**<br>

<br>

<br>・ Rigorous calculation of $\gcd(P, P')$via Euclidean algorithm with derivative polynomial$P'(x)<br>

<br>

<br>・ Extraction of safe reduced expression $Q(x)$ via dynamic tracking polynomial long division (`polyDivide`)<br>

<br>

<br>・ Automatic calculation of multiplicity $m$ and result expansion processing |
| **Safety Guard Mechanism** | Verification of divisibility relationship for reduced degree (`origDeg % redDeg === 0`) and rigorous verification of zero remainder. When a structural mismatch or mixed multiple root is detected, immediately falls back safely to single-root mode (pass-through). |
| **Numerical Stabilization** | **Auto-scaling Processing** (Automatic prevention of overflow/underflow via normalization by leading coefficient $a_n$) |
| **Initial Value Placement** | Aberth initial placement (non-equidistant complex placement on a circle) |
| **Supported Maximum Degree** | Up to 200th degree ($n \le 200$) |
| **Polynomial Evaluation** | High-precision direct polynomial evaluation via Horner's Method |
| **Safety Lock** | **Max 20,000 loop limit** (thoroughly eliminates redundant loops and browser freezes, safely and reliably outputting the achieved roots and respective error radii) |
| **Result Processing** | Real part ascending sort, complex number notation ($a + bi$), multiplicity display, error radius tracking |
| **Operating Environment** | Fully client-side (HTML5 / JavaScript ES6+) |

---

## 🚀 Key Features & Highlights (v3.3.0)

1. **320-Digit Hierarchical Auto-GCD Preprocessing Engine**:

* Achieves complete interception of rounding errors accumulated during sequential divisions of the Euclidean algorithm through an ultra-high-precision, extreme noise-absorption threshold ($\epsilon = 10^{-220}$) that surpasses post-process root precision (200 digits), detecting multiple root structures mathematically and deterministically.

2. **Dynamic Tracking Polynomial Long Division**:

* Implements a powerhouse division algorithm that constantly monitors the highest degree and dynamically calculates degree differences (`shift`) to write coefficients into the correct index positions of the quotient coefficient array `Q`, even during calculation processes with sparse polynomials or volatile degree fluctuations. Index misalignment is permanently banished.

3. **Intelligent Safety Guard**:

* Instantly detects mathematical contradictions (such as non-divisibility or residual remainders) via the guard mechanism for polynomials with mixed multiplicities or atypical structures. Seamlessly switches to single-root mode (pass-through) without causing errors, ensuring reliable resolution through DKA's 200-digit iterative calculations.

4. **Direct 200-Digit Arithmetic Engine & Auto-scaling**:

* Performs direct evaluation starting with a fixed 200-digit precision. Auto-scaling prevents digit loss, overflow, and underflow.

5. **Pro Debug Analyzer (Internal Visualization Mode)**:

* Real-time dumping of all preprocessing steps (input $P(x)$, derivative $P'(x)$, GCD $G(x)$, reduced expression $Q(x)$, maximum remainder, multiplicity determination) onto a dedicated black-background panel on screen, powerfully supporting development and verification.

6. **Real-Time Progress & Timer UI**:

* Real-time rendering of iterative loop progress percentage (%), elapsed time (`hh:mm:ss`), estimated remaining time, and complete convergence count.

7. **Flexible Batch Paste & Multilingual Support**:

* Supports batch pasting of descending ($a_n \dots a_0$) coefficient comma/space-delimited values, alongside instant language toggling between Japanese and English.

8. **Full Offline Support & Privacy Protection**:

* Serverless, zero external transmissions, runs in all browsers via a single HTML file.

---

## ⏱ Operational Performance & Recommended Environment (Measured Values)

**【PC Environment (Windows 11 Home / 8th Gen Intel Core i7 / 16GB RAM)】**

* **Multiple Root Test Case $(x^2+1)^2 = 0$ ($x^4 + 2x^2 + 1 = 0$)**:
* **Preprocessing**: Instantly detects GCD = $x^2+1$ and multiplicity 2 via 320-digit precision.
* **Total Calculation Time**: **< 0.01 seconds (Instantaneous)**
* **Result**: All 4 roots ($+i, +i, -i, -i$) completely match and converge with an error radius of $0$ or extreme precision.
* **20th-Degree Wilkinson Polynomial $W_{20}(x) = \prod_{i=1}^{20} (x - i)$**:
* **Total Calculation Time**: **00:00:01 (Only 1 second)**
* **Total Iterations**: **32 times**
* **Worst Error Radius**: **$2.532316 \times 10^{-186}$ (Extreme precision to 186 digits)**
* **Result**: All 20 roots completely match and converge across all displayed digits (over 100 digits).

---

## 🎧 Application Example: Digital Channel Divider for Hi-Res Audio

The mathematical engine of this application is applied to high-precision FIR filter design for bypassing the network of a 3-way speaker **SONY SS-CS5** entirely and repurposing it for multi-amplifier drive. With up to 200 digits of mathematical precision, pre-echo-free "minimum phase conversion" eliminating phase distortion can be executed error-free.

---

## 🧪 Testing Procedure

1. Access the [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/).
2. Paste multiple root test coefficients (e.g., `1, 0, 2, 0, 1`) or Wilkinson coefficients into the "Coefficient Batch Paste" field and click "Apply All".
3. Press the "🚀 Start 200-Digit High-Precision Calculation!" button to check the Pro Analyzer logs and calculation results.

---

---

# 📄 Software Requirements Specification (SRS)

**Project Name**: MethodDka (v3.3.0)
**Document Type**: System Requirements Definition & Design Specification

## 1. Overview and Development Objectives

This specification defines the functional requirements, non-functional requirements, and architectural design of *MethodDka* v3.3.0, an ultra-high-precision polynomial solver system supporting up to the 200th degree and up to 200 digits, operating within web browsers. To eradicate failures in multiple root detection caused by rounding errors in floating-point arithmetic, v3.3.0 introduces the **"320-Digit Hierarchical Auto-GCD Preprocessing Module"** and **"Dynamic Tracking Polynomial Long Division."**

## 2. System Architecture & Precision Hierarchy Design

This system adopts a two-stage pipeline structure with a distinct precision hierarchy established between the preprocessing and post-processing stages.

1. **Preprocessing Phase (Pre-processing Pipeline)**

* **Arithmetic Precision**: `Decimal.set({ precision: 320 })`
* **Threshold Specification**: $\epsilon = 10^{-220}$ (Extreme noise absorption value at 320 digits)
* **Key Functions**:
* Derivative polynomial generation (`derivativePoly`)
* Calculation of greatest common divisor polynomial via Euclidean algorithm (`polyGCD`)
* Extraction of reduced expression $Q(x)$ via dynamic tracking polynomial division (`polyDivide`)
* Computation of multiplicity $m$ and safety verification

2. **Post-process Solver Phase (DKA Engine Pipeline)**

* **Arithmetic Precision**: `Decimal.set({ precision: 230 })` (Target output: 200 digits)
* **Threshold Specification**: $\epsilon = 10^{-170}$
* **Key Functions**: Applies the Durand-Kerner-Aberth method based on Aberth initial placement to the reduced polynomial or pass-through original polynomial, causing all roots to converge concurrently and with high precision.

## 3. Preprocessing Module Detailed Design

### 3.1 Dynamic Tracking Polynomial Long Division (`polyDivide`)

* In descending arrays `[a_n, ..., a_0]`, based on the degree difference `degA - degB`, coefficients are written precisely to the correct index positions of the quotient coefficient array `Q` at each division step.
* Dynamic trimming via `trimLeadingZeros` is constantly executed to prevent array breakdown even in cases where coefficients converge to 0 midway.

### 3.2 Robust Euclidean Algorithm (`polyGCD`)

* Loops execute until the degree of the divisor $B_{curr}$ becomes 0 or the maximum absolute value of the remainder falls below or equals $\epsilon = 10^{-220}$.
* Strictly returns the "divisor" ($B_{curr}$) at the exact moment of division as the true greatest common divisor polynomial $G(x)$.

### 3.3 Safety Guard and Fallback Mechanism

* If the original degree `origDeg` fails to satisfy a divisibility relationship with the degree `redDeg` of the reduced polynomial $Q(x)$ (`origDeg % redDeg !== 0`), or if the remainder exceeds the zero-tolerance value, it is regarded as a structural mismatch (such as mixed multiple roots).
* Immediately lifts the multiple root flag and hands over the original polynomial to the DKA engine as a safe single-root mode (pass-through).

## 4. User Interface (UI) Requirements

* **Pro Debug Analyzer**: Toggle display of internal processing steps (input, derivative, GCD, reduced expression, remainder, multiplicity determination) on screen as structured text.
* **Real-Time Progress Panel**: Dynamic rendering of iterative loop count, elapsed time, and progress bar percentage.
* **Multilingual Support**: Instant switching capability between Japanese and English.

---

## 🌐 Official Page & Repository

* **Web App (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
* **GitHub Repository:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📜 License & Developer Information

* **Developer**: Yoshiaki Koizumi
* **Version**: v3.3.0
* **License**: MIT License

---
