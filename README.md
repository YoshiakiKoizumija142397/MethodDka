# MethodDka — 高速・高精度な多項式解法 & 因数分解 Web アプリ

MethodDka は、HTML と JavaScript だけで動作する **軽量・高速・高精度な多項式解法・因数分解ツール** です。
DKA法（Durand-Kerner法）を採用し、50桁高精度演算とリアルタイム表示切替（トグルスイッチ）を統合したマスター版として設計されています。

---

## 📝 主な更新内容（統合マスター版）

- **50桁高精度 ＆ 因数分解表示の完全統合**
  - 単一の画面上で「50桁高精度解表示」と「因数分解表示（小数第1位四捨五入）」をトグルスイッチ一つで即座に切り替え可能になりました。
- **1ファイル構造化（単一マスターコード）**
  - 高精度版と因数分解専用版を統合し、ルート直下の `MethodDka.html` 1ファイルにコードを一元化しました。
- **完全マルチプラットフォーム & オフライン対応**
  - Windows, Mac, Linux, Chromebook, iOS, Android 等、Webブラウザが開くすべての環境でインストール不要で動作します。

---

## 🌐 公式ページ（Web版）

- **Web アプリ:** [MethodDka Web](https://YoshiakiKoizumija142397.github.io/MethodDka/MethodDka.html)
- **リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📁 リポジトリの構成

```text
MethodDka/
├── MethodDka.html         # 統合マスターコード（50桁高精度 & 因数分解表示）
├── index.html             # 公式ランディングページ
└── README.md              # 本ドキュメント
リポジトリを確認いたしました！

ルート直下に統合された [MethodDka.html](https://github.com/YoshiakiKoizumija142397/MethodDka/blob/main/MethodDka.html) が配置され、`factorization` や `main` などの不要なフォルダが削除されて、**1ファイル構造の非常に美しくシンプルな構成**になっていますね！

---

## 📝 README.md の更新案

現在の最新構成（高精度50桁 ＆ 因数分解表示の統合、1ファイル構造化）に合わせて整理した `README.md` の更新コードです。

以下のコードをコピーし、リポジトリの [README.md](https://github.com/YoshiakiKoizumija142397/MethodDka/blob/main/README.md) を直接編集（鉛筆アイコン）して上書き保存・コミットしてください。

```markdown
# MethodDka — 高速・高精度な多項式解法 & 因数分解 Web アプリ

MethodDka は、HTML と JavaScript だけで動作する **軽量・高速・高精度な多項式解法・因数分解ツール** です。
DKA法（Durand-Kerner法）を採用し、50桁高精度演算とリアルタイム表示切替（トグルスイッチ）を統合したマスター版として設計されています。

---

## 📝 主な更新内容（統合マスター版）

- **50桁高精度 ＆ 因数分解表示の完全統合**
  - 単一の画面上で「50桁高精度解表示」と「因数分解表示（小数第1位四捨五入）」をトグルスイッチ一つで即座に切り替え可能になりました。
- **1ファイル構造化（単一マスターコード）**
  - 高精度版と因数分解専用版を統合し、ルート直下の `MethodDka.html` 1ファイルにコードを一元化しました。
- **完全マルチプラットフォーム & オフライン対応**
  - Windows, Mac, Linux, Chromebook, iOS, Android 等、Webブラウザが開くすべての環境でインストール不要で動作します。

---

## 🌐 公式ページ（Web版）

- **Web アプリ:** [MethodDka Web](https://YoshiakiKoizumija142397.github.io/MethodDka/MethodDka.html)
- **リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📁 リポジトリの構成

```text
MethodDka/
├── MethodDka.html         # 統合マスターコード（50桁高精度 & 因数分解表示）
├── index.html             # 公式ランディングページ
└── README.md              # 本ドキュメント

```

---

## 🚀 使い方と動作環境

1. **Web 版**: ブラウザで開くだけで、インストール不要で即座に動作します。
2. **モード切替**: 画面上のトグルスイッチを操作することで、50桁詳細解と整形式因数表示をリアルタイムに切り替えられます。
3. **オフライン利用**: ファイルをローカルに保存してブラウザで開くだけで、完全にオフラインでも動作します。

---

## 🧮 主な機能と技術要件

* **並列収束アルゴリズム**: DKA法による多項式根の探索。
* **高精度演算**: `Decimal.js` による50桁精度計算。
* **動的レンダリング**: 計算再実行なしでの解表示モード切り替え（50桁 ↔ 四捨五入因数分解）。
* **収束診断機能**: 各解の反復回数および全合計反復回数の可視化。

---

## 📄 ライセンス

このプロジェクトは [MIT License](https://www.google.com/search?q=LICENSE) の下で公開されています。

## 👤 開発者

*Yoshiaki Koizumi*

GitHub: [YoshiakiKoizumija142397](https://github.com/YoshiakiKoizumija142397)

---
