# MethodDka (200次対応 & 最大200桁高精度多項式解法・因数分解 Web アプリ / Multilingual Polynomial Solver)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.xxxxxxx.svg)](https://doi.org/10.5281/zenodo.xxxxxxx)

[日本語](README.md) | [English](README.md#english-overview)

## 🇯🇵 日本語概要
*MethodDka* は、HTML と JavaScript だけで動作する軽量・高速・超高精度な多項式解法 ＆ 因数分解 Web アプリケーションです。

DKA法（Durand-Kerner 法）を採用し、Decimal.js による *最大200桁の超高精度演算*、および最新の **「小泉の再帰的初期値（Koizumi Recursive Initial Values）」** メソッドを完全統合しました。v3.1.1 では、ボタン一つで「50桁 → 100桁 → 200桁」の精度を自動でリレーする **全3フェーズ自動計算パイプライン** を実装し、誤差半径 $10^{-180}$ オーダーの極限精度へ全自動で到達します。

---

## 🚀 最新機能 (v3.1.1)

1. **小泉の再帰的極限収束パイプライン (全自動)**
   - 計算ボタン一つで、[Phase 1: 50桁] → [Phase 2: 100桁] → [Phase 3: 200桁] と解を自動で再帰的に引き継ぎます。
2. **全3フェーズ結果完全表示**
   - 各フェーズごとの解と誤差半径を並べて表示。精度の向上プロセスを一目で確認可能です。
3. **セーフティロック最適化 (1,000回制限)**
   - 無駄なループを徹底的に排除し、PCはもちろん、1円スマホ（Galaxy A25 5G 等）のブラウザでも爆速・快適に動作します。

---

## 🎧 応用例: ハイレゾ対応オーディオ用デジタルチャンネルデバイダー
本アプリの数学的エンジンは、3WAYスピーカー **SONY SS-CS5** のネットワークを完全バイパスし、マルチアンプ駆動へ転用するための高精度FIRフィルター設計に応用されています。最高200桁の数学的精度により、位相歪みを排除したプレエコーのない「ミニマムフェーズ化」をノーエラーで実行可能です。

---

## 📝 主な機能と特徴
* **最大 200 次高次多項式 ＆ オートスケーリング:** オーバーフロー・アンダーフローを自動防止。
* **複素数係数（i, j）の完全対応:** 複素数を含む多項式もそのまま計算。
* **日本語 / English 瞬時言語切替:** ワンクリックでUIを切替可能。
* **完全オフライン対応:** サーバー不要、単一HTMLで全ブラウザ動作。

---

## 🇬🇧 English Overview
*MethodDka* is a lightweight, ultra-fast, and high-precision web application for solving polynomials and factorization. 
The v3.1.1 update introduces the **"Koizumi Recursive Initial Values Pipeline,"** which automatically cascades roots through three phases (50D → 100D → 200D) to achieve extreme precision of $10^{-180}$ order. Optimized for mobile devices (e.g., Galaxy A25 5G), it ensures fast convergence even on entry-level hardware with an optimized 1,000-iteration safety limit.

---

## 🧪 ベンチマーク: 20次ウィルキンソン多項式
難問である20次のウィルキンソン多項式 $W_{20}(x) = \prod_{i=1}^{20} (x - i)$ も、一発ロード＆自動再帰パイプラインにより、スマホ上で「全合計反復回数 56回」という驚異的な速度で完全攻略可能です。

### 🧪 テスト手順
1. [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/) にアクセス。
2. 「20次ウィルキンソン一発ロード」をクリック。
3. 「🚀 【小泉の再帰的初期値】 全3フェーズ自動計算＆全結果表示！」ボタンを押下。

---

## 🌐 公式ページ ＆ リポジトリ
- **Web アプリ (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
- **GitHub リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

## 📁 リポジトリの構成
```text
MethodDka/
├── MethodDka.html         # 統合マスターコード（v3.1.1 / 自動パイプライン搭載）
├── index.html             # ランディングページ
├── help.html              # ヘルプページ
└── README.md              # Documentation