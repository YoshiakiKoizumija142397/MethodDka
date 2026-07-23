# MethodDka — 高速・高精度な因数分解 Web アプリ

MethodDka は、HTML と JavaScript だけで動作する **軽量・高速・高精度な因数分解ツール** です。
DKA法（Durand-Kerner法）を採用し、ホーナー法による検算ロジックを統合した世界基準の高精度数値解析リファレンスとして設計されています。

---

### 📝 更新状況および今後の予定

* **収束プロセスの可視化（v2.1.0）**: 各解ごとの反復回数および全合計反復回数の記録・表示機能を実装しました。これにより、アルゴリズムの挙動と計算コストを定量的に把握可能となり、数値解析の「目安」としての診断能力が強化されました。
* **世界基準リファレンス（v2.0.0）への刷新**: DKA法およびホーナー法による検算ロジックを統合し、高精度な数値解析エンジンとして全エディションの基盤をアップデートしました。
* **技術的正本**: 本メインリポジトリが、DKA法とホーナー法を統合した技術仕様における世界基準（マスター版）です。
* **オンライン版（GitHub Pages）**: **Windows, Mac, Linux, Chromebook, ChromeOS Flex 等、ほぼ全OS対応で実装完了・公開済み**です。Webブラウザから即座に動作し、**インストール作業は一切不要です**。
* **オフライン版（ZIP）**: v2.1.0 に更新済みです。**Edge/Chrome ブラウザを利用すれば iOS でも動作します**。
* **英語版および各派生ソフトウェアへの方針**: 最新の計算精度・機能を確認したい場合は、必ず本メインリポジトリの最新版を参照してください。

---

## 🌐 公式ページ（Web版）

### 日本語版（メイン）

* **Web:** [MethodDka](https://yoshiakikoizumija142397.github.io/MethodDka)
* **Repository:** [MethodDka](https://github.com/YoshiakiKoizumija142397/MethodDka)

### 英語版（English Version）

* **Web:** [MethodDkaEn](https://yoshiakikoizumija142397.github.io/MethodDkaEn)
* **Repository:** [MethodDkaEn](https://github.com/YoshiakiKoizumija142397/MethodDkaEn)

---

## 📁 メインリポジトリ（MethodDka）の構成

```text
MethodDka/
├── main/MethodDka.html              # 高精度版（世界基準リファレンス）
├── factorization/MethodDka.html     # 因数分解専用版（派生ソフトウェア）
├── index.html                       # 公式ランディングページ
└── assets / scripts / styles        # 各種リソース

```

---

## 📦 オフライン版（ZIP）

GitHub が自動生成する Source code ZIP を利用できます。

* **Download ZIP (v2.1.0):** [MethodDka Source ZIP](https://github.com/YoshiakiKoizumija142397/MethodDka/archive/refs/tags/v2.1.0.zip)

---

## 🔰 バージョン一覧（全エディション）

### 🎯 高精度版（High Precision Edition）

* **Web:** `main/MethodDka.html`

### ⚡ 因数分解専用版（Factorization Only Edition）

* **Web:** `factorization/MethodDka.html`

---

## 🚀 使い方と動作環境

1. **Web 版** : ブラウザで開くだけで、インストール不要で即座に動作します。
2. **アプリ化** : ブラウザの機能を使用して「アプリとしてインストール」することで、オフライン環境でも利用可能です。
3. **オフライン ZIP 版** : ZIP を展開し各 `MethodDka.html` を開くだけで動作します。

---

## 🧮 主な機能と技術要件

* **並列収束アルゴリズム** : DKA法による多項式因数分解。
* **高精度検証（ホーナー法）** : 収束誤差 `10^-44` を閾値とし、計算結果の信頼性を担保。
* **可視化エンジン** : 誤差半径に基づく結果の自動色分け（正常：緑字、異常：赤字）。
* **数値安定化** : スケーリング処理によるオーバーフロー/アンダーフロー対策。
* **計算安全装置** : 10,000回反復によるセーフティネットと、高次計算時のリアルタイム進捗表示。
* **収束診断機能** : 各解の反復回数および全合計回数の表示。アルゴリズム診断のバロメーターとして機能。
* **ポータビリティ** : 外部通信不要の完全オフライン動作対応。

---

## 謝辞

MethodDka は、最先端の研究所で日々高度な数値解析に挑む研究員やプログラマーが、いつでも・どこでも・堅牢に計算を実行できる「普遍的数学世界共通基盤技術レファレンス」として設計されています。

プロジェクトの進化には、Microsoft 社の Windows Copilot および GitHub Copilot、そして Google 社 Gemini との対話が不可欠でした。

## 📄 ライセンス

このプロジェクトは MIT License の下で公開されています。

## 👤 開発者

**Yoshiaki Koizumi**
GitHub: [YoshiakiKoizumija142397](https://github.com/YoshiakiKoizumija142397)
