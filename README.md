---

# MethodDka (最大1000次対応・260桁内部演算／最大180桁形式出力の多項式数値解法 Web アプリ)

[日本語](https://www.google.com/search?q=%23-%E6%97%A5%E6%9C%AC%E8%AA%9E%E6%A6%82%E8%A6%81) | [English](https://www.google.com/search?q=%23-english-overview)

---

## 🇯🇵 日本語概要

*MethodDka* は、HTML と JavaScript だけで動作する多項式数値解法・因数分解 Web アプリケーションです。内部演算には Decimal.js の260桁精度を用い、実部は有効数字180桁、虚部は $10^{-180}$ の単位で四捨五入して表示します。この表示桁数は正しい有効桁数を保証しません。

DKA法（Durand-Kerner-Aberth 法）を採用し、`Decimal.js` による **260桁内部演算** を行います。実部は有効数字180桁、虚部は $10^{-180}$ の単位で四捨五入して表示します。表示桁数は正しい桁数を保証しません。20次ウィルキンソン多項式の既知根 1〜20 とのベンチマーク照合では、ある検証実行の実部がおよそ247〜258桁一致しました。この結果は当該ベンチマークでの確認であり、他の入力や実行への精度保証ではありません。

**v3.6.0** では、これまでのユンの平方無因子分解（整数係数のBigInt厳密演算および非整数係数の320桁処理による重根分離）や、180桁丸めによる緑色Pass判定に加え、新たに**個別根の収束ステータス管理（Root-wise Convergence Locking）**および**停滞検知（Stagnation Detection）に基づくアーリー・エグジット（早期離脱）制御**を導入しました。これにより、100次以上の高次密集根ケースにおいて発生していた反復オーバーヘッドを完全に解消し、処理時間を劇的に短縮しています。

---

## 📋 システム仕様 (Technical Specifications - v3.6.0)

| 項目 | 詳細仕様 (v3.6.0) |
| --- | --- |
| **コア解法** | DKA法 (Durand-Kerner-Aberth Simultaneous Root-Finding Method) |
| **演算精度階層** | **階層型マルチプレシジョン設計**<br>

<br>

<br>・前処理フェーズ: 整数係数は **BigInt厳密演算**、その他は **320桁固定精度** ($\epsilon = 10^{-220}$)<br>

<br>

<br>・後工程ソルバー: **260桁内部演算 / 最大180桁形式で出力**（60桁のガード桁、スケール後の補正量閾値 $\epsilon = 10^{-220}$。出力桁数は正しい有効桁数を保証しません） |
| **精度の解釈** | 実部は有効数字180桁、虚部は $10^{-180}$ の単位で四捨五入して出力します。これは表示形式であり、正しい有効桁数の保証ではありません。20次ウィルキンソン多項式との照合結果はそのベンチマークに限った数値確認です。正規化残差は後退誤差の数値指標です。例えば残差 $10^{-307}$ は「根が307桁正しい」ことを意味せず、有効桁数を認証するものでもありません。 |
| **自動前処理 (GCD)** | **ユンの平方無因子分解 (Yun's Square-free Decomposition)**<br>

<br>

<br>・微分多項式 $P'(x)$ とのユークリッド互除法による $\gcd(P, P')$ の算出<br>

<br>

<br>・整数係数ではBigInt擬似剰余列を使った厳密GCD、それ以外では320桁精度と動的多項式除算 (`polyDivide`) を用いて重複度別の平方無因子群 $Q_k(x)$ を抽出<br>

<br>

<br>・重複度 $m$ の自動計算と結果の展開処理 |
| **ループ制御方式** | **個別根収束ステータス管理 (Root-wise Convergence Locking)**<br>

<br>

<br>・全根を一括同期するループを廃し、各根の収束状況を独立して追跡。<br>

<br>・許容誤差を満たした根を動的にロック（以降の反復計算から除外）し、未収束の根へ計算リソースを集中。 |
| **アーリー・エグジット判定** | **補正量閾値と停滞検知 (Stagnation Detection)**<br>

<br>

<br>・各反復における補正量 $\Delta z$ の減少率および丸め誤差限界を監視。<br>

<br>・理論的・数値的にこれ以上の精度向上が見込めない「頭打ち（停滞）」状態を検出し、過剰なセーフティロック到達を防いでスマートにループを離脱。 |
| **セーフティガード機構** | 各多項式除算の余り、因子の平方無因子性、重複度を反映した再構成次数を検証。失敗時は診断ログを出して元多項式をDKAへ渡す。 |
| **数値安定化** | 非整数係数の前処理と各DKA因子をそれぞれモニック化し、Fujiwara根上界に基づく変数スケール $x=S y$ を適用 |
| **初期値配置** | スケール済み変数 $y$ の円周上にAberth初期値を配置 |
| **対応最高次数** | 最高 1000 次 ($n \le 1000$) |
| **多項式評価** | ホーナー法 (Horner's Method) による高精度多項式直評価 |
| **セーフティロック** | 反復上限の既定値は因子ごとに **5,000回**（入力欄で10〜50,000回に設定可能）。上限到達時はその時点の解と最終補正量を出力 |
| **結果処理** | 実部昇順ソート、複素数表記 ($a + bi$)、重複度表示、DKA最終補正量、各根の正規化残差、全根からの係数再構成残差を表示。反復収束と検査結果を別々に報告します。**残差 $\le 10^{-180}$ を満たした解は厳格な精度要件をクリアしたものとして「Pass（緑色）」でハイライト表示されます。** |
| **動作環境** | 計算はクライアントサイド（HTML5 / JavaScript ES6+）。計算画面は高精度演算ライブラリ `Decimal.js` をCDNから読み込むため、未キャッシュ時の読み込みにはネットワーク接続が必要。任意のGemini Pro解説にもネットワーク接続が必要 |

---

## 🚀 主な機能と特徴 (v3.6.0)

1. **高次密集根に対する高速化制御 (v3.6.0 新機能)**:
* ループ制御方式に個別根収束ステータス管理を導入し、既に収束条件を満たした根に対する不要な演算をスキップします。
* さらに、補正量の減少率を監視する停滞検知（Stagnation Detection）により、過剰な反復を防止しループから早期離脱（アーリー・エグジット）するロジックを実装。100次を超える複雑なウィルキンソン方程式などの処理時間を劇的に短縮しました。


2. **表示と判定の理論的整合性**:
* 収束保証の閾値である「後退誤差 $10^{-180}$ 以下」に合わせて、最終出力を180桁で四捨五入する仕様に最適化。保証限界を超える181桁目以降の揺らぎを排除し、正確で美しい解の表示を実現しました。
* 反復数にかかわらず、残差 $\le 10^{-180}$ を満たす根は「収束完了」とみなし、画面上で直感的に確認できる緑色のPass判定を行います。


3. **ユンの平方無因子分解**:
* 整数係数はBigIntによる厳密なGCD・多項式除算で、それ以外は320桁精度と $\epsilon = 10^{-220}$ で処理し、同じ重複度を持つ根の因子群 $Q_k(x)$ を分離します。各群の平方無因子性と元の次数の再構成を検証します。


4. **動的トラッキング型多項式長除法**:
* 歯抜けの多項式や次数が激しく変動する演算過程においても、常に最高次数を監視し次数差 (`shift`) を動的に計算して商の正しい位置に係数を書き込む最強の除算アルゴリズムを実装。インデックスのズレを永久に追放。


5. **検証付きフォールバック**:
* 割り算の余り、平方無因子性、再構成次数のいずれかが検証を通らない場合は診断をログへ出し、元多項式を既存DKAへ渡します。正常に分解できた混在重根は重複度別に個別計算します。


6. **オートスケーリング付きDKA**:
* 非整数係数の前処理と各平方無因子因子のDKAで、Fujiwara上界 $S=2\max_i \vert{}a_i\vert{}^{1/i}$ を使って $x=S y$ に変数変換します。因子分解後は因子を元の変数へ戻し、DKAは各因子を再スケールして解き、根と最終補正量を元の尺度へ戻します。補正量は真の誤差を保証するものではなく、スケーリングも全ての多項式の収束を保証するものではありません。


7. **Pro デバッグアナライザ (内部可視化モード)**:
* 前処理の全ステップ（入力 $P(x)$、微分 $P'(x)$、GCD $G(x)$、縮約式 $Q(x)$、余り最大値、重複度判定）を画面上の専用黒背景パネルにリアルタイムダンプし、開発・検証を強力にサポート。


8. **リアルタイム進捗 ＆ タイマー UI**:
* 反復ループ進捗率（%）、経過時間（`hh:mm:ss`）、推定残り時間、完全収束数をリアルタイムに画面描画。


9. **柔軟な一括ペースト機能 ＆ 多言語対応**:
* 降順（$a_n \dots a_0$）係数のカンマ・空白区切り一括ペースト、および日本語 / English の瞬時言語切替に対応。


10. **クライアントサイド計算・プライバシー保護**:

* 多項式計算はブラウザー内で実行。Gemini解説を利用しない限り、係数や計算結果を外部へ送信しません。

11. **Gemini Proによる任意のAI解説**:

* 計算結果を日本語または英語で解説。利用者が実行した場合のみ係数と解をGoogle Gemini APIへ送信し、APIキーは送信時に入力欄から消去して保存しません。

---

## 📦 配信・配布形態 (Distribution Formats)

本プロジェクトは、用途と環境に合わせて以下の3つの形態で配布しています。

1. **オンライン版（GitHub Pages）: v3.6.0**
* **全OS対応**。インストール不要で、ブラウザからアクセスするだけで最新版が即座に利用可能です。


2. **オフライン版（ZIPファイルダウンロード）: v3.6.0**
* **全OS対応**。リポジトリからZIPファイルをダウンロードして解凍し、ローカル環境で `MethodDka.html` をブラウザで開くことで、オフラインでも動作します（※初回ライブラリ読み込みやAI解説機能を除く）。


3. **インストーラ版（MSIパッケージ）: v3.4.1 (Stable)**
* **Windows 11 26H2 正式対応**の完全オフライン版。Electron Builderを用いてビルドされたWindows向けのネイティブインストーラです。
* *※セキュリティ警告（SmartScreen等）対策やコード署名の検証を慎重に行うため、MSI版は安定稼働実績のある v3.4.1 を継続提供しています。*



---

## ⏱ 動作パフォーマンス ＆ 推奨動作環境（実測例）

**【検証環境（Windows 11 Home / 第8世代 Intel Core i7 / 16GB RAM）】**

* **重根テストケース $(x^2+1)^2 = 0$ ($x^4 + 2x^2 + 1 = 0$)**:
* **前処理**: 整数係数をBigIntで厳密に処理し、一瞬で GCD = $x^2+1$、重複度 2 を検出。
* **総計算時間**: **< 0.01 秒 (一瞬)**
* **結果**: 4つの解（$+i, +i, -i, -i$）を取得。表示する補正量はDKAの最終反復補正であり、真の誤差の保証ではありません。


* **20次ウィルキンソン多項式 $W_{20}(x) = \prod_{i=1}^{20} (x - i)$**:
* **実測例（1回の実行）**: 上記検証環境での経過時間 **00:00:07**、因子反復合計 **110回**、反復収束 **20/20**、正規化残差チェック（$\le 10^{-180}$） **20/20**、係数再構成誤差 **$2.8046 \times 10^{-247}$**。最大の最終補正量（推定）は **$2.5735 \times 10^{-246}$**（解16）でした。


* **50次ウィルキンソン多項式 $W_{50}(x) = \prod_{i=1}^{50} (x - i)$**:
* **実測例（1回の実行）**: 上記と同じ検証環境で、経過時間 **00:01:56**、因子反復合計 **308回**、反復収束 **50/50**、正規化残差チェック（$\le 10^{-180}$） **50/50**、係数再構成誤差 **$2.2324 \times 10^{-220}$** でした。


* **100次ウィルキンソン多項式 $W_{100}(x) = \prod_{i=1}^{100} (x - i)$**:
* **v3.6.0 実測例**: アーリー・エグジットと個別ロック制御の導入により、以前は全根収束に約36分を要していた処理が劇的に高速化。全100個の解が「完全な整数 1〜100」として表示され、画面上でも全解がPass（緑色）と判定されます。


* 時間・反復回数・補正量は環境や実行ごとに変動します。最終補正量と残差・係数再構成誤差は数値指標であり、真の誤差や表示された桁の正しさを保証するものではありません。

---

## 🎧 応用例: ハイレゾ対応オーディオ用デジタルチャンネルデバイダー

本アプリの数値計算エンジンは、3WAYスピーカー **SONY SS-CS5** のネットワークをバイパスし、マルチアンプ駆動へ転用するFIRフィルター設計への応用例があります。出力桁数や残差は正しい有効桁数・誤差の保証ではないため、設計用途では独立した検証と実機での安全確認が必要です。

---

## 🧪 テスト手順

1. [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/) にアクセス。
2. 重根テスト用係数（例: `1, 0, 2, 0, 1`）やウィルキンソン係数を「係数一括ペースト」欄へ貼り付けて「一括反映」をクリック。
3. 「🚀 高精度数値計算開始！」ボタンを押下し、Proアナライザのログと計算結果を確認。
4. Gemini解説を試す場合は、計算結果欄で自分のGemini APIキーを入力して解説を依頼します。依頼時に係数と計算結果がGoogleへ送信されます。

---

---

# 📄 ソフトウェア開発要求仕様書 (SRS: Software Requirements Specification)

**プロジェクト名**: MethodDka (v3.6.0)
**文書種別**: システム要件定義・設計仕様書

## 1. 概要と開発目的

本仕様書は、Webブラウザー上で動作する最高1000次・260桁内部演算の多項式数値解法システム *MethodDka* v3.6.0 の機能要件、非機能要件、およびアーキテクチャ設計を定義する。実部は有効数字180桁、虚部は $10^{-180}$ の単位で四捨五入して表示します。表示桁数は正しい有効桁数の保証ではありません。20次ウィルキンソン多項式の既知根とのベンチマーク照合では、検証した実行で実部が約247〜258桁一致しました。この結果は当該テストに限った確認です。v3.6.0では、表示形式と判定基準の整合性（180桁丸め・緑色Pass判定）に加え、個別根の収束ステータス管理と停滞検知によるアーリー・エグジット制御を実装し、100次のような高次密集根における反復処理のオーバーヘッドを劇的に改善します。

## 2. システムアーキテクチャ ＆ 精度階層設計

本システムは、前処理と後工程の間で明確な精度ギャップ（Precision Hierarchy）を設けた2段階パイプライン構造を採用する。

1. **前処理フェーズ (Pre-processing Pipeline)**
* **演算精度**: 整数係数はBigInt厳密演算、それ以外は `Decimal.set({ precision: 320 })`
* **閾値仕様**: 整数係数は厳密割り切れ性、それ以外は $\epsilon = 10^{-220}$
* **主要機能**:
* 整数係数はBigInt擬似剰余GCDと厳密多項式除算によるユン分解
* 非整数係数は微分多項式生成 (`derivativePoly`)、ユークリッド互除法 (`polyGCD`)、動的多項式除算 (`polyDivide`) によるユン分解
* 重複度 $k$ 別の平方無因子因子 $Q_k(x)$ の抽出
* 割り算の余り、平方無因子性、重み付き再構成次数の検証




2. **後工程ソルバーフェーズ (DKA Engine Pipeline)**
* **演算精度**: `Decimal.set({ precision: 260 })` (出力 180有効桁、80ガード桁)
* **閾値仕様**: スケール空間の補正量 $\epsilon = 10^{-220}$
* **主要機能**:
* 前処理で検証された各平方無因子因子 $Q_k(x)$ を一つずつ既存のDurand-Kerner-Aberth法へ渡し、計算結果を重複度 $k$ に従って展開・統合する。
* 個別根の収束ステータスを管理し、許容誤差を満たした根はロックして後続の計算をスキップする（アーリー・エグジット）。
* 補正量の停滞を検知した場合は過剰な反復を防止し、ループを早期に離脱する。
* 分解検証に失敗した場合はログを出して元多項式を渡す。





## 3. 前処理モジュール詳細設計

### 3.1 動的トラッキング型多項式長除法 (`polyDivide`)

* 降順配列 `[a_n, ..., a_0]` において、次数差 `degA - degB` に基づき、除算の各ステップで正確に商の係数配列 `Q` の正しいインデックス位置へ係数を書き込む。
* 途中で係数が 0 に収束するケースでも、配列の破綻を防ぐために `trimLeadingZeros` による動的トリミングを常時実行する。

### 3.2 堅牢なユークリッド互除法 (`polyGCD`)

* 割る数 $B_{curr}$ の次数が 0 になるか、または余りの最大絶対値が $\epsilon = 10^{-220}$ 以下に達するまでループを実行。
* 割り切れた瞬間の「割る数（$B_{curr}$）」を真の最大公約多項式 $G(x)$ として厳密に返却する。

### 3.3 ユン分解の検証とフォールバック機構

* 各因子の除算余りが $\epsilon$ 以下であること、因子とその導関数のGCDが定数であることを検証する。
* $\sum_k k \cdot \deg(Q_k) = \deg(P)$ および残余GCDが定数であることを検証する。
* 検証に失敗した場合は診断ログを表示し、元多項式をDKAエンジンへ引き渡す。混在重根を次数比で拒否しない。

## 4. ユーザーインターフェース (UI) 要件

* **厳格な色判定表示**: 後退誤差（残差） $\le 10^{-180}$ を満たす根は、反復回数上限到達の有無にかかわらず「収束（Pass）」とみなし、緑色でハイライトする。
* **Pro デバッグアナライザ**: 内部処理の各ステップ（入力、微分、GCD、縮約式、余り、重複度）を構造化テキストとして画面上にトグル表示。
* **リアルタイム進捗パネル**: 反復ループ回数、経過時間、進捗率プログレスバーを動的描画。
* **多言語対応**: 日本語および英語の瞬時切替機能。

---

## 🇬🇧 English Overview (v3.6.0)

*MethodDka* is a polynomial numerical solver and factorization web application operating on HTML and JavaScript. It uses 260-digit internal arithmetic, displays the real part to 180 significant digits, and rounds the imaginary part to the nearest $10^{-180}$. Output length does not guarantee correct significant digits. In a tested degree-20 Wilkinson benchmark against the known roots 1–20, real parts agreed to approximately 247–258 digits; this validates that benchmark run only, not other inputs or executions.

It uses the DKA method (Durand-Kerner-Aberth) with **260-digit internal arithmetic** powered by `Decimal.js`. Version 3.6.0 optimizes performance for high-degree, dense root scenarios like the 100th-degree Wilkinson polynomial. It introduces **Root-wise Convergence Locking**, bypassing iterations for roots that have already reached the required tolerance, and **Stagnation Detection** as an early exit strategy to halt redundant calculations when correction magnitudes plateau. These optimizations drastically reduce iteration overhead and processing time. It also normalizes the display rounding to 180 digits to match the strict backward-error check threshold ($\le 10^{-180}$), adding a green-highlight pass validation for these roots, and leverages Yun's square-free decomposition to separate roots with different multiplicities.

---

## 🌐 公式ページ ＆ リポジトリ

* **Web アプリ (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
* **GitHub リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📜 ライセンス ＆ 開発者情報

* **開発者**: 小泉嘉章 (Yoshiaki Koizumi)
* **バージョン**: v3.6.0 (※MSI Installer Version: v3.4.1)
* **ライセンス**: MIT License

# MethodDka (Up to Degree 1000, 260-Digit Internal Arithmetic, Up to 180-Digit-Format Output; Correct Digits Not Guaranteed)

[日本語](https://www.google.com/search?q=README.md) | [English](https://www.google.com/search?q=%23-english-overview)

---

## 🇬🇧 English Overview

*MethodDka* is a polynomial numerical solver and factorization web application operating on HTML and JavaScript. It uses 260-digit internal arithmetic, displays the real part to 180 significant digits, and rounds the imaginary part to the nearest $10^{-180}$. Output length does not guarantee correct significant digits. In a tested degree-20 Wilkinson benchmark against the known roots 1–20, real parts agreed to approximately 247–258 digits; this validates that benchmark run only, not other inputs or executions.

It uses the DKA method (Durand-Kerner-Aberth) with **260-digit internal arithmetic** powered by `Decimal.js`. Version 3.6.0 brings major performance enhancements for high-degree dense root cases (e.g., the 100th-degree Wilkinson polynomial) by introducing **Root-wise Convergence Locking** and **Stagnation Detection**. These features prevent redundant calculations on already-converged roots and trigger an early exit when precision plateaus, dramatically reducing the calculation overhead. The version also maintains the normalized display rounding to 180 digits to match the strict backward-error check threshold ($\le 10^{-180}$), adding a green-highlight pass validation for these roots, and utilizes Yun's square-free decomposition for preprocessing.

---

## 📋 System Specifications (Technical Specifications - v3.6.0)

| Item | Detailed Specifications (v3.6.0) |
| --- | --- |
| **Core Solver** | DKA Method (Durand-Kerner-Aberth Simultaneous Root-Finding Method) |
| **Arithmetic Precision Hierarchy** | **Hierarchical Multi-precision Design**<br>

<br>

<br>・ Preprocessing Phase: **Exact BigInt arithmetic** for integer coefficients; otherwise **fixed 320-digit precision** ($\epsilon = 10^{-220}$)<br>

<br>

<br>・ Post-process Solver: **260-digit internal precision / output formatted to at most 180 significant digits** (80 guard digits; scaled correction threshold $\epsilon = 10^{-220}$; output length does not guarantee correct digits) |
| **Automatic Preprocessing (GCD)** | **Yun's Square-free Decomposition**<br>

<br>

<br>・ Calculation of $\gcd(P, P')$ using the Euclidean algorithm with derivative polynomial $P'(x)$<br>

<br>

<br>・ Extraction of multiplicity-specific square-free factors $Q_k(x)$ using exact BigInt pseudo-remainder sequences for integer coefficients, or 320-digit arithmetic and dynamic polynomial division (`polyDivide`) otherwise<br>

<br>

<br>・ Automatic calculation of multiplicity $m$ and result expansion processing |
| **Loop Control Method** | **Root-wise Convergence Locking**<br>

<br>

<br>・ Bypasses iterations for individual roots that have already reached the required tolerance, focusing computational resources only on unconverged roots. |
| **Early Exit Validation** | **Correction Magnitude Threshold & Stagnation Detection**<br>

<br>

<br>・ Halts redundant calculations when correction magnitudes plateau or decrease rates stagnate, preventing unnecessary iterations up to the safety lock limit. |
| **Safety Guard Mechanism** | Validates division remainders, square-freeness of each factor, and reconstructed degree. On failure, logs diagnostics and passes the original polynomial to DKA. |
| **Numerical Stabilization** | Non-integer preprocessing and each DKA factor are scaled independently with $x=S y$, using a Fujiwara root bound |
| **Initial Value Placement** | Aberth initial values are placed on a circle in the scaled variable $y$ |
| **Supported Maximum Degree** | Up to 1000th degree ($n \le 1000$) |
| **Polynomial Evaluation** | High-precision direct polynomial evaluation via Horner's Method |
| **Safety Lock** | Default limit of **5,000 iterations per factor** (configurable from 10 to 50,000 in the input); outputs the current roots and final correction magnitudes when the limit is reached |
| **Result Processing** | Real part ascending sort, complex number notation ($a + bi$), multiplicity display, final DKA correction, per-root normalized residual, and coefficient reconstruction residual from the full root set. **Roots passing the $\le 10^{-180}$ residual check are highlighted in green (Pass).** |
| **Operating Environment** | Calculations run client-side (HTML5 / JavaScript ES6+). The calculation page loads `Decimal.js` from a CDN, so an internet connection is required unless the library is cached; optional Gemini Pro explanations also require an internet connection |

---

## 🚀 Key Features & Highlights (v3.6.0)

1. **High-Degree Convergence Optimization (New in v3.6.0)**:
* Implements Root-wise Convergence Locking to skip updates for roots that have already converged.
* Adds Stagnation Detection to monitor the decrease rate of correction magnitudes, triggering an early exit when precision plateaus. This drastically reduces the overhead in dense root scenarios like the 100th-degree Wilkinson polynomial.


2. **Display & Validation Normalization**:
* Output display is perfectly rounded to 180 digits to match the strict backward-error verification standard ($10^{-180}$), eliminating micro-fluctuations. Roots fulfilling this residual criteria are indicated with a green highlight (Pass status) on the UI.


3. **Yun Square-Free Decomposition**:
* Exact BigInt GCD and division are used for integer coefficients; otherwise 320-digit precision and $\epsilon = 10^{-220}$ are used. Root groups $Q_k(x)$ are separated by multiplicity, then square-freeness and degree reconstruction are checked.


4. **Dynamic Tracking Polynomial Long Division**:
* Implements a powerhouse division algorithm that constantly monitors the highest degree and dynamically calculates degree differences (`shift`) to write coefficients into the correct index positions, preventing misalignment.


5. **Intelligent Safety Guard**:
* If division remainders, factor square-freeness, or degree reconstruction fail validation, diagnostics are logged and the original polynomial is passed to the existing DKA engine.


6. **Auto-scaled DKA**:
* Non-integer preprocessing and each square-free factor are scaled with the Fujiwara bound $S=2\max_i \vert{}a_i\vert{}^{1/i}$. A correction magnitude is not a bound on the true error, and scaling does not guarantee convergence for every polynomial.


7. **Pro Debug Analyzer (Internal Visualization Mode)**:
* Real-time dumping of all preprocessing steps onto a dedicated black-background panel to support development and verification.


8. **Real-Time Progress & Timer UI**:
* Real-time rendering of iterative loop progress percentage, elapsed time, estimated remaining time, and complete convergence count.


9. **Flexible Batch Paste & Multilingual Support**:
* Supports batch pasting of descending ($a_n \dots a_0$) coefficient delimited values, and instant language toggling between Japanese and English.


10. **Client-side Calculation & Privacy**:
* Polynomial calculations run in the browser. Coefficients and results are not sent externally unless the optional Gemini explanation is requested.


11. **Optional Gemini Pro AI Explanations**:
* Get explanations in Japanese or English. Coefficients and roots are sent to the Google Gemini API only when requested; the API key field is cleared on submission.



---

## 📦 Distribution Formats

This project is distributed and provided in the following three formats to best suit your environment:

1. **Online Version (GitHub Pages): v3.6.0**
* **Supports all OS**. No installation required; instantly accessible directly from your browser.


2. **Offline Version (ZIP Download): v3.6.0**
* **Supports all OS**. Download the ZIP file from the repository, extract it, and open `MethodDka.html` in your browser to run it locally (offline usage supported, excluding initial library loading and AI explanation features).


3. **Installer Version (MSI Package): v3.4.1 (Stable)**
* **Fully offline version officially supporting Windows 11 26H2**. A native Windows installer built with Electron Builder, allowing you to use it comfortably as a desktop application.
* *(Note: To ensure code signing and SmartScreen verification, the MSI version remains at the highly stable v3.4.1 release.)*



---

## ⏱ Operational Performance & Recommended Environment (Measured Example)

**Precision interpretation:** The 180 digits describe the output format, not guaranteed correct significant digits. A normalized residual is a numerical backward-error indicator.

**【Test Environment (Windows 11 Home / 8th Gen Intel Core i7 / 16GB RAM)】**

* **Multiple Root Test Case $(x^2+1)^2 = 0$ ($x^4 + 2x^2 + 1 = 0$)**:
* **Preprocessing**: Instantly detects GCD = $x^2+1$ and multiplicity 2 via 320-digit precision.
* **Total Calculation Time**: **< 0.01 seconds (Instantaneous)**
* **Result**: All 4 roots ($+i, +i, -i, -i$) are obtained. The displayed correction is the final DKA iteration correction, not a bound on the true error.


* **20th-Degree Wilkinson Polynomial $W_{20}(x) = \prod_{i=1}^{20} (x - i)$**:
* **Measured example (one run)**: Elapsed time was **00:00:07**, with **110** total factor iterations; **20/20** roots converged and passed the residual check.


* **50th-Degree Wilkinson Polynomial $W_{50}(x) = \prod_{i=1}^{50} (x - i)$**:
* **Measured example (one run)**: Elapsed time was **00:01:56**, with **308** total factor iterations; **50/50** roots converged and passed the residual check.


* **100th-Degree Wilkinson Polynomial $W_{100}(x) = \prod_{i=1}^{100} (x - i)$**:
* **v3.6.0 measured example**: Thanks to Root-wise Convergence Locking and Stagnation Detection, the iteration overhead has been drastically reduced. All 100 roots perfectly resolve as integers 1 to 100 and are highlighted in green as Passed, in a fraction of the time previously required.



---

## 🎧 Application Example: Digital Channel Divider for Hi-Res Audio

The numerical engine has been used as an example in FIR filter design for a multi-amplifier setup using the 3-way speaker **SONY SS-CS5**. The displayed digits and residual checks do not certify filter accuracy; designs for real equipment require independent validation and safe testing.

---

## 🧪 Testing Procedure

1. Access the [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/).
2. Paste multiple root test coefficients (e.g., `1, 0, 2, 0, 1`) or Wilkinson coefficients into the "Coefficient Batch Paste" field and click "Apply All".
3. Press the "🚀 Start High-Precision Numerical Calculation!" button to check the Pro Analyzer logs and calculation results.
4. To try Gemini explanations, enter your Gemini API key in the results panel and request an explanation. The coefficients and results are sent to Google for that request.

---

---

# 📄 Software Requirements Specification (SRS)

**Project Name**: MethodDka (v3.6.0)
**Document Type**: System Requirements Definition & Design Specification

## 1. Overview and Development Objectives

This specification defines *MethodDka* v3.6.0, a browser-based polynomial numerical solver supporting up to degree 1000 and using 260-digit internal arithmetic. Roots are normally rounded to 15 digits; components below $0.5 \times 10^{-180}$ in magnitude are shown as 0. Computed values of up to 180 digits are available in a details section, but neither display guarantees correct significant digits. Version 3.6.0 introduces Root-wise Convergence Locking and Stagnation Detection to manage early exits, effectively resolving the iteration overhead in dense root scenarios like the 100th-degree Wilkinson polynomial. It standardizes the output to 180 digits to match the $\le 10^{-180}$ residual validation, and uses Yun's square-free decomposition with exact BigInt arithmetic for integer coefficients and 320-digit preprocessing ($\epsilon=10^{-220}$) otherwise.

## 2. System Architecture & Precision Hierarchy Design

This system adopts a two-stage pipeline structure with a distinct precision hierarchy established between the preprocessing and post-processing stages.

1. **Preprocessing Phase (Pre-processing Pipeline)**
* **Arithmetic Precision**: Exact BigInt arithmetic for integer coefficients; otherwise `Decimal.set({ precision: 320 })`
* **Threshold Specification**: Exact divisibility for integer coefficients; otherwise $\epsilon = 10^{-220}$
* **Key Functions**:
* For integer coefficients: Yun decomposition using exact BigInt pseudo-remainder GCD and polynomial division
* For non-integer coefficients: derivative polynomial generation (`derivativePoly`), Euclidean GCD (`polyGCD`), and dynamic polynomial division (`polyDivide`)
* Extraction of square-free factor $Q_k(x)$ for each multiplicity $k$
* Validation of exact divisibility or decimal division remainders, square-freeness, and weighted reconstructed degree




2. **Post-process Solver Phase (DKA Engine Pipeline)**
* **Arithmetic Precision**: `Decimal.set({ precision: 260 })` (output formatted to at most 180 significant digits with 80 guard digits; correct digits are not guaranteed)
* **Threshold Specification**: Scaled-variable correction $\epsilon = 10^{-220}$
* **Key Functions**:
* Sends each verified square-free factor $Q_k(x)$ to the existing Durand-Kerner-Aberth solver sequentially and expands results by multiplicity $k$.
* Manages root-wise convergence status to skip updates for roots that have already converged (Early Exit).
* Detects stagnation in correction magnitudes to prevent unnecessary iterations up to the safety lock limit.
* On validation failure, logs diagnostics and sends the original polynomial.





## 3. Preprocessing Module Detailed Design

### 3.1 Dynamic Tracking Polynomial Long Division (`polyDivide`)

* In descending arrays `[a_n, ..., a_0]`, based on the degree difference `degA - degB`, coefficients are written precisely to the correct index positions of the quotient coefficient array `Q` at each division step.
* Dynamic trimming via `trimLeadingZeros` is constantly executed to prevent array breakdown.

### 3.2 Robust Euclidean Algorithm (`polyGCD`)

* For non-integer coefficients, loops execute until the degree of the divisor $B_{curr}$ becomes 0 or the maximum absolute value of the remainder falls below or equals $\epsilon = 10^{-220}$.
* Integer coefficients use an exact BigInt pseudo-remainder sequence and exact polynomial division, avoiding tolerance-based GCD decisions.
* The resulting GCD and Yun factors are checked for square-freeness and weighted degree reconstruction.

### 3.3 Yun Decomposition Validation and Fallback

* For non-integer coefficients, validate that each division remainder is at most $\epsilon$; integer-coefficient divisions are checked for exact divisibility. All factors are checked for square-freeness and the residual GCD must be constant.
* Validate the weighted degree identity $\sum_k k \cdot \deg(Q_k) = \deg(P)$.
* On validation failure, log diagnostics and hand the original polynomial to DKA.

## 4. User Interface (UI) Requirements

* **Strict Color Validation**: Roots satisfying the residual $\le 10^{-180}$ condition are visually highlighted in green (Pass), regardless of iteration limits.
* **Pro Debug Analyzer**: Toggle display of internal processing steps on screen as structured text.
* **Real-Time Progress Panel**: Dynamic rendering of iterative loop count, elapsed time, and progress bar percentage.
* **Multilingual Support**: Instant switching capability between Japanese and English.

---

## 🌐 Official Page & Repository

* **Web App (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)
* **GitHub Repository:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📜 License & Developer Information

* **Developer**: Yoshiaki Koizumi
* **Version**: v3.6.0 (※MSI Installer Version: v3.4.1)
* **License**: MIT License

---