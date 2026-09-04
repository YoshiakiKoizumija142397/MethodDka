# MethodDka (200次対応 & 最大200桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.xxxxxxx.svg)](https://doi.org/10.5281/zenodo.xxxxxxx)
![Version](https://img.shields.io/badge/version-v3.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[日本語](README.md) | [English](#-english-overview)

---

## 🇯🇵 日本語概要

*MethodDka* は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです。

DKA法（Durand-Kerner-Aberth 法）を採用し、`Decimal.js` による **ダイレクト200桁極限高精度演算** を完全統合しました。最新の v3.2.0 では、最初から200桁固定精度で直接多項式評価を行うダイレクトエンジンとリアルタイム進捗 UI（ループ数・経過時間・残り推定時間・誤差半径トラッキング）を実装し、20次および65次ウィルキンソン多項式などの超悪条件多項式も誤差 $10^{-150} \sim 10^{-186}$ オーダーの極限精度へ完全収束させます。

---

## 📋 システム仕様 (Technical Specifications)

| 項目 | 詳細仕様 |
| :--- | :--- |
| **コア解法** | DKA法 (Durand-Kerner-Aberth Simultaneuous Root-Finding Method) |
| **演算精度** | 200桁固定精度 (Decimal.js 内部精度の完全適用) |
| **数値安定化** | **オートスケーリング処理** (最高次係数 $a_n$ による正規化でオーバーフロー・アンダーフローを自動防止) |
| **初期値配置** | Aberth 初期配置 (円周上の非等間隔複素配置) |
| **対応最高次数** | 最高 200 次 ($n \le 200$) |
| **多項式評価** | ホーナー法 (Horner's Method) による高精度多項式直評価 |
| **セーフティロック** | **最大 20,000 回ループ制限** (無駄なループやブラウザフリーズを徹底排除し、到達時点の解と各誤差半径を安全に確実出力) |
| **収束判定閾値** | 誤差半径 $\Delta z_i \le 10^{-150}$ での自動終了 |
| **結果処理** | 実部昇順ソート、複素数表記 ($a + bi$)、誤差半径トラッキング |
| **動作環境** | 完全クライアントサイド（HTML5 / JavaScript ES6+） |

---

## 🚀 主な機能と特徴 (v3.2.0)

1. **ダイレクト 200 桁演算エンジン ＆ オートスケーリング**:
   - 最初から 200 桁固定精度で直接評価を実施。オートスケーリング処理により桁落ちやオーバーフロー・アンダーフローを防ぎ、悪条件な高次多項式も高速・確実に収束。
2. **セーフティロック最適化 (20,000 回制限)**:
   - 無駄なループを徹底的に排除し、20,000 回の安全上限を設定することで PC や端末の負荷を最適化。常にその時点での最新解と正確な誤差半径を出力します。
3. **リアルタイム進捗 ＆ タイマー UI**:
   - 反復ループ進捗率（%）、経過時間（`hh:mm:ss`）、推定残り時間、完全収束数をリアルタイムに画面描画。
4. **自動ソート ＆ 見やすい表示**:
   - 算出された複素解を実部の昇順（`1, 2, 3 ...`）へ自動整列。
5. **柔軟な一括ペースト機能**:
   - 降順（$a_n \dots a_0$）で並んだ係数データをカンマ・空白区切りで一括入力可能。
6. **複素数係数（i, j）の完全対応**:
   - 複素数を含む多項式もそのまま計算可能。
7. **日本語 / English 瞬時言語切替**:
   - ワンクリックで UI を切替可能。
8. **完全オフライン対応・プライバシー保護**:
   - サーバー不要、外部送信なし、単一 HTML で全ブラウザ動作。

---

## ⏱ 動作パフォーマンス ＆ 推奨動作環境（実測値）

**【PC環境（Windows 11 Home / 第8世代 Intel Core i7 / 16GB RAM）】**
- **20次ウィルキンソン多項式 $W_{20}(x) = \prod_{i=1}^{20} (x - i)$**:
  - **総計算時間**: **00:00:01 (わずか 1 秒)**
  - **総反復回数**: **32 回**
  - **最悪誤差半径**: **$2.532316 \times 10^{-186}$ (186桁の極限精度)**
  - **結果**: 全20解（`1.000...` 〜 `20.000...`）が100桁以上の表示桁すべてで完全一致・完全収束。
- **65次ウィルキンソン多項式 $W_{65}(x) = \prod_{i=1}^{65} (x - i)$**:
  - **総計算時間**: **約 4 時間**
  - **最悪誤差半径**: **$10^{-150}$ オーダー (150桁の極限精度)**
  - **結果**: 巨大な係数・桁差を持つ超難問である 65次多項式においても、200桁ダイレクト演算により全65解（`1.000...` 〜 `65.000...`）を極限精度で完走・完全収束することを確認済み。
  - gist
https://gist.github.com/YoshiakiKoizumija142397/649c89263a53df38e4f6cfbe8637883a

**【スマートフォン環境（Android / iOS / 例: Galaxy A25 5G等）】**
- **20次多項式**: 快適に動作・高速計算可能。
- **65次多項式**: 演算負荷・計算時間が非常に高いため **非推奨**（PCブラウザでの実行を推奨）。

---

## 🎧 応用例: ハイレゾ対応オーディオ用デジタルチャンネルデバイダー

本アプリの数学的エンジンは、3WAYスピーカー **SONY SS-CS5** のネットワークを完全バイパスし、マルチアンプ駆動へ転用するための高精度FIRフィルター設計に応用されています。最高200桁の数学的精度により、位相歪みを排除したプレエコーのない「ミニマムフェーズ化」をノーエラーで実行可能です。

---

## 🧪 テスト手順

1. [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/) にアクセス。
2. ウィルキンソン係数データを「係数一括ペースト」欄へ貼り付けて「一括反映」をクリック。
3. 「🚀 200桁高精度計算開始！」ボタンを押下。

---

## 🇬🇧 English Overview

*MethodDka* is a lightweight, ultra-fast, and high-precision web application for solving polynomials and factorization using the Durand-Kerner-Aberth (DKA) method powered by `Decimal.js`.
The v3.2.0 update introduces a **Direct 200-Digit Precision Engine** with Auto-scaling and a 20,000-iteration Safety Lock mechanism. Real-time progress UI tracks loop counts, elapsed/remaining time, and error radii, achieving extreme precision ($10^{-186}$ order in 1 sec / 32 iterations for Degree 20; $10^{-150}$ order in approx. 4 hours for Degree 65). (Note: Degree 20 is fully supported on mobile devices like Galaxy A25 5G; Degree 65+ is recommended for PC/Desktop environments with 16GB RAM).

---

## 🌐 公式ページ ＆ リポジトリ

- **Web アプリ (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
- **GitHub リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📁 リポジトリの構成

```text
MethodDka/
├── privacy.html      # プライバシーポリシー
├── MethodDka.html    # 統合マスターコード (v3.2.0 / 200桁ダイレクト演算エンジン)
├── index.html        # ランディングページ (v3.2.0)
├── help.html         # ヘルプページ (v3.2.0)
└── README.md         # ドキュメント (v3.2.0)

```

---

## 📜 ライセンス ＆ 開発者情報

* **開発者**: 小泉嘉章 (Yoshiaki Koizumi)
* **ライセンス**: MIT License

```
Here is the complete translation of your `README.md` into English, formatted and tailored specifically for open-source repositories on GitHub.

---

# MethodDka (Up to Degree 200 & Max 200-Digit High-Precision Polynomial Solver / Factorization Web App)

[日本語](https://www.google.com/search?q=README.md) | [English](https://www.google.com/search?q=%23-english-overview)

---

## 🌐 English Overview

*MethodDka* is a lightweight, ultra-fast, and high-precision web application for solving high-degree polynomials and performing polynomial factorization, running entirely on HTML and JavaScript.

Utilizing the Durand-Kerner-Aberth (DKA) method, it fully integrates a **Direct 200-Digit Extreme Precision Engine** via `Decimal.js`. In version 3.2.0, it features a direct evaluation engine operating at a fixed 200-digit precision alongside a real-time progress UI (tracking loop count, elapsed time, estimated remaining time, and error radius). This enables full convergence even for ill-conditioned polynomials—such as the 20th and 65th-degree Wilkinson polynomials—achieving extreme precision on the order of $10^{-150} \sim 10^{-186}$.

---

## 📋 Technical Specifications

| Item | Specification Details |
| --- | --- |
| **Core Solver Algorithm** | Durand-Kerner-Aberth (DKA) Simultaneous Root-Finding Method |
| **Arithmetic Precision** | Fixed 200-digit precision (Full application of `Decimal.js` internal precision) |
| **Numerical Stabilization** | **Auto-Scaling**: Normalizes by the leading coefficient $a_n$ to automatically prevent overflow and underflow |
| **Initial Value Placement** | Aberth Initialization (Non-equispaced complex placement on a circle) |
| **Max Degree Supported** | Up to Degree 200 ($n \le 200$) |
| **Polynomial Evaluation** | Direct high-precision polynomial evaluation via Horner's Method |
| **Safety Lock** | **Max 20,000 Iteration Limit**: Prevents redundant loops and browser freezes, ensuring safe and reliable output of current roots and error radii |
| **Convergence Threshold** | Automatic termination when error radius $\Delta z_i \le 10^{-150}$ |
| **Result Processing** | Ascending sort by real part, complex notation ($a + bi$), and error radius tracking |
| **Execution Environment** | Pure client-side (HTML5 / JavaScript ES6+) |

---

## 🚀 Key Features & Highlights (v3.2.0)

1. **Direct 200-Digit Calculation Engine & Auto-Scaling**:
* Executes direct evaluations at a fixed 200-digit precision right from the start. Auto-scaling prevents precision loss, underflow, and overflow, ensuring fast and stable convergence even for ill-conditioned high-degree polynomials.


2. **Safety Lock Optimization (20,000 Limit)**:
* Eliminates redundant loops with a safety threshold of 20,000 iterations to optimize system load on PCs and mobile devices, outputting the most accurate current solutions and error radii.


3. **Real-time Progress & Timer UI**:
* Displays loop progress (%), elapsed time (`hh:mm:ss`), estimated remaining time, and fully converged root counts in real time.


4. **Automatic Sorting & Readable Display**:
* Automatically orders output complex roots by their real parts in ascending order (`1, 2, 3...`).


5. **Flexible Batch Paste Input**:
* Allows quick batch pasting of coefficients in descending order ($a_n \dots a_0$), separated by commas or spaces.


6. **Full Support for Complex Coefficients (i, j)**:
* Capable of processing polynomials containing complex coefficients directly.


7. **Instant Language Switching (English / Japanese)**:
* Toggle the entire UI language instantly with a single click.


8. **Fully Offline & Privacy-Focused**:
* Serverless architecture: zero external data transmission. Works off a single HTML file across all modern browsers.



---

## ⏱ Performance Benchmarks & Recommended Environments

**【Desktop Environment (Windows 11 Home / 8th Gen Intel Core i7 / 16GB RAM)】**

* **Degree 20 Wilkinson Polynomial $W_{20}(x) = \prod_{i=1}^{20} (x - i)$**:
* **Total Computation Time**: **00:00:01 (Just 1 second)**
* **Total Iterations**: **32 loops**
* **Worst-Case Error Radius**: **$2.532316 \times 10^{-186}$ (186-digit extreme precision)**
* **Result**: All 20 roots (`1.000...` to `20.000...`) converged completely with 100+ matching digits.


* **Degree 65 Wilkinson Polynomial $W_{65}(x) = \prod_{i=1}^{65} (x - i)$**:
* **Total Computation Time**: **Approx. 4 hours**
* **Worst-Case Error Radius**: **$10^{-150}$ order (150-digit extreme precision)**
* **Result**: Even for the notoriously ill-conditioned Degree 65 polynomial with massive coefficient scale gaps, the direct 200-digit engine successfully completes and fully converges all 65 roots (`1.000...` to `65.000...`).



**【Mobile Environment (Android / iOS / e.g., Galaxy A25 5G)】**

* **Degree 20 Polynomials**: Runs smoothly with high-speed processing.
* **Degree 65 Polynomials**: **Not recommended** due to high computational load (Desktop PC browsers recommended).

---

## 🎧 Application Example: High-Res Audio Digital Channel Divider

The mathematical engine of *MethodDka* is applied to designing high-precision FIR filters used to bypass the passive crossovers of 3-way speakers (such as the **SONY SS-CS5**) for multi-amplifier driving. Leveraging up to 200 digits of mathematical precision, it executes "minimum-phase conversion" without phase distortion or pre-echo artifacts seamlessly.

---

## 🧪 How to Test

1. Access the [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/).
2. Paste your Wilkinson coefficient data into the "Batch Paste" area and click "Apply Batch Input".
3. Click **"🚀 Start 200-Digit High-Precision Calculation!"**.

---

## 🌐 Live Demo & Repository

* **Web Application (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
* **GitHub Repository:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📁 Repository Structure

```text
MethodDka/
├── privacy.html      # Privacy Policy
├── MethodDka.html    # Integrated Master Code (v3.2.0 / 200-Digit Direct Calculation Engine)
├── index.html        # Landing Page (v3.2.0)
├── help.html         # Help Page (v3.2.0)
└── README.md         # Documentation (v3.2.0)

```

---

## 📜 License & Developer Info

* **Developer**: Yoshiaki Koizumi
* **License**: MIT License
---
